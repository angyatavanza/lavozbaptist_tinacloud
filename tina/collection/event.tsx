import React from 'react';
import { videoBlockSchema } from '@/components/blocks/video';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Collection } from 'tinacms';
import { iconSchema } from '../fields/icon';

const Event: Collection = {
  label: 'Eventos',
  name: 'event',
  path: 'content/events',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      return `/events/${document._sys.breadcrumbs.join('/')}`;
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      isTitle: true,
      required: true,
    },
    {
      type: 'image',
      name: 'heroImg',
      label: 'Hero Image',
      // @ts-ignore
      uploadDir: () => "events",
    },
    {
      type: 'rich-text',
      label: 'Description',
      name: 'description',
      overrides: {
        toolbar: ['bold', 'italic', 'link'],
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
    {
      type: 'datetime',
      label: 'Event Date',
      name: 'date',
      ui: {
        dateFormat: 'MMMM DD YYYY',
        timeFormat: 'hh:mm A',
      },
    },

    {
      type: 'rich-text',
      label: 'Location',
      name: 'location',
      required: true,
    },
    {
      type: 'reference',
      label: 'Author',
      name: 'author',
      collections: ['author'],
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
                {avatar && (
                  <AvatarImage
                    src={avatar}
                    alt={`${name} Profile`}
                  />
                )}
                <AvatarFallback>
                  {name
                    .split(' ')
                    .map((part) => part[0]?.toUpperCase() || '')
                    .join('')}
                </AvatarFallback>
              </Avatar>
              {name}
            </p>
          );
        },
      }
    },
    {
      type: 'datetime',
      label: 'Posted Date',
      name: 'posteddate',
      ui: {
        dateFormat: 'MMMM DD YYYY',
        timeFormat: 'hh:mm A',
      },
    },
    {
      type: 'string',
      label: 'Address Url',
      name: 'addressurl',
    },
    {
      type: 'object',
      label: 'Tags',
      name: 'tags',
      list: true,
      fields: [
        {
          type: 'reference',
          label: 'Tag',
          name: 'tag',
          collections: ['tag'],
          ui: {
            optionComponent: (
              props: {
                name?: string;
              },
              _internalSys: { path: string }
            ) => props.name || _internalSys.path
          },
        },
      ],
      ui: {
        itemProps: (item) => {
          return { label: item?.tag };
        },
      }
    },
    {
      type: 'rich-text',
      label: 'Body',
      name: '_body',
      templates: [
        {
          name: 'BlockQuote',
          label: 'Block Quote',
          fields: [
            {
              name: 'children',
              label: 'Quote',
              type: 'rich-text',
              overrides: {
                toolbar: ['bold', 'italic', 'link'],
              },
            },
            {
              name: 'authorName',
              label: 'Author',
              type: 'string',
            },
          ],
        },
        {
          name: 'DateTime',
          label: 'Date & Time',
          inline: true,
          fields: [
            {
              name: 'format',
              label: 'Format',
              type: 'string',
              options: ['utc', 'iso', 'local'],
            },
          ],
        },
        {
          name: 'NewsletterSignup',
          label: 'Newsletter Sign Up',
          fields: [
            {
              name: 'children',
              label: 'CTA',
              type: 'rich-text',
            },
            {
              name: 'placeholder',
              label: 'Placeholder',
              type: 'string',
            },
            {
              name: 'buttonText',
              label: 'Button Text',
              type: 'string',
            },
            {
              name: 'disclaimer',
              label: 'Disclaimer',
              type: 'rich-text',
              overrides: {
                toolbar: ['bold', 'italic', 'link'],
              },
            },
          ],
          ui: {
            defaultItem: {
              placeholder: 'Enter your email',
              buttonText: 'Notify Me',
            },
          },
        },
        videoBlockSchema,
      ],
      isBody: true,
    },
  ],
};

export default Event;
