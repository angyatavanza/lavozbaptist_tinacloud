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
    <Section background={data.background!} className="pt-15 mx-auto">
      {data.image && (
        <div
          className="relative overflow-hidden"
          data-tina-field={tinaField(data, "image")}
        >
          <div
            aria-hidden
            className="bg-linear-to-b absolute inset-0 z-10 from-transparent from-35% pointer-events-none"
            style={gradientStyle}
          />
          <ImageBlock image={data.image} />
          {/* Overlay content with grid system */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-4 md:px-18">
            <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-12 gap-5">
              <div className="col-span-2 md:col-span-10 lg:col-span-8 md:col-start-2 lg:col-start-3 flex flex-col items-start text-left gap-5 md:gap-5">
                {data.tagline && (
                  <div data-tina-field={tinaField(data, "tagline")}>
                    <TextEffect
                      per="line"
                      preset="fade-in-blur"
                      speedSegment={0.3}
                      delay={0.5}
                      as="p"
                      className="font-nunito font-medium text-balance text-left text-base leading-[24px] text-white uppercase mx-auto mt-6"
                    >
                      {data.tagline!}
                    </TextEffect>
                  </div>
                )}
                {data.headline && (
                  <div
                    data-tina-field={tinaField(data, "headline")}
                    className="mb-0 md:mb-6"
                  >
                    <TextEffect
                      preset="fade-in-blur"
                      speedSegment={0.3}
                      as="h1"
                      className="lg:block text-left font-nunito font-semibold text-white text-[40px] leading-[52px] md:text-6xl md:leading-[76px]"
                    >
                      {data.headline!}
                    </TextEffect>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHerocontentImage }) => {
if (image.videoUrl) {
    return <HeroVideoDialog videoSrc={image.videoUrl} />;
  }

  if (image.src) {
    return (
      <div className="relative w-full h-auto aspect-[4/5] md:aspect-square lg:aspect-[18/6] md:h-auto overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          alt={image!.alt || ""}
          src={image!.src!}
          height={4000}
          width={3000}
        />
      </div>
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
