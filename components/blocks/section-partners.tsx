import Image, { StaticImageData } from "next/image";
import logoBrightPath from "../../images/partner/bright-path/logo-light.svg";
import logoFamilyFund from "../../images/partner/family-fund/logo-light.svg";
import logoGreenLife from "../../images/partner/green-life/logo-light.svg";
import logoHomeWork from "../../images/partner/home-work/logo-light.svg";
import logoMailSmirk from "../../images/partner/mail-smirk/logo-light.svg";
import logoNorthAdventures from "../../images/partner/north-adventures/logo-light.svg";
import logoPhobiaLight from "../../images/partner/phobia/logo-light.svg";
import logoUnseal from "../../images/partner/unseal/logo-light.svg";
import { Container } from "../container";
import { FadeIn, FadeInStagger } from "../fade-in";
import React, { ReactElement } from "react";
import type { Template } from 'tinacms';
import { iconSchema } from '@/tina/fields/icon';
import { tinaField } from "tinacms/dist/react";
import { PageBlocksPartner } from "@/tina/__generated__/types";
import { TinaIcon } from '../icon';
//to-do 57: add data.title + data.description + data.actions
type PartnerMember = [string, StaticImageData];

const partnerMembers: PartnerMember[] = [
  ["Pastor Hugo", logoPhobiaLight],
  ["Family Fund", logoFamilyFund],
  ["Unseal", logoUnseal],
  ["Mail Smirk", logoMailSmirk],
  ["Home Work", logoHomeWork],
  ["Green Life", logoGreenLife],
  ["Bright Path", logoBrightPath],
  ["North Adventures", logoNorthAdventures],
];

export const Partner = ({ data }: { data: PageBlocksPartner }) => {
  return (
    <div className="mt-24 rounded-4xl bg-purple-800 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            ¡Bienvenidos a la Iglesia La Voz! Nuestros servicios dominicales
            ofrecen adoración y enseñanza bíblica para todas las edades. Desde
            niños hasta adultos, somos una comunidad apasionada por conectar la
            gente con su fe.
          </h2>
          <div className="h-px flex-auto bg-purple-600" />
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
                    label: 'Book Demo',
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