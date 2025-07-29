"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import {
  PageBlocksHerodonation,
  PageBlocksHerodonationImage,
} from "@/tina/__generated__/types";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { AnimatedGroup } from "../motion-primitives/animated-group";
import { TextEffect } from "../motion-primitives/text-effect";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { Transition } from "motion/react";

//done 52: add paypal button to donations page TINA CMS/BACKEND
//done 98: extend the width of the div for the Hero donation component to be full-width + remove the white looking border around the video + fix the section width of the section background of the blocks when the url goes to /home or /about

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

export const Herodonation = ({ data }: { data: PageBlocksHerodonation }) => {
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
    <Section background={data.background!} className="py-6 pt-9">
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
            <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-12 gap-3.75">
              <div className="col-span-2 md:col-span-10 lg:col-span-8 md:col-start-2 lg:col-start-3 flex flex-col items-start text-left gap-1 md:gap-2">
                {data.tagline && (
                  <div data-tina-field={tinaField(data, "tagline")}>
                    <TextEffect
                      per="line"
                      preset="fade-in-blur"
                      speedSegment={0.3}
                      delay={0.5}
                      as="p"
                      className="font-nunito font-bold text-white text-sm md:text-base leading-6 max-w-md uppercase"
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
                      className="lg:block font-nunito font-medium text-white text-[40px] leading-[52px] md:text-6xl md:leading-[76px]"
                    >
                      {data.headline!}
                    </TextEffect>
                  </div>
                )}
              </div>
              {/* Centered form container */}
              <div className="col-span-2 md:col-span-12 flex justify-center">
                <AnimatedGroup
                  variants={transitionVariants}
                  className="flex flex-col items-center justify-center gap-2 md:gap-2 md:flex-row"
                >
                  <form
                    action="https://www.paypal.com/donate"
                    method="post"
                    target="_top"
                  >
                    <input
                      type="hidden"
                      name="hosted_button_id"
                      value="ZQW4WNHL4KL66"
                    />
                    <input
                      type="image"
                      src="https://www.paypalobjects.com/es_XC/i/btn/btn_donateCC_LG.gif"
                      name="submit"
                      title="PayPal - The safer, easier way to pay online!"
                      alt="Donar con el botón PayPal"
                    />
                    <img
                      alt=""
                      src="https://www.paypal.com/es_US/i/scr/pixel.gif"
                      width="1"
                      height="1"
                    />
                  </form>
                </AnimatedGroup>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHerodonationImage }) => {
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

export const herodonationBlockSchema: Template = {
  name: "herodonation",
  label: "Herodonation",
  ui: {
    previewSrc: "/blocks/herodonation.png",
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
