"use client";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useVideoDialog } from "./video-dialog-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, UserRound } from "lucide-react";

interface LatestMessagesVideoProps {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
  title?: string;
  coordinator?: {
    avatar?: string;
    name?: string;
  };
}

export default function LatestMessagesVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
  title,
  coordinator,
}: LatestMessagesVideoProps) {
  const { openVideo } = useVideoDialog();

  return (
    <div className={cn("relative", className)}>
      <a
        href={videoSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-full cursor-pointer"
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="w-full h-full object-cover rounded-t-xl border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
        />
        {/* Top-left overlay: Avatar + Title */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10 px-3 py-2 rounded-lg">
          <Avatar>
            {coordinator?.avatar ? (
              <AvatarImage
                src={coordinator.avatar}
                alt={coordinator.name || "La Voz De La Esperanza"}
                className="h-8 w-10"
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
          <div className="flex flex-col">
            <span className="text-white text-sm font-nunito font-bold group-hover:underline">
              {title}
            </span>
            <span className="text-white font-nunito font-medium text-sm">
              {coordinator?.name || "La Voz De La Esperanza was live"}
            </span>
          </div>
        </div>
        {/* Centered Play Button */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="group size-10 flex items-center justify-center rounded-full bg-black/20 group-hover:bg-black/10 border-2 border-white shadow-md backdrop-blur-md transition-colors duration-200 ease-out">
            <Play
              className="size-5 scale-100 fill-white text-white transition-transform duration-200"
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
