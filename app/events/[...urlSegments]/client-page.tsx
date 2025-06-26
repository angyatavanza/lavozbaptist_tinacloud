"use client";
import React from "react";
import { es } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { TinaIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { EventQuery } from "@/tina/__generated__/types";
import { useLayout } from "@/components/layout/layout-context";
import { Section } from "@/components/layout/section";
import { components } from "@/components/mdx-components";
import ErrorBoundary from "@/components/error-boundary";

const titleColorClasses = {
  blue: "from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500",
  teal: "from-teal-400 to-teal-600 dark:from-teal-300 dark:to-teal-500",
  green: "from-green-400 to-green-600",
  red: "from-red-400 to-red-600",
  pink: "from-pink-300 to-pink-500",
  purple:
    "from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500",
  orange:
    "from-orange-300 to-orange-600 dark:from-orange-200 dark:to-orange-500",
  yellow:
    "from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500",
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

  const parsedreccuringeventdetails =
    event.reccuringeventdetails?.map((reccuringeventdetail) => {
      const start = new Date(reccuringeventdetail?.recstartdate!);
      const end = new Date(reccuringeventdetail?.recenddate!);

      return {
        ...reccuringeventdetail,
        recstartdate: reccuringeventdetail?.recstartdate || "",
        formattedrecstartDate: !isNaN(end.getTime())
          ? format(start, "MMM dd", { locale: es })
          : "",
        formattedrecstartTime: !isNaN(end.getTime())
          ? format(start, "EEEE h:mm a").toLowerCase()
          : "",
        recenddate: reccuringeventdetail?.recenddate || "",
        formattedrecendDate: !isNaN(end.getTime())
          ? format(end, "MMM dd", { locale: es })
          : "",
        formattedrecendTime: !isNaN(end.getTime())
          ? format(end, "h:mm a").toLowerCase()
          : "",
      };
    }) || [];

  return (
    <ErrorBoundary>
      <Section>
        <h2
          data-tina-field={tinaField(event, "title")}
          className={`w-full relative\tmb-8 text-6xl font-extrabold tracking-normal text-center title-font`}
        >
          <span
            className={`bg-clip-text text-transparent bg-linear-to-r ${
              titleColorClasses[theme!.color!]
            }`}
          >
            {event.title}
          </span>
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
                    data-tina-field={tinaField(event.coordinator, "avatar")}
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
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {event.locationdetails &&
              event.locationdetails.map((locationdetail) => (
                <div
                  key={locationdetail!.label}
                  data-tina-field={tinaField(locationdetail)}
                  className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                >
                  <Button
                    asChild
                    size="lg"
                    variant={
                      locationdetail!.type === "link" ? "outline" : "default"
                    }
                    className="rounded-xl px-5 text-base"
                  >
                    <Link href={locationdetail!.link!}>
                      {locationdetail?.icon && (
                        <TinaIcon data={locationdetail?.icon} />
                      )}
                      <span className="text-wrap">
                        {locationdetail!.location}
                      </span>
                      <span className="text-wrap">{locationdetail!.label}</span>
                    </Link>
                  </Button>
                </div>
              ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {parsedreccuringeventdetails.map((reccuringeventdetail) => (
              <div
                key={reccuringeventdetail!.label}
                data-tina-field={tinaField(reccuringeventdetail)}
                className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
              >
                <div className="flex items-center gap-2 p-2">
                  {reccuringeventdetail?.icon && (
                    <TinaIcon data={reccuringeventdetail?.icon} />
                  )}
                  <span>
                    {reccuringeventdetail.label && (
                      <strong>{reccuringeventdetail.label}: </strong>
                    )}
                    {formattedStartDate}
                    • {formattedStartTime}
                    {
                      ` - ${formattedEndTime} `}
                  </span>
                  <span>
                    {reccuringeventdetail.recurring &&
                      ` ${reccuringeventdetail.formattedrecstartDate} - ${reccuringeventdetail.formattedrecendDate}`}{" "}
                  </span>
                </div>
                <Button
                  asChild
                  size="lg"
                  variant={
                    reccuringeventdetail!.type === "link"
                      ? "outline"
                      : "default"
                  }
                  className="rounded-xl px-5 text-base"
                >
                  <Link href={reccuringeventdetail!.link!}>
                    <span className="text-wrap">
                      {reccuringeventdetail!.label}
                    </span>
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
        {event.heroImg && (
          <div className="px-4 w-full">
            <div
              data-tina-field={tinaField(event, "heroImg")}
              className="relative max-w-4xl lg:max-w-5xl mx-auto"
            >
              <Image
                priority={true}
                src={event.heroImg}
                alt={event.title}
                className="absolute block mx-auto rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light"
                aria-hidden="true"
                width={500}
                height={500}
                style={{ maxHeight: "25vh" }}
              />
              <Image
                priority={true}
                src={event.heroImg}
                alt={event.title}
                width={500}
                height={500}
                className="relative z-10 mb-14 mx-auto block rounded-lg w-full h-auto opacity-100"
                style={{ maxWidth: "25vh" }}
              />
            </div>
          </div>
        )}
        <div className="mt-4 text-muted-foreground md:mt-5">
          <TinaMarkdown content={event.description} />
        </div>
        <div
          data-tina-field={tinaField(event, "_body")}
          className="prose dark:prose-dark w-full max-w-none"
        >
          <TinaMarkdown
            content={event._body}
            components={{
              ...components,
            }}
          />
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
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
                  variant={action!.type === "link" ? "outline" : "default"}
                  className="rounded-xl px-5 text-base"
                >
                  <Link href={action!.link!}>
                    {action?.icon && <TinaIcon data={action?.icon} />}
                    <span className="text-nowrap">{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </Section>
    </ErrorBoundary>
  );
}
