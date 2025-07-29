"use client";
import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import MessagesVideoDialog from "@/components/ui/messages-video-dialog";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  MessageConnectionQuery,
  MessageConnectionQueryVariables,
} from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";
import { ArrowRight, UserRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//to-do 30: change all tailwind class colors to be Oklch color FRONTEND
//done 31: pass on creating a message-archive page FRONTEND
//done 32: add tina field to accept a link to Vimeo video in messages page TINA CMS/BACKEND
//to-do 33: redesign the all messages page to be a "home" page + change layout of all messages cards FRONTEND
//to-do 34: ensure UX Design is responsive accross screen sizes (i.e hero section homepage) & add margin padding! FRONTEND
//to-do 37: make text responsive on messagesvideodialog + redesign messages-latest-message/indiv message page FRONTEND

//line 144: <ReactPlayer width="100%" height="100%" style={{ margin: "auto" }} playing={!!message.image.autoPlay} loop={!!message.image.loop} controls={true} url={message.image.videoUrl}/>
/*<MessagesVideoDialog
  videoSrc={message.image.videoUrl}
  thumbnailSrc={thumbnailSrc}
  thumbnailAlt="Messages Video"
  />
*/

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
        <p>Mensajes Recientes</p>
      </PageIntro>
      <Container className="mt-20 md:mt-28">
        <div className="container flex flex-col items-center gap-16">
          {/* Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3.75 relative">
            {messages.map((message) => {
              const thumbnailSrc = "/fallback2.jpg";
              return (
                <Card
                  key={message.id}
                  className="bg-white border border-grey-0 p-3 md:p-4 flex flex-col gap-3 md:gap-4 group hover:shadow-lg transition-shadow col-span-1 md:col-span-4"
                >
                  {message.image?.embeddable && message.image?.videoUrl ? (
                    <Link
                      href= {message.url}
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
                  <div className="col-span-2 md:col-span-6">
                    <div className="mb-4 md:mb-6">
                      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                        {message.tags?.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-nunito font-medium md:text-2xl lg:text-3xl">
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
                        className="inline-flex items-center font-medium hover:underline md:text-base"
                      >
                        <span>Ver ahora</span>
                        <ArrowRight className="ml-2 size-4 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </ErrorBoundary>
  );
}
