import Image from "next/image";
import React from "react";
import { StepsSection } from "../steps-section";
import imageMeeting from "@/images/church/congregation-IMG-1140.jpg";
import type { Template } from 'tinacms';
import { iconSchema } from '@/tina/fields/icon';
import { tinaField } from "tinacms/dist/react";
import { PageBlocksStep4 } from '@/tina/__generated__/types';
import { TinaIcon } from '../icon';
import { List, ListItem } from "../list";

export const Step4  = ({ data }: { data: PageBlocksStep4 }) => {
  return (
    <StepsSection title="Transforma tu vida" image={{ src: imageMeeting, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Ayudará a desarrollar un estilo de vida que glorifique a Dios
          compartiendo su{" "}
          <strong className="font-semibold text-neutral-950">amor</strong>.
          También podrás descubrir el propósito de tu vida e integrarte al
          equipo de trabajo para llevar acabo tu misión de vida.
        </p>
        {/* Longer description
        <p>
          Despite largely using pre-built components, most of the{" "}
          <strong className="font-semibold text-neutral-950">progress</strong>{" "}
          on each project takes place in the final 24 hours. The development
          time allocated to each client is actually spent making augmented
          reality demos that go viral on Twitter.
        </p>
        <p>
          We ensure that the main pages of the site are{" "}
          <strong className="font-semibold text-neutral-950">
            fully functional
          </strong>{" "}
          at launch — the auxiliary pages will, of course, be lorem ipusm shells
          which get updated as part of our exorbitant{" "}
          <strong className="font-semibold text-neutral-950">
            maintenance
          </strong>{" "}
          retainer.
        </p>
        */}
      </div>
      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List>
        <ListItem title="Testing">
          Our projects always have 100% test coverage, which would be impressive
          if our tests weren’t as porous as a sieve.
        </ListItem>
        <ListItem title="Infrastructure">
          To ensure reliability we only use the best Digital Ocean droplets that
          $4 a month can buy.
        </ListItem>
        <ListItem title="Support">
          Because we hold the API keys for every critical service your business
          uses, you can expect a lifetime of support, and invoices, from us.
        </ListItem>
      </List>
    </StepsSection>
  );
};


export const step4BlockSchema: Template = {
    name: "step4",
    label: "Step4",
    ui: {
        previewSrc: "/blocks/step4.png",
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