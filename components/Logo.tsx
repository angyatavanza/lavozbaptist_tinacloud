import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

interface LogoProps {
  invert?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
}

export const Logo = ({ invert, href, className, children }: LogoProps) => {
  className = clsx(
    className,
    "black",
    invert ? "text-white hover:text-blue-600" : "text-black hover:text-blue-600"
  );

  const inner = <span className="relative">{children}</span>;

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <h2
      className={clsx(
        "cursor-pointer text-2xl font-semibold duration-300",
        className
      )}
    >
      {inner}
    </h2>
  );
};