import { FadeIn, FadeInStagger } from "../motion-primitives/fade-in";
import clsx from "clsx";
import { ReactNode } from "react";
import { Border } from "./border";

interface GridListProps {
  className?: string;
  children: ReactNode;
}

export function GridList({ className, children }: GridListProps) {
  return (
    <FadeInStagger>
      <ul
        role="list"
        className={clsx(
          "grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5",
          className
        )}
      >
        {children}
      </ul>
    </FadeInStagger>
  );
}

interface GridListItemProps {
  title: string;
  children: ReactNode;
  className?: string;
  invert?: boolean;
}

export function GridListItem({
  title,
  children,
  className,
  invert = false,
}: GridListItemProps) {
  return (
    <li
      className={clsx(
        "text-base col-span-1 md:col-span-6",
        invert
          ? "text-neutral-300 before:bg-white after:bg-white/10"
          : "text-neutral-600 before:bg-primary after:bg-neutral-100",
        className
      )}
    >
      <FadeIn>
        <Border position="left" className="pl-8" invert={invert}>
          <strong
            className={clsx(
              "font-medium",
              invert ? "text-white" : "text-primary"
            )}
          >
            {title}.
          </strong>{" "}
          {children}
        </Border>
      </FadeIn>
    </li>
  );
}