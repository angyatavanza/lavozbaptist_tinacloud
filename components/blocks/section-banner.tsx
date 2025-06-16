import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { iconSchema } from "@/tina/fields/icon";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PageBlocksBanner } from "@/tina/__generated__/types";
import { TinaIcon } from "../icon";
import { AnimatedGroup } from "../motion-primitives/animated-group";

import { Section } from "../layout/section";

//done 23: add  data.bannerimg code TINA CMS/BACKEND
//to-do 57: change layout of data.bannerimg to be to the side of the banner DESIGN/FRONTEND 
//to-do 67: add banner component to messages?, groups -done, our-team, nextsteps, events

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
      },
    },
  },
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

export const Banner = ({ data }: { data: PageBlocksBanner }) => {
  return (
    <Section>
      <div className="text-center">
        <h2
          className="text-balance text-4xl font-semibold lg:text-5xl"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </h2>
        <p className="mt-4" data-tina-field={tinaField(data, "description")}>
          {data.description}
        </p>
                <CardDecorator>
          {data.bannerimg && (
            <Avatar
              className="size-9"
              data-tina-field={tinaField(data, "bannerimg")}
            >
              {data.bannerimg && (
                <AvatarImage
                  alt={data.title!}
                  src={data.bannerimg}
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
                      {action?.icon && <TinaIcon data={action?.icon} />}
                      <span className="text-nowrap">{action!.label}</span>
                    </Link>
                  </Button>
                </div>
              ))}
          </AnimatedGroup>
        </CardDecorator>
      </div>
    </Section>
  );
};

export const bannerBlockSchema: Template = {
  name: "banner",
  label: "Banner",
  ui: {
    previewSrc: "/blocks/banner.png",
    defaultItem: {
      title: "Start Building",
      description:
        "Get started with TinaCMS today and take your content management to the next level.",
      actions: [
        {
          label: "Get Started",
          type: "button",
          link: "/",
        },
        {
          label: "Book Demo",
          type: "link",
          link: "/",
        },
      ],
    },
  },
  fields: [
    {
      type: "image",
      label: "BannerImg",
      name: "bannerimg",
    },
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
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: true,
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
        iconSchema as any,
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
  ],
};
