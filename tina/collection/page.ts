import type { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { aboutBlockSchema } from '@/components/blocks/aboutus';
import { missionBlockSchema } from '@/components/blocks/mission';
import { contentBlockSchema } from '@/components/blocks/content';
import { sermonBlockSchema } from '@/components/blocks/sermon';
import { featureBlockSchema } from '@/components/blocks/features';
import { groupBlockSchema } from '@/components/blocks/groups';
import { videoBlockSchema } from '@/components/blocks/video';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { eventsBlockSchema } from '@/components/blocks/events';
import { ctaBlockSchema } from '@/components/blocks/call-to-action';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      if (filepath === 'home') {
        return '/';
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        aboutBlockSchema,
        missionBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        groupBlockSchema,
        eventsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        sermonBlockSchema,
        videoBlockSchema,
      ],
    },
  ],
};

export default Page;
