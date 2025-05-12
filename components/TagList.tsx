import Image from "next/image";
import clsx from "clsx";
import { ReactNode } from "react";

interface TagListProps {
  className?: string;
  children: ReactNode;
}

interface TagListItemProps {
  className?: string;
  children: ReactNode;
}

export function TagList({ className, children }: TagListProps) {
  return (
    <ul role="list" className={clsx(className, "flex flex-wrap gap-4")}>
      {children}
    </ul>
  );
}

export function TagListItem({ className, children }: TagListItemProps) {
  return (
    <li
      className={clsx(
        "rounded-full bg-neutral-100 px-4 py-1.5 text-base text-neutral-600",
        className
      )}
    >
      {children}
    </li>
  );
}
