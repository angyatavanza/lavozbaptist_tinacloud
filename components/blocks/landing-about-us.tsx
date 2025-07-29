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
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { Transition } from "motion/react";

//done 7: add text to aboutus in homepage
//done 8: decide if short aboutus or short mission should be on the homepage
//to-do 21: add margins + update the ui of the the AboutUs component to have an image on the left and content on the right


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
    <Section background={data.background!}>
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3.75 mx-6 items-center">
        {/* Image Section */}
        {data.image && (
          <div
            className="col-span-2 md:col-span-6 relative"
            data-tina-field={tinaField(data, "image")}
          >
            <div className="relative h-[490px] w-full">
              {/* Purple background overlay */}
              <div className="absolute inset-0 z-10 rounded-lg bg-primary/20" />
              {/* Image container with padding from edges */}
              <div className="absolute top-5 left-7 right-7 bottom-10 z-20">
                <ImageBlock image={data.image} />
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="col-span-2 md:col-span-6 flex flex-col gap-6">
          {/* Tagline header with line */}
          {data.tagline && (
            <div className="flex items-center gap-[10px]">
              <div data-tina-field={tinaField(data, "tagline")}>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 font-roboto font-semibold text-lg leading-7 text-foreground text-balance"
                >
                  {data.tagline!}
                </TextEffect>
              </div>
              <div className="w-[60px] h-px bg-black/20" />
            </div>
          )}

          {/* Main headline */}
          {data.headline && (
            <div data-tina-field={tinaField(data, "headline")}>
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h2"
                className="mt-8 text-balance font-nunito font-bold text-[40px] leading-[50px] text-foreground max-w-lg"
              >
                {data.headline!}
              </TextEffect>
            </div>
          )}

          {/* Description */}
          {data.description && (
            <div data-tina-field={tinaField(data, "description")}>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-8 max-w-2xl text-balance text-lg"
              >
                {data.description!}
              </TextEffect>
            </div>
          )}

          {/* Actions/Buttons */}
          <AnimatedGroup
            variants={transitionVariants}
            className="mt-6 flex flex-col items-center justify-center gap-2 md:flex-row"
          >
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
                    variant={
                      action!.type === "link" ? "ghost" : "default"
                    }
                    className="rounded-xl px-5 text-base"
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
