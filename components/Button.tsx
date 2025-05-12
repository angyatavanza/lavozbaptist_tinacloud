import Link from "next/link";
import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  invert?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  invert,
  href,
  className,
  children,
  ...props
}) => {
  const combinedClassName = clsx(
    className,
    "inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition",
    invert
      ? "bg-white text-neutral-950 hover:bg-neutral-200"
      : "bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-900 focus:outline-none focus:shadow-outline"
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

//export default Button;
