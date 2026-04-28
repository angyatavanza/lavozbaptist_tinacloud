import { FadeIn } from "../motion-primitives/fade-in";
import { ServiceTimes } from "@/components/layout/nav/service-times";
import { Border } from "@/components/ui/border";
import Link from "next/link";
import { SocialMedia } from "@/components/layout/nav/social-media";

export const ResourcesDetails = () => {
  return (
    <FadeIn>
      <h4 className="text-base font-nunito font-medium m text-primary">
       Nuestra ubicación y horario de reuniones
      </h4>
      <p className="mt-6 text-base text-body-foreground">
      Te invitamos a participar en nuestros estudios bíblicos entre semana y en el servicio general del domingo. Contamos con estacionamiento gratuito y fácil acceso al edificio. El servicio tiene una duración aproximada de 1 hora y 30 minutos. Incluye tiempos de alabanza, enseñanza bíblica práctica y momentos de oración.
      </p>
      <ServiceTimes className="mt-10 grid grid-cols-2 md:grid-cols-12 gap-5" />
      <Border className="mt-16 pt-16">
        <h4 className="text-base font-nunito font-medium m text-primary">
        Contacto
        </h4>
        <dl className="mt-6 grid grid-cols-2 md:grid-cols-12 gap-5 text-sm ">
          {([
            ["Correo electrónico", "info@ministerioslavoz.com"],
            ["Teléfono", "(704) 537-7133"],
          ] as [string, string][]).map(([label, email]) => (
            <div key={email} className="col-span-2 md:col-span-6">
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
        <h4 className="text-base font-nunito font-medium m text-primary">
          Síguenos
        </h4>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  );
};