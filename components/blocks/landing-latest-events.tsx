"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Card,
  Card2,
  CardContent,
  CardHeader,
  CardHeader2,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Template } from "tinacms";
import {
  DecorativeIcon,
  LargeDecorativeIcon,
} from "@/components/ui/decorative-icon";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TinaIcon } from "@/components/ui/icon";
import { TextEffect } from "../motion-primitives/text-effect";
import { tinaField } from "tinacms/dist/react";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import type { Event, PageBlocksLatestevents } from "@/tina/__generated__/types";

interface LatestEventsProps {
  data: PageBlocksLatestevents;
  events: Event[];
}

function expandRecurringEvents(events: any[]) {
  return events.flatMap((event) => {
    // if there are recurring details, create a separate object per recurring detail
    if (event.reccuringeventdetails && event.reccuringeventdetails.length > 0) {
      const instances = event.reccuringeventdetails
        .filter((d: any) => d?.recurring) // only expand the recurring ones
        .map((detail: any, idx: number) => {
          // parse dates (fallbacks to original event.sortDate)
          const recStart = detail?.recstartdate ? new Date(detail.recstartdate) : event.sortDate;
          const recEnd = detail?.recenddate ? new Date(detail.recenddate) : new Date(event.sortDate);

          return {
            ...event,
            id: `${event.id}-rec-${idx + 1}`,
            // keep title same (you can append a label if desired)
            title: event.title,
            // published and time derived from the recurring detail (fallbacks kept)
            published: detail?.formattedrecstartDate || event.published,
            publishedtime: detail?.formattedrecstartTime || event.publishedtime,
            publishedendtime: detail?.formattedrecendTime || event.publishedendtime,
            // sort by the recurring start date
            sortDate: !isNaN(recStart.getTime()) ? recStart : event.sortDate,
            // unique url to resolve the recurring route
            url: `${event.url}/rec-${idx + 1}`,
            // make the card rendering still work (it expects an array)
            reccuringeventdetails: [
              {
                ...detail,
                // ensure formatted fields exist
                formattedrecstartDate: detail?.formattedrecstartDate || "",
                formattedrecstartTime: detail?.formattedrecstartTime || "",
                formattedrecendDate: detail?.formattedrecendDate || "",
                formattedrecendTime: detail?.formattedrecendTime || "",
              },
            ],
            isRecurringInstance: true,
          };
        });

      // if there were no recurring items (e.g., none had recurring === true), return the event itself
      return instances.length > 0 ? instances : [event];
    }

    // non-recurring -> return original event object
    return [event];
  });
}

export const LatestEvents = ({ data, events }: LatestEventsProps) => {
  const limit = Math.min(Math.max(data.limit ?? 3, 1), 10);
  const headline = data.headline || "Eventos";

  const formattedEvents = (events ?? []).map((event) => {
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

  // Expand recurring instances into separate objects
  const expandedEvents = expandRecurringEvents(formattedEvents);
  const now = new Date();

  const upcomingEvents = expandedEvents
    .filter((e) => e.sortDate >= now) // <- use only sortDate
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime())
    .slice(0, limit);

  return (
    <Section background={data.background!} className="mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5 lg:gap-5 px-4 md:px-5 py-5 md:py-10 lg:py-15">
        <div className="flex flex-col gap-5">
          {data.tagline && (
            <div data-tina-field={tinaField(data, "tagline")}>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="font-nunito font-medium text-balance text-left text-base leading-[24px] text-primary-magenta1 uppercase mx-auto "
              >
                {data.tagline!}
              </TextEffect>
            </div>
          )}

          {/* Main headline (Headline 01 in QBDS Web 48/60 B + Responsive 34/44 B)*/}
          {data.headline && (
            <div
              data-tina-field={tinaField(data, "headline")}
              className="flex items-center gap-1 md:gap-2"
            >
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h2"
                className="font-nunito font-semibold text-balance text-left text-[34px] leading-[44px] md:text-5xl md:leading-[60px] text-foreground max-w-2/3 md:max-w-lg"
              >
                {data.headline!}
              </TextEffect>
              <div className="relative bottom-[0px] md:bottom-[20px]">
                <DecorativeIcon
                  className="text-primary-magenta1 w-5 h-5 md:w-7 md:h-7 shrink-0"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

          {/* Description (Body 01 in QBDS Web 20/28 MR + Responsive 16/24 MR)*/}
          {data.description && (
            <div data-tina-field={tinaField(data, "description")}>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="font-normal text-balance text-left text-base leading-[24px] md:text-xl md:leading-[28px] max-w-md"
              >
                {data.description!}
              </TextEffect>
            </div>
          )}
        </div>
        {/* Header Button */}
        <div className="md:mt-12 flex flex-wrap justify-center">
          {data.actions &&
            data.actions.map((action) => (
              <div
                key={action!.label}
                data-tina-field={tinaField(action)}
                className="bg-foreground/10 rounded-[calc(var(--radius-sm)+0.125rem)] border p-0.5"
              >
                <Button
                  asChild
                  size="default"
                  variant={action!.type === "link" ? "outline" : "default"}
                  className=""
                >
                  <Link href={action!.link!}>
                    <span className="text-nowrap">{action!.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 pb-5 md:pb-10 lg:pb-15">
        {upcomingEvents.map((event) => (
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

            {/* Image Container */}
            <CardHeader2 className="relative w-full h-64 lg:h-80 overflow-hidden group rounded-xl px-2 md:px-5 mt-8 md:mt-10">
              {event.heroImg && (
                <Link href={event.url} className="block h-full">
                  <Image
                    data-tina-field={tinaField(event, "heroImg")}
                    src={event.heroImg}
                    alt={event.title || ""}
                    fill
                    className="object-cover object-center"
                  />
                </Link>
              )}
            </CardHeader2>

            {/* Event Title */}
            <CardHeader>
              <CardTitle
                className="text-[19px] leading-[24px] md:text-[19px] md:leading-[24px]"
                data-tina-field={tinaField(event, "title")}
              >
                <Link href={event.url}>{event.title}</Link>
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
                          <TinaIcon data={{ ...event.icon, size: "custom" }} />
                        )}
                        <span className="capitalize">{event.published}</span>
                      </div>
                    )}
                    {event.publishedtime && (
                      <div className="flex items-center gap-5">
                        {event.icon2 && (
                          <TinaIcon data={{ ...event.icon2, size: "custom" }} />
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
                {event.locationdetails && event.locationdetails.length > 0 && (
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
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
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
