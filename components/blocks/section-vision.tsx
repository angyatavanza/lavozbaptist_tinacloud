import Image from "next/image";
import React, { ReactNode } from "react";
import { GridPattern } from "../grid-pattern";
import { SectionIntro } from "../layout/section-intro";
import type { Template } from "tinacms";
import { iconSchema } from "@/tina/fields/icon";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksVision } from "@/tina/__generated__/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TinaIcon } from "../icon";
import { Container } from "../container";
import { GridList, GridListItem } from "../grid-list";

export const Vision = ({ data }: { data: PageBlocksVision }) => {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-purple-800/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>
      <SectionIntro eyebrow="Nuestra Visión" title="Nuestra Visión">
        <p data-tina-field={tinaField(data, "description")}>
          {data.description}
          Nuestra visión consiste en expandir los ministerios primarios y
          secundarios de la Iglesia al máximo.
        </p>
      </SectionIntro>
      <Container className="mt-24">
        <GridList>
          <GridListItem title="Ministerios Comunitarios">
            Soñamos con iniciar ministerios enfocados a suplir necesidades
            emocionales, físicas y espirituales de la comunidad que rodea a la
            iglesia y más allá.
          </GridListItem>
          <GridListItem title="Alcance Evangelístico">
            Soñamos con anunciar las buenas nuevas a una primera y segunda
            generación de los más de 100 mil latinos que viven en el contado de
            Mecklenburg.
          </GridListItem>
          <GridListItem title="Crecimiento Espiritual">
            Soñamos con desarrollar personas que lleguen a una madurez
            espiritual a través de estudios bíblicos, clase discipulado,
            retiros, escuelas bíblicas de vacaciones, conferencias, y más.
          </GridListItem>
          <GridListItem title="Formación de Líderes">
            Soñamos en formar liderazgo para ministrar a una generación actual y
            las futuras.
          </GridListItem>
          <GridListItem title="Desarrollo de Dones Espirituales">
            Soñamos con equipar creyentes para que descubran y desarrollen sus
            dones espirituales para que los pongan en práctica en el servicio al
            Señor.
          </GridListItem>
          <GridListItem title="Centro Infantil">
            Soñamos con equipar las instalaciones de la iglesia para tener un
            centro de cuidado para niños.
          </GridListItem>
        </GridList>
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
        </div>
      </Container>
    </div>
  );
};

export const visionBlockSchema: Template = {
  name: "vision",
  label: "Vision",
  ui: {
    previewSrc: "/blocks/vision.png",
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
