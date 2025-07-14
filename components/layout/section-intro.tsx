import React, { ReactNode } from "react";
import { Container }from "./container";
import { FadeIn } from "../motion-primitives/fade-in";
import clsx from "clsx";

interface SectionIntroProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  smaller?: boolean;
  invert?: boolean;
}

export const SectionIntro = ({
  eyebrow,
  title,
  children,
  smaller = false,
  invert = false,
  ...props
}: SectionIntroProps) => {
  return (
    <Container {...props}>
      <FadeIn className="max-w-2xl">
        <h2>
          {eyebrow && (
            <>
              <span
                className={clsx(
                  "mb-6 block font-display text-base font-nunito font-medium",
                  invert ? "text-white" : "text-primary"
                )}
              >
                {eyebrow}
              </span>
              <span className="sr-only"> - </span>
            </>
          )}
          <span
            className={clsx(
              "block font-display tracking-tight [text-wrap:balance]",
              smaller
                ? "text-2xl font-nunito font-medium"
                : "text-4xl font-nunito font-regular sm:text-5xl",
              invert ? "text-white" : "text-primary"
            )}
          >
            {title}
          </span>
        </h2>
        {children && (
          <div
            className={clsx(
              "mt-6 text-xl",
              invert ? "text-neutral-300" : "text-neutral-600"
            )}
          >
            {children}
          </div>
        )}
      </FadeIn>
    </Container>
  );
};