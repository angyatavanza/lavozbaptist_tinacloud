import React from 'react';
import { videoBlockSchema } from '@/components/blocks/section-video';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Collection } from 'tinacms';

const Contact: Collection = {
  label: 'Mensajes Recientes',
  name: 'contact',
  path: 'content/contacts',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      return `/contacts/${document._sys.breadcrumbs.join('/')}`;
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
      type: 'datetime',
      label: 'Posted Date',
      name: 'date',
      ui: {
        dateFormat: 'MMMM DD YYYY',
        timeFormat: 'hh:mm A',
      },
    },
    ],
};

export default Contact;