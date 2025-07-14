import React, { ReactNode } from "react";
import { Container } from "./container";
import clsx from "clsx";
import { FadeIn } from "../motion-primitives/fade-in";

interface PageIntroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  centered?: boolean;
}

export const PageIntro = ({
  eyebrow,
  title,
  children,
  centered = false,
}:PageIntroProps) => {
  return (
    <Container
      className={clsx("mt-24 sm:mt-32 lg:mt-40", centered && "text-center")}
    >
       <FadeIn>
        <h1>
          <span className="block font-nunito font-display text-base font-medium text-primary">
            {eyebrow}
          </span>
          <span className="sr-only"> - </span>
          <span
            className={clsx(
              "mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-primary [text-wrap:balance] sm:text-6xl",
              centered && "mx-auto"
            )}
          >
            {title}
          </span>
        </h1>
        <div
          className={clsx(
            "mt-6 max-w-3xl text-xl text-neutral-600",
            centered && "mx-auto"
          )}
        >
          {children}
        </div>
      </FadeIn>
    </Container>
  );
};