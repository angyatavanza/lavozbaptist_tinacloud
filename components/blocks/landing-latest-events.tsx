"use client";
import React from "react";
import { client } from "@/tina/__generated__/client";
import {
  PageBlocksLatestevents,
} from "@/tina/__generated__/types";
import type { Template } from "tinacms";
import { Card } from "@/components/ui/card";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ArrowRight, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Section } from "../layout/section";
import Link from "next/link";
import Image from "next/image";

//done 9a: figure out how to link the 3 latest events in the landing page
//done 9b: fix the url of root page b/c sometimes the latest 3 events load only when the url is without "/home" after it
//to-do 9c: add event date tina field to display in the frontend
//to-do 9d?: add actions and addressurl to props of latest events ?
//to-do 10: change layout of event photo
//to-do 10a: figure out if adding this line of code broke anything : ".filter((block): block is PageBlocks => block !== null". This line was added because "You just need to filter out null or undefined blocks before calling Block"


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
    .sort(
      (a, b) =>
        new Date(b.date!).getTime() - new Date(a.date!).getTime()
    )
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
                      <Link href={`/events/${event._sys.breadcrumbs.join("/")}`} className="hover:underline">
                        {event.title}
                      </Link>
                    </h3>
                    <div className="mt-4 text-muted-foreground md:mt-5">
                      {event.location && <TinaMarkdown content={event.location} />}
                    </div>
                    <div className="mt-4 text-muted-foreground md:mt-5">
                      {event.description && <TinaMarkdown content={event.description} />}
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
                      <span className="text-muted-foreground">{event.author?.name || "Anonymous"}</span>
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
                      <Link href={`/events/${event._sys.breadcrumbs.join("/")}`} className="block">
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
}

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
  ],
};
