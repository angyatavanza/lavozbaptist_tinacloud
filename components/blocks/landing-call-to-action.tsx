import Link from "next/link";
import { TinaIcon } from "../icon";
import type { Template } from "tinacms";
import { PageBlocksCta } from "../../tina/__generated__/types";
import { Section } from "../layout/section";
import { Button } from "@/components/ui/button";
import { iconSchema } from "@/tina/fields/icon";
import { tinaField } from "tinacms/dist/react";
import { sectionBlockSchemaField } from "../layout/section";

//to-do 15: change the color of the wave in call to action

export const CallToAction = ({ data }: { data: PageBlocksCta }) => {
  return (
    <Section background={data.background!}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          style={{ fill: "var(--color-primary)" }}
          fillOpacity="1"
          d="M0,64L80,58.7C160,53,320,43,480,80C640,117,800,203,960,197.3C1120,192,1280,96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
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

        <div className="mt-12 flex flex-wrap justify-center gap-4">
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
                  variant={action!.type === "link" ? "outline" : "default"}
                  className="rounded-xl px-5 text-base"
                >
                  <Link href={action!.link!}>
                    {action?.icon && <TinaIcon data={action?.icon} />}
                    <span className="text-nowrap">{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </div>
    </Section>
  );
};

export const ctaBlockSchema: Template = {
  name: "cta",
  label: "CTA",
  ui: {
    previewSrc: "/blocks/cta.png",
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
          label: "Placeholder Button",
          type: "link",
          link: "/",
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
