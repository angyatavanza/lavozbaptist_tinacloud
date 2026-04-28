import { Container } from "@/components/layout/container";
import Link from "next/link";
import { FadeIn } from "../motion-primitives/fade-in";
//import { Button } from "@/components/ui/second-button";
import { Button } from "@/components/ui/button";
import { ServiceTimes } from "@/components/layout/nav/service-times";
import { tinaField } from "tinacms/dist/react";
import type { Template } from "tinacms";
import { PageBlocksContactsection } from "@/tina/__generated__/types";


export const ContactSection = ({
  data,
}: {
  data: PageBlocksContactsection;
}) => {
  return (
    <Container className="mt-10 md:mt-15 lg:mt-20">
      <FadeIn className="-mx-6 rounded-4xl bg-sidebar-background px-6 py-20 md:mx-0 md:py-32 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-nunito font-semibold text-balance text-left text-[34px] leading-[44px] md:text-5xl md:leading-[60px] text-sidebar-foreground md:mb-10"
            data-tina-field={tinaField(data, "headline")}
          >
            {data.headline}
          </h2>
          <div className="mt-5 flex">
            {data.actions &&
              data.actions.map((action) => (
                <div
                  key={action!.label}
                  data-tina-field={tinaField(action)}
                  className="bg-foreground/10 rounded-[calc(var(--radius-sm)+0.125rem)] border p-0.5"
                >
                  <Button
                    asChild
                    size="default"
                    variant={action!.type === "link" ? "outline" : "secondary"}
                    className=""
                  >
                    <Link href={action!.link!}>
                      <span className="text-nowrap">{action!.label}</span>
                    </Link>
                  </Button>
                </div>
              ))}
          </div>
          <div className="mt-10 border-t border-sidebar-accent pt-10">
            <h4 className="text-base font-nunito font-medium text-sidebar-foreground">
              Nuestra ubicación y horario de reuniones
            </h4>
            <ServiceTimes
              className="mt-6 grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5"
            />
          </div>
        </div>
      </FadeIn>
    </Container>
  );
};

export const contactsectionBlockSchema: Template = {
  name: "contactsection",
  label: "Contactsection",
  ui: {
    previewSrc: "/blocks/contactsection.png",
    defaultItem: {
      headline: "Start Building",
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
    {
      type: "string",
      label: "Headline",
      name: "headline",
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
};
