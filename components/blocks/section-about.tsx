"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Template } from "tinacms";
import { Card2, CardHeader2 } from "@/components/ui/card";
import { tinaField } from "tinacms/dist/react";
import {
  PageBlocksAboutsectionsinfo,
  PageBlocksAboutsectionsinfoItems,
} from "@/tina/__generated__/types";
import { Button } from "@/components/ui/button";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";

export const Aboutsectionsinfo = ({
  data,
}: {
  data: PageBlocksAboutsectionsinfo;
}) => {
  return (
    <Section background={data.background!} className="mx-auto">
      <div className="flex w-full mx-auto px-4 md:px-5 py-10 md:py-15 lg:py-20 flex-col items-center gap-5 lg:gap-5">
        {/* Header Section */}
        <div className="flex w-full max-w-none flex-col items-center text-center gap-5 mx-auto">
          <h2
            data-tina-field={tinaField(data, "headline")}
            className="font-nunito font-semibold text-pretty text-center text-[34px] leading-[44px] md:text-5xl md:leading-[60px] text-foreground md:mb-5 max-w-lg"
          >
            {data.headline}
          </h2>
          <div
            data-tina-field={tinaField(data, "description")}
            className="font-medium text-balance text-center text-sm leading-[20px] text-foreground"
          >
            {data.description}
          </div>
        </div>

        {/* 12 Column Grid 3 Cards 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 w-full">
          {data.items &&
            data.items.map(function (block, i) {
              return <Aboutsection key={i} {...block!} />;
            })}
        </div>
      </div>
    </Section>
  );
};

export const Aboutsection: React.FC<PageBlocksAboutsectionsinfoItems> = (
  data
) => {
  return (
    <Card2 className="border border-grey-0 flex flex-col col-span-2 md:col-span-4 text-primary-foreground">
      {/* Image Container with hover buttons */}
      <CardHeader2 className="relative w-full h-64 lg:h-80 p-0 overflow-hidden group rounded-xl">
        {data.cover && (
          <>
            <Image
              data-tina-field={tinaField(data, "cover")}
              src={data.cover}
              alt={data.title || ""}
              fill
              className="object-cover object-center"
            />
            {/* Bottom gradient for readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/10 to-transparent z-10" />
            {/* Title aligned bottom-left (moves up on hover to avoid overlap with actions) */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-start p-4 md:p-6 translate-y-0 group-hover:-translate-y-8 md:group-hover:-translate-y-10 transition-transform duration-300 ease-out pointer-events-none">
              <h4
                data-tina-field={tinaField(data, "title")}
                className="font-nunito font-medium text-[24px] leading-[32px] md:text-[28px] md:leading-[36px] text-primary-foreground drop-shadow-md"
              >
                {data.title}
              </h4>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 group-hover:bg-accent transition-opacity duration-300 pointer-events-none" />
          </>
        )}

        {/* Hover overlay with buttons */}
        {data.actions && data.actions.length > 0 && (
          <div className="absolute inset-0 z-30 bg-background/35 dark:bg-zinc-900/35 backdrop-blur-[2px] ring-1 ring-border/20 flex items-end justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="flex flex-row gap-3 p-4 md:p-6">
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
                      size="sm"
                      variant={action!.type === "link" ? "ghost" : "secondary"}
                      className=""
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
      </CardHeader2>
    </Card2>
  );
};

const defaultAboutsectioninfo = {
  title: "Aquí hay otro grupo",
  text: "Aquí puedes proveer más información sobre un grupo.",
  icon: {
    color: "",
    style: "float",
    name: "",
  },
};

export const aboutsectioninfoBlockSchema: Template = {
  name: "aboutsectionsinfo",
  label: "Aboutsectionsinfo",
  ui: {
    previewSrc: "/blocks/aboutsectionsinfo.png",
    defaultItem: {
      headline: "Grupos",
      description:
        "En La Iglesia La Voz, hay algo para todos. Ofrecemos los siguientes Ministerios: Varones, Mujeres, Jovenes, y Niños",
      items: [
          { ...defaultAboutsectioninfo, icon: { ...defaultAboutsectioninfo.icon } },
          { ...defaultAboutsectioninfo, icon: { ...defaultAboutsectioninfo.icon } },
          { ...defaultAboutsectioninfo, icon: { ...defaultAboutsectioninfo.icon } },
      ],
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
      label: "Description",
      name: "description",
    },
    {
      type: "object",
      label: "Aboutsection Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultAboutsectioninfo,
        },
      },
      fields: [
        //iconField as any,
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