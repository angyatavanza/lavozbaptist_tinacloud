"use client";
import * as React from "react";
import { format } from "date-fns";
import { useTina } from "tinacms/dist/react";
import { MessageQuery } from "@/tina/__generated__/types";
import { useLayout } from "@/components/layout/layout-context";
import LatestMessagesVideoDialog from "@/components/ui/messages-video-dialog";
import { Container } from "@/components/layout/container";
import { es } from "date-fns/locale";
import ErrorBoundary from "@/components/error-boundary";

interface ClientMessageProps {
  data: MessageQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function MessageClientPage(props: ClientMessageProps) {
  const { theme } = useLayout();
  const { data } = useTina({ ...props });
  const message = data.message;

  const date = new Date(message.date!);
  let formattedDate = "";
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, "MMM dd, yyyy", { locale: es });
  }

  const thumbnailSrc = "/messages_video_fallback.png";

  return (
    <ErrorBoundary>
      <Container className="mt-10 md:mt-15 lg:mt-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-5">
          {/* Featured Video Section */}
          <section className="col-span-2 md:col-span-8 md:col-start-3">
            <div className="text-white overflow-hidden relative rounded-lg">
              {/* Background image or video thumbnail */}
              <div className="aspect-[16/9] overflow-clip relative rounded-lg">
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
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-5 right-5 bg-white rounded px-2 py-1">
                  <span className="capitalize font-nunito font-bold text-foreground text-[10px] tracking-[0.50px] leading-[10px]">
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </ErrorBoundary>
  );
}
