import React, { ReactNode } from "react";
import { GridPattern } from "./grid-pattern";
import clsx from "clsx";
import { Container } from "./container";
import { FadeIn } from "./fade-in";
import Image from "next/image";
import { Button } from "./ui/second-button";

interface Staff {
  logo: string;
  name: string;
}

interface ShortMissionProps {
  children: ReactNode;
  staff: Staff;
  className?: string;
}

export const ShortMission = ({ children, staff, className }: ShortMissionProps) => {
  return (
    <div
      className={clsx(
        "relative isolate bg-neutral-50 py-16 sm:py-28 md:py-32",
        className
      )}
    >
      <GridPattern
        className="absolute inset-0 -z-10 h-full w-full fill-neutral-100 stroke-purple-800/5 [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
        yOffset={-256}
      />
      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-4xl">
            <blockquote className="relative font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              <p className="before:content-['“'] after:content-['”'] sm:before:absolute sm:before:right-full">
                {children}
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <Image src={staff.logo} alt={staff.name} unoptimized />
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </div>
  );
};
