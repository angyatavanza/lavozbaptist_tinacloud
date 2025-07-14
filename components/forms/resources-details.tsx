import { FadeIn } from "../motion-primitives/fade-in";
import { ServiceTimes } from "@/components/layout/nav/service-times";
import { Border } from "@/components/ui/border";
import Link from "next/link";
import { SocialMedia } from "@/components/layout/nav/social-media";

export const ResourcesDetails = () => {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-nunito font-medium m text-primary">
       Nuestra ubicación y horario de servicios
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        Le invitamos a unirse a nuestros estudios bíblicos entre semana y al servicio general del Domingo.
      </p>
      <ServiceTimes className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />
      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-nunito font-medium m text-primary">
          Ponte en contacto
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {([
            ["Correo electrónico", "info@ministerioslavoz.com"],
            ["Teléfono", "(704) 537-7133"],
          ] as [string, string][]).map(([label, email]) => (
            <div key={email}>
              <dt className="font-medium text-primary">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-primary"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>
      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-nunito font-medium m text-primary">
          Síguenos
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  );
};