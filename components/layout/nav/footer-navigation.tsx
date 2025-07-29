"use client";
import { createNavigation } from "@/components/layout/nav/nav-section";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ReactNode } from "react";

type NavigationLink = {
  title: string | ReactNode;
  href: string;
};

type NavigationSection = {
  title: string;
  links: NavigationLink[];
};

export const FooterNavigation = () => {
  const [navigation, setNavigation] = useState<NavigationSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestMessage = async () => {
      try {
        const response = await fetch('/api/latest-message');
        if (response.ok) {
          const { latestMessageUrl } = await response.json();
          setNavigation(createNavigation(latestMessageUrl));
        } else {
          // Fallback to default navigation if API fails
          setNavigation(createNavigation("/messages"));
        }
      } catch (error) {
        console.error('Error fetching latest message:', error);
        // Keep the default navigation if there's an error
        setNavigation(createNavigation("/messages"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestMessage();
  }, []);

  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-3.75 md:grid-cols-12">
        {navigation.map((item) => (
          <li key={item.title} className="col-span-1 md:col-span-3">
            <div className="font-nunito text-sm font-medium tracking-wider text-primary">
              {item.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {item.links.map((link, index) => (
                <li key={`${link.title}-${index}`} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};
