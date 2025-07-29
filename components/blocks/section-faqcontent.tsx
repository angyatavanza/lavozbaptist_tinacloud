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
import { iconSchema } from "@/tina/fields/icon";
import { Section } from "@/components/layout/section";
import { sectionBlockSchemaField } from "@/components/layout/section";
import Image from "next/image";

//done 28: add faq section to block Tina schema TINA CMS/BACKEND
//to-do 24: update the ui of the faq block component in the /home page (remove random custom classnames) FRONTEND
export const FreqAskedQuestions = ({
  data,
}: {
  data: PageBlocksFreqaskedquestions;
}) => {
  return (
    <Section background={data.background!}>
      <div className="w-full">
        {/* Grid Layout - 12 columns for tablets and above, 2 columns for mobile */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3.75 mx-6 px-5 md:px-[120px] py-10 md:py-[100px] items-center">
          {/* Image Container - Takes 7 columns of 12 on larger screens, full width on mobile */}
          <div className="col-span-2 md:col-span-7 flex flex-col items-center bg-white relative">
            {data.image?.src && (
              <Image
                data-tina-field={tinaField(data, "image")}
                src={data.image.src}
                alt={data.image.alt || "FAQ Image"}
                width={710}
                height={801}
                className="object-cover w-full aspect-[8/9]"
              />
            )}
          </div>

          {/* Content Container - Takes 8 columns of 12 on larger screens, overlapping 3 columns with image */}
          <div className="col-span-2 md:col-span-8 md:col-start-5 flex flex-col items-start gap-[10px] relative md:-mt-[642px] h-auto md:w-full">
            <div className="flex p-5 md:p-[40px] flex-col justify-center items-start gap-[30px] md:gap-[40px] self-stretch border border-[#D9DADB] bg-white relative rounded-none">
              {/* Heading Section */}
              <div className="flex flex-col items-start gap-[8px] relative">
                <div className="font-nunito text-base md:text-lg font-bold relative text-[#60388C]">
                  FAQ
                </div>
                <div className="w-full max-w-[670px] h-auto md:h-[59px] relative">
                  <svg
                    className="hidden md:flex w-[29px] h-[28px] -rotate-90 justify-center items-center shrink-0 absolute md:left-[563px] top-0"
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.3046 26.416C16.9228 25.5153 20.4071 25.5743 24.0771 25.4664C24.7939 25.4454 25.3898 26.0153 25.4113 26.7385C25.4329 27.4622 24.8673 28.0662 24.1506 28.0876C20.6705 28.1898 17.3589 28.1072 13.9221 28.962C13.2269 29.1351 12.5231 28.7046 12.3547 28.0019C12.182 27.2996 12.6095 26.5886 13.3046 26.416Z"
                      fill="#60388C"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.29333 18.764C11.8113 12.6538 18.9095 6.8966 26.0768 2.87262C26.7029 2.5217 27.4931 2.75027 27.8385 3.38306C28.1839 4.01585 27.9593 4.81469 27.3333 5.16561C20.4034 9.05674 13.5383 14.6247 8.20602 20.533C7.72244 21.067 6.90209 21.1042 6.37534 20.6161C5.84858 20.1279 5.80975 19.298 6.29333 18.764Z"
                      fill="#60388C"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.265351 17.2158C-0.645676 11.6274 0.908663 5.86715 3.10635 0.785611C3.39564 0.122668 4.15984 -0.179751 4.81181 0.109986C5.46809 0.40016 5.76603 1.17411 5.48107 1.83706C3.47767 6.46498 1.99238 11.699 2.82137 16.7889C2.93795 17.503 2.4587 18.1781 1.75492 18.2957C1.05114 18.4137 0.381928 17.9295 0.265351 17.2158Z"
                      fill="#60388C"
                    />
                  </svg>
                  <h2
                    data-tina-field={tinaField(data, "title")}
                    className="w-full max-w-[670px] font-nunito text-[28px] md:text-[42px] font-bold leading-[140%] relative md:absolute md:left-0 md:top-0 md:h-[59px] text-[#0D0E0F] m-0"
                  >
                    {data.title}
                  </h2>
                </div>
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

export const freqaskedquestionsBlockSchema: Template = {
  name: "freqaskedquestions",
  label: "Freqaskedquestions",
  ui: {
    previewSrc: "/blocks/freqaskedquestions.png",
    defaultItem: {
      title: "Frequently Asked Questions",
      description: "We have a lot of questions to cover your needs",
      image: {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8fa3a68a541052d3b421c33ebf1fcbc32eae6398?width=1420",
        alt: "FAQ Image",
      },
      items: [defaultQuestion, defaultQuestion, defaultQuestion],
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
        iconSchema as any,
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
