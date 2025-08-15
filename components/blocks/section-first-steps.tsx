import React from "react";
import { StepsSection } from "@/components/layout/steps-section";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksNextsteps } from "@/tina/__generated__/types";
import { components } from '@/components/mdx-components';

export const NextSteps = ({ data }: { data: PageBlocksNextsteps }) => {
  return (
    <div className="mx-auto px-4 md:px-5 mt-24 mb-10 md:mb-15 lg:mb-20 space-y-24 [counter-reset:section] md:mt-32 md:space-y-32 lg:mt-40 lg:space-y-40">
      <StepsSection
        title={data.title ?? "Descubre"}
        image={{ src: "/uploads/pages/congregation-IMG-1038.jpg", shape: 1 }}
        data-tina-field={tinaField(data, "title")}
      >
        <div className="space-y-6 text-base text-neutral-600">
          <p data-tina-field={tinaField(data, "description")}>
          Ayudará a entender el funcionamiento básico de <components.LaVoz />. {data.description}
          </p>
        </div>
      </StepsSection>
      <StepsSection
        title={data.title2 ?? "Desarolla tu fe"}
        image={{ src: "/uploads/pages/congregation-IMG-1031.jpg", shape: 2 }}
        data-tina-field={tinaField(data, "title2")}
      >
        <div className="space-y-6 text-base text-neutral-600">
          <p data-tina-field={tinaField(data, "description2")}>
            {data.description2}
          </p>
        </div>
      </StepsSection>
      <StepsSection
        title={data.title3 ?? "Define tu proposito"}
        image={{ src: "/uploads/pages/worship-IMG-1009.jpg", shape: 1 }}
        data-tina-field={tinaField(data, "title3")}
      >
        <div className="space-y-6 text-base text-neutral-600">
          <p data-tina-field={tinaField(data, "description3")}>
            {data.description3}
          </p>
        </div>
      </StepsSection>
      <StepsSection
        title={data.title4 ?? "Transforma tu Vida"}
        image={{ src: "/uploads/pages/worship-IMG-1095.jpg", shape: 2 }}
        data-tina-field={tinaField(data, "title4")}
      >
        <div className="space-y-6 text-base text-neutral-600">
          <p data-tina-field={tinaField(data, "description4")}>
            {data.description4}
          </p>
        </div>
      </StepsSection>
    </div>
  );
};

export const nextstepsBlockSchema: Template = {
  name: "nextsteps",
  label: "Nextsteps",
  ui: {
    previewSrc: "/blocks/nextsteps.png",
    defaultItem: {
      title: "Start Building",
      description:
        "Get started with TinaCMS today and take your content management to the next level.",
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
      type: "string",
      label: "Title",
      name: "title2",
    },
    {
      type: "string",
      label: "Description",
      name: "description2",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Title",
      name: "title3",
    },
    {
      type: "string",
      label: "Description",
      name: "description3",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Title",
      name: "title4",
    },
    {
      type: "string",
      label: "Description",
      name: "description4",
      ui: {
        component: "textarea",
      },
    },
  ],
};
