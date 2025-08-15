"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import {
  PageBlocksAboutus,
  PageBlocksAboutusImage,
} from "@/tina/__generated__/types";
import { Button } from "@/components/ui/button";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { AnimatedGroup } from "../motion-primitives/animated-group";
import { TextEffect } from "../motion-primitives/text-effect";
import { Transition } from "motion/react";

const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      } as Transition,
    },
  },
};

export const AboutUs = ({ data }: { data: PageBlocksAboutus }) => {
  return (
    <Section background={data.background!} className="mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 py-10 md:py-15 items-center">
        {/* Image Section */}
        {data.image && (
          <div
            className="col-span-2 md:col-span-6 relative"
            data-tina-field={tinaField(data, "image")}
          >
            <div className="relative h-[490px] w-full">
              {/* Image container with padding from edges */}
              <div className="absolute top-5 left-6 right-6 bottom-5 z-20">
                <ImageBlock image={data.image} />
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="col-span-2 md:col-span-6 flex flex-col gap-5">
          {/* Tagline header (Body 02 in QBDS Web+Responsive 16/24 BDM) */}
          {data.tagline && (
            <div data-tina-field={tinaField(data, "tagline")}>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="font-nunito font-medium text-balance text-left text-base leading-[24px] text-primary uppercase mx-auto"
              >
                {data.tagline!}
              </TextEffect>
            </div>
          )}

          {/* Main headline (mb-5 + gap-5 makes 40 px / Headline 01 in QBDS Web 48/60 B + Responsive 34/44 B)*/}
          {data.headline && (
            <div data-tina-field={tinaField(data, "headline")}>
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h2"
                className="font-nunito font-semibold text-balance text-left text-[34px] leading-[44px] md:text-5xl md:leading-[60px] text-foreground md:mb-5 max-w-lg"
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
                className="font-normal text-balance text-left text-base leading-[24px] md:text-xl md:leading-[28px] max-w-md"
              >
                {data.description!}
              </TextEffect>
            </div>
          )}

          {/* Actions/Buttons */}
          <AnimatedGroup
            variants={transitionVariants}
            className="flex flex-wrap gap-5"
          >
            {data.actions &&
              data.actions.map((action) => (
                <div
                  key={action!.label}
                  data-tina-field={tinaField(action)}
                  className="bg-foreground/10 rounded-[calc(var(--radius-sm)+0.125rem)] border p-0.5"
                >
                  <Button
                    asChild
                    size="default"
                    variant={action!.type === "link" ? "outline" : "default"}
                    className=""
                  >
                    <Link href={action!.link!}>
                      <span className="text-nowrap">{action!.label}</span>
                    </Link>
                  </Button>
                </div>
              ))}
          </AnimatedGroup>
        </div>
      </div>
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksAboutusImage }) => {
  if (image.src) {
    return (
      <Image
        className="w-full h-full object-cover rounded-lg"
        alt={image!.alt || ""}
        src={image!.src!}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    );
  }

  return null;
};

export const aboutusBlockSchema: Template = {
  name: "aboutus",
  label: "Aboutus",
  ui: {
    previewSrc: "/blocks/aboutus.png",
    defaultItem: {
      tagline: "HERE'S SOME TEXT ABOVE THE OTHER TEXT",
      headline: "This Big Text is Totally Awesome",
      description: "This Desc is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
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
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description:
            "If using a YouTube video, make sure to use the embed version of the video URL",
        },
      ],
    },
  ],
};
