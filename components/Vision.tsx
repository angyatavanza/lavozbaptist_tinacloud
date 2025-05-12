import Image from "next/image";
import React, { ReactNode } from "react";
import GridPattern from "./GridPattern";
import { SectionIntro } from "./layout/SectionIntro";
import { Container } from "./Container";
import { GridList, GridListItem } from "./GridList";

// Define the functional component with React.FC
export const Vision: React.FC = () => {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-purple-800/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>
      <SectionIntro eyebrow="Nuestra Visión" title="titulo">
        <p>
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
      </Container>
    </div>
  );
};