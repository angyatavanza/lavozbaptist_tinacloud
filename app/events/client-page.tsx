"use client";
import React from "react";
import { es } from "date-fns/locale";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  EventConnectionQuery,
  EventConnectionQueryVariables,
} from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";
import { ArrowRight, UserRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/layout/section";
import { tinaField } from "tinacms/dist/react";
import { TinaIcon } from "@/components/ui/icon";
import { PageIntro } from "@/components/layout/page-intro";

//done 35a: create events page tina collection
//done 35b: add more sections to events template such as date, time, details,
//done 46: add reccuringeventdetails and locationdetails and data.actions [add link to a form] to events page
//to-do 47: edit ui of the individual event page
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
    const end= new Date(event.endtime!);
    let formattedStartDate = '';
    let formattedStartTime = '';
    let formattedEndTime = '';
    if (!isNaN(start.getTime())) {
      formattedStartDate = format(start, 'MMM dd', { locale: es });
      formattedStartTime = format(start, 'h:mm a').toLowerCase();
    }
    if (!isNaN(end.getTime())) {
      formattedEndTime = format(end, 'h:mm a').toLowerCase();
    }
                  
    return {
      id: event.id,
      published: formattedStartDate,
      publishedtime: formattedStartTime,
      publishedendtime: formattedEndTime,
      icon: event.icon || null,
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
              ? format(start, "EEEE h:mm a").toLowerCase()
              : "",
            recenddate: reccuringeventdetail?.recenddate || "",
            formattedrecendDate: !isNaN(end.getTime())
              ? format(end, "MMM dd", { locale: es })
              : "",
            formattedrecendTime: !isNaN(end.getTime())
              ? format(end, "h:mm a").toLowerCase()
              : "",
            label: reccuringeventdetail?.label || "",
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
  console.log("EVENTS", events.map((e) => ({
    title: e.title,
    recurringDetails: e.reccuringeventdetails
  })));
  const recurringEvents = events.filter((event) =>
    event.reccuringeventdetails &&
    event.reccuringeventdetails.some((d) => d?.recurring === true)
  );

  const nonRecurringEvents = events.filter(
    (event) =>
      !event.reccuringeventdetails || // no recurring details at all
      !event.reccuringeventdetails.some((d) => d?.recurring === true) // none marked as recurring
  );

  return (
    <ErrorBoundary>
      <PageIntro eyebrow="Eventos" title="Eventos Recientes">
        <p>Eventos</p>
      </PageIntro>
      <Section>
        <div className="container flex flex-col items-center gap-16">
          <div className="text-center">
            <h2 className="mx-auto mb-6 text-pretty text-3xl font-nunito font-medium md:text-4xl lg:max-w-3xl">
              Eventos
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              Manténgase al tanto de lo que está sucediendo en la Iglesia La Voz
            </p>
          </div>

          <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
            {recurringEvents.map((event) => (
              <Card
                key={event.id}
                className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
              >
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                  <div className="sm:col-span-5">
                    <div className="mb-4 md:mb-6">
                      {event.published}
                      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                        {event.tags?.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-nunito font-medium md:text-2xl lg:text-3xl">
                      <Link href={event.url} className="hover:underline">
                        {event.title}
                      </Link>
                    </h3>
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                      {event.reccuringeventdetails &&
                        event.reccuringeventdetails.map((reccuringeventdetail) => (
                          <div
                            key={reccuringeventdetail!.label}
                            data-tina-field={tinaField(reccuringeventdetail)}
                            className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                          >
                            {reccuringeventdetail?.icon && (
                              <TinaIcon data={reccuringeventdetail?.icon} />
                            )}
                            <span>
                              {` Recurring At: ${reccuringeventdetail.formattedrecstartDate} - ${reccuringeventdetail.formattedrecendDate}`}
                            </span>
                            <span>
                              {` Recurring At: ${reccuringeventdetail.formattedrecstartTime} - ${reccuringeventdetail.formattedrecendTime}`}
                            </span>
                            <Button
                              asChild
                              size="lg"
                              variant={
                                reccuringeventdetail!.type === "link"
                                  ? "ghost"
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
                                locationdetail!.type === "link"
                                  ? "ghost"
                                  : "default"
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
                              </Link>
                            </Button>
                          </div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center space-x-2 md:mt-8">
                      <Link
                        href={event.url}
                        className="inline-flex items-center font-medium hover:underline md:text-base"
                      >
                        <span>Ver Evento</span>
                        <ArrowRight className="ml-2 size-4 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  {event.heroImg && (
                    <div className="order-first sm:order-last sm:col-span-5">
                      <Link href={event.url} className="block">
                        <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                          <Image
                            width={533}
                            height={300}
                            src={event.heroImg}
                            alt={event.title}
                            className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                          />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            ))}
            {nonRecurringEvents.map((event) => (
              <Card
                key={event.id}
                className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
              >
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                  <div className="sm:col-span-5">
                    <div className="mb-4 md:mb-6">
                      {event.published}
                      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                        {event.tags?.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-nunito font-medium md:text-2xl lg:text-3xl">
                      <Link href={event.url} className="hover:underline">
                        {event.title}
                      </Link>
                    </h3>
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                      {event.icon && (
                        <TinaIcon data={event?.icon} />
                      )}
                     <span>{event.publishedtime}</span>
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
                                locationdetail!.type === "link"
                                  ? "ghost"
                                  : "default"
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
                              </Link>
                            </Button>
                          </div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center space-x-2 md:mt-8">
                      <Link
                        href={event.url}
                        className="inline-flex items-center font-medium hover:underline md:text-base"
                      >
                        <span>Ver Evento</span>
                        <ArrowRight className="ml-2 size-4 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  {event.heroImg && (
                    <div className="order-first sm:order-last sm:col-span-5">
                      <Link href={event.url} className="block">
                        <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                          <Image
                            width={533}
                            height={300}
                            src={event.heroImg}
                            alt={event.title}
                            className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                          />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </ErrorBoundary>
  );
}
