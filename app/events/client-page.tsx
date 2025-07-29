"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  EventConnectionQuery,
  EventConnectionQueryVariables,
} from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { TinaIcon } from "@/components/ui/icon";
import { PageIntro } from "@/components/layout/page-intro";

//done 35a: create events page tina collection
//done 35b: add more sections to events template such as date, time, details,
//done 46: add reccuringeventdetails and locationdetails and data.actions [add link to a form] to events page
//to-do 48: edit ui of all events page
//to-do 64: replace content/mdx files with relevant events

interface ClientEventProps {
  data: EventConnectionQuery;
  variables: EventConnectionQueryVariables;
  query: string;
}

export default function EventsClientPage(props: ClientEventProps) {
  const events = props.data?.eventConnection.edges!.map((eventData) => {
    const event = eventData!.node!;

    const start = new Date(event.date!);
    const end = new Date(event.endtime!);
    
    let formattedStartDate = "";
    let formattedStartTime = "";
    let formattedEndTime = "";

    if (!isNaN(start.getTime())) {
      formattedStartDate = format(start, "MMM dd", { locale: es });
      formattedStartTime = format(start, "h:mm a").toLowerCase();
    }

    if (!isNaN(end.getTime())) {
      formattedEndTime = format(end, "h:mm a").toLowerCase();
    }

    // Get the earliest date for sorting (for recurring events, use the first recurring date)
    let sortDate = start;
    const firstRecurringDetail = event.reccuringeventdetails?.[0];
    if (firstRecurringDetail?.recurring && firstRecurringDetail.recstartdate) {
      const recurringStart = new Date(firstRecurringDetail.recstartdate);
      if (!isNaN(recurringStart.getTime())) {
        sortDate = recurringStart;
      }
    }

    return {
      id: event.id,
      published: formattedStartDate,
      sortDate: sortDate, // Add original date for sorting
      publishedtime: formattedStartTime,
      publishedendtime: formattedEndTime,
      icon: event.icon || null,
      icon2: event.icon2 || null,
      title: event.title,
      tags: event.tags?.map((tag) => tag?.tag?.name) || [],
      url: `/events/${event._sys.breadcrumbs.join("/")}`,
      description: event.description,
      reccuringeventdetails:
        event.reccuringeventdetails?.map((reccuringeventdetail) => {
          const start = new Date(reccuringeventdetail?.recstartdate!);
          const end = new Date(reccuringeventdetail?.recenddate!);
          return {
            recurring: reccuringeventdetail?.recurring || false,
            recstartdate: reccuringeventdetail?.recstartdate || "",
            formattedrecstartDate: !isNaN(end.getTime())
              ? format(start, "MMM dd", { locale: es })
              : "",
            formattedrecstartTime: !isNaN(end.getTime())
              ? format(start, "EEEE h:mm a", { locale: es }).toLowerCase()
              : "",
            recenddate: reccuringeventdetail?.recenddate || "",
            formattedrecendDate: !isNaN(end.getTime())
              ? format(end, "MMM dd", { locale: es })
              : "",
            formattedrecendTime: !isNaN(end.getTime())
              ? format(end, "h:mm a").toLowerCase()
              : "",
            label: reccuringeventdetail?.label || "",
            icon2: reccuringeventdetail?.icon2 || null,
            frequency: reccuringeventdetail?.frequency || "Weekly",
            type: reccuringeventdetail?.type || "",
            icon: reccuringeventdetail?.icon || null,
            link: reccuringeventdetail?.link || "",
          };
        }) || [],
      locationdetails:
        event.locationdetails?.map((locationdetail) => ({
          location: locationdetail?.location || "",
          label: locationdetail?.label || "",
          type: locationdetail?.type || "",
          icon: locationdetail?.icon || null,
          link: locationdetail?.link || "",
        })) || [],
      heroImg: event.heroImg,
      coordinator: {
        name: event.coordinator?.name || "Anonymous",
        avatar: event.coordinator?.avatar,
      },
    };
  });

  // Apply recurring/non-recurring, sort, and limit logic
  const recurringEvents = events
    .filter(
      (event) =>
        event.reccuringeventdetails &&
        event.reccuringeventdetails.some((d) => d?.recurring === true)
    )
    .filter((e) => !!e.published)
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime()); // Sort earliest to latest

  const nonRecurringEvents = events
    .filter(
      (event) =>
        !event.reccuringeventdetails ||
        !event.reccuringeventdetails.some((d) => d?.recurring === true)
    )
    .filter((e) => !!e.published)
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime()); // Sort earliest to latest

  // Combine all events for the grid
  const allEvents = [...recurringEvents, ...nonRecurringEvents];
  const sortedEvents = allEvents.sort(
    (a, b) => a.sortDate.getTime() - b.sortDate.getTime()
  ); // Sort closest events first

  return (
    <ErrorBoundary>
      {/* Header Section */}
      <PageIntro eyebrow="Eventos" title="Próximos eventos">
        <p>Siempre hay eventos que suceden en la Iglesia La Voz.</p>
      </PageIntro>
      {/* Container */}
      <Container className="mt-20 md:mt-28">
        {/* Events Grid */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-3.75 md:grid-cols-12">
          {sortedEvents.map((event) => (
            <Card
              key={event.id}
              className="relative col-span-2 border bg-card shadow-sm md:col-span-4 lg:col-span-4 3xl:col-span-4"
            >
              {/* Date Bookmark */}
              <div className="absolute left-4 -top-4 z-10">
                <div className="relative">
                  <svg
                    width="55"
                    height="90"
                    viewBox="0 0 55 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-md text-primary"
                  >
                    <path
                      d="M0 0 L55 0 L55 70 L27.5 55 L0 70 Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-start pt-3 text-white">
                    <div className="text-xs font-medium uppercase tracking-wider">
                      {event.published.split(" ")[0]}
                    </div>
                    <div className="text-xl font-bold leading-tight">
                      {event.published.split(" ")[1]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags - Top Right */}
              {event.tags && event.tags.length > 0 && (
                <div className="absolute right-4 top-4 z-10 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-1 text-xs uppercase tracking-wide text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Event Image */}
              {event.heroImg && (
                <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg">
                  <Link href={event.url}>
                    <Image
                      width={400}
                      height={225}
                      src={event.heroImg}
                      alt={event.title}
                      className="h-full w-full object-cover transition-opacity duration-200 hover:opacity-80"
                    />
                  </Link>
                </div>
              )}

              {/* Event Content */}
              <div className="p-4">
                {/* Event Title */}
                <h3 className="mb-3 text-lg font-nunito font-medium leading-tight">
                  <Link href={event.url} className="hover:underline">
                    {event.title}
                  </Link>
                </h3>

                {/* Event Time and Location */}
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  {/* Check if it's a recurring event */}
                  {event.reccuringeventdetails &&
                  event.reccuringeventdetails.length > 0 &&
                  event.reccuringeventdetails.some(
                    (d) => d?.recurring === true
                  ) ? (
                    // Show recurring event details
                    <>
                      {event.reccuringeventdetails.map((detail, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center gap-2">
                            {detail?.icon && (
                              <TinaIcon data={{ ...detail.icon, size: "xs" }} />
                            )}
                            <span>
                              {detail.formattedrecstartDate} -{" "}
                              {detail.formattedrecendDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {detail?.icon2 && (
                              <TinaIcon
                                data={{ ...detail.icon2, size: "xs" }}
                              />
                            )}
                            <span>
                              {detail.formattedrecstartTime} -{" "}
                              {detail.formattedrecendTime}
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    // Show non-recurring event details
                    <>
                     {event.published && (
                      <div className="flex items-center gap-2">
                        {event.icon && (
                          <TinaIcon data={{ ...event.icon, size: "xs" }} />
                          )}
                          <span>{event.published}</span>
                      </div>
                    )}
                      {event.publishedtime && (
                        <div className="flex items-center gap-2">
                          {event.icon2 && (
                            <TinaIcon data={{ ...event.icon2, size: "xs" }} />
                          )}
                          <span>{event.publishedtime}</span>
                          {event.publishedendtime && (
                            <span>- {event.publishedendtime}</span>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* Location Details - Show for both types */}
                  {event.locationdetails &&
                    event.locationdetails.length > 0 && (
                      <div className="flex items-center gap-2">
                        {event.locationdetails[0]?.icon && (
                          <TinaIcon
                            data={{
                              ...event.locationdetails[0].icon,
                              size: "xs",
                            }}
                          />
                        )}
                        <span>{event.locationdetails[0]?.location}</span>
                      </div>
                    )}
                </div>

                {/* View Event Link */}
                <Link
                  href={event.url}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  <span>Ver Evento</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </ErrorBoundary>
  );
}
