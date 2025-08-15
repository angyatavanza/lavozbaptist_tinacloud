import React, { ReactNode } from "react";
import { PageIntro } from "@/components/layout/page-intro";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksVision } from "@/tina/__generated__/types";
import { Container } from "@/components/layout/container";
import { GridList, GridListItem } from "@/components/ui/grid-list";

export const Vision = ({ data }: { data: PageBlocksVision }) => {
  return (
    <div className="relative mx-auto pb-10 md:pb-15 lg:pb-20 pt-10 md:pt-15 lg:pt-15">
      <PageIntro eyebrow="Nuestra Visión" title="Nuestra Visión">
        <p data-tina-field={tinaField(data, "description")}>
          {data.description}
        </p>
      </PageIntro>
      <Container className="mt-10">
        <GridList>
          <GridListItem title="Ministerios Comunitarios">
            Soñamos con iniciar ministerios enfocados a suplir necesidades
            emocionales, físicas y espirituales de la comunidad que rodea a la
            iglesia y más allá.
          </GridListItem>
          <GridListItem title="Desarrollo de Dones Espirituales">
            Soñamos con equipar creyentes para que descubran y desarrollen sus
            dones espirituales para que los pongan en práctica en el servicio al
            Señor.
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
          <GridListItem title="Centro Infantil">
            Soñamos con equipar las instalaciones de la iglesia para tener un
            centro de cuidado para niños.
          </GridListItem>
        </GridList>
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
      title: "Nuestra Visión",
      description:
        "Soñamos con iniciar ministerios enfocados a suplir necesidades emocionales, físicas y espirituales de la comunidad que rodea a la iglesia y más allá.",
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
  ],
};
