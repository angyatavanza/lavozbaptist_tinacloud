import { Container } from "../Container";
import { FadeIn } from "../FadeIn";
import { Button } from "../ui_version2/Button2";
import { ServiceTimes } from "../blocks/ServiceTimes";

export const ContactSection = () => {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-purple-800 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
            Comunícate con nuestro equipo
          </h2>
          <div className="mt-6 flex">
            <Button href="/contact" invert //href={"/contact"} 
            >
              Say Hello
            </Button>
            
          </div>
          <div className="mt-10 border-t border-white/10 pt-10">
            <h3 className="font-display text-base font-semibold text-white">
              Nuestra ubicacion y tiempos de servicios
            </h3>
            <ServiceTimes
              invert
              className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
            />
          </div>
        </div>
      </FadeIn>
    </Container>
  );
};