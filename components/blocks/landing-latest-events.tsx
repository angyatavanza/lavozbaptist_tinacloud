"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Template } from "tinacms";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TinaIcon } from "@/components/ui/icon";
import { tinaField } from "tinacms/dist/react";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import type { Event, PageBlocksLatestevents } from "@/tina/__generated__/types";
import  LatestPlaceholderEvents  from "../event-placeholder-3";
//to-do 11: merge placeholder + change layout of latest event card: date as a bookmark top left, photo centered, event title +event date/time + location underneath photo FRONTEND

interface LatestEventsProps {
  data: PageBlocksLatestevents;
  events: Event[];
}

export const LatestEvents = ({ data, events }: LatestEventsProps) => {
  const limit = Math.min(Math.max(data.limit ?? 3, 1), 10);
  const title = data.title || "Eventos";

  const formattedEvents = (events ?? []).map((event) => {
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
  const recurringEvents = formattedEvents
    .filter(
      (event) =>
        event.reccuringeventdetails &&
        event.reccuringeventdetails.some((d) => d?.recurring === true)
    )
    .filter((e) => !!e.published)
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime()); // Sort earliest to latest

  const nonRecurringEvents = formattedEvents
    .filter(
      (event) =>
        !event.reccuringeventdetails ||
        !event.reccuringeventdetails.some((d) => d?.recurring === true)
    )
    .filter((e) => !!e.published)
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime()); // Sort earliest to latest

  // Combine all events for the grid
  const allEvents = [...recurringEvents, ...nonRecurringEvents];
  const limitedEvents = allEvents
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime()) // Sort closest events first
    .slice(0, limit);

  return (
    <Section background={data.background!} className="w-full max-w-none">
            <LatestPlaceholderEvents />
      {/* Header Section */}
      <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex-1">
          <h2 className="mb-4 text-pretty text-3xl font-nunito font-medium md:text-4xl">
            {title}
          </h2>
          <p className="max-w-2xl text-muted-foreground md:text-lg">
            Manténgase al tanto de lo que está sucediendo en la Iglesia La Voz
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {data.actions &&
            data.actions.map((action) => (
              <div
                key={action!.label}
                data-tina-field={tinaField(action)}
                className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
              >
                <Button
                  asChild
                  size="lg"
                  variant={action!.type === "link" ? "ghost" : "default"}
                  className="rounded-xl px-5 text-base"
                >
                  <Link href={action!.link!}>
                    <span className="text-nowrap">{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-2 gap-3.75 md:grid-cols-12">
        {limitedEvents.map((event) => (
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
                            <TinaIcon data={{ ...detail.icon2, size: "xs" }} />
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
                {event.locationdetails && event.locationdetails.length > 0 && (
                  <div className="flex items-center gap-2">
                    {event.locationdetails[0]?.icon && (
                      <TinaIcon
                        data={{ ...event.locationdetails[0].icon, size: "xs" }}
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
    </Section>
  );
};

export const latesteventsBlockSchema: Template = {
  name: "latestevents",
  label: "Latest Events",
  ui: {
    previewSrc: "/blocks/latest-events.png",
    defaultItem: {
      title: "Upcoming Events",
      limit: 3,
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Section Title",
      name: "title",
    },
    {
      type: "number",
      label: "Number of Events to Show",
      name: "limit",
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
  ],
};
