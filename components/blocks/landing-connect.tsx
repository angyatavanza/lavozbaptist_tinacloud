"use client";
import {
  PageBlocksConnections,
  PageBlocksConnectionsItems,
} from "@/tina/__generated__/types";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeader2,
  CardTitle,
} from "@/components/ui/card";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TextEffect } from "../motion-primitives/text-effect";
import Image from "next/image";

export const Connections = ({ data }: { data: PageBlocksConnections }) => {
  return (
    <Section background={data.background!} className="mx-auto">
      <div className="flex flex-col w-full mx-auto px-4 md:px-5 py-10 md:py-15 lg:py-20 items-center gap-5 lg:gap-5">
        {/* Header Section */}
        <div className="flex w-full max-w-none flex-col items-center text-center gap-5 mx-auto">
          {/* Tagline header (Body 02 in QBDS Web+Responsive 16/24 BDM) */}
          {data.tagline && (
            <div data-tina-field={tinaField(data, "tagline")}>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="font-nunito font-medium text-balance text-center text-base leading-[24px] text-primary-magenta1 uppercase mx-auto "
              >
                {data.tagline!}
              </TextEffect>
            </div>
          )}

          {/* Main headline (Headline 01 in QBDS Web 48/60 B + Responsive 34/44 B)*/}
          {data.headline && (
            <div data-tina-field={tinaField(data, "headline")}>
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h2"
                className="font-nunito font-semibold text-balance text-center text-[34px] leading-[44px] md:text-5xl md:leading-[60px] text-foreground max-w-xl"
              >
                {data.headline!}
              </TextEffect>
            </div>
          )}

          {/* Description (Body 01 in QBDS Web 20/28 MR + Responsive 16/24 MR)*/}
          {data.description && (
            <div data-tina-field={tinaField(data, "description")}>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="font-normal text-balance text-center text-base leading-[24px] md:text-xl md:leading-[28px] max-w-lg"
              >
                {data.description!}
              </TextEffect>
            </div>
          )}
        </div>

        {/* Connection Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 w-full">
          {data.items &&
            data.items.map(function (block, i) {
              return <Connection key={i} {...block!} />;
            })}
        </div>
      </div>
    </Section>
  );
};

export const Connection: React.FC<PageBlocksConnectionsItems> = (data) => {
  return (
    <Card className="border border-grey-0 flex flex-col col-span-2 md:col-span-4 text-card-foreground">
      {/* Image Container with hover buttons */}
      <CardHeader2 className="relative w-full h-64 lg:h-80 overflow-hidden group rounded-xl px-2 md:px-5">
        {data.cover && (
          <>
            <Image
              data-tina-field={tinaField(data, "cover")}
              src={data.cover}
              alt={data.title || ""}
              fill
              className="object-cover object-center"
            />
          </>
        )}
      </CardHeader2>
      <CardHeader className="items-center justify-items-center text-center">
        <CardTitle data-tina-field={tinaField(data, "title")}>
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center text-center relative w-full">
        {/* Content */}
        <CardDescription>
          <TinaMarkdown
            data-tina-field={tinaField(data, "text")}
            content={data.text}
          />
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-center">
        {/* Button */}
        <CardAction className="self-center">
          {/* buttons */}
          {data.actions && data.actions.length > 0 && (
            <div className="flex flex-col items-center justify-center gap-5 md:gap-5 md:flex-row">
              {data.actions &&
                data.actions.map((action, idx) => (
                  <div
                    key={action!.label}
                    data-tina-field={tinaField(action)}
                    className="bg-foreground/10 rounded-[calc(var(--radius-sm)+0.125rem)] border p-0.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out"
                    style={{ transitionDelay: `${idx * 60}ms` }}
                  >
                    <Button
                      asChild
                      size="default"
                      variant={action!.type === "link" ? "ghost" : "default"}
                      className=""
                    >
                      <Link href={action!.link!}>
                        <span className="text-nowrap">{action!.label}</span>
                      </Link>
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </CardAction>
      </CardFooter>
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
      title: "Built to cover your needs",
      description: "We have a lot of connections to cover your needs",
      items: [defaultConnection, defaultConnection, defaultConnection],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
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
