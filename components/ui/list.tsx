import React, { ReactNode } from "react";
import { FadeIn, FadeInStagger } from "../motion-primitives/fade-in";
import { Border } from "./border";
import clsx from "clsx";

interface ListProps {
  className?: string;
  children: ReactNode;
}

export const List = ({ className, children }: ListProps) => {
  return (
    <FadeInStagger>
      <ul role="list" className={clsx("text-base text-neutral-600", className)}>
        {children}
      </ul>
    </FadeInStagger>
  );
};

interface ListItemProps {
  title?: string;
  children: ReactNode;
}

export const ListItem = ({ title, children }: ListItemProps) => {
  return (
    <li className="group mt-10 first:mt-0">
      <FadeIn>
        <Border className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
          {title && (
            <strong className="font-medium text-primary">{`${title}. `}</strong>
          )}
          {children}
        </Border>
      </FadeIn>
    </li>
  );
};

//export default List;
