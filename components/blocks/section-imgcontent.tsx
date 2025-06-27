import type { Template } from "tinacms";
import { PageBlocksContentandimage, PageBlocksContentandimageContentandimages } from "../../tina/__generated__/types";
import { Section } from "../layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { tinaField } from "tinacms/dist/react";
import { sectionBlockSchemaField } from '../layout/section';

//done 36: add needed blocks to serve page
//done 50: serve page: add button to mission trips, change the field name in the template for contentandimage contentandimagevariant
//to-do 38: add needed blocks + content to groups page TINA CMS/CONTENT
export const ContentAndImage = ({ data }: { data: PageBlocksContentandimage }) => {
  return (
    <Section  background={data.background!}>
      <div className="text-center">
        <h2 className="text-title text-3xl font-semibold" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
        <p className="text-body mt-6" data-tina-field={tinaField(data, 'description')}>{data.description}</p>
      </div>
      <div className="mt-8 [column-width:300px] [column-gap:1.5rem] md:mt-12">
        {data.contentandimages?.map((contentandimage, index) => (
          <ContentandimageCard key={index} contentandimage={contentandimage!} />
        ))}
      </div>
    </Section>
  );
};

const ContentandimageCard = ({ contentandimage }: { contentandimage: PageBlocksContentandimageContentandimages }) => {
  return (
    <Card className="mb-6 break-inside-avoid">
      <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
        <div  data-tina-field={tinaField(contentandimage, 'img')}>
          {contentandimage.img && (
            <Image alt={contentandimage.quotetitle!} src={contentandimage.img} loading="lazy" width="120" height="120" />
          )}
        </div>
        <div>
          <h3 className="font-medium" data-tina-field={tinaField(contentandimage, 'quotetitle')}>{contentandimage.quotetitle}</h3>

          <span className="text-muted-foreground block text-sm tracking-wide" data-tina-field={tinaField(contentandimage, 'requirements')}>{contentandimage.requirements}</span>

          <blockquote className="mt-3" data-tina-field={tinaField(contentandimage, 'quote')}>
            <p className="text-gray-700 dark:text-gray-300">{contentandimage.quote}</p>
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
};

export const contentandimageBlockSchema: Template = {
  name: "contentandimage",
  label: "Contentandimage",
  ui: {
    previewSrc: "/blocks/contentandimage.png",
    defaultItem: {
      contentandimages: [
        {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          quotetitle: "Phil Karlton",
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
      label: "Contentandimages",
      name: "contentandimages",
      ui: {
        defaultItem: {
          quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
          quotetitle: "Phil Karlton",
        },
        itemProps: (item) => {
          return {
            label: `${item.quote} - ${item.quotetitle}`,
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
          label: "Quote Title",
          name: "quotetitle",
        },
        {
          type: "string",
          label: "Requirements",
          name: "requirements",
        },
        {
          type: "image",
          label: "Image",
          name: "img",
        }
      ],
    },
  ],
};
