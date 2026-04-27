import type { Template } from "tinacms";
import {
  PageBlocksContentandimagevariant,
  PageBlocksContentandimagevariantContentandimagevariants,
} from "@/tina/__generated__/types";
import Image from "next/image";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader2,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { tinaField } from "tinacms/dist/react";
import { ServiceTimes } from "@/components/layout/nav/service-times";
import { ArrowRight } from "lucide-react";
import { IconPickerInput } from "@/tina/fields/icon";
import { ColorPickerInput } from "@/tina/fields/color";
import { TinaIcon } from "@/components/ui/icon";

export const ContentAndImageVariant = ({ data }: { data: PageBlocksContentandimagevariant }) => {
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
          {data.contentandimagevariants?.map((contentandimagevariant, index) => (
            <ContentandimagevariantCard key={index} contentandimagevariant={contentandimagevariant!} />
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

const ContentandimagevariantCard = ({ contentandimagevariant }: { contentandimagevariant: PageBlocksContentandimagevariantContentandimagevariants }) => {
  return (
    <Card className="col-span-2 md:col-span-6 lg:col-span-6 3xl:col-span-6 bg-card border border-border p-3 md:p-4 flex flex-col gap-5 md:gap-5 group hover:shadow-lg transition-shadow">
      {/* Image Container with hover overlay */}
      <CardHeader2 className="relative w-full h-64 lg:h-80 overflow-hidden rounded-xl px-2 md:px-5 group">
        {contentandimagevariant.image?.src && (
          <>
            <Image
              data-tina-field={tinaField(contentandimagevariant, "image")}
              src={contentandimagevariant.image.src}
              alt={contentandimagevariant.image.alt || ""}
              fill
              className="object-cover object-center"
            />
            {/* Separate overlay that appears on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-50 group-hover:bg-accent transition-opacity duration-300 pointer-events-none" />
          </>
        )}
      </CardHeader2>

      {/* Icon & Title Header - kept together */}
      <CardHeader>
        <CardTitle data-tina-field={tinaField(contentandimagevariant, "title")}>
          {/* Icon & Text */}
          <div className="flex items-center gap-5 self-stretch">
            {/*  Content and image variant Icon */}
            <div className="flex w-10 h-10 justify-center items-center shrink-0">
              {contentandimagevariant.icon && (
                <TinaIcon
                  data={contentandimagevariant.icon}
                  tinaField={tinaField(contentandimagevariant, "icon")}
                />
              )}
            </div>
            {/* Heading */}
            {contentandimagevariant.title}
          </div>
        </CardTitle>
      </CardHeader>

      {/* Description */}
      <CardContent className="flex items-start relative w-full flex-col gap-2">
        <CardDescription className="text-foreground font-semibold text-[19px] leading-[24px] md:text-[19px] md:leading-[24px]" data-tina-field={tinaField(contentandimagevariant, "descriptionheading")}>
          {contentandimagevariant.descriptionheading}
        </CardDescription>
        <CardDescription className="text-foreground text-[19px] leading-[24px] md:text-[19px] md:leading-[24px]" data-tina-field={tinaField(contentandimagevariant, "description")}>
          {contentandimagevariant.description}
        </CardDescription>
        <CardDescription className="text-foreground font-semibold text-[19px] leading-[24px] md:text-[19px] md:leading-[24px]" data-tina-field={tinaField(contentandimagevariant, "descriptionheading2")}>
          {contentandimagevariant.descriptionheading2}
        </CardDescription>
        <CardDescription className="text-foreground text-[19px] leading-[24px] md:text-[19px] md:leading-[24px]" data-tina-field={tinaField(contentandimagevariant, "description2")}>
          {contentandimagevariant.description2}
        </CardDescription>
                <CardDescription className="text-foreground text-[19px] leading-[24px] md:text-[19px] md:leading-[24px]" data-tina-field={tinaField(contentandimagevariant, "description3")}>
          {contentandimagevariant.description3}
        </CardDescription>
        <CardDescription data-tina-field={tinaField(contentandimagevariant, "details")}>
          {contentandimagevariant.details}
        </CardDescription>
      </CardContent>

      {/* Footer with Action */}
      <CardFooter>
        <CardAction>
          <div className="flex flex-col items-start justify-start gap-3 md:gap-5 md:flex-row">
          {contentandimagevariant.actions &&
            contentandimagevariant.actions.map((action) => (
              <Button
                key={action!.label}
                asChild
                size="default"
                variant={action!.type === "link" ? "ghost" : "default"}
                className=""
              >
                <a
                  href={action!.link!}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tina-field={tinaField(action)}
                >
                  <span className="text-nowrap">{action!.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            ))}
          </div>
        </CardAction>
      </CardFooter>
    </Card>
  );
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

export const contentandimagevariantBlockSchema: Template = {
  name: "contentandimagevariant",
  label: "Contentandimagevariant",
  ui: {
    previewSrc: "/blocks/contentandimagevariant.png",
    defaultItem: {
      headline: 'Built to cover your needs',
      description: 'We have a lot of features to cover your needs',
      icon: {
        color: "",
        style: "float",
        name: "",
      },
      contentandimagevariants: [
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
      label: "Contentandimagevariants",
      name: "contentandimagevariants",
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
          label: "Section Img Content Description Heading",
          name: "descriptionheading",
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
          ui: {
            component: "textarea",
          },
          label: "Section Img Content Description",
          name: "description2",
        },
        {
          type: "string",
          ui: {
            component: "textarea",
          },
          label: "Section Img Content Description",
          name: "description3",
        },
        {
          type: "string",
          ui: {
            component: "textarea",
          },
          label: "Section Img Content Description Heading",
          name: "descriptionheading2",
        },
        iconField as any,
        {
          type: "string",
          label: "Details",
          name: "details",
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
