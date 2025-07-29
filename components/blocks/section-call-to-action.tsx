import Link from "next/link";
import Image from "next/image";
import type { Template } from "tinacms";
import { PageBlocksCta } from "@/tina/__generated__/types";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { tinaField } from "tinacms/dist/react";
import { ArrowRight } from "lucide-react";

//to-do 15: change layout of data.img to be to the side of the cta banner?) in call to action component FRONTEND

export const CallToAction = ({ data }: { data: PageBlocksCta }) => {
  return (
    <Section background={data.background!}>
      <div className="grid grid-cols-2 md:grid-cols-12 items-center gap-3.75 py-20">
        {data.image?.src && (
          <div className="col-span-2 md:col-span-5 py-20">
            <Image
              data-tina-field={tinaField(data, "image")}
              src={data.image.src}
              alt={data.image.alt || "CTA Image"}
              width={438}
              height={328}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        <div className="col-span-2 md:col-span-7 bg-[#60388C] px-6 md:px-10 lg:px-16 py-20 flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-4 w-full">
            <h2
              className="text-white font-nunito text-2xl md:text-3xl lg:text-4xl font-semibold leading-normal"
              data-tina-field={tinaField(data, "title")}
            >
              {data.title}
            </h2>
            <p
              className="text-white text-sm leading-[150%] max-w-[649px]"
              data-tina-field={tinaField(data, "description")}
            >
              {data.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {data.actions &&
              data.actions.map((action) => (
                <div
                  key={action!.label}
                  data-tina-field={tinaField(action)}
                  className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                >
                  <Button
                    asChild
                    size="lg"
                    variant={action!.type === "link" ? "ghost" : "default"}
                    className="rounded-xl px-5 text-base"
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
      label: "Title",
      name: "title",
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
