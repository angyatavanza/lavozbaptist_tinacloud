"use client";

import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVideoDialog } from "./video-dialog-context";

interface HeroVideoProps {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

function extractVideoId(embedUrl: string): string | null {
  const match = embedUrl.match(/\/embed\/([^?&"'>]+)/);
  return match ? match[1] : null;
}

export default function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const { openVideo } = useVideoDialog();

  const videoId = extractVideoId(videoSrc);

  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden", className)}>
      <div
        className="absolute inset-0 z-0" 
      >
        <iframe
              src={`${videoSrc}&autoplay=1&hideinfo=1&controls=0&mute=1&loop=1&modestbranding=1&rel=0&badge=0&autopause=0&player_id=0&app_id=58479&playlist=${videoId}`}
              allowFullScreen
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="h-full w-full object-cover rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
            />
      </div>
    </div>
  );
}
