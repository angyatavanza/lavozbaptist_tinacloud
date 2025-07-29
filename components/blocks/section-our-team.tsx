import type { Template } from "tinacms";
import { PageBlocksTeammember, PageBlocksTeammemberTeammembers } from "@/tina/__generated__/types";
import { Section } from "@/components/layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { tinaField } from "tinacms/dist/react";
import { sectionBlockSchemaField } from '@/components/layout/section';

//to-do 96: update the ui of the teammembers block component in the /about page FRONTEND

export const TeamMember = ({ data }: { data: PageBlocksTeammember }) => {
  return (
    <Section  background={data.background!}>
      <div className="text-center">
        <h2 className="text-title text-3xl font-nunito font-medium" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
        <p className="text-body mt-6" data-tina-field={tinaField(data, 'description')}>{data.description}</p>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-12 gap-3.75 mx-6 md:mt-12">
        {data.teammembers?.map((teammember, index) => (
          <TeammemberCard key={index} teammember={teammember!} />
        ))}
      </div>
    </Section>
  );
};

const TeammemberCard = ({ teammember }: { teammember: PageBlocksTeammemberTeammembers }) => {
  return (
    <Card className="col-span-1 md:col-span-3 mb-6">
      <CardContent className="grid grid-cols-2 gap-3 pt-6">
        <Avatar className="size-9" data-tina-field={tinaField(teammember, 'avatar')}>
          {teammember.avatar && (
            <AvatarImage alt={teammember.coordinator!} src={teammember.avatar} loading="lazy" width="120" height="120" />
          )}
          <AvatarFallback>{teammember.coordinator!.split(" ").map((word) => word[0]).join("")}</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-nunito font-medium" data-tina-field={tinaField(teammember, 'coordinator')}>{teammember.coordinator}</h3>

          <span className="text-muted-foreground block text-sm tracking-wide" data-tina-field={tinaField(teammember, 'role')}>{teammember.role}</span>

          <blockquote className="mt-3" data-tina-field={tinaField(teammember, 'quote')}>
            <p className="text-gray-700 dark:text-gray-300">{teammember.quote}</p>
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
};

export const teammemberBlockSchema: Template = {
  name: "teammember",
  label: "Teammember",
  ui: {
    previewSrc: "/blocks/teammember.png",
    defaultItem: {
      teammembers: [
        {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          coordinator: "Phil Karlton",
        },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
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
      type: "object",
      list: true,
      label: "Teammembers",
      name: "teammembers",
      ui: {
        defaultItem: {
          quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
          coordinator: "Phil Karlton",
        },
        itemProps: (item) => {
          return {
            label: `${item.quote} - ${item.coordinator}`,
          };
        },
      },
      fields: [
        {
          type: "string",
          ui: {
            component: "textarea",
          },
          label: "Quote",
          name: "quote",
        },
        {
          type: "string",
          label: "Coordinator",
          name: "coordinator",
        },
        {
          type: "string",
          label: "Role",
          name: "role",
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar",
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
            {
              label: "Link",
              name: "link",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
