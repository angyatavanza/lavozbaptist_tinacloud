"use client";
import React from "react";
import { es } from "date-fns/locale";
import Image from "next/image";
import { TinaIcon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { EventQuery } from "@/tina/__generated__/types";
import {
  Card,
  CardFooter,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardHeader2,
} from "@/components/ui/card";
import { useLayout } from "@/components/layout/layout-context";
import { Container } from "@/components/layout/container";
import { components } from "@/components/mdx-components";
import ErrorBoundary from "@/components/error-boundary";


interface ClientEventProps {
  data: any; // full Tina query result
  variables: { relativePath: string };
  query: string;
  recurrenceDetail?: any | null; // new prop for recurring instance
}

export default function EventClientPage(props: ClientEventProps) {
  const { theme } = useLayout();
  const { data } = useTina({ ...props });
  const event = data.event;

  // Determine if rendering a recurring instance
  const recurring = props.recurrenceDetail;
  const start = new Date(recurring?.recstartdate || event.date!);
  const end = new Date(recurring?.recenddate || event.endtime!);

  const formattedStartDate = !isNaN(start.getTime())
    ? format(start, "MMM dd", { locale: es })
    : "";
  const formattedStartTime = !isNaN(start.getTime())
    ? format(start, "h:mm a")
    : "";
  const formattedEndTime = !isNaN(end.getTime()) ? format(end, "h:mm a") : "";

  // Parse recurring event details for sidebar
  const parsedRecurringEventDetails =
    (recurring
      ? [recurring] // only this instance
      : event.reccuringeventdetails || []
    ).map((detail) => {
      const s = new Date(detail?.recstartdate!);
      const e = new Date(detail?.recenddate!);
      return {
        ...detail,
        formattedRecStartDate: !isNaN(s.getTime())
          ? format(s, "MMM dd", { locale: es })
          : "",
        formattedRecStartTime: !isNaN(s.getTime())
          ? format(s, "EEEE h:mm a", { locale: es })
          : "",
        formattedRecEndDate: !isNaN(e.getTime())
          ? format(e, "MMM dd", { locale: es })
          : "",
        formattedRecEndTime: !isNaN(e.getTime()) ? format(e, "h:mm a") : "",
      };
    });

  return (
    <ErrorBoundary>
      <Container className="mt-10 md:mt-15 lg:mt-20">
        <div className="grid grid-cols-2 md:grid-cols-12 items-start gap-5 px-4 md:px-5 py-10">
          {/* Left Column - Main Event Content */}
          <Card className="col-span-2 md:col-span-8 shadow rounded-2xl p-6 space-y-6">
            <CardHeader className="p-0">
              {event.heroImg && (
                <div className="relative w-full overflow-hidden rounded-xl">
                  <Image
                    src={event.heroImg}
                    alt={event.title}
                    width={1000}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                  {event.coordinator && (
                    <div
                      data-tina-field={tinaField(event, "coordinator")}
                      className="absolute left-3 bottom-3 flex items-center gap-3 rounded-full border bg-background/80 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm px-3 py-2"
                    >
                      {event.coordinator.avatar && (
                        <Image
                          data-tina-field={tinaField(event.coordinator, "avatar")}
                          src={event.coordinator.avatar}
                          alt={event.coordinator.name}
                          width={64}
                          height={64}
                          className="h-8 w-8 rounded-full object-cover"
                          priority
                        />
                      )}
                      <div className="leading-tight">
                        <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                          Coordinado por
                        </span>
                        <span
                          data-tina-field={tinaField(event.coordinator, "name")}
                          className="block text-primary-foreground text-sm font-medium"
                        >
                          {event.coordinator.name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardHeader>

            {/* Event Title */}
            <CardHeader>
              <CardTitle data-tina-field={tinaField(event, "title")}>
                {event.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <CardDescription data-tina-field={tinaField(event, "description")}>
                <TinaMarkdown content={event.description} />
              </CardDescription>
              <CardDescription data-tina-field={tinaField(event, "_body")}>
                <TinaMarkdown content={event._body} components={components} />
              </CardDescription>
            </CardContent>
          </Card>

          {/* Right Column - Event Details Sidebar */}
          <Card className="col-span-2 md:col-span-4 self-start bg-card border space-y-5 md:sticky md:top-24">
            <CardHeader>
              <CardTitle className="text-[19px] leading-[24px] md:text-[19px] md:leading-[24px]">
                Detalles del evento
              </CardTitle>
            </CardHeader>

            <CardContent className="flex items-center relative w-full">
              <CardDescription>
                {/* Recurring or non-recurring details */}
                {parsedRecurringEventDetails.length > 0 ? (
                  parsedRecurringEventDetails.map((detail, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-5">
                        {detail?.icon && <TinaIcon data={{ ...detail.icon, size: "xs" }} />}
                        <span className="capitalize">
                          {detail.formattedRecStartDate} - {detail.formattedRecEndDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-5">
                        {detail?.icon2 && <TinaIcon data={{ ...detail.icon2, size: "xs" }} />}
                        <span className="capitalize">
                          {detail.formattedRecStartTime} - {detail.formattedRecEndTime}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center gap-5">
                      {event.icon && <TinaIcon data={{ ...event.icon, size: "xs" }} />}
                      <span className="capitalize">{formattedStartDate}</span>
                    </div>
                    <div className="flex items-center gap-5">
                      {event.icon2 && <TinaIcon data={{ ...event.icon2, size: "xs" }} />}
                      <span>{formattedStartTime} - {formattedEndTime}</span>
                    </div>
                  </div>
                )}

                {/* Location Details */}
                {event.locationdetails?.map((loc) => (
                  <div key={loc?.label || loc?.location} className="flex items-start gap-5">
                    {loc?.icon && <TinaIcon data={{ ...loc.icon, size: "xs" }} />}
                    <div className="flex flex-col gap-2">
                      {loc?.location && <span data-tina-field={tinaField(loc!, "location")}>{loc.location}</span>}
                      {loc?.label && loc?.link ? (
                        <div data-tina-field={tinaField(loc!, "label")}>
                          <Button
                            asChild
                            size="sm"
                            variant={loc?.type === "link" ? "ghost" : "default"}
                            className="font-normal text-muted-foreground text-sm leading-[20px] px-0 min-w-0 justify-start"
                          >
                            <a href={loc.link} target="_blank" rel="noopener noreferrer">
                              <span className="whitespace-pre-line break-words">{loc.label.replace(/,\s*/, ",\n")}</span>
                            </a>
                          </Button>
                        </div>
                      ) : (
                        loc?.label && <span data-tina-field={tinaField(loc!, "label")}>{loc.label}</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardDescription>
            </CardContent>

            {/* Footer with Actions */}
            <CardFooter>
              <CardAction>
                {event.actions?.map((action) => (
                  <div key={action.label} data-tina-field={tinaField(action)} className="bg-foreground/10 rounded-[calc(var(--radius-sm)+0.125rem)] border p-0.5">
                    <Button
                      asChild
                      size="default"
                      variant={action.type === "link" ? "outline" : "default"}
                    >
                      <a href={action.link} target="_blank" rel="noopener noreferrer">
                        {action.icon && <TinaIcon data={action.icon} />}
                        <span className="text-nowrap">{action.label}</span>
                      </a>
                    </Button>
                  </div>
                ))}
              </CardAction>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </ErrorBoundary>
  );
}
