import { FadeIn } from "../fade-in";
import { ServiceTimes } from "../service-times";
import { Border } from "../ui/border";
import Link from "next/link";
import { SocialMedia } from "../social-media";
//done 42: add functionality to contact-form TINA CMS/BACKEND
    //done 42b: (add errors, mail-sent confirmation, to contact-form ?) TINA CMS/BACKEND
//done 43:  add contact page to /content + add form-details component to /form page TINA CMS/BACKEND
//done 44: remove newsletter-form TINA CMS/BACKEND
//done 45: create privacy page and add content blocks to privacy page TINA CMS/CONTENT 
export const ContactDetails = () => {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
       Nuestra ubicación y horario de servicios
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        Le invitamos a unirse a nuestros estudios bíblicos entre semana y al servicio general del Domingo. Contamos con estacionamiento gratuito y fácil acceso al edificio. El servicio tiene una duración aproximada de 1 hora y 30 minutos. Incluye tiempos de alabanza, enseñanza bíblica práctica y momentos de oración
      </p>
      <ServiceTimes className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />
      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Ponte en contacto
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