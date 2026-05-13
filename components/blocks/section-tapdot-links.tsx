import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { IconPickerInput } from "@/tina/fields/icon";
import { ColorPickerInput } from "@/tina/fields/color";
import { Button } from "@/components/ui/button";
import {
  PageBlocksTapdotlinks,
  PageBlocksTapdotlinksItems,
} from "@/tina/__generated__/types";
import { TinaIcon } from "@/components/ui/icon";
import { Card, CardHeader } from "@/components/ui/card";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";

export const TapDotLinks = ({ data }: { data: PageBlocksTapdotlinks }) => {
  return (
    <Section background={data.background!} className="mx-auto">
      <div className="mx-auto grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 overflow-hidden py-10 md:py-15">
        {data.items &&
          data.items.map(function (block, i) {
            return <Tapdotlink key={i} {...block!} />;
          })}
      </div>
    </Section>
  );
};

export const Tapdotlink: React.FC<PageBlocksTapdotlinksItems> = (data) => {
  return (
    <Card className="col-span-2 md:col-span-4 lg:col-span-4 3xl:col-span-4 group overflow-hidden bg-sidebar-background hover:bg-sidebar-accent transition-colors duration-200 shadow-none">
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

const defaultTapdotlink = {
  title: "Recursos comunitarios",
  icon: {
    color: "purple",
    style: "float",
    name: "BiHomeSmile",
  },
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

export const tapdotlinkBlockSchema: Template = {
  name: "tapdotlinks",
  label: "Tapdotlinks",
  ui: {
    previewSrc: "/blocks/tapdotlinks.png",
    defaultItem: {
      items: [
        { ...defaultTapdotlink, icon: { ...defaultTapdotlink.icon } },
        { ...defaultTapdotlink, icon: { ...defaultTapdotlink.icon } },
        { ...defaultTapdotlink, icon: { ...defaultTapdotlink.icon } },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "object",
      label: "Tapdotlink Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultTapdotlink,
        },
      },
      fields: [
        iconField as any,
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
