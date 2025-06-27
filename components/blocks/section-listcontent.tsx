import React from "react";
import { SectionIntro } from "../layout/section-intro";
import { Container } from "../container";
import { FadeIn } from "../fade-in";
import { StylizedImage } from "../ui/stylized-image";
import {List, ListItem } from "../list";
import type { Template } from 'tinacms';
import { iconSchema } from '@/tina/fields/icon';
import { tinaField } from "tinacms/dist/react";
import { TinaIcon } from '../icon';
import { PageBlocksListcontent } from "@/tina/__generated__/types";

export const Listcontent  = ({ data }: { data: PageBlocksListcontent }) => {
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
                src={"/whiteboard.jpg"}
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

export const listcontentBlockSchema: Template = {
    name: "listcontent",
    label: "Listcontent",
    ui: {
        previewSrc: "/blocks/listcontent.png",
        defaultItem: {
            title: "Start Building",
            description: "Get started with TinaCMS today and take your content management to the next level.",
            actions: [
                {
                    label: 'Get Started',
                    type: 'button',
                    link: '/',
                },
                {
                    label: 'Placeholder Button',
                    type: 'link',
                    link: '/',
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
            label: 'Actions',
            name: 'actions',
            type: 'object',
            list: true,
            ui: {
                defaultItem: {
                    label: 'Action Label',
                    type: 'button',
                    icon: true,
                    link: '/',
                },
                itemProps: (item) => ({ label: item.label }),
            },
            fields: [
                {
                    label: 'Label',
                    name: 'label',
                    type: 'string',
                },
                {
                    label: 'Type',
                    name: 'type',
                    type: 'string',
                    options: [
                        { label: 'Button', value: 'button' },
                        { label: 'Link', value: 'link' },
                    ],
                },
                iconSchema as any,
                {
                    label: 'Link',
                    name: 'link',
                    type: 'string',
                },
            ],
        },
    ],
};