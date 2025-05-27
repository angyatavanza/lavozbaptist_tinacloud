"use client";

import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVideoDialog } from "./video-dialog-context";

interface HeroVideoProps {
  videoSrc: string;
  //thumbnailSrc: string;
  //thumbnailAlt?: string;
  className?: string;
}

function extractYouTubeId(embedUrl: string): string | null {
  const match = embedUrl.match(/\/embed\/([^?&"'>]+)/);
  return match ? match[1] : null;
}

export default function HeroVideoDialog({
  videoSrc,
  //thumbnailSrc,
  //thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const { openVideo } = useVideoDialog();

    const videoId = extractYouTubeId(videoSrc);


  return (
    <div className={cn("relative aspect-video w-full overflow-hidden", className)}>
      <iframe
        src={`${videoSrc}&autoplay=1&mute=1&loop=1&playlist=${videoId}`}
        allowFullScreen
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="absolute inset-0 h-full w-full"
        />
    </div>
  );
}
