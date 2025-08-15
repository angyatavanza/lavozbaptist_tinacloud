"use client";
import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import LatestMessagesVideoDialog from "@/components/ui/latest-messages-video-dialog";
import MessagesVideoDialog from "@/components/ui/messages-video-dialog";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  MessageConnectionQuery,
  MessageConnectionQueryVariables,
} from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";
import { ArrowRight, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  Card2,
  CardContent,
  CardHeader2,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { es } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClientMessageProps {
  data: MessageConnectionQuery;
  variables: MessageConnectionQueryVariables;
  query: string;
}

export default function MessagesClientPage(props: ClientMessageProps) {
  const messages =
    props.data?.messageConnection
      .edges!.map((messageData) => {
        const message = messageData!.node!;
        const date = new Date(message.date!);
        let formattedDate = "";
        if (!isNaN(date.getTime())) {
          formattedDate = format(date, "MMM dd, yyyy", { locale: es });
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
      })
      .filter(Boolean) || [];

  if (!messages || messages.length === 0) {
    return (
      <ErrorBoundary>
        <PageIntro eyebrow="Mensajes recientes" title="Mensajes más recientes">
          <p>Por el momento, no hay mensajes disponibles</p>
        </PageIntro>
      </ErrorBoundary>
    );
  }

  // Get featured video (first message)
  const featuredVideo = messages[0];
  const otherMessages = messages.slice(1);
  const thumbnailSrc = "/fallback2.jpg";

  return (
    <ErrorBoundary>
      <PageIntro eyebrow="Mensajes" title="Mensaje más reciente">
        <p> Escucha el mensaje más reciente</p>
      </PageIntro>
      {/* Container */}
      <Container className="mt-10 md:mt-15 lg:mt-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-5">
          {/* Featured Video Section */}
          <section className="col-span-2 md:col-span-8 md:col-start-3">
            <div className="text-white overflow-hidden relative rounded-lg">
              {/* Background image or video thumbnail */}
              {featuredVideo.image?.embeddable &&
              featuredVideo.image?.videoUrl ? (
                <Link href={featuredVideo.url} className="block">
                  <div className="aspect-[16/9] overflow-clip rounded-lg">
                    <div
                      className="fb-video w-full h-full"
                      data-href={featuredVideo.image.videoUrl}
                      data-allowfullscreen="true"
                      data-width="1024"
                    ></div>
                  </div>
                </Link>
              ) : (
                <div className="aspect-[16/9] overflow-clip relative rounded-lg">
                  <LatestMessagesVideoDialog
                    videoSrc={featuredVideo.image?.videoUrl || ""}
                    thumbnailSrc={thumbnailSrc}
                    thumbnailAlt="Messages Video"
                    title={featuredVideo.title}
                    coordinator={{
                      avatar: featuredVideo.coordinator?.avatar || "",
                      name: featuredVideo.coordinator?.name || "",
                    }}
                  />
                </div>
              )}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-5 right-5 bg-white rounded px-2 py-1">
                  <span className="capitalize font-nunito font-bold text-foreground text-[10px] tracking-[0.50px] leading-[10px]">
                    {featuredVideo.published}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Messages Grid Section */}
          <section className="col-span-2 md:col-span-12 mt-10">
            <h2 className="mb-5 mt-6 block font-nunito font-semibold text-balance text-left text-[28px] leading-[36px] md:text-[40px] md:leading-[52px] text-primary max-w-lg">
              Mensajes recientes
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-12 gap-5">
              {otherMessages.map((message) => {
                const thumbnailSrc = "/fallback2.jpg";
                return (
                  <Card2
                    key={message.id}
                    className="border border-grey-0 flex flex-col col-span-2 md:col-span-4"
                  >
                    {/* FB Video Container */}
                    <CardHeader2 className="relative w-full rounded-t-xl">
                      {message.image?.embeddable && message.image?.videoUrl ? (
                        <Link href={message.url} className="block h-full">
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
                          <MessagesVideoDialog
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
                      <CardTitle className="text-[19px] leading-[24px] md:text-[19px] md:leading-[24px]">
                        {message.title}
                      </CardTitle>
                    </CardHeader>
                    {/* Date Info */}
                    <CardContent className="flex items-center relative w-full">
                      <CardDescription className="capitalize">{message.published}</CardDescription>
                    </CardContent>

                    {/* Footer with Action */}
                    <CardFooter>
                      <CardAction>
                        <Link
                          href={message.url}
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
            </div>
          </section>
        </div>
      </Container>
    </ErrorBoundary>
  );
}
