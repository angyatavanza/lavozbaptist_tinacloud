import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { FadeIn, FadeInStagger } from "../motion-primitives/fade-in";
import type { Template } from "tinacms";
import { Button } from "@/components/ui/button";
import { tinaField } from "tinacms/dist/react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { PageBlocksLeadership } from "@/tina/__generated__/types";
import { Transition } from "motion/react";
////to-do 74: update the ui of the features block component in the /serve+service-times page FRONTEND
//to-do 100: add data.title + data.description + data.actions to leaderships component TINA CMS/BACKEND
const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      } as Transition,
    },
  },
};

type LeadershipMember = [string, string];

const leadershipMembers: LeadershipMember[] = [
  ["Pastor Hugo", "/leadership/green-life/logo-light.svg"],
];

export const Leadership = ({ data }: { data: PageBlocksLeadership }) => {
  return (
    <div className="mt-24 rounded-4xl bg-primary py-20 md:mt-32 md:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2
            className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#15171A] leading-[1.4] text-center px-4 font-nunito"
            data-tina-field={tinaField(data, "title")}
            >
              {data.title}
          </h2>
          <div className="h-px flex-auto bg-primary-muted-2" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-3.75 md:grid-cols-12"
          >
            {leadershipMembers.map(([leadership, logo]) => (
              <li key={leadership} className="col-span-1 md:col-span-3">
                <FadeIn>
                  <Image 
                    src={logo}
                    alt={leadership}
                    width={120}
                    height={64}
                    unoptimized 
                    />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
        {/* Actions */}
        <AnimatedGroup
          variants={transitionVariants}
          className="flex flex-col items-center justify-center gap-2 md:gap-2 md:flex-row"
        >
          {data.actions &&
            data.actions.map((action) => (
              <div
                key={action!.label}
                data-tina-field={tinaField(action)}
                className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-[0.4px] w-full md:w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  variant={action!.type === "link" ? "outline" : "default"}
                  className="rounded-xl py-[1.1px] md:py-[3.6px] w-full md:w-auto"
                >
                  <Link href={action!.link!}>
                    <span className="text-nowrap">{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
        </AnimatedGroup>
      </Container>
    </div>
  );
};

export const leadershipBlockSchema: Template = {
  name: "leadership",
  label: "Leadership",
  ui: {
    previewSrc: "/blocks/leadership.png",
    defaultItem: {
      title: "Start Building",
      description:
        "Get started with TinaCMS today and take your content management to the next level.",
      actions: [
        {
          label: "Get Started",
          type: "button",
          link: "/",
        },
        {
          label: "Placeholder Button",
          type: "link",
          link: "/",
        },
      ],
    },
  },
  fields: [
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
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
  ],
};
