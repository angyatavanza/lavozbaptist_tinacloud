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
    "inline-flex rounded-full px-4 py-1.5 text-sm font-roboto font-bold transition",
    invert
      ? "bg-white text-primary hover:bg-neutral-200"
      : "bg-primary text-white hover:bg-primary-muted-4 active:bg-primary-bold focus:outline-none focus:shadow-outline"
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

