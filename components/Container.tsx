import React, { ElementType, ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = "div",
  className,
  children,
}) => {
  return (
    <Component className={clsx("max-w-7xl mx-auto px-6 lg:px-8", className)}>
      <div className="max-w-2xl mx-auto lg:max-w-none">{children}</div>
    </Component>
  );
};