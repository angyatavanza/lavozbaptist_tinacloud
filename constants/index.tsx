import { ReactNode } from "react";
import { SocialMediaProfiles } from "../components/social-media";

interface NavigationLink {
  title: string | ReactNode;
  href: string;
}

interface NavigationSection {
  title: string;
  links: NavigationLink[];
}

export const navigation: NavigationSection[] = [
  {
    title: "Quiénes Somos",
    links: [
      { title: "Sobre Nosotros", href: "/about" },
      { title: "Propósito, Estrategia y Valores", href: "/purpose" },
      { title: "Nuestro Pastor", href: "/our-pastor" },
      { title: "Nuestro Equipo", href: "/staff" },
      { title: "Política de Privacidad", href: "/privacy" },
    ],
  },
  {
    title: "Mensajes",
    links: [
      { title: "Mensajes", href: "/messages" },
      { title: "Último Mensaje", href: "/messages/amazonclone" },
      { title: "Tiempos de Servicios", href: "/service-times" },
      {
        title: (
          <>
            Ver Archivo de Mensajes <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: "/all-messages",
      },
    ],
  },
  {
    title: "Conectate",
    links: [
      { title: "Jornada de Crecimiento", href: "/growth" },
      { title: "Grupos", href: "/groups" },
      { title: "Servir", href: "/serve" },
      { title: "Eventos", href: "/events" },
    ],
  },
  {
    title: "Recursos Comunitarios",
    links: [
      { title: "Recursos Comunitarios", href: "/community-resources" },
    ],
  },
  {
    title: "Haz tu Donación",
    links: [
      { title: "Haz tu Donación en Linea", href: "/give" },
      { title: "Preguntas Frecuentes", href: "/give/faqs" },
    ],
  },
  {
    title: "Síguenos",
    links: SocialMediaProfiles,
  },
];
