"use client";
import React, { useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import {
  PageBlocksFreqaskedquestions,
  PageBlocksFreqaskedquestionsItems,
} from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { AccordionItem } from "@/components/ui/accordion-item";
import { IconPickerInput } from "@/tina/fields/icon";
import { ColorPickerInput } from "@/tina/fields/color";
import { TextEffect } from "../motion-primitives/text-effect";
import { Section } from "@/components/layout/section";
import { sectionBlockSchemaField } from "@/components/layout/section";
import Image from "next/image";
import { DecorativeIcon } from "@/components/ui/decorative-icon";

export const FreqAskedQuestions = ({
  data,
}: {
  data: PageBlocksFreqaskedquestions;
}) => {
  return (
    <Section background={data.background!} className="mx-auto">
      <div className="w-full">
        {/* Grid Layout - 12 columns for tablets and above, 2 columns for mobile */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 py-10 md:py-15 lg:py-20 items-center">
          {/* Image Container - Takes 7 columns of 12 on larger screens, full width on mobile */}
          <div className="col-span-2 md:col-span-7 flex flex-col items-center bg-white relative">
            {data.image?.src && (
              <Image
                data-tina-field={tinaField(data, "image")}
                src={data.image.src}
                alt={data.image.alt || "FAQ Image"}
                width={710}
                height={801}
                className="object-cover w-full aspect-[8/9] rounded-lg"
              />
            )}
          </div>

          {/* Content Container - Takes 8 columns of 12 on larger screens, overlapping 3 columns with image */}
          <div className="col-span-2 md:col-span-8 md:col-start-5 flex flex-col items-start gap-5 relative md:-mt-[642px] h-auto md:w-full">
            <div className="flex p-5 md:p-10 flex-col justify-center items-start gap-5 md:gap-5 self-stretch border border-border bg-white relative rounded-lg">
              {/* Heading Section */}
              <div className="flex flex-col items-start gap-5 relative">
                {/* Tagline header (Body 02 in QBDS Web+Responsive 16/24 BDM) */}
                {data.tagline && (
                  <div data-tina-field={tinaField(data, "tagline")}>
                    <TextEffect
                      per="line"
                      preset="fade-in-blur"
                      speedSegment={0.3}
                      delay={0.5}
                      as="p"
                      className="font-nunito font-medium text-balance text-left text-base leading-[24px] text-primary uppercase mx-auto "
                    >
                      {data.tagline!}
                    </TextEffect>
                  </div>
                )}

                {/* Main headline (Headline 01 in QBDS Web 48/60 B + Responsive 34/44 B)*/}
                {data.headline && (
                  <div
                    data-tina-field={tinaField(data, "headline")}
                    className="flex items-center gap-1 md:gap-2"
                  >
                    <TextEffect
                      preset="fade-in-blur"
                      speedSegment={0.3}
                      as="h2"
                      className="font-nunito font-semibold text-balance text-left text-[34px] leading-[44px] md:text-5xl md:leading-[60px] text-foreground max-w-2/3 md:max-w-lg"
                    >
                      {data.headline!}
                    </TextEffect>
                    <div className="relative bottom-[0px] md:bottom-[20px]">
                      <DecorativeIcon
                        className="text-primary w-5 h-5 md:w-7 md:h-7 shrink-0"
                        aria-hidden="true"
                      />
                    </div>
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
                      className="font-normal text-balance text-left text-base leading-[24px] md:text-xl md:leading-[28px]  max-w-md"
                    >
                      {data.description!}
                    </TextEffect>
                  </div>
                )}
              </div>
              {/* FAQ Container */}
              <div className="flex flex-col items-start gap-5 self-stretch relative w-full">
                {data.items &&
                  data.items.map(function (block, i) {
                    return <FreqAskedQuestion key={i} {...block!} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const FreqAskedQuestion: React.FC<PageBlocksFreqaskedquestionsItems> = (
  data
) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <AccordionItem
      key={data.title}
      title={data.title || ""}
      open={open}
      onClick={handleClick}
    >
      <TinaMarkdown
        data-tina-field={tinaField(data, "text")}
        content={data.text}
      />
    </AccordionItem>
  );
};

const defaultQuestion = {
  title: "Here's Another Question",
  text: "This is where you might talk about the question, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: "",
  },
};

const iconField = {
  type: "object",
  label: "Icon",
  name: "icon",
  fields: [
    { type: "string", label: "Icon", name: "name", ui: { component: IconPickerInput } },
    { type: "string", label: "Color", name: "color", ui: { component: ColorPickerInput } },
    {
      name: "style",
      label: "Style",
      type: "string",
      options: [
        { label: "Circle", value: "circle" },
        { label: "Float", value: "float" },
      ],
    },
  ],
};

export const freqaskedquestionsBlockSchema: Template = {
  name: "freqaskedquestions",
  label: "Freqaskedquestions",
  ui: {
    previewSrc: "/blocks/freqaskedquestions.png",
    defaultItem: {
      headline: "Frequently Asked Questions",
      tagline: "We have a lot of questions to cover your needs",
      image: {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8fa3a68a541052d3b421c33ebf1fcbc32eae6398?width=1420",
        alt: "FAQ Image",
      },
      items: [
        { ...defaultQuestion, icon: { ...defaultQuestion.icon } },
        { ...defaultQuestion, icon: { ...defaultQuestion.icon } },
        { ...defaultQuestion, icon: { ...defaultQuestion.icon } },
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
    {
      type: "object",
      label: "Question Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultQuestion,
        },
      },
      fields: [
        iconField as any,
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
      ],
    },
  ],
};
