import clsx from "clsx";
import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";

interface LogoProps extends HTMLAttributes<HTMLAnchorElement | HTMLHeadingElement> {
  invert?: boolean;
  href?: string;
  className?: string;
  children: ReactNode;
}

export const Logo = ({ invert, href, className, children, ...props }: LogoProps) => {
  const combinedClassName = clsx(
    className,
    "black",
    invert ? "text-white hover:text-blue-600" : "text-black hover:text-blue-600"
  );

  const inner = <span className="relative">{children}</span>;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {inner}
      </Link>
    );
  }

  return (
    <h2
      className={clsx(
        "cursor-pointer text-2xl font-semibold duration-300",
        combinedClassName
      )}
      {...props}
    >
      {inner}
    </h2>
  );
};

//export default Logo;
