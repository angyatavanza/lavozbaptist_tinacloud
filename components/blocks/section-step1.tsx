import Image from "next/image";
import React from "react";
import { StepsSection } from "../steps-section";
import imageWhiteboard from "@/images/whiteboard.jpg";
import { TagList, TagListItem } from "../tag-list";
import type { Template } from 'tinacms';
import { iconSchema } from '@/tina/fields/icon';
import { tinaField } from "tinacms/dist/react";
import { PageBlocksStep1 } from '@/tina/__generated__/types';
import { TinaIcon } from '../icon';

//to-do 38: complete steps page
//to-do 39: add data.code + fix stylized image in steps page

export const Step1  = ({ data }: { data: PageBlocksStep1 }) => {
  return (
    <StepsSection title="Descubre" image={{ src: imageWhiteboard, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Ayudará a entender el funcionamiento básico de LA VOZ. Está diseñada para descubrir la misión de la iglesia, los valores fundamentales, y estrategia; ambas cosas ayudan a comprometerse en la expansión del reino en esta comunidad de fe. We work closely with our staff to understand their{" "}
          <strong className="font-semibold text-neutral-950">needs</strong> and
          goals, embedding ourselves in their every day operations to understand
          what makes their business tick.
        </p>
        <p>
          Our team of private investigators shadow the company director’s for
          several weeks while our account managers focus on going through their
          trash. Our senior security experts then perform social engineering
          hacks to gain access to their{" "}
          <strong className="font-semibold text-neutral-950">business</strong>
          accounts — handing that information over to our forensic accounting
          team.
        </p>
        <p>
          Once the full audit is complete, we report back with a comprehensive{" "}
          <strong className="font-semibold text-neutral-950">plan</strong> and,
          more importantly, a budget.
        </p>
      </div>
      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>In-depth questionnaires</TagListItem>
        <TagListItem>Feasibility studies</TagListItem>
        <TagListItem>Blood samples</TagListItem>
        <TagListItem>Employee surveys</TagListItem>
        <TagListItem>Proofs-of-concept</TagListItem>
        <TagListItem>Forensic audit</TagListItem>
      </TagList>
    </StepsSection>
  );
};

export const step1BlockSchema: Template = {
    name: "step1",
    label: "Step1",
    ui: {
        previewSrc: "/blocks/step1.png",
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