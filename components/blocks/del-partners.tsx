import Image from "next/image";
import { Container } from "@/components/layout/container";
import { FadeIn, FadeInStagger } from "../motion-primitives/fade-in";
import React from "react";
import type { Template } from 'tinacms';
import { PageBlocksPartner } from "@/tina/__generated__/types";
////to-do 74: update the ui of the features block component in the /serve+service-times page FRONTEND
//to-do 100: add data.title + data.description + data.actions to partners component TINA CMS/BACKEND
type PartnerMember = [string, string];

const partnerMembers: PartnerMember[] = [
  ["Pastor Hugo","/partner/green-life/logo-light.svg"],
  ["Family Fund", "/partner/home-work/logo-light.svg"],
  ["Unseal", "/partner/home-work/logo-light.svg"],
  ["Mail Smirk", "/partner/home-work/logo-light.svg"],
  ["Home Work", "/partner/home-work/logo-light.svg"],
  ["Green Life","/partner/home-work/logo-light.svg"],
  ["Bright Path", "/partner/home-work/logo-light.svg"],
  ["North Adventures", "/partner/home-work/logo-light.svg"],
];

export const Partner = ({ data }: { data: PageBlocksPartner }) => {
  return (
    <div className="mt-24 rounded-4xl bg-primary py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-nunito font-medium tracking-wider text-white sm:text-left">
            ¡Bienvenidos a la Iglesia La Voz! Nuestros servicios dominicales
            ofrecen adoración y enseñanza bíblica para todas las edades. Desde
            niños hasta adultos, somos una comunidad apasionada por conectar la
            gente con su fe.
          </h2>
          <div className="h-px flex-auto bg-primary-muted-2" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {partnerMembers.map(([partner, logo]) => (
              <li key={partner}>
                <FadeIn>
                  <Image src={logo} alt={partner} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  );
};

export const partnerBlockSchema: Template = {
    name: "partner",
    label: "Partner",
    ui: {
        previewSrc: "/blocks/partner.png",
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
                {
                    label: 'Link',
                    name: 'link',
                    type: 'string',
                },
            ],
        },
    ],
};