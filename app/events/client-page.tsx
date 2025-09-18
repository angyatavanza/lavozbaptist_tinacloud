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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardHeader2,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { TinaIcon } from "@/components/ui/icon";
import { PageIntro } from "@/components/layout/page-intro";

interface ClientEventProps {
  data: EventConnectionQuery;
  variables: EventConnectionQueryVariables;
  query: string;
}

function expandRecurringEvents(events: any[]) {
  return events.flatMap((event) => {
    if (event.reccuringeventdetails && event.reccuringeventdetails.length > 0) {
      const instances = event.reccuringeventdetails
        .filter((d: any) => d?.recurring)
        .map((detail: any, idx: number) => {
          const recStart = detail?.recstartdate ? new Date(detail.recstartdate) : event.sortDate;
          const recEnd = detail?.recenddate ? new Date(detail.recenddate) : new Date(event.sortDate);
          return {
            ...event,
            id: `${event.id}-rec-${idx + 1}`,
            published: detail?.formattedrecstartDate || event.published,
            publishedtime: detail?.formattedrecstartTime || event.publishedtime,
            publishedendtime: detail?.formattedrecendTime || event.publishedendtime,
            sortDate: !isNaN(recStart.getTime()) ? recStart : event.sortDate,
            url: `${event.url}/rec-${idx + 1}`,
            reccuringeventdetails: [
              {
                ...detail,
                formattedrecstartDate: detail?.formattedrecstartDate || "",
                formattedrecstartTime: detail?.formattedrecstartTime || "",
                formattedrecendDate: detail?.formattedrecendDate || "",
                formattedrecendTime: detail?.formattedrecendTime || "",
              },
            ],
            isRecurringInstance: true,
          };
        });

      return instances.length > 0 ? instances : [event];
    }

    return [event];
  });
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
      formattedStartTime = format(start, "h:mm a");
    }

    if (!isNaN(end.getTime())) {
      formattedEndTime = format(end, "h:mm a");
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
            formattedrecstartDate: !isNaN(start.getTime())
              ? format(start, "MMM dd", { locale: es })
              : "",
            formattedrecstartTime: !isNaN(start.getTime())
              ? format(start, "EEEE h:mm a", { locale: es })
              : "",
            recenddate: reccuringeventdetail?.recenddate || "",
            formattedrecendDate: !isNaN(end.getTime())
              ? format(end, "MMM dd", { locale: es })
              : "",
            formattedrecendTime: !isNaN(end.getTime())
              ? format(end, "h:mm a")
              : "",
            label: reccuringeventdetail?.label || "",
            icon2: reccuringeventdetail?.icon2 || null,
            frequency: reccuringeventdetail?.frequency || "Semanal",
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
        name: event.coordinator?.name || "La Voz de la Esperanza",
        avatar: event.coordinator?.avatar,
      },
    };
  });

  // Expand recurring instances
  const expandedEvents = expandRecurringEvents(events || []);

  // Filter/sort same as before, but now operates on expanded events
  const now = new Date();
  const sortedEvents = expandedEvents
    .filter((e) => e.sortDate >= now)
    .sort((a: any, b: any) => a.sortDate.getTime() - b.sortDate.getTime());

  return (
    <ErrorBoundary>
      {/* Header Section */}
      <PageIntro eyebrow="Eventos" title="Próximos eventos">
        <p>No te pierdas los eventos de la Iglesia La Voz</p>
      </PageIntro>
      {/* Container */}
      <Container className="mt-10 md:mt-15 lg:mt-20">
        {/* Events Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 pb-5 md:pb-10 lg:pb-15">
          {sortedEvents.map((event) => (
            <Card
              key={event.id}
              className="relative col-span-2 border bg-card shadow-sm md:col-span-4 lg:col-span-4 3xl:col-span-4"
            >
              {/* Date Bookmark */}
              <div className="absolute left-4 -top-4 z-20">
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
                <div className="absolute right-4 top-6 md:top-8 z-20 flex flex-wrap gap-5">
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

              {/* Image Container with hover overlay */}
              <CardHeader2 className="relative w-full h-64 lg:h-80 overflow-hidden group rounded-xl px-2 md:px-5 mt-8 md:mt-10">
                {event.heroImg && (
                  <>
                    <Link href={event.url} className="block h-full">
                      <Image
                        src={event.heroImg}
                        alt={event.title || ""}
                        fill
                        className="object-cover object-center"
                      />
                    </Link>
                  </>
                )}
              </CardHeader2>

              {/* Event Title */}
              <CardHeader>
                <CardTitle className="text-[19px] leading-[24px] md:text-[19px] md:leading-[24px]">
                  <Link href={event.url} className="hover:underline">
                    {event.title}
                  </Link>
                </CardTitle>
              </CardHeader>

              {/* Event Time and Location Details */}
              <CardContent className="flex items-center relative w-full">
                <CardDescription>
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
                          <div className="flex items-center gap-5">
                            {detail?.icon && (
                              <TinaIcon
                                data={{ ...detail.icon, size: "custom" }}
                              />
                            )}
                            <span className="capitalize">
                              {detail.formattedrecstartDate} -{" "}
                              {detail.formattedrecendDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-5">
                            {detail?.icon2 && (
                              <TinaIcon
                                data={{ ...detail.icon2, size: "custom" }}
                              />
                            )}
                            <span className="capitalize">
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
                        <div className="flex items-center gap-5">
                          {event.icon && (
                            <TinaIcon
                              data={{ ...event.icon, size: "custom" }}
                            />
                          )}
                          <span className="capitalize">{event.published}</span>
                        </div>
                      )}
                      {event.publishedtime && (
                        <div className="flex items-center gap-5">
                          {event.icon2 && (
                            <TinaIcon
                              data={{ ...event.icon2, size: "custom" }}
                            />
                          )}
                          {event.publishedendtime && (
                            <span>
                              {event.publishedtime} - {event.publishedendtime}
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* Location Details - Show for both types */}
                  {event.locationdetails &&
                    event.locationdetails.length > 0 && (
                      <div className="flex items-center gap-5">
                        {event.locationdetails[0]?.icon && (
                          <TinaIcon
                            data={{
                              ...event.locationdetails[0].icon,
                              size: "custom",
                            }}
                          />
                        )}
                        <span>{event.locationdetails[0]?.location}</span>
                      </div>
                    )}
                </CardDescription>
              </CardContent>

              {/* Footer with Action */}
              <CardFooter>
                <CardAction>
                  <Link
                    href={event.url}
                    className="inline-flex items-center text-sm leading-[20px] font-semibold text-primary gap-3 hover:gap-5 transition-all"
                  >
                    <span>Ver evento</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform" />
                  </Link>
                </CardAction>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </ErrorBoundary>
  );
}
