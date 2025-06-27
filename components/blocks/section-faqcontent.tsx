"use client";
import React, { useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Line } from "../line"
import type { Template } from "tinacms";
import { PageBlocksFreqaskedquestions, PageBlocksFreqaskedquestionsItems } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { AccordionItem } from "../accordion-item";
import { TinaIcon } from "../icon";
import { iconSchema } from "../../tina/fields/icon";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Section } from "../layout/section";
import { mermaid } from "./mermaid";
import { sectionBlockSchemaField } from "../layout/section";

//done 28: add faq section to block Tina schema TINA CMS/BACKEND 
//to-do 24: Implement faq section design DESIGN/FRONTEND 

export const FreqAskedQuestions = ({ data }: { data: PageBlocksFreqaskedquestions }) => {

  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2
            data-tina-field={tinaField(data, "title")}
            className="text-balance text-4xl font-semibold lg:text-5xl"
          >
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, "description")} className="mt-4">
            {data.description}
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl md:mt-16">
          {data.items &&
            data.items.map(function (block, i) {
              return <FreqAskedQuestion key={i} {...block!} />;
            })}
        </div>
       
      </div>
    </Section>
  );
};

export const FreqAskedQuestion: React.FC<PageBlocksFreqaskedquestionsItems> = (data) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
    <AccordionItem
      key={data.title}
      title={data.title || ""}
      open={open}
      onClick={handleClick}
    >
      <div
        data-tina-field={tinaField(data, "text")}
        className="text-palePurple pt-6 text-sm font-normal leading-[21px]"
      >
        {typeof data.text === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: data.text }} />
        ) : (
          <TinaMarkdown content={data.text} />
        )}
      </div>
    </AccordionItem>
    <Line />
    </>
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
      title: "Built to cover your needs",
      description: "We have a lot of questions to cover your needs",
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
