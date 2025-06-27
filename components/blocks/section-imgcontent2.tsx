import type { Template } from "tinacms";
import {
  PageBlocksContentandimagevariant,
  PageBlocksContentandimagevariantContentandimagevariants,
} from "../../tina/__generated__/types";
import { Section } from "../layout/section";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { iconSchema } from "@/tina/fields/icon";
import { Card, CardContent } from "../ui/card";
import { tinaField } from "tinacms/dist/react";
import { TinaIcon } from "@/components/icon";
import { sectionBlockSchemaField } from "../layout/section";

export const ContentAndImageVariant = ({
  data,
}: {
  data: PageBlocksContentandimagevariant;
}) => {
  return (
    <Section background={data.background!}>
      <div className="text-center">
        {data.icon && <TinaIcon data={data?.icon} />}
        <h2
          className="text-title text-3xl font-semibold"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </h2>
        <p
          className="text-body mt-6"
          data-tina-field={tinaField(data, "description")}
        >
          {data.description}
        </p>
      </div>
      <div className="mt-8 [column-width:300px] [column-gap:1.5rem] md:mt-12">
        {data.contentandimagevariants?.map((contentandimagevariant, index) => (
          <ContentandimagevariantCard
            key={index}
            contentandimagevariant={contentandimagevariant!}
          />
        ))}
      </div>
    </Section>
  );
};

const ContentandimagevariantCard = ({
  contentandimagevariant,
}: {
  contentandimagevariant: PageBlocksContentandimagevariantContentandimagevariants;
}) => {
  return (
    <Card className="mb-6 break-inside-avoid">
      <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
        <div data-tina-field={tinaField(contentandimagevariant, "img")}>
          {contentandimagevariant.img && (
            <Image
              alt={contentandimagevariant.quotetitle!}
              src={contentandimagevariant.img}
              loading="lazy"
              width="120"
              height="120"
            />
          )}
        </div>
        <div>
          <h3
            className="font-medium"
            data-tina-field={tinaField(contentandimagevariant, "quotetitle")}
          >
            {contentandimagevariant.quotetitle}
          </h3>

          <span
            className="text-muted-foreground block text-sm tracking-wide"
            data-tina-field={tinaField(contentandimagevariant, "requirements")}
          >
            {contentandimagevariant.requirements}
          </span>

          <blockquote
            className="mt-3"
            data-tina-field={tinaField(contentandimagevariant, "quote")}
          >
            <p className="text-gray-700 dark:text-gray-300">
              {contentandimagevariant.quote}
            </p>
          </blockquote>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {contentandimagevariant.actions &&
            contentandimagevariant.actions.map((action) => (
              <div
                key={action!.label}
                data-tina-field={tinaField(action)}
                className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
              >
                <Button
                  asChild
                  size="lg"
                  variant={action!.type === "link" ? "outline" : "default"}
                  className="rounded-xl px-5 text-base"
                >
                  <Link href={action!.link!}>
                    <span className="text-nowrap">{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const contentandimagevariantBlockSchema: Template = {
  name: "contentandimagevariant",
  label: "Contentandimagevariant",
  ui: {
    previewSrc: "/blocks/contentandimagevariant.png",
    defaultItem: {
      title: 'Built to cover your needs',
      description: 'We have a lot of features to cover your needs',
      icon: {
        color: "",
        style: "float",
        name: "",
      },
      contentandimagevariants: [
        {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          quotetitle: "Phil Karlton",
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
    iconSchema as any,
    {
      type: "object",
      list: true,
      label: "Contentandimagevariants",
      name: "contentandimagevariants",
      ui: {
        defaultItem: {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          quotetitle: "Phil Karlton",
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
        itemProps: (item) => {
          return {
            label: `${item.quote} - ${item.quotetitle}`,
          };
        },
      },
      fields: [
        {
          type: "string",
          label: "Quote Title",
          name: "quotetitle",
        },
        {
          type: "string",
          ui: {
            component: "textarea",
          },
          label: "Quote",
          name: "quote",
        },
        {
          type: "string",
          label: "Requirements",
          name: "requirements",
        },
        {
          type: "image",
          label: "Image",
          name: "img",
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
    },
  ],
};
