import type { Template } from "tinacms";
import {
  PageBlocksTeammember,
  PageBlocksTeammemberTeammembers,
} from "@/tina/__generated__/types";
import { Section } from "@/components/layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, Card2, CardContent, CardHeader2, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { sectionBlockSchemaField } from "@/components/layout/section";

export const TeamMember = ({ data }: { data: PageBlocksTeammember }) => {
  return (
    <Section background={data.background!} className="mx-auto">
      <div className="flex w-full mx-auto px-4 md:px-5 py-10 md:py-15 lg:py-20 flex-col items-center gap-5 lg:gap-5">
        {/* Header Section */}
        <div className="flex w-full max-w-none flex-col items-center text-center gap-5 mx-auto">
          <h2
            data-tina-field={tinaField(data, "headline")}
            className="font-nunito font-semibold text-pretty text-center text-[34px] leading-[44px] md:text-5xl md:leading-[60px] text-foreground max-w-xl"
          >
            {data.headline}
          </h2>
          <div
            data-tina-field={tinaField(data, "description")}
            className="font-normal text-balance text-center text-base leading-[24px] md:text-xl md:leading-[28px] max-w-lg"
          >
            {data.description}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 w-full">
          {data.teammembers?.map((teammember, index) => (
            <TeammemberCard key={index} teammember={teammember!} />
          ))}
        </div>
      </div>
    </Section>
  );
};

const TeammemberCard = ({
  teammember,
}: {
  teammember: PageBlocksTeammemberTeammembers;
}) => {
  return (

    <Card2 className="border border-grey-0 flex flex-col col-span-2 md:col-span-4 text-primary-foreground">
      {/* Image Container with hover buttons */}
      <CardHeader2 className="relative w-full h-64 lg:h-80 p-0 overflow-hidden group rounded-xl">
        {teammember.avatar && (
          <>
            <Image
              data-tina-field={tinaField(teammember, "avatar")}
              src={teammember.avatar}
              alt={teammember.coordinator || ""}
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 group-hover:bg-accent transition-opacity duration-300 pointer-events-none" />
          </>
        )}

        {/* Hover overlay with buttons */}
        {teammember.actions && teammember.actions.length > 0 && (
          <div className="absolute inset-0 z-30 bg-background/35 dark:bg-zinc-900/35 backdrop-blur-[2px] ring-1 ring-border/20 flex items-end justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="flex flex-row gap-3 p-4 md:p-6">
              {teammember.actions &&
                teammember.actions.map((action, idx) => (
                  <div
                    key={action!.label}
                    data-tina-field={tinaField(action)}
                    className="bg-foreground/10 rounded-[calc(var(--radius-sm)+0.125rem)] border p-0.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out"
                    style={{ transitionDelay: `${idx * 60}ms` }}
                  >
                    <Button
                      asChild
                      size="sm"
                      variant={action!.type === "link" ? "ghost" : "secondary"}
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
        )}
      </CardHeader2>
      <CardHeader>
        <CardTitle>
          <div>
            <h3
              className="text-[19px] leading-[24px] md:text-[19px] md:leading-[24px]"
              data-tina-field={tinaField(teammember, "coordinator")}
            >
              {teammember.coordinator}
            </h3>

            <span
              className="text-muted-foreground block text-sm tracking-wide"
              data-tina-field={tinaField(teammember, "role")}
            >
              {teammember.role}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-5 pt-6">
          <blockquote
            className="mt-3"
            data-tina-field={tinaField(teammember, "quote")}
          >
            <p className="text-gray-700 dark:text-gray-300">
              {teammember.quote}
            </p>
          </blockquote>
      </CardContent>
    </Card2>
  );
};

export const teammemberBlockSchema: Template = {
  name: "teammember",
  label: "Teammember",
  ui: {
    previewSrc: "/blocks/teammember.png",
    defaultItem: {
      teammembers: [
        {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          coordinator: "Phil Karlton",
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
      label: "Teammembers",
      name: "teammembers",
      ui: {
        defaultItem: {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          coordinator: "Phil Karlton",
        },
        itemProps: (item) => {
          return {
            label: `${item.quote} - ${item.coordinator}`,
          };
        },
      },
      fields: [
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
          label: "Coordinator",
          name: "coordinator",
        },
        {
          type: "string",
          label: "Role",
          name: "role",
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar",
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
