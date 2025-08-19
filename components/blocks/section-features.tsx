"use client";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "@/tina/__generated__/types";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { TinaIcon } from "@/components/ui/icon";
import { IconPickerInput } from "@/tina/fields/icon";
import { ColorPickerInput } from "@/tina/fields/color";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  return (
    <Section background={data.background!} className="mx-auto">
      <div className="@container flex flex-col w-full mx-auto max-w-5xl px-6 py-10 md:py-15 items-center gap-5 lg:gap-5">
        <div className="flex flex-col items-start gap-5 w-full">
          <h2
            className="font-nunito font-semibold text-balance text-foreground text-left text-[28px] leading-[36px] md:text-[40px] md:leading-[52px] max-w-lg"
            data-tina-field={tinaField(data, "headline")}
          >
            {data.headline}
          </h2>
        </div>
        <Card className="mx-auto grid grid-cols-2 md:grid-cols-12 gap-6 px-4 md:px-5 overflow-hidden shadow-zinc-950/5">
          {data.items &&
            data.items.map(function (block, i) {
              return <Feature key={i} {...block!} />;
            })}
        </Card>
      </div>
    </Section>
  );
};

export const Feature: React.FC<PageBlocksFeaturesItems> = (data) => {
  return (
    <div className="group col-span-2 md:col-span-4 lg:col-span-4 3xl:col-span-4 shadow-zinc-950/5 text-left">
      <CardHeader className="pb-3 items-start text-left px-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-primary">
          {data.icon && (
            <TinaIcon
              tinaField={tinaField(data, "icon")}
              data={{ size: "large", ...data.icon }}
            />
          )}
        </div>
        <CardTitle
          className="mt-4 text-[19px] leading-[24px] md:text-[19px] md:leading-[24px] text-left"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <TinaMarkdown
            data-tina-field={tinaField(data, "text")}
            content={data.text}
          />
        </CardDescription>
      </CardContent>
    </div>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
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


export const featureBlockSchema: Template = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      headline: "Built to cover your needs",
      description: "We have a lot of features to cover your needs",
      items: [
        { ...defaultFeature, icon: { ...defaultFeature.icon } },
        { ...defaultFeature, icon: { ...defaultFeature.icon } },
        { ...defaultFeature, icon: { ...defaultFeature.icon } },
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
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
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
