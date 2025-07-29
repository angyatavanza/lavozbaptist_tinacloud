"use client";
import {
  PageBlocksConnections,
  PageBlocksConnectionsItems,
} from "@/tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
//to-do 14: merge placeholder + change layout of each connections card: Image with overlay text of the name, tag, button FRONTEND 

export const Connections = ({ data }: { data: PageBlocksConnections }) => {
  return (
    <Section background={data.background!}>
      <div className="flex w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-32 py-12 lg:py-20 flex-col items-start gap-12 lg:gap-16">
        {/* Header Section */}
        <div className="flex w-full max-w-md flex-col items-start gap-1">
            <h2
              data-tina-field={tinaField(data, "title")}
              className="text-slate-900 font-nunito text-3xl lg:text-5xl font-bold leading-normal"
            >
              {data.title}
            </h2>
            <div
              data-tina-field={tinaField(data, "description")}
              className="text-primary font-roboto text-xl lg:text-2xl font-semibold leading-normal"
            >
              {data.description}
            </div>
          </div>
  
          {/* Connection Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3.75 mx-6 relative">
            {data.items &&
              data.items.map(function (block, i) {
                return <Connection key={i} {...block!} />;
              })}
          </div>
        </div>
      </Section>
    );
  };

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]" />
    <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75%" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
  </div>
)

export const Connection: React.FC<PageBlocksConnectionsItems> = (data) => {
    return (
      <Card className="col-span-2 md:col-span-4 bg-white border border-grey-0 p-3 md:p-4 flex flex-col gap-3 md:gap-4 group hover:shadow-lg transition-shadow group">
        {/* Image Container with hover buttons */}
        <CardHeader className="relative w-full h-64 lg:h-80 bg-pink-200 p-0 overflow-hidden group">
          {data.cover && (
            <>
              <Image
                data-tina-field={tinaField(data, "cover")}
                src={data.cover}
                alt={data.title || ""}
                fill
                className="w-full h-full object-cover"
              />
              {/* Separate overlay that appears on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 group-hover:bg-accent transition-opacity duration-300 pointer-events-none" />
            </>
          )}
  
          {/* Hover overlay with buttons */}
          {data.actions && data.actions.length > 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex flex-col gap-2 px-4">
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
                        variant={action!.type === "link" ? "ghost" : "default"}
                        className="rounded-xl px-5 text-base"
                      >
                        <Link href={action!.link!}>
                          <span className="text-nowrap">{action!.label}</span>
                        </Link>
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardHeader>
  
        {/* Text Overlay - Show for all cards */}
        <CardContent className="flex px-4 py-3 items-center relative w-full z-20 -mt-10">
         
          {/* Content */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 md:gap-3">
                <h3  data-tina-field={tinaField(data, "title")} className="font-nunito font-bold  text-xl md:text-2xl text-grey-900 leading-normal">
                  {data.title}
                </h3>
                <div className="text-sm md:text-base text-grey-500 leading-[1.5] leading-normal">
              <TinaMarkdown
                data-tina-field={tinaField(data, "text")}
                content={data.text}
              />
            </div>
              </div>

              {/* Button */}
              <div className="flex flex-col gap-1">
                <button className="flex items-center gap-1 text-primary font-nunito font-bold  text-sm md:text-base group-hover:gap-2 transition-all">
                  Ver ahora
                  <ArrowRight className="w-4 h-4" />
                </button>
                
              </div>
            </div>
        </CardContent>
      </Card>
    );
};

const defaultConnection = {
  title: "Here's Another Connection",
  text: "This is where you might talk about the connection, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: "",
  },
};

export const connectionBlockSchema: Template = {
  name: "connections",
  label: "Connections",
  ui: {
    previewSrc: "/blocks/connections.png",
    defaultItem: {
      title: 'Built to cover your needs',
      description: 'We have a lot of connections to cover your needs',
      items: [defaultConnection, defaultConnection, defaultConnection],
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
      label: "Connection Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultConnection,
        },
      },
      fields: [
        //iconSchema as any,
        {
          type: "image",
          label: "CoverImg",
          name: "cover",
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
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
    },
  ],
};
