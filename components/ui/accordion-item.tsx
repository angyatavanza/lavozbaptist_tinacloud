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
    <article className="faq-item-container flex items-start self-stretch relative bg-white border border-border rounded-xl p-[18px_20px] gap-5 max-[768px]:p-[18px_20px] max-[768px]:gap-5 min-[769px]:p-[22px_30px] min-[769px]:gap-5">
      <div className="faq-content-container flex flex-col justify-center items-start gap-5 flex-1 self-stretch relative">
        <div
          onClick={onClick}
          className={`faq-title-clickable self-stretch cursor-pointer text-base font-semibold relative ${
            open ? "text-primary font-nunito" : "text-body-foreground font-nunito"
          }`}
        >
          {title}
        </div>
        {open && (
          <>
            <div className="faq-separator w-full max-w-[585px] h-px bg-[#E5EFFF] relative" />
            <div className="faq-content self-stretch text-sm font-normal leading-[150%] text-body-foreground relative font-nunito">
              {children}
            </div>
          </>
        )}
      </div>
      <div
        className={`faq-button flex p-[10px] items-start gap-5 rounded-[52px] relative cursor-pointer ${
          open ? "bg-primary" : "bg-[#FAFAFA]"
        }`}
        onClick={onClick}
      >
        {open ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.667 7.33301H3.33366C3.15685 7.33301 2.98728 7.40325 2.86225 7.52827C2.73723 7.65329 2.66699 7.82286 2.66699 7.99967C2.66699 8.17649 2.73723 8.34605 2.86225 8.47108C2.98728 8.5961 3.15685 8.66634 3.33366 8.66634H12.667C12.8438 8.66634 13.0134 8.5961 13.1384 8.47108C13.2634 8.34605 13.3337 8.17649 13.3337 7.99967C13.3337 7.82286 13.2634 7.65329 13.1384 7.52827C13.0134 7.40325 12.8438 7.33301 12.667 7.33301Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.667 7.33366H8.66699V3.33366C8.66699 3.15685 8.59675 2.98728 8.47173 2.86225C8.34671 2.73723 8.17714 2.66699 8.00033 2.66699C7.82351 2.66699 7.65394 2.73723 7.52892 2.86225C7.4039 2.98728 7.33366 3.15685 7.33366 3.33366V7.33366H3.33366C3.15685 7.33366 2.98728 7.4039 2.86225 7.52892C2.73723 7.65394 2.66699 7.82351 2.66699 8.00033C2.66699 8.17714 2.73723 8.34671 2.86225 8.47173C2.98728 8.59675 3.15685 8.66699 3.33366 8.66699H7.33366V12.667C7.33366 12.8438 7.4039 13.0134 7.52892 13.1384C7.65394 13.2634 7.82351 13.3337 8.00033 13.3337C8.17714 13.3337 8.34671 13.2634 8.47173 13.1384C8.59675 13.0134 8.66699 12.8438 8.66699 12.667V8.66699H12.667C12.8438 8.66699 13.0134 8.59675 13.1384 8.47173C13.2634 8.34671 13.3337 8.17714 13.3337 8.00033C13.3337 7.82351 13.2634 7.65394 13.1384 7.52892C13.0134 7.4039 12.8438 7.33366 12.667 7.33366Z"
              fill="#60388C"
            />
          </svg>
        )}
      </div>
    </article>
  );
};
