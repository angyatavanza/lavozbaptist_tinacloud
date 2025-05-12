import Link from "next/link";
import clsx from "clsx";
import {
  BsFacebook,
  BsTwitter,
  BsGithub,
  BsYoutube,
  BsLinkedin,
  BsInstagram,
  IconType,
} from "react-icons/bs";

type SocialMediaProfile = {
  title: string;
  href: string;
  icon: IconType;
};

export const SocialMediaProfiles: SocialMediaProfile[] = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/watch?v=eAswnbWptBM",
    icon: BsYoutube,
  },
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
];

type SocialMediaProps = {
  className?: string;
  invert?: boolean;
};

export const SocialMedia = ({ className, invert = false }: SocialMediaProps): JSX.Element => {
  return (
    <ul
      role="list"
      className={clsx(
        "flex gap-x-10",
        invert ? "text-white" : "text-neutral-950",
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
              invert ? "hover:text-neutral-200" : "hover:text-neutral-700"
            )}
          >
            <item.icon className="h-6 w-6 fill-current" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

//export default SocialMedia;
