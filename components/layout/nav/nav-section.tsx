import React, { ReactNode } from "react";

interface NavigationLink {
  title: string | ReactNode;
  href: string;
}

interface NavigationSection {
  title: string;
  links: NavigationLink[];
}

export const createNavigation = (latestMessageUrl?: string): NavigationSection[] => [
  {
    title: "Quiénes somos",
    links: [
      { title: "Sobre nosotros", href: "/about" },
      { title: "Propósito, misión y valores", href: "/purpose" },
      { title: "Nuestro pastor", href: "/our-pastor" },
      { title: "Nuestro equipo", href: "/staff" },
    ],
  },
  {
    title: "Experiencias",
    links: [
      { title: "Mensajes", href: "/messages" },
      { title: (
          <>
            Mensaje más reciente <span aria-hidden="true">&rarr;</span>
          </>
        ), href: latestMessageUrl || "/messages" },
      { title: "Horario de servicios", href: "/service-times" },
    ],
  },
  {
    title: "Conéctate",
    links: [
      { title: "Primeros pasos", href: "/first-steps" },
      { title: "Grupos", href: "/groups" },
      { title: "Servir", href: "/serve" },
      { title: "Eventos", href: "/events" },
    ],
  },
  {
    title: "Recursos comunitarios",
    links: [
      { title: "Recursos comunitarios", href: "/community-resources" },
      { title: "Haz tu donación en línea", href: "/donations" },
    ],
  },
];

// Keep the old static navigation for backward compatibility
export const navigation: NavigationSection[] = createNavigation();
