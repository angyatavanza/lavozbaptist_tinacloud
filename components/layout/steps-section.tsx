import { ReactNode } from "react";
import { FadeIn } from "../motion-primitives/fade-in";
import { Container } from "./container";
import { StylizedImage } from "@/components/ui/stylized-image";
import { ImageProps } from "next/image";

type StepsSectionProps = {
  title: string;
  image: {
    src: ImageProps["src"];
    shape?: number;
  };
  children: ReactNode;
};

export const StepsSection = ({ title, image, children }: StepsSectionProps) => {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:gap-5 lg:group-even/section:flex-row-reverse xl:gap-5">
        <div className="flex justify-center lg:-ml-[calc(50vw-50%)] lg:group-even/section:ml-0 lg:group-even/section:-mr-[calc(50vw-50%)]">
           <FadeIn className="w-[33.75rem] flex-none lg:w-[42rem] xl:w-[43rem] 2xl:w-[45rem]">
             <StylizedImage
               {...image}
               alt="An illustration"
               sizes="(min-width: 1024px) 41rem, 31rem"
               className="justify-center lg:justify-end lg:group-even/section:justify-start"
             />
           </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[35rem] xl:w-[37rem] lg:flex-none">
          <FadeIn>
            <div
              className="font-nunito text-base font-medium before:text-neutral-300 before:content-['/_'] after:text-primary after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-nunito font-semibold text-pretty text-[34px] leading-[44px] md:text-5xl md:leading-[60px] tracking-tight text-primary">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  );
};
