import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { iconSchema } from "@/tina/fields/icon";
import { Button } from "@/components/ui/button";
import {
  PageBlocksCtalinks,
  PageBlocksCtalinksItems,
} from "@/tina/__generated__/types";
import { TinaIcon } from "@/components/ui/icon";
import { Card, CardHeader } from "@/components/ui/card";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";

export const CallToActionLinks = ({ data }: { data: PageBlocksCtalinks }) => {
  return (
    <Section background={data.background!} className="mx-auto">
      <div className="mx-auto grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 overflow-hidden py-10 md:py-15">
        {data.items &&
          data.items.map(function (block, i) {
            return <Ctalink key={i} {...block!} />;
          })}
      </div>
    </Section>
  );
};

export const Ctalink: React.FC<PageBlocksCtalinksItems> = (data) => {
  return (
    <Card className="col-span-2 md:col-span-3 lg:col-span-3 3xl:col-span-3 group overflow-hidden bg-sidebar-background hover:bg-sidebar-accent transition-colors duration-200 shadow-none">
      <CardHeader className="pb-3">
        <div className="flex flex-col items-center text-center">
          {data.icon && (
            <div className="mb-4">
              <TinaIcon
                tinaField={tinaField(data, "icon")}
                data={{ size: "large", ...data.icon }}
                className="text-sidebar-foreground transition-colors group-hover:text-sidebar-primary"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-5 md:gap-5 md:flex-row min-w-0">
          {data.actions &&
            data.actions.map((action) => (
              <Button
                key={action!.label}
                asChild
                size="default"
                variant={action!.type === "link" ? "ghost" : "default"}
                className="text-base leading-[24px] text-sidebar-foreground hover:text-sidebar-primary transition-colors max-w-full"
              >
                <Link href={action!.link!} data-tina-field={tinaField(action)}>
                  <span className="text-center break-words">{action!.label}</span>
                </Link>
              </Button>
            ))}
        </div>
      </CardHeader>
    </Card>
  );
};

const defaultCtalink = {
  title: "Recursos comunitarios",
  icon: {
    color: "purple",
    style: "float",
    name: "BiHomeSmile",
  },
};

export const ctalinkBlockSchema: Template = {
  name: "ctalinks",
  label: "Ctalinks",
  ui: {
    previewSrc: "/blocks/ctalinks.png",
    defaultItem: {
      items: [defaultCtalink, defaultCtalink, defaultCtalink],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "object",
      label: "Ctalink Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultCtalink,
        },
      },
      fields: [
        iconSchema as any,
        {
          type: "string",
          label: "Title",
          name: "title",
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
