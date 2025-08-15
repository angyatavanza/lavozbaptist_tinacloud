import Link from "next/link";
import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  invert?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  invert,
  href,
  className,
  children,
  ...props
}: ButtonProps) => {
  const combinedClassName = clsx(
    className,
    "inline-flex rounded-sm px-4.5 py-1.5 text-sm leading-[20px] font-roboto font-semibold transition focus:outline-none",
    invert
      ? "bg-white text-sidebar-primary ring-1 ring-sidebar-accent hover:bg-sidebar-accent/30"
      : "bg-primary-button text-primary-button-foreground hover:bg-primary-button/90"
  );

  const inner = <span>{children}</span>;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...(props as any)}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {inner}
    </button>
  );
};

