import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

//done 69: add la voz logo png or svg
interface LogoProps {
  invert?: boolean;
  href?: string;
  className?: string;
}

export const Logo = ({ href, className }: LogoProps) => {
  const containerClassName = clsx(
    "flex items-center",
    className
  );

  const imageElement = (
    <Image
      src="/ve_logo_clear.png"
      alt="Logo"
      width={120}
      height={64}
      className="w-auto h-16 object-contain"
    />
  );

  if (href) {
    return (
      <Link href={href} className={containerClassName}>
        {imageElement}
      </Link>
    );
  }

  return (
    <div className={containerClassName}>
      {imageElement}
    </div>
  );
};