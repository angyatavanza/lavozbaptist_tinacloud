import clsx from "clsx";
import React, {  ReactElement, ReactNode, HTMLAttributes } from "react";

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
      <strong className={invert ? "text-white" : "text-primary"}>
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
      <li className="col-span-1 md:col-span-6">
        <ServiceTime name="¿Dónde estamos?" invert={invert}>
          7122 Robinson Church Rd
          <br />
          Charlotte, NC 28215
        </ServiceTime>
      </li>
      <li className="col-span-1 md:col-span-6">
        <ServiceTime name="¿Cuándo nos reunimos?" invert={invert}>
          <ServiceTime name="Miércoles" invert={invert}>
            Estudio bíblico 7:00 pm
          </ServiceTime>
          <ServiceTime name="Domingo" invert={invert}>
            Estudio bíblico 9:45 am
            <br />
            Servico de adoración 11:00 am
          </ServiceTime>
        </ServiceTime>
      </li>
    </ul>
  );
};
