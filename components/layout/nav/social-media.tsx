import Link from "next/link";
import clsx from "clsx";
import {
  BsFacebook,
  BsTwitter,
  BsGithub,
  BsYoutube,
  BsLinkedin,
  BsInstagram,
} from "react-icons/bs";
import { ComponentType } from "react";

export interface SocialMediaProfile {
  title: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export const SocialMediaProfiles: SocialMediaProfile[] = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/lavozdelaesperanzacharlotte",
    icon: BsFacebook,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/lavozdelaesperanzacharlotte/?hl=en/",
    icon: BsInstagram,
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/@lavozdelaesperanza5391",
    icon: BsYoutube,
  },
];

interface SocialMediaProps {
  className?: string;
  invert?: boolean;
}

export const SocialMedia = ({ className, invert = false }: SocialMediaProps) => {
  return (
    <ul
      role="list"
      className={clsx(
        "flex gap-5",
        invert ? "text-white" : "text-primary",
        className
      )}
    >
      {SocialMediaProfiles.map((item) => (
        <li key={item.title}>
          <Link
            href={item.href}
            aria-label={item.title}
            className={clsx(
              "transition",
              invert ? "hover:text-neutral-200" : "hover:text-primary"
            )}
          >
            <item.icon className="h-6 w-6 fill-current" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

