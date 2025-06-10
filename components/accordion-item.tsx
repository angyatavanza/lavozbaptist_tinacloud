import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClick: () => void;
};

export const AccordionItem = ({
  title,
  children,
  onClick,
  open = false,
}: Props) => {


  return (
    <article className="w-full select-none">
      <div
        onClick={onClick}
        className="flex cursor-pointer items-center justify-between gap-[24px] "
      >
        <h4 className="text-darkPurple font-semibold lg:text-lg">{title}</h4>
        {open ? (
          <Image
            alt=""
            src="/icon-minus.svg"
            width={0}
            height={0}
            className="h-[30px] w-[30px] "
          />
        ) : (
          <Image
            src="/icon-plus.svg"
            alt=""
            width={0}
            height={0}
            className="h-[30px] w-[30px] "
          />
        )}
      </div>
      {open && (
        <div className="">
          {children}
        </div>
      )}
    </article>
  );
};