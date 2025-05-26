import type { Template } from "tinacms";
import { PageBlocksSermon, PageBlocksSermonSermons } from "../../tina/__generated__/types";
import { Section } from "../layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { tinaField } from "tinacms/dist/react";
import { sectionBlockSchemaField } from '../layout/section';

export const Sermon = ({ data }: { data: PageBlocksSermon }) => {
  return (
    <Section  background={data.background!}>
      <div className="text-center">
        <h2 className="text-title text-3xl font-semibold" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
        <p className="text-body mt-6" data-tina-field={tinaField(data, 'description')}>{data.description}</p>
      </div>
      <div className="mt-8 [column-width:300px] [column-gap:1.5rem] md:mt-12">
        {data.sermons?.map((sermon, index) => (
          <SermonCard key={index} sermon={sermon!} />
        ))}
      </div>
    </Section>
  );
};

const SermonCard = ({ sermon }: { sermon: PageBlocksSermonSermons }) => {
  return (
    <Card className="mb-6 break-inside-avoid">
      <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
        <Avatar className="size-9" data-tina-field={tinaField(sermon, 'avatar')}>
          {sermon.avatar && (
            <AvatarImage alt={sermon.author!} src={sermon.avatar} loading="lazy" width="120" height="120" />
          )}
          <AvatarFallback>{sermon.author!.split(" ").map((word) => word[0]).join("")}</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-medium" data-tina-field={tinaField(sermon, 'author')}>{sermon.author}</h3>

          <span className="text-muted-foreground block text-sm tracking-wide" data-tina-field={tinaField(sermon, 'role')}>{sermon.role}</span>

          <blockquote className="mt-3" data-tina-field={tinaField(sermon, 'quote')}>
            <p className="text-gray-700 dark:text-gray-300">{sermon.quote}</p>
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
};

export const sermonBlockSchema: Template = {
  name: "sermon",
  label: "Sermon",
  ui: {
    previewSrc: "/blocks/sermon.png",
    defaultItem: {
      sermons: [
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
      label: "Sermons",
      name: "sermons",
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
