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
      className={clsx("mt-20 md:mt-28", centered && "text-center")}
    >
       <FadeIn>
        <h1>
          <span className="block font-nunito text-base font-semibold text-primary">
            {eyebrow}
          </span>
          <span className="sr-only"> - </span>
          <span
            className={clsx(
              "font-nunito mt-6 block max-w-5xl tracking-tight text-4xl font-medium text-primary [text-wrap:balance] md:text-5xl",
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