import clsx from "clsx";
import React, {  ReactElement, ReactNode, HTMLAttributes } from "react";
//to-do 62:edit content in service-times page
type ServiceTimeProps = {
  name: string;
  children: ReactNode;
  invert?: boolean;
};

function ServiceTime({ name, children, invert = false }: ServiceTimeProps): ReactElement {
  return (
    <address
      className={clsx(
        "text-sm not-italic",
        invert ? "text-neutral-300" : "text-neutral-600"
      )}
    >
      <strong className={invert ? "text-white" : "text-neutral-950"}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  );
}

type ServiceTimesProps = {
  invert?: boolean;
} & HTMLAttributes<HTMLUListElement>;

export const ServiceTimes = ({
  invert = false,
  ...props
}: ServiceTimesProps): ReactElement => {
  return (
    <ul role="list" {...props}>
      <li>
        <ServiceTime name="Ubicación" invert={invert}>
          7122 Robinson Church Rd
          <br />
          Charlotte, NC 28215
        </ServiceTime>
      </li>
      <li>
        <ServiceTime name="Horario de servicios" invert={invert}>
          Escuela Dominical 9:45AM
          <br />
          Culto General 11:00AM
        </ServiceTime>
      </li>
    </ul>
  );
};
