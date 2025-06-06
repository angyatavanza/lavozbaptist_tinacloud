"use client";
import React from "react";
import { client } from "@/tina/__generated__/client";
import { PageBlocksLatestevents } from "@/tina/__generated__/types";
import type { Template } from "tinacms";
import { Card } from "@/components/ui/card";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ArrowRight, UserRound } from "lucide-react";
import { Button } from '@/components/ui/button';
import { tinaField } from 'tinacms/dist/react';
import { TinaIcon } from '../icon';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { iconSchema } from "@/tina/fields/icon";
import { Section } from "../layout/section";
import Link from "next/link";
import Image from "next/image";

//done 9a: figure out how to link the 3 latest events in the landing page
//done 9b: fix the url of root page b/c sometimes the latest 3 events load only when the url is without "/home" after it
//done 9c: add eventdate tina field to display in the frontend
//done 9d: add actions as a field of latest events component
//to-do 10a: change layout of event card: date as a bookmark top left, photo centered, event title +event date/time + location undernead photo
//to-do 10b: extract the time from "date" tina field and display in the event card
//to-do 10c: figure out if adding this line of code broke anything : ".filter((block): block is PageBlocks => block !== null". This line was added because "You just need to filter out null or undefined blocks before calling Block"

interface Author {
  name?: string;
  avatar?: string;
}

interface Event {
  id: string;
  title: string;
  date?: string;
  posteddate?: string;
  description?: any;
  location?: any;
  heroImg?: string;
  author?: Author;
  tags?: { tag?: { name?: string } }[];
  _sys: { breadcrumbs: string[] };
}

export const LatestEvents = ({
  data,
  events,
}: {
  data: PageBlocksLatestevents;
  events: Event[];
}) => {
  const limit = Math.min(Math.max(data.limit ?? 3, 1), 10);
  const title = data.title || "Eventos";

  // Filter future or recent events by date and sort descending by date
  const filteredEvents = events
    .filter((e) => e.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, limit);

  return (
    <Section>
      <div className="container flex flex-col items-center gap-16">
        <div className="text-center">
          <h2 className="mx-auto mb-6 text-pretty text-3xl font-semibold md:text-4xl lg:max-w-3xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Manténgase al tanto de lo que está sucediendo en la Iglesia La Voz
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
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
        </div>

        <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {filteredEvents.map((event) => {
            const eventDate = event.date
              ? format(new Date(event.date), "MMM dd, yyyy")
              : "";

            const posted = event.posteddate
              ? format(new Date(event.posteddate), "MMM dd, yyyy")
              : "";

            return (
              <Card
                key={event.id}
                className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
              >
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                  <div className="sm:col-span-5">
                    <div className="mb-4 md:mb-6">
                      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                        {event.tags?.map((tag, i) => (
                          <span key={i}>{tag?.tag?.name}</span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                      <Link
                        href={`/events/${event._sys.breadcrumbs.join("/")}`}
                        className="hover:underline"
                      >
                        {event.title}
                      </Link>
                    </h3>
                    <div className="mt-4 text-muted-foreground md:mt-5">
                      {event.location && (
                        <TinaMarkdown content={event.location} />
                      )}
                    </div>
                    <div className="mt-4 text-muted-foreground md:mt-5">
                      {event.description && (
                        <TinaMarkdown content={event.description} />
                      )}
                    </div>
                    <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                      <Avatar>
                        {event.author?.avatar ? (
                          <AvatarImage
                            src={event.author.avatar}
                            alt={event.author.name || "Author avatar"}
                            className="h-8 w-8"
                          />
                        ) : (
                          <AvatarFallback>
                            <UserRound
                              size={16}
                              strokeWidth={2}
                              className="opacity-60"
                              aria-hidden="true"
                            />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-muted-foreground">
                        {event.author?.name || "Anonymous"}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{eventDate}</span>
                    </div>
                    <div className="mt-6 flex items-center space-x-2 md:mt-8">
                      <Link
                        href={`/events/${event._sys.breadcrumbs.join("/")}`}
                        className="inline-flex items-center font-semibold hover:underline md:text-base"
                      >
                        <span>Ver Evento</span>
                        <ArrowRight className="ml-2 size-4 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {event.heroImg && (
                    <div className="order-first sm:order-last sm:col-span-5">
                      <Link
                        href={`/events/${event._sys.breadcrumbs.join("/")}`}
                        className="block"
                      >
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
            );
          })}
        </div>
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
          icon: true,
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
        iconSchema as any,
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
  ],
};
