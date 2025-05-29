import { Container } from "../container";
import { FadeIn } from "../fade-in";
import { Button } from "../ui/second-button";
import { ServiceTimes } from "../service-times";
import { iconSchema } from '@/tina/fields/icon';
import { tinaField } from "tinacms/dist/react";
import type { Template } from 'tinacms';
import { PageBlocksContactsection } from "@/tina/__generated__/types";

//to-do 16: add data.code 
//to-do 17: change button and text

export const ContactSection = ({ data }: { data: PageBlocksContactsection}) => {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-purple-800 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
            Comunícate con nuestro equipo
          </h2>
          <div className="mt-6 flex">
            <Button href="/contact" invert //href={"/contact"} 
            >
              Say Hello
            </Button>
            
          </div>
          <div className="mt-10 border-t border-white/10 pt-10">
            <h3 className="font-display text-base font-semibold text-white">
              Nuestra ubicacion y tiempos de servicios
            </h3>
            <ServiceTimes
              invert
              className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
            />
          </div>
        </div>
      </FadeIn>
    </Container>
  );
};


export const contactsectionBlockSchema: Template = {
    name: "contactsection",
    label: "Contactsection",
    ui: {
        previewSrc: "/blocks/contactsection.png",
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