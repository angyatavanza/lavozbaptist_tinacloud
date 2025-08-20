import React from "react";
import { SectionIntro } from "@/components/layout/section-intro";
import { tinaField } from "tinacms/dist/react";
import { TagList, TagListItem } from "@/components/ui/tag-list";
import { List, ListItem } from "@/components/ui/list";
import type { Template } from "tinacms";
import { PageBlocksListcontent } from "@/tina/__generated__/types";

export const Listcontent = ({ data }: { data: PageBlocksListcontent }) => {
  return (
    <div className="mx-auto px-4 md:px-5 mt-24 mb-10 md:mb-15 lg:mb-20 space-y-24 [counter-reset:section] md:mt-32 md:space-y-32 lg:mt-40 lg:space-y-40">
      <SectionIntro
        title={data.title ?? "Servicio comunitario"}
        image={{ src: "/uploads/pages/interior-IMG-1120.jpg", shape: 1 }}
        data-tina-field={tinaField(data, "title")}
      >
        <div className="space-y-6 text-base text-body-foreground">
          <p data-tina-field={tinaField(data, "description1")}>
            {data.description1}
          </p>
          <p data-tina-field={tinaField(data, "description2")}>
            {data.description2}
          </p>
        </div>
        <h3 className="mt-12 text-base font-nunito font-medium text-primary">
         Ofrecemos suministros esenciales como:
        </h3>
        <TagList className="mt-4">
          <TagListItem>Pañales</TagListItem>
          <TagListItem>Biberones</TagListItem>
          <TagListItem>Shampoo y jabón para bebé</TagListItem>
          <TagListItem>Toallitas húmedas</TagListItem>
          <TagListItem>Otros artículos de primera necesidad</TagListItem>
        </TagList>
        <h3 className="mt-12 text-base font-nunito font-medium text-primary">
        Además, conectamos a las familias con recursos comunitarios como:
        </h3>
        <List className="mt-4">
          <ListItem title="">
          Clínicas de salud
          </ListItem>
          <ListItem title="">
          Bancos de comida
          </ListItem>
          <ListItem title="">
          Programas de apoyo local.
          </ListItem>
        </List>
      </SectionIntro>
    </div>
  );
};

export const listcontentBlockSchema: Template = {
  name: "listcontent",
  label: "Listcontent",
  ui: {
    previewSrc: "/blocks/listcontent.png",
    defaultItem: {
      title: "Servicio comunitario",
      description1:
        "En La Voz de La Esperanza, creemos en mostrar el amor de Cristo a través de acciones concretas.",
      description2:
        "Nuestro deseo es ser un puente de ayuda en los momentos más importantes de la vida.",  
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
      name: "description1",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Description",
      name: "description2",
      ui: {
        component: "textarea",
      },
    },
  ],
};
