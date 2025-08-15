import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Template } from "tinacms";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { tinaField } from "tinacms/dist/react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { PageBlocksLeadership, PageBlocksLeadershipImage } from "@/tina/__generated__/types";
import { Transition } from "motion/react";
import { TextEffect } from "../motion-primitives/text-effect";

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


export const Leadership = ({ data }: { data: PageBlocksLeadership }) => {
  return (
  <Section background={data.background!} className="mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 items-center">
          {/* Image Section */}
          {data.image && (
            <div
              className="col-span-2 md:col-span-6 relative"
              data-tina-field={tinaField(data, "image")}
            >
              <div className="relative h-[730px] aspect-[3/4] w-full">
                {/* Image container with padding from edges */}
                  <div className="absolute top-5 left-6 right-6 bottom-5 z-20">
                    <ImageBlock image={data.image} />
                  </div>
              </div>
            </div>
          )}
  
          {/* Content Section */}
          <div className="col-span-2 md:col-span-6 flex flex-col gap-5">
            {/* Tagline header (Headline 06 in QBDS Web+Responsive 20/28 BDM) */}
            {data.tagline && (
              <div data-tina-field={tinaField(data, "tagline")}>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="font-nunito font-medium text-balance text-left text-base leading-[24px] text-secondary uppercase mx-auto mt-6"
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
                  className="font-nunito font-semibold text-balance md:mb-5 text-[34px] leading-[44px] md:text-5xl md:leading-[60px] text-foreground max-w-lg"
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
                  className="mx-auto max-w-2xl text-balance text-base leading-[24px] md:text-xl md:leading-[28px] "
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
                      variant={
                        action!.type === "link" ? "outline" : "default"
                      }
                      className="rounded-sm px-5 text-base leading-[24px]"
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
  
  const ImageBlock = ({ image }: { image: PageBlocksLeadershipImage }) => {
    if (image.src) {
      return (
        <Image
          className="h-full object-cover rounded-lg"
          alt={image!.alt || ""}
          src={image!.src!}
          fill
          sizes="(max-width: 479px) 90vw, (max-width: 767px) 88vw, (max-width: 991px) 90vw, 38vw"
        />
      );
    }
  
    return null;
  };
  

export const leadershipBlockSchema: Template = {
  name: "leadership",
  label: "Leadership",
  ui: {
    previewSrc: "/blocks/leadership.png",
    defaultItem: {
      title: "Start Building",
      description:
        "Get started with TinaCMS today and take your content management to the next level.",
      actions: [
        {
          label: "Get Started",
          type: "button",
          link: "/",
        },
        {
          label: "Placeholder Button",
          type: "link",
          link: "/",
        },
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
  