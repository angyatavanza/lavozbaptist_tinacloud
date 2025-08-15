import React, { ElementType, ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

export const Container = ({ as: Component = "div", className, children }: ContainerProps) => {
  return (
    <Component className={clsx("max-w-7xl mx-auto px-4 md:px-5", className)}>
      <div className="max-w-2xl mx-auto lg:max-w-none">{children}</div>
    </Component>
  );
};