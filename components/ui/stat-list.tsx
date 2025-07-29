import Image from "next/image";
import { Border } from "./border";
import { FadeIn, FadeInStagger } from "../motion-primitives/fade-in";
import React, { ReactNode, ReactElement } from "react";

// Props for StatList
interface StatListProps {
  children: ReactNode;
  [key: string]: any; // Allow passing additional props to FadeInStagger
}

export function StatList({ children, ...props }: StatListProps): ReactElement {
  return (
    <FadeInStagger {...props}>
      <dl className="grid grid-cols-2 gap-3.75 md:grid-cols-12 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        {children}
      </dl>
    </FadeInStagger>
  );
}

// Props for StatListItem
interface StatListItemProps {
  label: ReactNode;
  value: ReactNode;
}

export function StatListItem({ label, value }: StatListItemProps): ReactElement {
  return (
    <Border as={FadeIn} position="left" className="flex flex-col-reverse pl-8 col-span-1 md:col-span-6">
      <dt className="mt-2 text-base text-neutral-600">{label}</dt>
      <dd className="font-nunito text-3xl font-medium text-primary md:text-4xl">
        {value}
      </dd>
    </Border>
  );
}
