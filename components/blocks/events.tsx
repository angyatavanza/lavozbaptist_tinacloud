import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { PageBlocksEvents } from "@/tina/__generated__/types";
import { Section } from "../layout/Section";
import imageWhiteboard from "@/images/whiteboard.jpg";
import { sectionBlockSchemaField } from '../layout/Section';

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]" />
    <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75%" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
  </div>
)

export const Events = ({ data }: { data: PageBlocksEvents }) => {
    return (
        <Section  background={data.background!}>
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-medium lg:text-5xl" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
                    <p data-tina-field={tinaField(data, 'description')}>{data.description}</p>
                </div>
                <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
                    {data.events?.map((event) => (
                        <div key={event?.type} className="space-y-4 py-4">
                            <div className="text-5xl font-bold" data-tina-field={tinaField(event, 'event')}>{event!.event}</div>
                            <p data-tina-field={tinaField(event, 'type')}>{event!.type}</p>
                            <div className="group shadow-zinc-950/5">
                                  <CardHeader className="pb-3">
                                    <CardDecorator>
                                      {event!.cover && (
                                        <Avatar className="size-9" data-tina-field={tinaField(event, 'cover')}>
                                          {event!.cover && (
                                            <AvatarImage alt={event!.event!} src={event!.cover} loading="lazy" width="120" height="120" />
                                          )}
                                          <AvatarFallback>{event!.event!.split(" ").map((word) => word[0]).join("")}</AvatarFallback>
                                        </Avatar>
                                      )}
                                    </CardDecorator>
                            
                                    <h3
                                      data-tina-field={tinaField(event, 'event')}
                                      className="mt-6 font-medium"
                                    >
                                      {event!.event}
                                    </h3>
                                  </CardHeader>
                                </div>
                        </div>
                    ))}
                </Card>
            </div>
        </Section>
    )
}

export const eventsBlockSchema: Template = {
    name: "events",
    label: "Events",
    ui: {
        previewSrc: "/blocks/events.png",
        defaultItem: {
            title: "TinaCMS by the numbers",
            description: "TinaCMS is an open-source content management system that allows developers to create and manage content for their websites and applications. It provides a flexible and customizable framework for building content-driven applications.",
            events: [
                {
                    event: "12K",
                    type: "Stars on GitHub",
                },
                {
                    event: "11K",
                    type: "Active Users",
                },
                {
                    event: "22K",
                    type: "Powered Apps",
                },
            ],
        },
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: "string",
            label: "Title",
            name: "title",
        },
        {
            type: "string",
            label: "Description",
            name: "description",
        },
        {
            type: "object",
            label: "Events",
            name: "events",
            list: true,
            ui: {
                defaultItem: {
                    event: "12K",
                    type: "Stars on GitHub",
                },
                itemProps: (item) => {
                    return {
                        label: `${item.event} ${item.type}`,
                    };
                },
            },
            fields: [
                {
                    type: "string",
                    label: "Event",
                    name: "event",
                },
                {
                    type: "string",
                    label: "Type",
                    name: "type",
                },
                {
                    type: "image",
                    label: "CoverImg",
                    name: "cover",
                }
            ],
        },
    ],
};