"use client";
import React from "react";
import { Message, PageBlocksLatestmessages } from "@/tina/__generated__/types";
import type { Template } from "tinacms";
import { Card } from "@/components/ui/card";
import { tinaField } from "tinacms/dist/react";
import { Button } from "@/components/ui/button";
import MessagesVideoDialog from "@/components/ui/messages-video-dialog";
import { ArrowRight, UserRound } from "lucide-react";
import {
  DecorativeIcon,
  LargeDecorativeIcon,
} from "@/components/ui/decorative-icon";
import { format } from "date-fns";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import Link from "next/link";

//done 12: create a latestmessages component that extract the latest 3 messages in homepage
//done 29: add fb video API (Graph APi) to messages videoUrls and thumbnails in the messages page TINA CMS/BACKEND
//done 29b: find workaround to 5 copyrighted videos: https://www.facebook.com/video/copyright/claim/?match_id=24630578953196706&is_from_action_center_v2=0
//done 77: extend duration of FACEBOOK_ACCESS_TOKEN
//done 19: change layout of /landing-latest-messages component- div< title top left, description, view all button to the far right>, div< 3 column video "cards" with grid-column-gap: 50px, FB Play button center, circle logo/title/account top left.

//line 55 p< mx-auto max-w-2xl text-muted-foreground md:text-lg ?
interface LatestMessagesProps {
  data: PageBlocksLatestmessages;
  messages: Message[];
}
export const LatestMessages = ({ data, messages }: LatestMessagesProps) => {
  const limit = Math.min(Math.max(data.limit ?? 3, 1), 10);
  const title = data.title || "Mensajes";

  // Filter future or recent messages by date and sort descending by date
  const filteredMessages = messages
    .filter((e) => e.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, limit);

  return (
    <Section background={data.background!} className="relative py-16 px-24 md:px-24 lg:px-24 3xl:px-119 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-0 mb-12 lg:mb-16">
        <div className="flex flex-col gap-2">
          <span className="font-nunito font-bold text-lg text-secondary">
            Mensajes
          </span>
          <div className="relative">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl lg:text-[42px] text-white leading-[1.4] max-w-md lg:max-w-lg">
              {title}
            </h2>
            <div className="absolute -top-2 right-4 md:right-0 lg:right-0 lg:top-0">
              <DecorativeIcon />
            </div>
          </div>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Manténgase al tanto de lo que está sucediendo en la Iglesia La Voz
          </p>
        </div>
        {/* Header Button */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
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
                  className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border border-white text-white font-nunito font-bold  text-sm md:text-base hover:bg-white hover:text-primary transition-colors self-start lg:self-auto"
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
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3.75 mx-6 relative">
        {filteredMessages.map((message) => {
          const thumbnailSrc = "/fallback2.jpg";
          const postedDate = message.date
            ? format(new Date(message.date), "MMM dd, yyyy")
            : "";
          return (
            <Card
              key={message.id}
              className="bg-white border border-grey-0 p-3 md:p-4 flex flex-col gap-3 md:gap-4 group hover:shadow-lg transition-shadow col-span-1 md:col-span-4"
            >
              {message.image?.embeddable && message.image?.videoUrl ? (
                <Link
                  href={`/messages/${message._sys.breadcrumbs.join("/")}`}
                  className="block"
                >
                  <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                    <div
                      className="fb-video"
                      data-href={message.image.videoUrl}
                      data-allowfullscreen="true"
                      data-width="500"
                    ></div>
                  </div>
                </Link>
              ) : (
              <div className="aspect-[16/9] overflow-clip rounded-lg border border-border relative">
                <MessagesVideoDialog
                  videoSrc={message.image?.videoUrl || ""}
                  thumbnailSrc={thumbnailSrc}
                  thumbnailAlt="Messages Video"
                  title={message.title}
                  coordinator={{
                    avatar: message.coordinator?.avatar || "",
                    name: message.coordinator?.name || "",
                  }}
                />
              </div>
              )}
            </Card>
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
      label: "Section Title",
      name: "title",
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
