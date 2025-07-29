import Image, { ImageProps } from "next/image";
import clsx from "clsx";
import { Border } from "./border";
import React, { ReactNode, ReactElement } from "react";

// Shared coordinator type
interface Coordinator {
  name: string;
  role: string;
}

// Props for both versions of the blockquote
interface BaseBlockquoteProps {
  coordinator: Coordinator;
  children: ReactNode;
  className?: string;
}

// Props for blockquote with image
interface BlockquoteWithImageProps extends BaseBlockquoteProps {
  image: ImageProps;
}

// Blockquote with image
function BlockquoteWithImage({
  coordinator,
  image,
  children,
  className,
}: BlockquoteWithImageProps): ReactElement {
  return (
    <figure
      className={clsx(
        "grid grid-cols-2 items-center gap-x-4 gap-y-8 md:grid-cols-12 md:grid-rows-[1fr,auto,auto,1fr] md:gap-x-10 lg:gap-x-16",
        className
      )}
    >
      <blockquote className="col-span-2 text-xl/7 text-neutral-600 md:col-span-7 md:col-start-6 md:row-start-2">
        {typeof children === "string" ? <p>{children}</p> : children}
      </blockquote>
      <div className="col-start-1 row-start-2 overflow-hidden rounded-xl bg-neutral-100 md:col-span-5 md:row-span-full md:rounded-3xl">
        <Image
          {...image}
          alt=""
          sizes="(min-width: 1024px) 17.625rem, (min-width: 768px) 16rem, (min-width: 640px) 40vw, 3rem"
          className="h-12 w-12 object-cover grayscale md:aspect-[7/9] md:h-auto md:w-full"
        />
      </div>
      <figcaption className="text-sm text-primary md:col-span-7 md:row-start-3 md:text-base">
        <span className="font-medium">{coordinator.name}</span>
        <span className="hidden font-medium md:inline">, </span>
        <br className="md:hidden" />
        <span className="md:font-medium">{coordinator.role}</span>
      </figcaption>
    </figure>
  );
}

// Blockquote without image
function BlockquoteWithoutImage({
  coordinator,
  children,
  className,
}: BaseBlockquoteProps): ReactElement {
  return (
    <Border position="left" className={clsx("pl-8", className)}>
      <figure className="text-sm">
        <blockquote className="text-neutral-600 [&>*]:relative [&>:first-child]:before:absolute [&>:first-child]:before:right-full [&>:first-child]:before:content-['“'] [&>:last-child]:after:content-['”']">
          {typeof children === "string" ? <p>{children}</p> : children}
        </blockquote>
        <figcaption className="mt-6 font-medium text-primary">
          {coordinator.name}, {coordinator.role}
        </figcaption>
      </figure>
    </Border>
  );
}

// Final Blockquote component
type BlockquoteProps = BaseBlockquoteProps & Partial<Pick<BlockquoteWithImageProps, "image">>;

export const Blockquote = (props: BlockquoteProps): ReactElement => {
  if (props.image) {
    return (
      <BlockquoteWithImage 
        {...(props as BlockquoteWithImageProps)} 
      />
    )
  }
  return (
    <BlockquoteWithoutImage 
      {...props} 
    />
  )
};
