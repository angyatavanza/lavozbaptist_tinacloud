"use client";
import React from "react";
import { client } from "@/tina/__generated__/client";
import { PageBlocksLatestmessages } from "@/tina/__generated__/types";
import type { Template } from "tinacms";
import { Card } from "@/components/ui/card";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from 'tinacms/dist/react';
import { iconSchema } from "@/tina/fields/icon";
import { Button } from '@/components/ui/button';
import { TinaIcon } from '../icon';
import MessagesVideoDialog from "../ui/messages-video-dialog";
import { ArrowRight, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Section } from "../layout/section";
import Link from "next/link";

//done 12: create a latestmessages component that extract the latest 3 messages in homepage
//done 29: add fb video API (Graph APi) to messages videoUrls and thumbnails in the messages page TINA CMS/BACKEND
//done 29b: find workaround to 5 copyrighted videos: https://www.facebook.com/video/copyright/claim/?match_id=24630578953196706&is_from_action_center_v2=0
//to-do 29c: extend duration of FACEBOOK_ACCESS_TOKEN 

interface Coordinator {
  name?: string;
  avatar?: string;
}

interface Message {
  id: string;
  title: string;
  date?: string;
  excerpt?: any;
  image?: {
    src?: string;          
    alt?: string;           
    videoUrl?: string;
    embeddable?: boolean;        
    autoPlay?: boolean;     
    loop?: boolean;         
  };
  coordinator?: Coordinator;
  tags?: { tag?: { name?: string } }[];
  _sys: { breadcrumbs: string[] };
}

export const LatestMessages = ({
  data,
  messages,
}: {
  data: PageBlocksLatestmessages;
  messages: Message[];
}) => {
  const limit = Math.min(Math.max(data.limit ?? 3, 1), 10);
  const title = data.title || "Mensajes";

  // Filter future or recent messages by date and sort descending by date
  const filteredMessages = messages
    .filter((e) => e.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, limit);

  return (
    <Section>
      <div className="container flex flex-col items-center gap-16">
        <div className="text-center">
          <h2 className="mx-auto mb-6 text-pretty text-3xl font-semibold md:text-4xl lg:max-w-3xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Manténgase al tanto de lo que está sucediendo en la Iglesia La Voz
          </p>
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
                    variant={action!.type === "link" ? "outline" : "default"}
                    className="rounded-xl px-5 text-base"
                  >
                    <Link href={action!.link!}>
                      <span className="text-nowrap">{action!.label}</span>
                    </Link>
                  </Button>
                </div>
              ))}
          </div>
        </div>

        <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {filteredMessages.map((message) => {
            const postedDate = message.date
              ? format(new Date(message.date), "MMM dd, yyyy")
              : "";
        
              const thumbnailSrc = "/fallback2.jpg";
            return (
              <Card
                key={message.id}
                className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
              >
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                  <div className="sm:col-span-5">
                    <div className="mb-4 md:mb-6">
                      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                        {message.tags?.map((tag, i) => (
                          <span key={i}>{tag?.tag?.name}</span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                      <Link
                        href={`/messages/${message._sys.breadcrumbs.join("/")}`}
                        className="hover:underline"
                      >
                        {message.title}
                      </Link>
                    </h3>
                    <div className="mt-4 text-muted-foreground md:mt-5">
                      {message.excerpt && (
                        <TinaMarkdown content={message.excerpt} />
                      )}
                    </div>
                    <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                      <Avatar>
                        {message.coordinator?.avatar ? (
                          <AvatarImage
                            src={message.coordinator.avatar}
                            alt={message.coordinator.name || "Coordinator avatar"}
                            className="h-8 w-8"
                          />
                        ) : (
                          <AvatarFallback>
                            <UserRound
                              size={16}
                              strokeWidth={2}
                              className="opacity-60"
                              aria-hidden="true"
                            />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-muted-foreground">
                        {message.coordinator?.name || "Anonymous"}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">
                        {postedDate}
                      </span>
                    </div>
                    <div className="mt-6 flex items-center space-x-2 md:mt-8">
                      <Link
                        href={`/messages/${message._sys.breadcrumbs.join("/")}`}
                        className="inline-flex items-center font-semibold hover:underline md:text-base"
                      >
                        <span>Ver Mensaje</span>
                        <ArrowRight className="ml-2 size-4 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  {message.image?.embeddable && message.image?.videoUrl ? (
                      <div className="order-first sm:order-last sm:col-span-5">
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
                      </div>
                    ) : (
                      <div className="order-first sm:order-last sm:col-span-5">
                        <div className="aspect-[16/9] overflow-clip rounded-lg border border-border relative">
                          <MessagesVideoDialog
                            videoSrc={message.image?.videoUrl || ""}
                            thumbnailSrc={thumbnailSrc}
                            thumbnailAlt="Messages Video"
                          />
                        </div>
                      </div>
                    )}
                </div>
              </Card>
            );
          })}
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
