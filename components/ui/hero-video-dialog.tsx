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
      className={cn("relative w-full h-auto aspect-[3/4] md:aspect-[16/9] md:h-auto overflow-hidden", className)}
    >
      {/* Container for the cropped video effect */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={vimeoUrl}
          allowFullScreen
          title="Vimeo video player"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          className="absolute inset-0 w-[170%] h-[170%] -translate-x-[35%] -translate-y-[15%] scale-[1.7] md:w-full md:h-full md:translate-x-0 md:translate-y-0 md:scale-100"
        />
      </div>
    </div>
  );
}