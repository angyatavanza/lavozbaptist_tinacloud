import type { Collection } from "tinacms";
import { herocontentBlockSchema } from "@/components/blocks/section-herocontent";
import { ctalinkBlockSchema } from "@/components/blocks/section-cta-links";
import { tapdotlinkBlockSchema } from "@/components/blocks/section-tapdot-links";
import { teammemberBlockSchema } from "@/components/blocks/section-our-team";
import { profileBlockSchema } from "@/components/blocks/section-profile";
import { heroBlockSchema } from "@/components/blocks/landing-hero";
import { herodonationBlockSchema } from "@/components/blocks/section-herodonation";
import { aboutsectioninfoBlockSchema } from "@/components/blocks/section-about";
import { aboutusBlockSchema } from "@/components/blocks/landing-about-us";
import { contentBlockSchema } from "@/components/blocks/section-content";
import { ctaBlockSchema } from "@/components/blocks/section-call-to-action";
import { connectionBlockSchema } from "@/components/blocks/landing-connect";
import { featureBlockSchema } from "@/components/blocks/section-features";
import { leadershipBlockSchema } from "@/components/blocks/section-leadership";
import { visionBlockSchema } from "@/components/blocks/section-vision";
import { groupinfoBlockSchema } from "@/components/blocks/landing-groups";
import { videoBlockSchema } from "@/components/blocks/section-video";
import { calloutBlockSchema } from "@/components/blocks/landing-callout";
import { freqaskedquestionsBlockSchema } from "@/components/blocks/landing-faqcontent";
import { contentandimageBlockSchema } from "@/components/blocks/section-imgcontent";
import { contentandimagevariantBlockSchema } from "@/components/blocks/section-imgcontent2";
import { latesteventsBlockSchema } from "@/components/blocks/landing-latest-events";
import { latestmessagesBlockSchema } from "@/components/blocks/landing-latest-messages";
import { groupBlockSchema } from "@/components/blocks/section-groups";
import { valuesBlockSchema } from "@/components/blocks/section-values";
import { listcontentBlockSchema } from "@/components/blocks/section-listcontent";
import { nextstepsBlockSchema } from "@/components/blocks/section-first-steps";
import { contactsectionBlockSchema } from "@/components/blocks/section-contact";


const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join("/");
      if (filepath === "home") {
        return "/";
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections", 
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        ctalinkBlockSchema,
        tapdotlinkBlockSchema,
        aboutsectioninfoBlockSchema,
        aboutusBlockSchema,
        calloutBlockSchema,
        connectionBlockSchema,
        featureBlockSchema,
        groupinfoBlockSchema,
        latesteventsBlockSchema,
        latestmessagesBlockSchema,
        contentBlockSchema,
        ctaBlockSchema,
        groupBlockSchema,
        videoBlockSchema,
        herocontentBlockSchema,
        herodonationBlockSchema,
        profileBlockSchema,
        teammemberBlockSchema,
        contentandimagevariantBlockSchema,
        freqaskedquestionsBlockSchema,
        contentandimageBlockSchema,
        visionBlockSchema,
        valuesBlockSchema,
        listcontentBlockSchema,
        leadershipBlockSchema,
        nextstepsBlockSchema,
        contactsectionBlockSchema,
      ],
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
          name: "FTVisitorSignup",
          label: "FTVisitor Sign Up",
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
        {
          name: "ResourcesSignup",
          label: "Resources Sign Up",
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
        {
          name: "ServeSignup",
          label: "Serve Sign Up",
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
        {
          name: "PrayerSignup",
          label: "Prayer Sign Up",
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
        {
          name: "ContactSignup",
          label: "Contact Sign Up",
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

export default Page;
