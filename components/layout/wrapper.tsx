import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="flex-1 [&>*:not(:first-child)]:mt-20 [&>svg]:w-full [&>svg]:h-[25rem] [&>p]:text-[40px] [&>p]:text-center">
      {children}
    </div>
  );
};