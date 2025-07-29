import Link from "next/link";
import type { Template } from "tinacms";
import {
  PageBlocksGroup,
  PageBlocksGroupGroups,
} from "@/tina/__generated__/types";
import Image from "next/image";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tinaField } from "tinacms/dist/react";
import { ArrowRight } from "lucide-react";
import { iconSchema } from "@/tina/fields/icon";
import { TinaIcon } from "@/components/ui/icon";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Transition } from "motion/react";

const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      } as Transition,
    },
  },
};

export const Group = ({ data }: { data: PageBlocksGroup }) => {
  return (
    <Section background={data.background!}>
      <div className="w-full py-20 flex flex-col items-center gap-10 bg-[#FCFBF7]">
        <div className="flex flex-col items-center gap-4">
          <h2
            className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#15171A] leading-[1.4] text-center px-4 font-nunito"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h2>
          <p
            className="max-w-[632px] w-full text-center text-base text-[#3F444D] leading-[1.5] px-4 font-roboto"
            data-tina-field={tinaField(data, "description")}
          >
            {data.description}
          </p>
        </div>

        <div className="w-full px-4 md:px-8 lg:px-[120px]">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3.75 mx-6">
            {data.groups?.map((group, index) => (
              <GroupCard key={index} group={group!} />
            ))}
          </div>
        </div>

        {/* Slider/Pagination */}
        <div className="flex items-center gap-[15px]">
          <div className="w-16 h-2 bg-[#60388C]"></div>
          <div className="w-16 h-2 bg-[#D9DADB]"></div>
        </div>
      </div>
    </Section>
  );
};

const GroupCard = ({ group }: { group: PageBlocksGroupGroups }) => {
  return (
    <Card className="col-span-2 md:col-span-6 lg:col-span-6 3xl:col-span-6 flex items-center gap-5 p-5 border-[#D9DADB] bg-white">
      <CardContent className="flex flex-col items-start gap-6 flex-1 p-0">
        <div className="flex flex-col items-start gap-4 self-stretch">
          {/* Icon & Text */}
          <div className="flex items-center gap-4 self-stretch">
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
            <h3
              className="flex-1 text-xl font-semibold text-[#15171A] line-clamp-2 font-nunito"
              data-tina-field={tinaField(group, "title")}
            >
              {group.title}
            </h3>
          </div>

          {/* Description */}
          <p
            className="self-stretch text-base text-[#3F444D] leading-[1.5] line-clamp-3"
            data-tina-field={tinaField(group, "description")}
          >
            {group.description}
          </p>
          {/* Image */}
          {group.image?.src && (
            <Image
              src={group.image.src}
              alt={group.image.alt || ""}
              width={300}
              height={200}
              className="flex-1 self-stretch object-cover min-h-[200px]"
              data-tina-field={tinaField(group, "image")}
            />
          )}
          {/* Actions */}
          <AnimatedGroup
            variants={transitionVariants}
            className="flex flex-col items-center justify-center gap-2 md:gap-2 md:flex-row"
          >
            {group.actions &&
              group.actions.map((action) => (
                <div
                  key={action!.label}
                  data-tina-field={tinaField(action)}
                  className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-[0.4px] w-full md:w-auto"
                >
                  <Button
                    asChild
                    size="lg"
                    variant={action!.type === "link" ? "outline" : "default"}
                    className="rounded-xl py-[1.1px] md:py-[3.6px] w-full md:w-auto"
                  >
                    <Link href={action!.link!}>
                      <span className="text-nowrap">{action!.label}</span>
                    </Link>
                  </Button>
                </div>
              ))}
          </AnimatedGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export const groupBlockSchema: Template = {
  name: "group",
  label: "Groups Section",
  ui: {
    previewSrc: "/blocks/group.png",
    defaultItem: {
      title: "Una Iglesia, Un Lugar Para Todos",
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
        iconSchema as any,
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
