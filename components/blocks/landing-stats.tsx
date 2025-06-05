import React from "react";
import type { Template } from "tinacms";
import Link from 'next/link'
import { tinaField } from "tinacms/dist/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { iconSchema } from '@/tina/fields/icon';
import { TinaIcon } from '../icon';
import { Button } from '@/components/ui/button'
import { PageBlocksStats } from "@/tina/__generated__/types";
import { Section } from "../layout/section";
import imageWhiteboard from "@/images/whiteboard.jpg";
import { sectionBlockSchemaField } from '../layout/section';

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]" />
    <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75%" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
  </div>
)

export const Stats = ({ data }: { data: PageBlocksStats }) => {
    return (
        <Section  background={data.background!}>
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-medium lg:text-5xl" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
                    <p data-tina-field={tinaField(data, 'description')}>{data.description}</p>
                </div>
                <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
                    {data.stats?.map((stat) => (
                        <div key={stat?.type} className="space-y-4 py-4">
                            <div className="text-5xl font-bold" data-tina-field={tinaField(stat, 'stat')}>{stat!.stat}</div>
                            <p data-tina-field={tinaField(stat, 'type')}>{stat!.type}</p>
                            <div className="group shadow-zinc-950/5">
                                  <CardHeader className="pb-3">
                                    <CardDecorator>
                                      {stat!.cover && (
                                        <Avatar className="size-9" data-tina-field={tinaField(stat, 'cover')}>
                                          {stat!.cover && (
                                            <AvatarImage alt={stat!.stat!} src={stat!.cover} loading="lazy" width="120" height="120" />
                                          )}
                                          <AvatarFallback>{stat!.stat!.split(" ").map((word) => word[0]).join("")}</AvatarFallback>
                                        </Avatar>
                                      )}
                                    </CardDecorator>
                            
                                    <h3
                                      data-tina-field={tinaField(stat, 'stat')}
                                      className="mt-6 font-medium"
                                    >
                                      {stat!.stat}
                                    </h3>
                                  </CardHeader>
                                </div>
                        </div>
                    ))}
                </Card>
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    {data.actions && data.actions.map(action => (
                        <div
                            key={action!.label}
                            data-tina-field={tinaField(action)}
                            className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                            <Button
                                asChild
                                size="lg"
                                variant={action!.type === 'link' ? 'ghost' : 'default'}
                                className="rounded-xl px-5 text-base">
                                <Link href={action!.link!}>
                                    {action?.icon && (<TinaIcon data={action?.icon} />)}
                                    <span className="text-nowrap">{action!.label}</span>
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export const statsBlockSchema: Template = {
    name: "stats",
    label: "Stats",
    ui: {
        previewSrc: "/blocks/stats.png",
        defaultItem: {
            title: "TinaCMS by the numbers",
            description: "TinaCMS is an open-source content management system that allows developers to create and manage content for their websites and applications. It provides a flexible and customizable framework for building content-driven applications.",
            stats: [
                {
                    stat: "12K",
                    type: "Stars on GitHub",
                },
                {
                    stat: "11K",
                    type: "Active Users",
                },
                {
                    stat: "22K",
                    type: "Powered Apps",
                },
            ],
            actions: [
                {
                    label: 'Get Started',
                    type: 'button',
                    link: '/',
                },
                {
                    label: 'Book Demo',
                    type: 'link',
                    link: '/',
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
            label: "Stats",
            name: "stats",
            list: true,
            ui: {
                defaultItem: {
                    stat: "12K",
                    type: "Stars on GitHub",
                },
                itemProps: (item) => {
                    return {
                        label: `${item.stat} ${item.type}`,
                    };
                },
            },
            fields: [
                {
                    type: "string",
                    label: "Stat",
                    name: "stat",
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
        {
            label: 'Actions',
            name: 'actions',
            type: 'object',
            list: true,
            ui: {
                defaultItem: {
                    label: 'Action Label',
                    type: 'button',
                    icon: true,
                    link: '/',
                },
                itemProps: (item) => ({ label: item.label }),
            },
            fields: [
                {
                    label: 'Label',
                    name: 'label',
                    type: 'string',
                },
                {
                    label: 'Type',
                    name: 'type',
                    type: 'string',
                    options: [
                        { label: 'Button', value: 'button' },
                        { label: 'Link', value: 'link' },
                    ],
                },
                iconSchema as any,
                {
                    label: 'Link',
                    name: 'link',
                    type: 'string',
                },
            ],
        },
    ],
};