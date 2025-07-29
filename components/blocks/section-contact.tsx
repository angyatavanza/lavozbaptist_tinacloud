import { Container } from "@/components/layout/container";
import Link from "next/link";
import { FadeIn } from "../motion-primitives/fade-in";
//import { Button } from "@/components/ui/second-button";
import { Button } from "@/components/ui/button";
import { ServiceTimes } from "@/components/layout/nav/service-times";
import { tinaField } from "tinacms/dist/react";
import type { Template } from "tinacms";
import { PageBlocksContactsection } from "@/tina/__generated__/types";

//done 16: add data.title and data.actions to section-contact
//done 26: add contactsection to sections

export const ContactSection = ({
  data,
}: {
  data: PageBlocksContactsection;
}) => {
  return (
    <Container className="mt-20 md:mt-28">
      <FadeIn className="-mx-6 rounded-4xl bg-primary px-6 py-20 md:mx-0 md:py-32 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2
            className=" text-3xl font-nunito font-medium text-white [text-wrap:balance] md:text-4xl"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h2>
          <div className="mt-6 flex">
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
          </div>
          <div className="mt-10 border-t border-white/10 pt-10">
            <h3 className=" text-base font-nunito font-medium text-white">
              Nuestra ubicación y horario de servicios
            </h3>
            <ServiceTimes
              invert
              className="mt-6 grid grid-cols-2 gap-3.75 md:grid-cols-12"
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
};
