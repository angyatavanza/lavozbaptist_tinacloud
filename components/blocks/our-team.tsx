import type { Template } from "tinacms";
import { PageBlocksTeammember, PageBlocksTeammemberTeammembers } from "../../tina/__generated__/types";
import { Section } from "../layout/Section";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { tinaField } from "tinacms/dist/react";
import { sectionBlockSchemaField } from '../layout/Section';

export const Teammember = ({ data }: { data: PageBlocksTeammember }) => {
  return (
    <Section  background={data.background!}>
      <div className="text-center">
        <h2 className="text-title text-3xl font-semibold" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
        <p className="text-body mt-6" data-tina-field={tinaField(data, 'description')}>{data.description}</p>
      </div>
      <div className="mt-8 [column-width:300px] [column-gap:1.5rem] md:mt-12">
        {data.teammembers?.map((teammember, index) => (
          <TeammemberCard key={index} teammember={teammember!} />
        ))}
      </div>
    </Section>
  );
};

const TeammemberCard = ({ teammember }: { teammember: PageBlocksTeammemberTeammembers }) => {
  return (
    <Card className="mb-6 break-inside-avoid">
      <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
        <Avatar className="size-9" data-tina-field={tinaField(teammember, 'avatar')}>
          {teammember.avatar && (
            <AvatarImage alt={teammember.author!} src={teammember.avatar} loading="lazy" width="120" height="120" />
          )}
          <AvatarFallback>{teammember.author!.split(" ").map((word) => word[0]).join("")}</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-medium" data-tina-field={tinaField(teammember, 'author')}>{teammember.author}</h3>

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
          author: "Phil Karlton",
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
          author: "Phil Karlton",
        },
        itemProps: (item) => {
          return {
            label: `${item.quote} - ${item.author}`,
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
          label: "Author",
          name: "author",
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
        }
      ],
    },
  ],
};
