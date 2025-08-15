import Link from "next/link";
import Image from "next/image";
import type { Template } from "tinacms";
import { PageBlocksCta } from "@/tina/__generated__/types";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { tinaField } from "tinacms/dist/react";

export const CallToAction = ({ data }: { data: PageBlocksCta }) => {
  return (
    <Section background={data.background!} className="mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-10 lg:px-15 py-10 md:py-15 items-center">
        {data.image?.src && (
          <div className="col-span-2 md:col-span-5">
            <Image
              data-tina-field={tinaField(data, "image")}
              src={data.image.src}
              alt={data.image.alt || "CTA Image"}
              width={438}
              height={328}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
        <div className="col-span-2 md:col-span-7 flex flex-col items-start gap-5 px-4 md:px-5">
          <div className="flex flex-col items-start gap-5 w-full">
            <h2
              className="font-nunito font-semibold text-balance text-left text-[28px] leading-[36px] md:text-[40px] md:leading-[52px] text-primary-button-foreground max-w-lg"
              data-tina-field={tinaField(data, "headline")}
            >
              {data.headline}
            </h2>
            <p
              className="text-primary-button-foreground font-normal text-balance text-left text-base leading-[24px] max-w-xl md:mb-5"
              data-tina-field={tinaField(data, "description")}
            >
              {data.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
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
                    variant={action!.type === "link" ? "outline" : "secondary"}
                    className=""
                  >
                    <Link href={action!.link!}>
                      <span className="text-nowrap">{action!.label}</span>
                    </Link>
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export const ctaBlockSchema: Template = {
  name: "cta",
  label: "CTA",
  ui: {
    previewSrc: "/blocks/cta.png",
    defaultItem: {
      headline: "Start Building",
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
      label: "Description",
      name: "description",
      ui: {
        component: "textarea",
      },
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
  ],
};
