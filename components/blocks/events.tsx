import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksEvents } from "@/tina/__generated__/types";
import { Section } from "../layout/Section";
import imageWhiteboard from "@/images/whiteboard.jpg";
import { sectionBlockSchemaField } from '../layout/Section';

export const Events = ({ data }: { data: PageBlocksEvents }) => {
    return (
        <Section  background={data.background!}>
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-medium lg:text-5xl" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
                    <p data-tina-field={tinaField(data, 'description')}>{data.description}</p>
                </div>

                <div className="grid divide-y *:text-center md:grid-cols-3 md:divide-x md:divide-y-0">
                    {data.events?.map((event) => (
                        <div key={event?.type} className="space-y-4 py-4">
                            <div className="text-5xl font-bold" data-tina-field={tinaField(event, 'event')}>{event!.event}</div>
                            <p data-tina-field={tinaField(event, 'type')}>{event!.type}</p>
                        </div>
                    ))}
                </div>
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
            ],
        },
    ],
};