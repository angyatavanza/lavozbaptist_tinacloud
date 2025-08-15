"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import {
  PageBlocksHero,
  PageBlocksHeroImage,
} from "@/tina/__generated__/types";
import { Button } from "@/components/ui/button";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { AnimatedGroup } from "../motion-primitives/animated-group";
import { TextEffect } from "../motion-primitives/text-effect";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
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

export const Hero = ({ data }: { data: PageBlocksHero }) => {
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
          <div className="absolute inset-0 z-20 flex items-center justify-start px-4 md:px-18">
            <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-12 gap-5">
              <div className="col-span-2 md:col-span-8 md:col-start-3 flex flex-col items-start text-left gap-5 md:gap-5">
                {data.tagline && (
                  <div data-tina-field={tinaField(data, "tagline")} className="hidden md:block">
                    <TextEffect
                      per="line"
                      preset="fade-in-blur"
                      speedSegment={0.3}
                      delay={0.5}
                      as="p"
                      className="font-nunito font-medium text-balance text-left text-base leading-[24px] text-white/60 uppercase mx-0 mt-6"
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
                      className="font-nunito font-semibold text-white text-[40px] leading-[52px] md:text-6xl md:leading-[76px]"
                    >
                      {data.headline!}
                    </TextEffect>
                  </div>
                )}
                <AnimatedGroup
                  variants={transitionVariants}
                  className="flex flex-row items-start justify-start gap-3 md:gap-5"
                >
                  {data.actions &&
                    data.actions.map((action) => (
                      <div
                        key={action!.label}
                        data-tina-field={tinaField(action)}
                        className="bg-foreground/10 rounded-[calc(var(--radius-sm)+0.125rem)] border"
                      >
                        <Button
                          asChild
                          size="lg"
                          variant={
                            action!.type === "link" ? "outline" : "default"
                          }
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
          </div>
        </div>
      )}
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHeroImage }) => {
  if (image.videoUrl) {
    return <HeroVideoDialog videoSrc={image.videoUrl} />;
  }

  if (image.src) {
    return (
      <Image
        className="w-full h-full object-cover"
        alt={image!.alt || ""}
        src={image!.src!}
        height={4000}
        width={3000}
      />
    );
  }
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
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
