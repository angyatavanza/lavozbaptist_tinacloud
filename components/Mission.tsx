import React from "react";
import { SectionIntro } from "./layout/SectionIntro";
import { Container } from "./Container";
import { GridList, GridListItem } from "./GridList";

export const Mission  = () => {
  return (
    <div className="mt-24 rounded-4xl bg-purple-800 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Nuestra Misión"
        title="Alcanzamos Personas para Cristo"
        invert
      >
        <p>
          Nos dedicamos a alcanzar personas para Cristo, guiarlos a servir,
          adorar y tener una vida consagrada para Dios.
        </p>
      </SectionIntro>

      <Container className="mt-16">
        <SectionIntro eyebrow="Nuestros Valores:" title="" invert />
        <GridList>
          <GridListItem title="Evangelismo" invert>
            Extender el Reino de Dios a través de evangelismo y equipos
            misioneros. Se valora el evangelismo que sea para los de afuera de
            la iglesia. Creemos que “en tanto la iglesia no cumpla con su obra
            evangelizadora y misionera, no justifica su existencia” (Hch 1:8).
          </GridListItem>
          <GridListItem title="Atmósfera de Aceptación" invert>
            Creemos que todas las personas son importantes para Dios y por lo
            tanto le deben importar a la iglesia. Como resultado la iglesia debe
            proyectar una atmósfera aceptación y amor al prójimo (Jn 3:16).
          </GridListItem>
          <GridListItem title="Orientados al Discipulado" invert>
            Creemos en la completa devoción a Cristo, a través del discipulado
            como la norma para todo creyente. El llegar a ser como Jesús debe
            ser una prioridad para cada persona que se integra a la iglesia (Fil
            1:6).
          </GridListItem>
        </GridList>
      </Container>

      <Container className="mt-16">
        <GridList>
          <GridListItem title="Comunicación con Dios" invert>
            No dejar de comunicarnos con Dios a través de la oración. Se valora
            la espiritualidad. Creemos que la oración nos ayuda a alinear
            nuestra voluntad a la voluntad de Dios, por lo tanto, la oración es
            vital para nuestro crecimiento espiritual al buscar la voluntad de
            Dios en lo personal y como iglesia (1 Ts 5:17).
          </GridListItem>
          <GridListItem title="La Adoración Inspiradora" invert>
            Se valora una adoración que se autentica, eficaz y de vivirla a cada
            día. Creemos en buscar el amor de Dios en nuestras vidas, como una
            evidencia que debemos tener a través de la verdadera adoración a Él.
            Creemos que podemos adorar a Dios en Espíritu y en verdad, a través
            de nuestra vida, y testimonio personal (Jn 4).
          </GridListItem>
        </GridList>
      </Container>

      <Container className="mt-16">
        <GridList>
          <GridListItem title="Variedad en Sus Ministerios" invert>
            Se valoran los ministerios que sean compatibles para la gente y que
            se ajusten para los de la iglesia. Creemos que todos los ministerios
            “son una alta prioridad para la iglesia”. Ministerios comunitarios,
            ministerios con los niños, adolescentes, jóvenes, adultos, y los que
            la iglesia pueda implementar. Queremos ser un centro de
            evangelización, edificación y equipamiento que exista para motivar a
            ejercer los dones a través de los ministerios (Hch 2:42-46).
          </GridListItem>
          <GridListItem title="Enseñanza Bíblica (Grupos Pequeños)" invert>
            Se valora la enseñanza bíblica a través de discipular en clases de
            crecimiento y en grupos pequeños. Creemos que el crecimiento
            espiritual en la vida se aprende mejor en estudios bíblicos en
            grupos pequeños. Creemos que cada creyente debería participar en los
            grupos pequeños de estudio bíblico para su crecimiento espiritual,
            así como para alcanzar a los que no se congregan. Y cumplir los
            propósitos dentro y fuera de la iglesia (Hch 2:46).
          </GridListItem>
        </GridList>
      </Container>
    </div>
  );
};

//export default Mission;
