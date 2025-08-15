import Link from "next/link";
import type { Template } from "tinacms";
import {
  PageBlocksContentandimage,
  PageBlocksContentandimageContentandimages,
} from "@/tina/__generated__/types";
import Image from "next/image";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { tinaField } from "tinacms/dist/react";
import { ArrowRight } from "lucide-react";

export const ContentAndImage = ({
  data,
}: {
  data: PageBlocksContentandimage;
}) => {
  return (
    <Section background={data.background!} className="mx-auto">
      <div className="flex w-full mx-auto px-4 md:px-30 py-10 md:py-15 lg:py-20 flex-col items-center gap-5 lg:gap-5">
        {/* Header Section */}
        <div className="flex w-full max-w-none flex-col items-center text-center gap-5 mx-auto">
          <h2
            data-tina-field={tinaField(data, "headline")}
            className="font-nunito font-semibold text-pretty text-center text-[34px] leading-[44px] md:text-5xl md:leading-[60px] text-foreground max-w-2xl"
          >
            {data.headline}
          </h2>
          <div
            data-tina-field={tinaField(data, "description")}
            className="font-normal text-balance text-center text-base leading-[24px] md:text-xl md:leading-[28px] max-w-xl"
          >
            {data.description}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 w-full">
          {data.contentandimages?.map((contentandimage, index) => (
            <ContentandimageCard
              key={index}
              contentandimage={contentandimage!}
            />
          ))}
        </div>

        {/* Slider/Pagination */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-2 bg-primary"></div>
          <div className="w-16 h-2 bg-border"></div>
        </div>
      </div>
    </Section>
  );
};

const ContentandimageCard = ({
  contentandimage,
}: {
  contentandimage: PageBlocksContentandimageContentandimages;
}) => {
  return (
    <Card className="col-span-2 md:col-span-6 lg:col-span-6 3xl:col-span-6 bg-card border border-border p-3 md:p-4 grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-5 group hover:shadow-lg transition-shadow overflow-hidden">
      {/* Title and Description (left) + Image (right) in one content area */}
      <CardContent className="col-span-2 md:col-span-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-5 items-start">
          <div className="col-span-2 md:col-span-7">
          <CardTitle data-tina-field={tinaField(contentandimage, "title")} className="mb-2">
            {contentandimage.title}
          </CardTitle>
          <CardDescription data-tina-field={tinaField(contentandimage, "description")} className="mb-4">
            {contentandimage.description}
          </CardDescription>
          <CardAction>
          <div className="flex flex-col items-start justify-start gap-3 md:gap-5 md:flex-row">
            {contentandimage.actions &&
              contentandimage.actions.map((action) => (
                <Button
                  key={action!.label}
                  asChild
                  size="default"
                  variant={action!.type === "link" ? "ghost" : "default"}
                  className=""
                >
                  <Link
                    href={action!.link!}
                    data-tina-field={tinaField(action)}
                  >
                    <span className="text-nowrap">{action!.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              ))}
          </div>
        </CardAction>
          </div>
          {contentandimage.image?.src && (
            <div className="col-span-2 md:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  data-tina-field={tinaField(contentandimage, "image")}
                  src={contentandimage.image.src}
                  alt={contentandimage.image.alt || ""}
                  fill
                  sizes="(min-width:768px) 41vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const contentandimageBlockSchema: Template = {
  name: "contentandimage",
  label: "Contentandimage",
  ui: {
    previewSrc: "/blocks/contentandimage.png",
    defaultItem: {
      headline: "Built to cover your needs",
      description: "We have a lot of features to cover your needs",
      icon: {
        color: "",
        style: "float",
        name: "",
      },
      contentandimages: [
        {
          title: "Niños",
          description:
            "Un espacio seguro y divertido donde los más pequeños aprenden sobre el amor de Dios a través de historias bíblicas, juegos y actividades que fortalecen su fe desde temprana edad.",
          icon: {
            name: "BiBookmarks",
            color: "primary",
            size: "medium",
          },
          image: {
            src: "/uploads/groups/kids/kidz-IMG-1173.jpg",
            alt: "Kids group image",
          },
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
      list: true,
      label: "Contentandimages",
      name: "contentandimages",
      ui: {
        defaultItem: {
          title:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          description: "Phil Karlton",
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
            label: `${item.title} - ${item.description}`,
          };
        },
      },
      fields: [
        {
          type: "string",
          label: "Section Img Content Title",
          name: "title",
        },
        {
          type: "string",
          ui: {
            component: "textarea",
          },
          label: "Section Img Content Description",
          name: "description",
        },
        {
          type: "string",
          label: "Requirements",
          name: "requirements",
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
    },
  ],
};
