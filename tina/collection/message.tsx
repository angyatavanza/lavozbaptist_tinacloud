import React from "react";
import { videoBlockSchema } from "@/components/blocks/section-video";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Collection } from "tinacms";

const Message: Collection = {
  label: "Mensajes Recientes",
  name: "message",
  path: "content/messages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/messages/${document._sys.breadcrumbs.join("/")}`;
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Color',
      name: 'color',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Tint', value: 'tint' },
        { label: 'Primary', value: 'primary' },
      ],
    },
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      // @ts-ignore
      uploadDir: () => "messages",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description:
            "If using a YouTube video, make sure to use the embed version of the video URL",
        },
        {
          type: 'boolean',
          label: 'Embeddable',
          name: 'embeddable',
        },
        {
          type: 'boolean',
          label: 'Auto Play',
          name: 'autoPlay',
        },
        {
          type: 'boolean',
          label: 'Loop',
          name: 'loop',
        },
      ],
    },
    {
      type: "rich-text",
      label: "Excerpt",
      name: "excerpt",
      overrides: {
        toolbar: ["bold", "italic", "link"],
      },
    },
    {
      type: "reference",
      label: "Coordinator",
      name: "coordinator",
      collections: ["coordinator"],
      ui: {
        optionComponent: (
          props: {
            name?: string;
            avatar: string;
          },
          _internalSys: { path: string }
        ) => {
          const { name, avatar } = props;
          if (!name) return _internalSys.path;

          return (
            <p className="flex min-h-8 items-center gap-4">
              <Avatar>
                {avatar && <AvatarImage src={avatar} alt={`${name} Profile`} />}
                <AvatarFallback>
                  {name
                    .split(" ")
                    .map((part) => part[0]?.toUpperCase() || "")
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {name}
            </p>
          );
        },
      },
    },
    {
      type: "datetime",
      label: "Posted Date",
      name: "date",
      required: true, //this is required to display the event date in the frontend
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A",
      },
    },
    {
      type: "object",
      label: "Tags",
      name: "tags",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Tag",
          name: "tag",
          collections: ["tag"],
          ui: {
            optionComponent: (
              props: {
                name?: string;
              },
              _internalSys: { path: string }
            ) => props.name || _internalSys.path,
          },
        },
      ],
      ui: {
        itemProps: (item) => {
          return { label: item?.tag };
        },
      },
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"],
              },
            },
            {
              name: "coordinatorName",
              label: "Coordinator",
              type: "string",
            },
          ],
        },
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"],
            },
          ],
        },
        {
          name: "ContactSignup",
          label: "Newsletter Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text",
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string",
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string",
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"],
              },
            },
          ],
          ui: {
            defaultItem: {
              placeholder: "",
              buttonText: "Notify Me",
            },
          },
        },
        videoBlockSchema,
      ],
      isBody: true,
    },
  ],
};

export default Message;
