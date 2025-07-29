"use client";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  videoSrc: string;
  className?: string;
}

export default function HeroVideoDialog({
  videoSrc,
  className,
}: HeroVideoProps) {
  const vimeoUrl = `${videoSrc}&background=1&muted=1&dnt=1&title=0&byline=0&portrait=0&badge=0&autopause=0&vimeo_logo=0`;

  return (
    <div
      className={cn("relative w-full h-auto aspect-[16/9] md:aspect-[16/9] md:h-auto overflow-hidden", className)}
    >
      <iframe
        src={vimeoUrl}
        allowFullScreen
        title="Vimeo video player"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}