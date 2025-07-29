"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Template } from "tinacms";
import { Container } from "@/components/layout/container";
import { StatList, StatListItem } from "@/components/ui/stat-list";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  PageBlocksAboutsectionsinfo, PageBlocksAboutsectionsinfoItems
} from "@/tina/__generated__/types";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/layout/page-intro";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { AnimatedGroup } from "../motion-primitives/animated-group";
import { TextEffect } from "../motion-primitives/text-effect";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { Transition } from 'motion/react';

//done 27: merge aboutsection component --currently there are 2 descriptions
//to-do 22: change image to be to the left of the div FRONTEND
//to-do 25: update the ui of the aboutsection block component in the /about page FRONTEND

export const Aboutsectionsinfo = ({ data }: { data: PageBlocksAboutsectionsinfo }) => {
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

        {/* 12 Column Grid 3 Cards 4 Columns */}
        <div className="w-full px-4 md:px-8 lg:px-[120px]">
            <div className="grid grid-cols-2 md:grid-cols-12 gap-3.75 mx-6 w-full">
              {data.items &&
                data.items.map(function (block, i) {
                  return <Aboutsection key={i} {...block!} />;
                })}
            </div>
        </div>
      </div>
    </Section>
  );
};

export const Aboutsection: React.FC<PageBlocksAboutsectionsinfoItems> = (data) => {
  return (
    <Card className="col-span-2 md:col-span-4 flex items-center gap-4 p-5 border-[#D9DADB] bg-white">
      {/* Image Container with hover buttons */}
      <CardHeader className="relative w-full h-64 lg:h-80 bg-pink-200 p-0 overflow-hidden group">
        {data.cover && (
          <>
            <Image
              data-tina-field={tinaField(data, "cover")}
              src={data.cover}
              alt={data.title || ""}
              fill
              className="object-cover object-center"
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
      <CardContent className="flex px-4 py-3 items-center bg-card relative w-full z-20 -mt-10">
        <div className="flex w-full flex-col items-start gap-1">
          <h2
            data-tina-field={tinaField(data, "title")}
            className="text-slate-50 font-nunito text-lg lg:text-2xl font-semibold leading-normal"
          >
            {data.title}
          </h2>
          <div className="text-gray-300 font-roboto text-base lg:text-xl font-medium leading-normal">
            <TinaMarkdown
              data-tina-field={tinaField(data, "text")}
              content={data.text}
            />
          </div>
        </div>
      </CardContent>
    </Card>
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
      title: "Grupos",
      description:
        "En La Iglesia La Voz, hay algo para todos. Ofrecemos los siguientes Ministerios: Varones, Mujeres, Jovenes, y Niños",
      items: [defaultAboutsectioninfo, defaultAboutsectioninfo, defaultAboutsectioninfo],
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