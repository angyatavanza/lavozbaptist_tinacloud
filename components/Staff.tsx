import Image, { StaticImageData } from "next/image";
import logoBrightPath from "../images/staff/bright-path/logo-light.svg";
import logoFamilyFund from "../images/staff/family-fund/logo-light.svg";
import logoGreenLife from "../images/staff/green-life/logo-light.svg";
import logoHomeWork from "../images/staff/home-work/logo-light.svg";
import logoMailSmirk from "../images/staff/mail-smirk/logo-light.svg";
import logoNorthAdventures from "../images/staff/north-adventures/logo-light.svg";
import logoPhobiaLight from "../images/staff/phobia/logo-light.svg";
import logoUnseal from "../images/staff/unseal/logo-light.svg";
import { Container } from "./Container";
import { FadeIn, FadeInStagger } from "./FadeIn";

type StaffMember = [string, StaticImageData];

const staffMembers: StaffMember[] = [
  ["Pastor Hugo", logoPhobiaLight],
  ["Family Fund", logoFamilyFund],
  ["Unseal", logoUnseal],
  ["Mail Smirk", logoMailSmirk],
  ["Home Work", logoHomeWork],
  ["Green Life", logoGreenLife],
  ["Bright Path", logoBrightPath],
  ["North Adventures", logoNorthAdventures],
];

export const Staff = (): ReactElement => {
  return (
    <div className="mt-24 rounded-4xl bg-purple-800 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            ¡Bienvenidos a la Iglesia La Voz! Nuestros servicios dominicales
            ofrecen adoración y enseñanza bíblica para todas las edades. Desde
            niños hasta adultos, somos una comunidad apasionada por conectar la
            gente con su fe.
          </h2>
          <div className="h-px flex-auto bg-purple-600" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {staffMembers.map(([staff, logo]) => (
              <li key={staff}>
                <FadeIn>
                  <Image src={logo} alt={staff} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  );
};

//export default Staff;
