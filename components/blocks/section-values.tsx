import React from "react";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksValues } from "@/tina/__generated__/types";
import { GridList, GridListItem } from "@/components/ui/grid-list";

export const Values = ({ data }: { data: PageBlocksValues }) => {
  return (
    <div className="mt-20 rounded-4xl bg-secondary-background-white py-20 md:mt-30 lg:mt-40 lg:py-30">
      <PageIntro
        data-tina-field={tinaField(data, "headline")}
        eyebrow="Nuestros valores"
        title={data.headline ?? "Valores" } 
    >
        <p data-tina-field={tinaField(data, "description")} className="mt-4">
          {data.description}
        </p>
      </PageIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Evangelismo">
            Extender el Reino de Dios a través de evangelismo y equipos
            misioneros. Se valora el evangelismo que sea para los de afuera de
            la iglesia. Creemos que “en tanto la iglesia no cumpla con su obra
            evangelizadora y misionera, no justifica su existencia” (Hch 1:8).
          </GridListItem>
          <GridListItem title="Atmósfera de Aceptación">
            Creemos que todas las personas son importantes para Dios y por lo
            tanto le deben importar a la iglesia. Como resultado la iglesia debe
            proyectar una atmósfera aceptación y amor al prójimo (Jn 3:16).
          </GridListItem>
          <GridListItem title="Comunicación con Dios">
            No dejar de comunicarnos con Dios a través de la oración. Se valora
            la espiritualidad. Creemos que la oración nos ayuda a alinear
            nuestra voluntad a la voluntad de Dios, por lo tanto, la oración es
            vital para nuestro crecimiento espiritual al buscar la voluntad de
            Dios en lo personal y como iglesia (1 Ts 5:17).
          </GridListItem>
          <GridListItem title="La Adoración Inspiradora">
            Se valora una adoración que sea auténtica, eficaz y de vivirla a cada
            día. Creemos en buscar el amor de Dios en nuestras vidas, como una
            evidencia que debemos tener a través de la verdadera adoración a Él.
            Creemos que podemos adorar a Dios en Espíritu y en verdad, a través
            de nuestra vida, y testimonio personal (Jn 4).
          </GridListItem>
          <GridListItem title="Variedad en Sus Ministerios">
            Se valoran los ministerios que sean compatibles para la gente y que
            se ajusten para los de la iglesia. Creemos que todos los ministerios
            “son una alta prioridad para la iglesia”. Ministerios comunitarios,
            ministerios con los niños, adolescentes, jóvenes, adultos, y los que
            la iglesia pueda implementar. Queremos ser un centro de
            evangelización, edificación y equipamiento que exista para motivar a
            ejercer los dones a través de los ministerios (Hch 2:42-46).
          </GridListItem>
          <GridListItem title="Enseñanza Bíblica (Grupos Pequeños)">
            Se valora la enseñanza bíblica a través de discipular en clases de
            crecimiento y en grupos pequeños. Creemos que el crecimiento
            espiritual en la vida se aprende mejor en estudios bíblicos en
            grupos pequeños. Creemos que cada creyente debería participar en los
            grupos pequeños de estudio bíblico para su crecimiento espiritual,
            así como para alcanzar a los que no se congregan. Y cumplir los
            propósitos dentro y fuera de la iglesia (Hch 2:46).
          </GridListItem>
          <GridListItem title="Orientados al Discipulado">
            Creemos en la completa devoción a Cristo, a través del discipulado
            como la norma para todo creyente. El llegar a ser como Jesús debe
            ser una prioridad para cada persona que se integra a la iglesia (Fil
            1:6).
          </GridListItem>
        </GridList>
      </Container>
    </div>
  );
};

export const valuesBlockSchema: Template = {
  name: "values",
  label: "Values",
  ui: {
    previewSrc: "/blocks/values.png",
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
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea",
      },
    },
  ],
};
