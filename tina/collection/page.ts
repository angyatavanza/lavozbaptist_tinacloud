import type { Collection } from "tinacms";
import { herocontentBlockSchema } from "@/components/blocks/section-herocontent";
import { bannerBlockSchema } from "@/components/blocks/section-banner";
import { teammemberBlockSchema } from "@/components/blocks/section-our-team";
import { profileBlockSchema } from "@/components/blocks/section-profile";
import { heroBlockSchema } from "@/components/blocks/landing-hero";
import { aboutsectionBlockSchema } from "@/components/blocks/section-about";
import { aboutusBlockSchema } from "@/components/blocks/landing-about-us";
import { contentBlockSchema } from "@/components/blocks/section-content";
import { ctaBlockSchema } from "@/components/blocks/landing-call-to-action";
import { connectionBlockSchema } from "@/components/blocks/landing-connect";
import { featureBlockSchema } from "@/components/blocks/section-features";
import { partnerBlockSchema } from "@/components/blocks/section-partners";
import { visionBlockSchema } from "@/components/blocks/section-vision";
import { groupBlockSchema } from "@/components/blocks/landing-groups";
import { videoBlockSchema } from "@/components/blocks/section-video";
import { calloutBlockSchema } from "@/components/blocks/section-callout";
import { freqaskedquestionsBlockSchema } from "@/components/blocks/section-faqcontent";
import { contentandimageBlockSchema } from "@/components/blocks/section-imgcontent";
import { contentandimagevariantBlockSchema } from "@/components/blocks/section-imgcontent2";
import { statsBlockSchema } from "@/components/blocks/landing-stats";
import { latesteventsBlockSchema } from "@/components/blocks/landing-latest-events";
import { latestmessagesBlockSchema } from "@/components/blocks/landing-latest-messages";
import { testimonialBlockSchema } from "@/components/blocks/section-testimonial";
import { missionBlockSchema } from "@/components/blocks/section-mission";
import { listcontentBlockSchema } from "@/components/blocks/section-listcontent";
import { step1BlockSchema } from "@/components/blocks/section-step1";
import { step2BlockSchema } from "@/components/blocks/section-step2";
import { step3BlockSchema } from "@/components/blocks/section-step3";
import { step4BlockSchema } from "@/components/blocks/section-step4";
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
        bannerBlockSchema,
        aboutsectionBlockSchema,
        aboutusBlockSchema,
        calloutBlockSchema,
        connectionBlockSchema,
        featureBlockSchema,
        groupBlockSchema,
        statsBlockSchema,
        latesteventsBlockSchema,
        latestmessagesBlockSchema,
        contentBlockSchema,
        ctaBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        herocontentBlockSchema,
        profileBlockSchema,
        teammemberBlockSchema,
        contentandimagevariantBlockSchema,
        freqaskedquestionsBlockSchema,
        contentandimageBlockSchema,
        visionBlockSchema,
        missionBlockSchema,
        listcontentBlockSchema,
        partnerBlockSchema,
        step1BlockSchema,
        step2BlockSchema,
        step3BlockSchema,
        step4BlockSchema,
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
              placeholder: "Enter your email",
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
              placeholder: "Enter your email",
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
              placeholder: "Enter your email",
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
              placeholder: "Enter your email",
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
