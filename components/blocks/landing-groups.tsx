"use client";
import {
  PageBlocksGroups,
  PageBlocksGroupsItems,
} from "../../tina/__generated__/types";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Section } from "../layout/section";
import { TinaIcon } from "../icon";
import { Button } from "../ui/button";
import Link from "next/link";
import { iconSchema } from "@/tina/fields/icon";
import { AnimatedGroup } from "../motion-primitives/animated-group";
import { sectionBlockSchemaField } from "../layout/section";
import { Transition } from 'motion/react';

//done 13: add buttons to each card in groups component
//to-do 14: change layout of each group card: Image with overlay text of the group name
//to-do 18: change layout of group items cards in landing-groups page DESIGN/FRONTEND 
//to-do 19: change layout of latest message card in homepage

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
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      } as Transition,
    },
  },
};

export const Groups = ({ data }: { data: PageBlocksGroups }) => {
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
        <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
          {data.items &&
            data.items.map(function (block, i) {
              return <Group key={i} {...block!} />;
            })}
        </Card>
      </div>
    </Section>
  );
};

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);

export const Group: React.FC<PageBlocksGroupsItems> = (data) => {
  return (
    <div className="group shadow-zinc-950/5">
      <CardHeader className="pb-3">
        <CardDecorator>
          {data.cover && (
            <Avatar
              className="size-9"
              data-tina-field={tinaField(data, "cover")}
            >
              {data.cover && (
                <AvatarImage
                  alt={data.title!}
                  src={data.cover}
                  loading="lazy"
                  width="120"
                  height="120"
                />
              )}
              <AvatarFallback>
                {data
                  .title!.split(" ")
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          )}
          <AnimatedGroup
            variants={transitionVariants}
            className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
          >
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
          </AnimatedGroup>
        </CardDecorator>

        <h3
          data-tina-field={tinaField(data, "title")}
          className="mt-6 font-medium"
        >
          {data.title}
        </h3>
      </CardHeader>

      <CardContent className="text-sm pb-8">
        <TinaMarkdown
          data-tina-field={tinaField(data, "text")}
          content={data.text}
        />
      </CardContent>
    </div>
  );
};

const defaultGroup = {
  title: "Aquí hay otro grupo",
  text: "Aquí puedes proveer más información sobre un grupo.",
  icon: {
    color: "",
    style: "float",
    name: "",
  },
};

export const groupBlockSchema: Template = {
  name: "groups",
  label: "Groups",
  ui: {
    previewSrc: "/blocks/groups.png",
    defaultItem: {
      title: "Grupos",
      description:
        "En La Iglesia La Voz, hay algo para todos. Ofrecemos los siguientes Ministerios: Varones, Mujeres, Jovenes, y Niños",
      items: [defaultGroup, defaultGroup, defaultGroup],
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
      label: "Group Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultGroup,
        },
      },
      fields: [
        //iconSchema as any,
        {
          type: "image",
          label: "CoverImg",
          name: "cover",
        },
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
