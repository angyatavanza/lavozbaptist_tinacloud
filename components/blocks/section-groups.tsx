import Link from "next/link";
import type { Template } from "tinacms";
import {
  PageBlocksGroup,
  PageBlocksGroupGroups,
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
import { ArrowRight } from "lucide-react";
import { IconPickerInput } from "@/tina/fields/icon";
import { ColorPickerInput } from "@/tina/fields/color";
import { TinaIcon } from "@/components/ui/icon";

export const Group = ({ data }: { data: PageBlocksGroup }) => {
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
          {data.groups?.map((group, index) => (
            <GroupCard key={index} group={group!} />
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

const GroupCard = ({ group }: { group: PageBlocksGroupGroups }) => {
  return (
    <Card className="col-span-2 md:col-span-6 lg:col-span-6 3xl:col-span-6 bg-card border border-border p-3 md:p-4 flex flex-col gap-5 md:gap-5 group hover:shadow-lg transition-shadow">
      {/* Image Container with hover overlay */}
      <CardHeader2 className="relative w-full h-64 lg:h-80 overflow-hidden rounded-xl px-2 md:px-5 group">
        {group.image?.src && (
          <>
            <Image
              data-tina-field={tinaField(group, "image")}
              src={group.image.src}
              alt={group.image.alt || ""}
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
        <CardTitle data-tina-field={tinaField(group, "title")}>
          {/* Icon & Text */}
          <div className="flex items-center gap-5 self-stretch">
            {/* Groups Icon */}
            <div className="flex w-10 h-10 justify-center items-center shrink-0">
              {group.icon && (
                <TinaIcon
                  data={group.icon}
                  tinaField={tinaField(group, "icon")}
                />
              )}
            </div>
            {/* Heading */}
            {group.title}
          </div>
        </CardTitle>
      </CardHeader>

      {/* Description */}
      <CardContent className="flex items-center relative w-full">
        <CardDescription data-tina-field={tinaField(group, "description")}>
          {group.description}
        </CardDescription>
      </CardContent>

      {/* Footer with Action */}
      <CardFooter>
        <CardAction>
          <div className="flex flex-col items-start justify-start gap-3 md:gap-5 md:flex-row">
            {group.actions &&
              group.actions.map((action) => (
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

export const groupBlockSchema: Template = {
  name: "group",
  label: "Groups Section",
  ui: {
    previewSrc: "/blocks/group.png",
    defaultItem: {
      headline: "Una Iglesia, Un Lugar Para Todos",
      description:
        "We provide a range of resources and guidance to support their physical, cognitive, emotional, and social growth.",
      groups: [
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
        },
        {
          title: "Jóvenes",
          description:
            "Un lugar donde los jóvenes pueden crecer en su identidad en Cristo, conectar con otros de su edad y ser equipados para enfrentar los retos de hoy con una fe firme y auténtica.",
          icon: {
            name: "BiBookmarks",
            color: "primary",
            size: "medium",
          },
          image: {
            src: "/uploads/groups/teens/jovenes-IMG-1159.jpg",
            alt: "Teens group image",
          },
        },
        {
          title: "Mujeres",
          description:
            "Un espacio de conexión entre mujeres donde se comparten experiencias, se ora juntas y se fortalece la fe, mientras aprendemos a vivir con propósito cada etapa de la vida.",
          icon: {
            name: "BiBookmarks",
            color: "primary",
            size: "medium",
          },
          image: {
            src: "/uploads/groups/women/mujeres-IMG-1169.jpg",
            alt: "Women group image",
          },
        },
        {
          title: "Hombres",
          description:
            "Encuentros donde se busca formar hombres conforme al corazón de Dios, comprometidos con su fe, sus familias y su comunidad, mediante enseñanzas, compañerismo y servicio.",
          icon: {
            name: "BiBookmarks",
            color: "primary",
            size: "medium",
          },
          image: {
            src: "/uploads/groups/men/varones-IMG-1188.jpg",
            alt: "Men group image",
          },
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
      label: "Groups Cards",
      name: "groups",
      ui: {
        defaultItem: {
          title: "Groups Title",
          description: "Groups description goes here...",
          icon: {
            name: "BiHeart",
            color: "primary",
            size: "medium",
          },
          image: {
            src: "",
            alt: "",
          },
        },
        itemProps: (item) => {
          return {
            label: item.title || "Groups Card",
          };
        },
      },
      fields: [
        {
          type: "string",
          label: "Groups Title",
          name: "title",
        },
        {
          type: "string",
          ui: {
            component: "textarea",
          },
          label: "Groups Description",
          name: "description",
        },
        iconField as any,
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
    },
  ],
};
