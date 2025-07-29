"use client";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, ReactNode, RefObject } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { Container } from "./container";
import Link from "next/link";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { ServiceTimes } from "./nav/service-times";
import { SocialMedia } from "./nav/social-media";
import { Footer } from "./nav/footer";
import { Header } from "./nav/header";

//done 82:root-layout: Type 'RefObject<HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
//to-do 56: change purple-800 from the hamburger menu to be neutral color & add main nav links to mobile FRONTEND
//to-do 59:  make sure all of the buttons have /links attached to them and check that the links work across the pages TINA CMS CONTENT
//done 86: merge social media & move “/constants/index.tsx” to components/nav-section.tsx & fetch latest message url BACKEND
//to-do 91: apply typography-Nunito-medium for Headings, Roboto-bold for Buttons/Link/Taglines/Subheadings, Roboto-regular Paragraph FRONTEND
//to-do 59: make sure all of the buttons have /links attached to them and check that the links work across the pages (when assigning a label to a button, this is the Error: Failed to assertShape - this must be a `object` type, but the final value was: `true`.)

/*
<Link href="/" aria-label="home" className="flex items-center space-x-2">
  <TinaIcon
  parentColor={header.color!}
  data={{
  name: header.icon!.name,
  color: header.icon!.color,
  style: header.icon!.style,
  }}
  />{" "}
  <span>
  {header.name}
  </span>
 </Link>
*/

const NavigationRow = ({ children }: { children: ReactNode }) => {
  return (
    <div className="even:mt-px md:bg-sidebar">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-12">{children}</div>
      </Container>
    </div>
  );
};

const NavigationItem = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-sidebar px-6 py-10 even:mt-px md:mx-0 md:px-0 md:py-16 md:odd:pr-16 md:even:mt-0 md:even:border-l md:even:border-sidebar-accent md:even:pl-16 col-span-2 md:col-span-6"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen sidebar-accent opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  );
};

const Navigation = () => {
  return (
    <nav className="mt-px font-nunito text-5xl font-medium tracking-tight text-sidebar-foreground">
      <NavigationRow>
        <NavigationItem href="/events">Eventos</NavigationItem>
        <NavigationItem href="/serve">Servir</NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href="/community-resources">Recursos comunitarios</NavigationItem>
        <NavigationItem href="/donations">Haz tu donación</NavigationItem>
      </NavigationRow>
    </nav>
  );
};

type RootLayoutInnerProps = {
  children: ReactNode;
};

const RootLayoutInner = ({ children }: RootLayoutInnerProps) => {
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if ((event.target as HTMLElement).closest("a")?.getAttribute("href") === window.location.href) {
        setExpanded(false);
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        <div className="absolute left-0 right-0 top-2 z-40 pt-14" aria-hidden={expanded ? true : undefined} inert={expanded ? true : undefined}>
          <Header
            panelId={panelId}
            icon={HiMenuAlt4}
            toggleRef={openRef}
            expanded={expanded}
            onToggle={() => {
              setExpanded((prev) => !prev);
              window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }));
            }}
          />
        </div>
        <motion.div
          layout
          id={panelId}
          style={{ height: expanded ? "auto" : "0.5rem" }}
          className="relative z-50 overflow-hidden bg-sidebar pt-2"
          aria-hidden={expanded ? undefined : true}
          inert={expanded ? undefined : true}
        >
          <motion.div layout className="bg-sidebar-accent">
            <div ref={navRef} className="bg-sidebar pb-16 pt-14">
              <Header
                invert
                panelId={panelId}
                icon={IoMdClose}
                toggleRef={closeRef}
                expanded={expanded}
                onToggle={() => {
                  setExpanded((prev) => !prev);
                  window.setTimeout(() => openRef.current?.focus({ preventScroll: true }));
                }}
              />
            </div>
            <Navigation />
            <div className="relative bg-sidebar before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-sidebar-accent">
              <Container>
                <div className="grid grid-cols-2 gap-y-10 pb-16 pt-10 md:grid-cols-12 md:pt-16">
                  <div className="col-span-2 md:col-span-6">
                    <h2 className=" text-base font-nunito font-medium text-sidebar-foreground">
                     Nuestra ubicación y horario de servicios
                    </h2>
                    <ServiceTimes invert className="mt-6 grid grid-cols-2 gap-3.75 md:grid-cols-12" />
                  </div>
                  <div className="col-span-2 md:col-span-6 md:border-l md:border-transparent md:pl-16">
                    <h2 className=" text-base font-nunito font-medium text-sidebar-foreground">
                      Síguenos
                    </h2>
                    <SocialMedia className="mt-6" invert />
                  </div>
                </div>
              </Container>
            </div>
          </motion.div>
        </motion.div>
      </header>
      <motion.div layout style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }} className="relative flex flex-auto overflow-hidden bg-white pt-14">
        <motion.div layout className="relative isolate flex w-full flex-col pt-9">
          <main className="w-full flex-auto">{children}</main>
          <Footer />
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

type RootLayoutProps = {
  children: ReactNode;
};

export const RootLayout = ({ children }: RootLayoutProps) => {
  const pathName = usePathname();
  return (
      <RootLayoutInner key={pathName}>{children}</RootLayoutInner>
  );
};
