"use client";
import React from "react";
import { es } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { TinaIcon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { EventQuery } from "@/tina/__generated__/types";
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { useLayout } from "@/components/layout/layout-context";
import { Container } from "@/components/layout/container";
import { components } from "@/components/mdx-components";
import ErrorBoundary from "@/components/error-boundary";

const titleColorClasses = {
  blue: "from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500",
  teal: "from-teal-400 to-teal-600 dark:from-teal-300 dark:to-teal-500",
  green: "from-green-400 to-green-600",
  red: "from-red-400 to-red-600",
  pink: "from-pink-300 to-pink-500",
  purple: "from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500",
  orange: "from-orange-300 to-orange-600 dark:from-orange-200 dark:to-orange-500",
  yellow: "from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500",
};

interface ClientEventProps {
  data: EventQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function EventClientPage(props: ClientEventProps) {
  const { theme } = useLayout();
  const { data } = useTina({ ...props });
  const event = data.event;

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

  const parsedRecurringEventDetails =
    event.reccuringeventdetails?.map((detail) => {
      const start = new Date(detail?.recstartdate!);
      const end = new Date(detail?.recenddate!);

      return {
        ...detail,
        formattedRecStartDate: !isNaN(start.getTime())
          ? format(start, "MMM dd", { locale: es })
          : "",
        formattedRecStartTime: !isNaN(start.getTime())
          ? format(start, "EEEE h:mm a", { locale: es }).toLowerCase()
          : "",
        formattedRecEndDate: !isNaN(end.getTime())
          ? format(end, "MMM dd", { locale: es })
          : "",
        formattedRecEndTime: !isNaN(end.getTime())
          ? format(end, "h:mm a").toLowerCase()
          : "",
      };
    }) || [];

  return (
    <ErrorBoundary>
      <Container className="mt-20 md:mt-28">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3.75 py-10">
          {/* Left Column - Main Event Content */}
          <Card className="col-span-2 md:col-span-8 bg-white dark:bg-zinc-900 shadow rounded-2xl p-6 space-y-6">
            <CardHeader className="p-0">
              {event.heroImg && (
                <div className="w-full overflow-hidden rounded-xl">
                  <Image
                    src={event.heroImg}
                    alt={event.title}
                    width={1000}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <h2
                className="font-nunito text-3xl font-bold tracking-tight mb-4"
                data-tina-field={tinaField(event, "title")}
              >
                {event.title}
              </h2>
              <div
                    data-tina-field={tinaField(event, "coordinator")}
                    className="flex items-center justify-center mb-16"
                  >
                    {event.coordinator && (
                      <>
                        {event.coordinator.avatar && (
                          <div className="shrink-0 mr-4">
                            <Image
                              data-tina-field={tinaField(
                                event.coordinator,
                                "avatar"
                              )}
                              priority={true}
                              className="h-14 w-14 object-cover rounded-full shadow-xs"
                              src={event.coordinator.avatar}
                              alt={event.coordinator.name}
                              width={500}
                              height={500}
                            />
                          </div>
                        )}
                        <p
                          data-tina-field={tinaField(event.coordinator, "name")}
                          className="text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white"
                        >
                          {event.coordinator.name}
                        </p>
                        <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                          —
                        </span>
                      </>
                    )}
                  </div>
              <div className="prose dark:prose-invert max-w-none text-base mb-6">
                <TinaMarkdown content={event.description} />
              </div>
              <div
                data-tina-field={tinaField(event, "_body")}
                className="prose dark:prose-invert max-w-none"
              >
                <TinaMarkdown content={event._body} components={components} />
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Event Details Sidebar */}
          <Card className="col-span-2 md:col-span-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-6 space-y-6">
            <CardContent className="p-0">
              <h2 className="text-xl font-nunito font-semibold mb-4 text-zinc-900 dark:text-white">
                Event Details
              </h2>
              <div className="flex flex-col items-start gap-4 w-full">
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
                      {parsedRecurringEventDetails.map((detail, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center gap-2">
                            {detail?.icon && (
                              <TinaIcon data={{ ...detail.icon, size: "xs" }} />
                            )}
                            <span>
                              {detail.formattedRecStartDate} -{" "}
                              {detail.formattedRecEndDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {detail?.icon2 && (
                              <TinaIcon
                                data={{ ...detail.icon2, size: "xs" }}
                              />
                            )}
                            <span>
                              {detail.formattedRecStartTime} -{" "}
                              {detail.formattedRecEndTime}
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    // Show non-recurring event details
                    <>
                      <div className="flex items-center gap-2">
                        {event.icon && (
                          <TinaIcon data={{ ...event.icon, size: "xs" }} />
                        )}
                        <span>{formattedStartDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {event.icon2 && (
                          <TinaIcon data={{ ...event.icon2, size: "xs" }} />
                        )}
                        <span>
                          {formattedStartTime} - {formattedEndTime}
                        </span>
                      </div>
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
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {event.actions &&
                      event.actions.map((action) => (
                        <div
                          key={action!.label}
                          data-tina-field={tinaField(action)}
                          className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                        >
                          <Button
                            asChild
                            size="lg"
                            variant={
                              action!.type === "link" ? "ghost" : "default"
                            }
                            className="rounded-xl px-5 text-base"
                          >
                            <Link href={action!.link!}>
                              {action?.icon && <TinaIcon data={action?.icon} />}
                              <span className="text-nowrap">
                                {action!.label}
                              </span>
                            </Link>
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </ErrorBoundary>
  );
}
