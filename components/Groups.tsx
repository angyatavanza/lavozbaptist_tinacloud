import React from "react";
import { SectionIntro } from "./layout/SectionIntro";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";
import { StylizedImage } from "./StylizedImage";
import imageLaptop from "../images/church/congregation-IMG-1038.jpg";
import {List, ListItem } from "./List";

export const Groups: React.FC = () => {
  return (
    <>
      <SectionIntro
        eyebrow="Grupos"
        title="Fuimos creados para estar en comunidad unos con otros."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Nunca es el plan de Dios que nos sintamos aislados y solos.
          El propósito detrás de los ministerios de La Voz es ayudarte a encontrar conexiónes significativas que te invitan a ser realmente honesto acerca de lo que está sucediendo en tu vida y en tu corazón. En La Voz, ofrecemos cinco experiencias de 
          grupo: Misiones, Mujeres, Varones, Jovenes, y Kids.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                alt=""
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Misiones">
              El ministerio, Misiones La Voz, comparte el amor de Jesús, suple necesidades físicas y apoya el inicio de siembra de Iglesias en diferentes países.
            </ListItem>
            <ListItem title="Mujeres">
              El ministerio, Mujeres La Voz, nace en el corazón de Dios para edificar la vida emocional y espiritual de las mujeres.
            </ListItem>
            <ListItem title="Varones">
              El ministerio, Varones La Voz, nace en el corazón de Dios para edificar la vida emocional y espiritual de los varones.
            </ListItem>
            <ListItem title="Jóvenes">
              El ministerio, Jóvenes La Voz, nace en el corazón de Dios para edificar la vida emocional y espiritual de las jóvenes.
            </ListItem>
            <ListItem title="Kids">
              El ministerio, Kids La Voz, nace en el corazón de Dios para edificar la vida emocional y espiritual de las kids.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  );
};

//export default Groups;
