"use client";
import * as React from "react";
import Image from "next/image";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import {
  PageBlocksHerocontent,
  PageBlocksHerocontentImage,
} from "@/tina/__generated__/types";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { TextEffect } from "../motion-primitives/text-effect";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";

//to-do 92: extend the width of the div for the Hero content component to be full-width + remove the white looking border around the video + fix the section width of the section background of the blocks when the url goes to /home or /about

export const Herocontent = ({ data }: { data: PageBlocksHerocontent }) => {
  // Extract the background style logic into a more readable format
  let gradientStyle: React.CSSProperties | undefined = undefined;
  if (data.background) {
    const colorName = data.background
      .replace(/\/\d{1,2}$/, "")
      .split("-")
      .slice(1)
      .join("-");
    const opacity = data.background.match(/\/(\d{1,3})$/)?.[1] || "100";

    gradientStyle = {
      "--tw-gradient-to": `color-mix(in oklab, var(--color-${colorName}) ${opacity}%, transparent)`,
    } as React.CSSProperties;
  }

  return (
    <Section background={data.background!}>
      {data.image && (
          <div
            className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20 max-w-full"
            data-tina-field={tinaField(data, "image")}
          >
            <div
              aria-hidden
              className="bg-linear-to-b absolute inset-0 z-10 from-transparent from-35% pointer-events-none"
              style={gradientStyle}
            />
            <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
              <ImageBlock image={data.image} />
              {/* Overlay content */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 py-12 text-white sm:mx-auto lg:mr-auto lg:mt-0">
                {data.tagline && (
                  <div data-tina-field={tinaField(data, "tagline")}>
                    <TextEffect
                      per="line"
                      preset="fade-in-blur"
                      speedSegment={0.3}
                      delay={0.5}
                      as="p"
                      className="font-nunito font-bold mx-auto mt-8 max-w-2xl text-balance text-lg"
                    >
                      {data.tagline!}
                    </TextEffect>
                  </div>
                )}
                {data.headline && (
                  <div data-tina-field={tinaField(data, "headline")}>
                    <TextEffect
                      preset="fade-in-blur"
                      speedSegment={0.3}
                      as="h1"
                      className="font-nunito font-medium mt-8 text-balance text-6xl md:text-7xl xl:text-[5.25rem]"
                    >
                      {data.headline!}
                    </TextEffect>
                  </div>
                )}
              </div>
            </div>
          </div>
      )}
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHerocontentImage }) => {
  if (image.videoUrl) {
    let videoId = "";
    if (image.videoUrl) {
      const embedPrefix = "/embed/";
      const idx = image.videoUrl.indexOf(embedPrefix);
      if (idx !== -1) {
        videoId = image.videoUrl
          .substring(idx + embedPrefix.length)
          .split("?")[0];
      }
    }
    const thumbnailSrc = image.src
      ? image.src!
      : videoId
      ? `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`
      : "";

    return (
      <HeroVideoDialog
        videoSrc={image.videoUrl}
        thumbnailSrc={thumbnailSrc}
        thumbnailAlt="Hero Video"
      />
    );
  }

  if (image.src) {
    return (
      <Image
        className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border max-w-full h-auto"
        alt={image!.alt || ""}
        src={image!.src!}
        height={4000}
        width={3000}
      />
    );
  }
};

export const herocontentBlockSchema: Template = {
  name: "herocontent",
  label: "Herocontent",
  ui: {
    previewSrc: "/blocks/herocontent.png",
    defaultItem: {
      tagline: "HERE'S SOME TEXT ABOVE THE OTHER TEXT",
      headline: "This Big Text is Totally Awesome",
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
