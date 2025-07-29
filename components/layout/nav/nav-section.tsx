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
    title: "Quiénes Somos",
    links: [
      { title: "Sobre Nosotros", href: "/about" },
      { title: "Propósito, Misión y valores", href: "/purpose" },
      { title: "Nuestro Pastor", href: "/our-pastor" },
      { title: "Nuestro Equipo", href: "/staff" },
    ],
  },
  {
    title: "Experiencias",
    links: [
      { title: "Mensajes", href: "/messages" },
      { title: (
          <>
            Último Mensaje <span aria-hidden="true">&rarr;</span>
          </>
        ), href: latestMessageUrl || "/messages" },
      { title: "Horario de Servicios", href: "/service-times" },
    ],
  },
  {
    title: "Conectate",
    links: [
      { title: "Jornada de Crecimiento", href: "/first-steps" },
      { title: "Grupos", href: "/groups" },
      { title: "Servir", href: "/serve" },
      { title: "Eventos", href: "/events" },
    ],
  },
  {
    title: "Recursos Comunitarios",
    links: [
      { title: "Recursos Comunitarios", href: "/community-resources" },
      { title: "Haz tu Donación en Linea", href: "/donations" },
    ],
  },
];

// Keep the old static navigation for backward compatibility
export const navigation: NavigationSection[] = createNavigation();
