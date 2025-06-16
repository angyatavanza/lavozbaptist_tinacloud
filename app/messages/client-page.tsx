"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import MessagesVideoDialog from "../../components/ui/messages-video-dialog";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  MessageConnectionQuery,
  MessageConnectionQueryVariables,
} from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";
import { ArrowRight, UserRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/layout/section";
import { PageIntro } from "@/components/page-intro";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//to-do 30: create a messages-home page DESIGN/FRONTEND
//to-do 31: create an message-archive page DESIGN/FRONTEND
//done 32: add tina field to accept a link to Vimeo video in messages page TINA CMS/BACKEND
//to-do 33: redesign the all messages page + change layout of all messages card in messages page DESIGN/FRONTEND
//to-do 34: implement design ui of indiv message
//to-do 37: redesign messages-latest-message page DESIGN/FRONTEND

//line 144: <ReactPlayer width="100%" height="100%" style={{ margin: "auto" }} playing={!!message.image.autoPlay} loop={!!message.image.loop} controls={true} url={message.image.videoUrl}/>
function extractFacebookVideoId(url: string): string | null {
  try {
    // Handle plugin-style Facebook URLs
    if (url.includes("facebook.com/plugins/video.php")) {
      const parsed = new URL(url);
      const href = decodeURIComponent(parsed.searchParams.get("href") || "");
      const match = href.match(/\/videos\/(\d+)/);
      return match ? match[1] : null;
    }

    // Handle standard Facebook watch or direct video URLs
    const match = url.match(/\/videos\/(\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
interface ClientMessageProps {
  data: MessageConnectionQuery;
  variables: MessageConnectionQueryVariables;
  query: string;
}

export default function MessagesClientPage(props: ClientMessageProps) {
  const messages = props.data?.messageConnection.edges!.map((messageData) => {
    const message = messageData!.node!;
    const date = new Date(message.date!);
    let formattedDate = "";
    if (!isNaN(date.getTime())) {
      formattedDate = format(date, "MMM dd, yyyy");
    }
    return {
      id: message.id,
      published: formattedDate,
      title: message.title,
      tags: message.tags?.map((tag) => tag?.tag?.name) || [],
      url: `/messages/${message._sys.breadcrumbs.join("/")}`,
      excerpt: message.excerpt,
      image: message.image,
      coordinator: {
        name: message.coordinator?.name || "Anonymous",
        avatar: message.coordinator?.avatar,
      },
    };
  });

  return (
    <ErrorBoundary>
      <PageIntro eyebrow="Mensajes Recientes" title="Mensajes Recientes">
        <p>Mensajes Recientes.</p>
      </PageIntro>
      <Section>
        <div className="container flex flex-col items-center gap-16">
          <div className="text-center">
            <h2 className="mx-auto mb-6 text-pretty text-3xl font-semibold md:text-4xl lg:max-w-3xl">
              Mensajes Recientes
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              Discover the latest insights and tutorials about modern web
              development, UI design, and component-driven architecture.
            </p>
          </div>

          <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
            {messages.map((message) => {
              //const videoUrl = ;

              let videoId = "";
              if (message.image?.videoUrl) {
                const fbVideoId = extractFacebookVideoId(message.image.videoUrl);
                if (fbVideoId) {
                  videoId = fbVideoId;
                }
              }
              const thumbnailSrc = message.image?.src
                ? message.image.src!
                : videoId
                ? `https://graph.facebook.com/${videoId}/picture`
                : "";

              return (
                <Card
                  key={message.id}
                  className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
                >
                  <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                    <div className="sm:col-span-5">
                      <div className="mb-4 md:mb-6">
                        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                          {message.tags?.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                        <Link href={message.url} className="hover:underline">
                          {message.title}
                        </Link>
                      </h3>
                      <div className="mt-4 text-muted-foreground md:mt-5">
                        <TinaMarkdown content={message.excerpt} />
                      </div>
                      <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                        <Avatar>
                          {message.coordinator.avatar && (
                            <AvatarImage
                              src={message.coordinator.avatar}
                              alt={message.coordinator.name}
                              className="h-8 w-8"
                            />
                          )}
                          <AvatarFallback>
                            <UserRound
                              size={16}
                              strokeWidth={2}
                              className="opacity-60"
                              aria-hidden="true"
                            />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">
                          {message.coordinator.name}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {message.published}
                        </span>
                      </div>
                      <div className="mt-6 flex items-center space-x-2 md:mt-8">
                        <Link
                          href={message.url}
                          className="inline-flex items-center font-semibold hover:underline md:text-base"
                        >
                          <span>Read more</span>
                          <ArrowRight className="ml-2 size-4 transition-transform" />
                        </Link>
                      </div>
                    </div>
                    {message.image?.videoUrl && (
                      <div className="order-first sm:order-last sm:col-span-5">
                        <Link href={message.url} className="block">
                          <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                              <MessagesVideoDialog
                                videoSrc={message.image.videoUrl}
                                thumbnailSrc={thumbnailSrc}
                                thumbnailAlt="Messages Video"
                              />
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </Card>
              );
              })}
          </div>
        </div>
      </Section>
    </ErrorBoundary>
  );
}
