import React from "react";
import { SectionIntro } from "../layout/section-intro";
import { Container } from "../container";
import type { Template } from "tinacms";
import { iconSchema } from "@/tina/fields/icon";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksMission } from "@/tina/__generated__/types";
import { TinaIcon } from "../icon";
import Link from "next/link";
import { Button } from "../ui/button";
import { AnimatedGroup } from "../motion-primitives/animated-group";
import { GridList, GridListItem } from "../grid-list";

//Done 19: add data.code

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

export const Mission = ({ data }: { data: PageBlocksMission }) => {
  return (
    <div className="mt-24 rounded-4xl bg-purple-800 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Nuestra Misión"
        title="Alcanzamos Personas para Cristo"
        invert
      >
        <h2
          data-tina-field={tinaField(data, "title")}
          className="text-balance text-4xl font-semibold lg:text-5xl"
        >
          {data.title}
        </h2>
        <p data-tina-field={tinaField(data, "description")} className="mt-4">
          {data.description}Nos dedicamos a alcanzar personas para Cristo,
          guiarlos a servir, adorar y tener una vida consagrada para Dios.
        </p>
      </SectionIntro>

      <Container className="mt-16">
        <SectionIntro eyebrow="Nuestros Valores:" title="" invert />
        <GridList>
          <GridListItem title="Evangelismo" invert>
            Extender el Reino de Dios a través de evangelismo y equipos
            misioneros. Se valora el evangelismo que sea para los de afuera de
            la iglesia. Creemos que “en tanto la iglesia no cumpla con su obra
            evangelizadora y misionera, no justifica su existencia” (Hch 1:8).
          </GridListItem>
          <GridListItem title="Atmósfera de Aceptación" invert>
            Creemos que todas las personas son importantes para Dios y por lo
            tanto le deben importar a la iglesia. Como resultado la iglesia debe
            proyectar una atmósfera aceptación y amor al prójimo (Jn 3:16).
          </GridListItem>
          <GridListItem title="Orientados al Discipulado" invert>
            Creemos en la completa devoción a Cristo, a través del discipulado
            como la norma para todo creyente. El llegar a ser como Jesús debe
            ser una prioridad para cada persona que se integra a la iglesia (Fil
            1:6).
          </GridListItem>
        </GridList>
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
      </Container>

      <Container className="mt-16">
        <GridList>
          <GridListItem title="Comunicación con Dios" invert>
            No dejar de comunicarnos con Dios a través de la oración. Se valora
            la espiritualidad. Creemos que la oración nos ayuda a alinear
            nuestra voluntad a la voluntad de Dios, por lo tanto, la oración es
            vital para nuestro crecimiento espiritual al buscar la voluntad de
            Dios en lo personal y como iglesia (1 Ts 5:17).
          </GridListItem>
          <GridListItem title="La Adoración Inspiradora" invert>
            Se valora una adoración que se autentica, eficaz y de vivirla a cada
            día. Creemos en buscar el amor de Dios en nuestras vidas, como una
            evidencia que debemos tener a través de la verdadera adoración a Él.
            Creemos que podemos adorar a Dios en Espíritu y en verdad, a través
            de nuestra vida, y testimonio personal (Jn 4).
          </GridListItem>
        </GridList>
      </Container>

      <Container className="mt-16">
        <GridList>
          <GridListItem title="Variedad en Sus Ministerios" invert>
            Se valoran los ministerios que sean compatibles para la gente y que
            se ajusten para los de la iglesia. Creemos que todos los ministerios
            “son una alta prioridad para la iglesia”. Ministerios comunitarios,
            ministerios con los niños, adolescentes, jóvenes, adultos, y los que
            la iglesia pueda implementar. Queremos ser un centro de
            evangelización, edificación y equipamiento que exista para motivar a
            ejercer los dones a través de los ministerios (Hch 2:42-46).
          </GridListItem>
          <GridListItem title="Enseñanza Bíblica (Grupos Pequeños)" invert>
            Se valora la enseñanza bíblica a través de discipular en clases de
            crecimiento y en grupos pequeños. Creemos que el crecimiento
            espiritual en la vida se aprende mejor en estudios bíblicos en
            grupos pequeños. Creemos que cada creyente debería participar en los
            grupos pequeños de estudio bíblico para su crecimiento espiritual,
            así como para alcanzar a los que no se congregan. Y cumplir los
            propósitos dentro y fuera de la iglesia (Hch 2:46).
          </GridListItem>
        </GridList>
      </Container>
    </div>
  );
};

export const missionBlockSchema: Template = {
  name: "mission",
  label: "Mission",
  ui: {
    previewSrc: "/blocks/mission.png",
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
