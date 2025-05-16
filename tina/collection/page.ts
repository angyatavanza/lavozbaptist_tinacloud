import type { Collection } from 'tinacms';
import { herocontentBlockSchema } from '@/components/blocks/hero-content';
import { bannerBlockSchema } from '@/components/blocks/banner';
import { teammemberBlockSchema } from '@/components/blocks/our-team';
import { profileBlockSchema } from '@/components/blocks/profile-section';
import { heroBlockSchema } from '@/components/blocks/hero';
import { aboutBlockSchema } from '@/components/blocks/about';
import { missionBlockSchema } from '@/components/blocks/mission';
import { contentBlockSchema } from '@/components/blocks/content';
import { sermonBlockSchema } from '@/components/blocks/sermon';
import { featureBlockSchema } from '@/components/blocks/features';
import { groupBlockSchema } from '@/components/blocks/groups';
import { videoBlockSchema } from '@/components/blocks/video';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { contentwithlistBlockSchema } from '@/components/blocks/content-list';
import { contentandimageBlockSchema } from '@/components/blocks/content-img';
import { contentandimagevariantBlockSchema } from '@/components/blocks/content-img2';
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
        bannerBlockSchema,
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
        herocontentBlockSchema,
        profileBlockSchema,
        teammemberBlockSchema,
        contentandimagevariantBlockSchema,
        contentwithlistBlockSchema,
        contentandimageBlockSchema
      ],
    },
  ],
};

export default Page;
