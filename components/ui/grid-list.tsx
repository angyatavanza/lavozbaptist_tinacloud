import { FadeIn, FadeInStagger } from "../motion-primitives/fade-in";
import clsx from "clsx";
import { Border } from "./border";
import { ReactNode } from "react";

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
          "grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3",
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
        "text-base",
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