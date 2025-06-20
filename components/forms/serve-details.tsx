import { FadeIn } from "../fade-in";
import { ServiceTimes } from "../service-times";
import { Border } from "../ui/border";
import Link from "next/link";
import { SocialMedia } from "../social-media";

export const ServeDetails = () => {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Nuestra ubicacion y horario de servicios
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        Le invitamos a unirse a nuestros estudios bíblicos entre semana y al servicio general del Domingo.
      </p>
      <ServiceTimes className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />
      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Ponte en Serve
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {([
            ["Correo electrónico", "info@ministerioslavoz.com"],
            ["Teléfono", "(704) 537-7133"],
          ] as [string, string][]).map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>
      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Síguenos
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  );
};