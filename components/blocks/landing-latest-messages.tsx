"use client";
import React from "react";
import { Message, PageBlocksLatestmessages } from "@/tina/__generated__/types";
import type { Template } from "tinacms";
import {
  Card2,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardHeader2,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { tinaField } from "tinacms/dist/react";
import { Button } from "@/components/ui/button";
import LatestMessagesVideoDialog from "@/components/ui/latest-messages-video-dialog";
import { ArrowRight, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DecorativeIcon,
  LargeDecorativeIcon,
} from "@/components/ui/decorative-icon";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TextEffect } from "../motion-primitives/text-effect";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import Link from "next/link";

interface LatestMessagesProps {
  data: PageBlocksLatestmessages;
  messages: Message[];
}
export const LatestMessages = ({ data, messages }: LatestMessagesProps) => {
  const limit = Math.min(Math.max(data.limit ?? 3, 1), 10);

  // Filter future or recent messages by date and sort descending by date
  const filteredMessages = messages
    .filter((e) => e.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, limit);

  return (
    <Section background={data.background!} className="mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5 lg:gap-5 px-4 md:px-5 py-5 md:py-10 lg:py-15">
        <div className="flex flex-col gap-5">
          {data.tagline && (
            <div data-tina-field={tinaField(data, "tagline")}>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="font-nunito font-medium text-balance text-left text-base leading-[24px] text-secondary uppercase mx-auto "
              >
                {data.tagline!}
              </TextEffect>
            </div>
          )}

          {/* Main headline (Headline 01 in QBDS Web 48/60 B + Responsive 34/44 B)*/}
          {data.headline && (
            <div
              data-tina-field={tinaField(data, "headline")}
              className="flex items-center gap-1 md:gap-2"
            >
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h2"
                className="font-nunito font-semibold text-balance text-left text-[34px] leading-[44px] md:text-5xl md:leading-[60px] text-foreground max-w-2/3 md:max-w-lg"
              >
                {data.headline!}
              </TextEffect>
              <div className="relative bottom-[0px] md:bottom-[20px]">
                <DecorativeIcon
                  className="text-secondary w-5 h-5 md:w-7 md:h-7 shrink-0"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

          {/* Description (Body 01 in QBDS Web 20/28 MR + Responsive 16/24 MR)*/}
          {data.description && (
            <div data-tina-field={tinaField(data, "description")}>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="font-normal text-balance text-left text-base leading-[24px] md:text-xl md:leading-[28px] max-w-md"
              >
                {data.description || "Mensajes"}
              </TextEffect>
            </div>
          )}
        </div>
        {/* Header Button */}
        <div className="md:mt-12 flex flex-wrap justify-center gap-5">
          {data.actions &&
            data.actions.map((action) => (
              <div
                key={action!.label}
                data-tina-field={tinaField(action)}
                className="bg-foreground/10 rounded-[calc(var(--radius-sm)+0.125rem)] border p-0.5"
              >
                <Button
                  asChild
                  size="default"
                  variant={action!.type === "link" ? "outline" : "default"}
                  className=""
                >
                  <Link href={action!.link!}>
                    <span className="text-nowrap">{action!.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5 pb-5 md:pb-10 lg:pb-15 relative">
        {filteredMessages.map((message) => {
          const thumbnailSrc = "/fallback2.jpg";
          const postedDate = message.date
            ? format(new Date(message.date), "MMM dd, yyyy", { locale: es })
            : "";
          return (
            <Card2
              key={message.id}
              className="border border-grey-0 flex flex-col col-span-2 md:col-span-4"
            >
              {/* FB Video Container 356x200px on mobile 425x239px on larger screens*/}
              <CardHeader2 className="relative w-full rounded-t-xl">
                {message.image?.embeddable && message.image?.videoUrl ? (
                  <Link
                    href={`/messages/${message._sys.breadcrumbs.join("/")}`}
                    className="block h-full"
                  >
                    <div className="aspect-[16/9] w-full overflow-clip rounded-t-xl">
                      <div
                        className="fb-video w-full max-w-full overflow-hidden rounded-t-xl border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8] h-full"
                        data-href={message.image.videoUrl}
                        data-allowfullscreen="true"
                        data-width="auto"
                      ></div>
                    </div>
                  </Link>
                ) : (
                  <div className="aspect-[16/9] w-full overflow-clip rounded-t-xl">
                    <LatestMessagesVideoDialog
                      videoSrc={message.image?.videoUrl || ""}
                      thumbnailSrc={thumbnailSrc}
                      thumbnailAlt="Messages Video"
                      title={message.title}
                      coordinator={{
                        avatar: message.coordinator?.avatar || "",
                        name: message.coordinator?.name || "",
                      }}
                      className="h-full"
                    />
                  </div>
                )}
              </CardHeader2>
              {/* Title Header */}
              <CardHeader>
                <CardTitle
                  className="text-[19px] leading-[24px] md:text-[19px] md:leading-[24px]"
                  data-tina-field={tinaField(message, "title")}
                >
                  {message.title}
                </CardTitle>
              </CardHeader>
              {/* Coordinator and Date Info */}
              <CardContent className="flex items-center relative w-full">
                <CardDescription className="capitalize">{postedDate}</CardDescription>
              </CardContent>

              {/* Footer with Action */}
              <CardFooter>
                <CardAction>
                  <Link
                    href={`/messages/${message._sys.breadcrumbs.join("/")}`}
                    className="flex items-center gap-3 text-primary font-roboto font-semibold text-sm leading-[20px] hover:gap-5 transition-all"
                  >
                    Ver ahora
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardAction>
              </CardFooter>
            </Card2>
          );
        })}
        {/* Large Decorative Icon */}
        <div className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-4 lg:-bottom-12 lg:-right-8 opacity-80 hidden md:block">
          <LargeDecorativeIcon />
        </div>
      </div>
    </Section>
  );
};

export const latestmessagesBlockSchema: Template = {
  name: "latestmessages",
  label: "Latest Messages",
  ui: {
    previewSrc: "/blocks/latest-messages.png",
    defaultItem: {
      title: "Upcoming Messages",
      limit: 3,
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
      type: "number",
      label: "Number of Messages to Show",
      name: "limit",
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
