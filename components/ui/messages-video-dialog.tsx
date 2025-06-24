"use client";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVideoDialog } from "./video-dialog-context";

interface MessagesVideoProps {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

export default function MessagesVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: MessagesVideoProps) {
  const { openVideo } = useVideoDialog();

  return (
    <div className={cn("relative", className)}>
      <a
        href={videoSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block cursor-pointer"
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
        />
        <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200">
          <div className="group size-16 flex items-center justify-center rounded-full bg-black/20 group-hover:bg-black/40 border-2 border-white shadow-md backdrop-blur-md transition-colors duration-200 ease-out">
            <Play
              className="size-8 scale-100 fill-white text-white transition-transform duration-200"
              style={{
                filter:
                  "drop-shadow(0 4px 3px rgba(0, 0, 0, 0.15)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1))",
              }}
            />
          </div>
        </div>
      </a>
    </div>
  );
}
