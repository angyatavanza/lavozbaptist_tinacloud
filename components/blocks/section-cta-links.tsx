import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { iconSchema } from "@/tina/fields/icon";
import { Button } from "@/components/ui/button";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PageBlocksCtalinks, PageBlocksCtalinksItems } from "@/tina/__generated__/types";
import { TinaIcon } from "@/components/ui/icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AnimatedGroup } from "../motion-primitives/animated-group";
import { Transition } from "motion/react";
import { Section,  sectionBlockSchemaField  } from "@/components/layout/section";

//done 23: add  data.bannerimg code TINA CMS/BACKEND
//done 67: add section-banner to MDX pages TINA CMS CONTENT
//to-do 76: edit layout of Linkscta component (4 cards with links) FRONTEND

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

export const CallToActionLinks = ({ data }: { data: PageBlocksCtalinks }) => {
  return (
    <Section background={data.background!}>
      <div className="@container px-6">
      <div className="text-center">
        <h2 data-tina-field={tinaField(data, 'title')} className="text-balance text-4xl font-nunito font-medium lg:text-5xl">{data.title}</h2>
        <p data-tina-field={tinaField(data, 'description')} className="mt-4">{data.description}</p>
      </div>
      {/* Updated grid layout to match Groups component grid system */}
      <Card className="mx-auto mt-8 grid grid-cols-2 sm:grid-cols-12 lg:grid-cols-12 3xl:grid-cols-12 gap-[0.9375rem] overflow-hidden shadow-zinc-950/5 md:mt-16">
        {data.items &&
          data.items.map(function (block, i) {
            return <Ctalink key={i} {...block!} />;
          })}
      </Card>
      </div>
    </Section>
  )
}



export const Ctalink: React.FC<PageBlocksCtalinksItems> = (data) => {
  return (
    <Card className="col-span-2 sm:col-span-3 lg:col-span-3 3xl:col-span-3 group bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col items-center text-center">
          {data.icon && (
            <div className="mb-4">
              <TinaIcon
                tinaField={tinaField(data, "icon")}
                data={{ size: "large", ...data.icon }}
              />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="text-center">
          {data.actions && (
            <AnimatedGroup
              variants={transitionVariants}
              className="flex flex-col gap-2 w-full"
            >
              {data.actions.map((action) => (
                <div
                  key={action!.label}
                  data-tina-field={tinaField(action)}
                  className="bg-foreground/10 rounded-lg border p-0.5"
                >
                  <Button
                    asChild
                    size="sm"
                    variant={action!.type === "link" ? "ghost" : "default"}
                    className="w-full rounded-md text-sm"
                  >
                    <Link href={action!.link!}>
                      <span className="text-nowrap">{action!.label}</span>
                    </Link>
                  </Button>
                </div>
              ))}
            </AnimatedGroup>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const defaultCtalink = {
  title: "Here's Another Ctalink",
  text: "This is where you might talk about the ctalink, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: "",
  },
};

export const ctalinkBlockSchema: Template = {
  name: "ctalinks",
  label: "Ctalinks",
  ui: {
    previewSrc: "/blocks/ctalinks.png",
    defaultItem: {
      title: 'Built to cover your needs',
      description: 'We have a lot of ctalinks to cover your needs',
      items: [defaultCtalink, defaultCtalink, defaultCtalink],
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
