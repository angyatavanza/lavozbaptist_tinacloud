"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Template } from "tinacms";
import { Container } from "../container";
import { StatList, StatListItem } from "../stat-list";
import { tinaField } from "tinacms/dist/react";
import {
  PageBlocksAboutsection,
  PageBlocksAboutsectionImage,
} from "../../tina/__generated__/types";
import { Button } from "../ui/button";
import { iconSchema } from "@/tina/fields/icon";
import { TinaIcon } from "../icon";
import { PageIntro } from "../page-intro";
import { Section, sectionBlockSchemaField } from "../layout/section";
import imageWhiteboard from "@/images/whiteboard.jpg";
import { AnimatedGroup } from "../motion-primitives/animated-group";
import { TextEffect } from "../motion-primitives/text-effect";
import HeroVideoDialog from "../ui/hero-video-dialog";
import { cn } from "@/lib/utils";
import { ContactSection } from "./section-contact";


//done 26: add contactsection to sections
//to-do 27: merge aboutsection component --currently there are 2 descriptions, add an image to the left of the div
//to-do 28: add faq section to block Tina schema
//to-do 29: update the ui of the about page; blocks: Herocontent, banner?, aboutsection, mission, vision, teammembers, faq, cta, contact


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
      },
    },
  },
};

export const Aboutsection = ({ data }: { data: PageBlocksAboutsection }) => {
  // Extract the background style logic into a more readable format
  let gradientStyle: React.CSSProperties | undefined = undefined;
  if (data.background) {
    const colorName = data.background
      .replace(/\/\d{1,2}$/, "")
      .split("-")
      .slice(1)
      .join("-");
    const opacity = data.background.match(/\/(\d{1,3})$/)?.[1] || "100";

    gradientStyle = {
      "--tw-gradient-to": `color-mix(in oklab, var(--color-${colorName}) ${opacity}%, transparent)`,
    } as React.CSSProperties;
  }

  return (
    <Section background={data.background!}>
      <PageIntro
        eyebrow="Sobre Nosotros"
        title="Somos Una Iglesia Comprometida a Ser Una Voz de Esperanza"
      >
        <p>
          La Iglesia Bautista La Voz de La Esperanza como su nombre lo indica,
          es una Iglesia que lleva esperanza a la ciudad de Charlotte y sus
          alrededores. Si tu estas buscando un lugar donde congregarte y alabar
          a Dios, nuestra iglesia esta abierta para todos los visitantes.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p></p>
          <p></p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="→" label="Nuestro Propósito, Visión y Valores" />
          <StatListItem value="→" label="Nuestro Equipo" />
          <StatListItem value="→" label="Nuestro Pastor" />
        </StatList>
      </Container>
      <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
        {data.tagline && (
          <div data-tina-field={tinaField(data, "tagline")}>
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="mx-auto mt-8 max-w-2xl text-balance text-lg"
            >
              {data.tagline!}
            </TextEffect>
          </div>
        )}
        {data.headline && (
          <div data-tina-field={tinaField(data, "headline")}>
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="mt-8 text-balance text-6xl md:text-7xl xl:text-[5.25rem]"
            >
              {data.headline!}
            </TextEffect>
          </div>
        )}
        {data.description && (
          <div data-tina-field={tinaField(data, "description")}>
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="mx-auto mt-8 max-w-2xl text-balance text-lg"
            >
              {data.description!}
            </TextEffect>
          </div>
        )}

        <AnimatedGroup
          variants={transitionVariants}
          className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
        >
          {data.actions &&
            data.actions.map((action) => (
              <div
                key={action!.label}
                data-tina-field={tinaField(action)}
                className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
              >
                <Button
                  asChild
                  size="lg"
                  variant={action!.type === "link" ? "ghost" : "default"}
                  className="rounded-xl px-5 text-base"
                >
                  <Link href={action!.link!}>
                    {action?.icon && <TinaIcon data={action?.icon} />}
                    <span className="text-nowrap">{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
        </AnimatedGroup>
      </div>

      {data.image && (
        <AnimatedGroup variants={transitionVariants}>
          <div
            className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20 max-w-full"
            data-tina-field={tinaField(data, "image")}
          >
            <div
              aria-hidden
              className="bg-linear-to-b absolute inset-0 z-10 from-transparent from-35% pointer-events-none"
              style={gradientStyle}
            />
            <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
              <ImageBlock image={data.image} />
            </div>
          </div>
        </AnimatedGroup>
      )}
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksAboutsectionImage }) => {
  if (image.videoUrl) {
    let videoId = "";
    if (image.videoUrl) {
      const embedPrefix = "/embed/";
      const idx = image.videoUrl.indexOf(embedPrefix);
      if (idx !== -1) {
        videoId = image.videoUrl
          .substring(idx + embedPrefix.length)
          .split("?")[0];
      }
    }
    const thumbnailSrc = image.src
      ? image.src!
      : videoId
      ? `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`
      : "";

    return (
      <HeroVideoDialog
        videoSrc={image.videoUrl}
        thumbnailSrc={thumbnailSrc}
        thumbnailAlt="Aboutsection Video"
      />
    );
  }

  if (image.src) {
    return (
      <Image
        className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border max-w-full h-auto"
        alt={image!.alt || ""}
        src={image!.src!}
        height={4000}
        width={3000}
      />
    );
  }
};

export const aboutsectionBlockSchema: Template = {
  name: "aboutsection",
  label: "Aboutsection",
  ui: {
    previewSrc: "/blocks/aboutsection.png",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      description: "This Desc is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
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
          icon: true,
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
        iconSchema as any,
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "Image",
      name: "image",
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
      ],
    },
  ],
};
