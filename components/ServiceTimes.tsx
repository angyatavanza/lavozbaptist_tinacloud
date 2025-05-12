import clsx from "clsx";

function Office({ name, children, invert = false }) {
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

const ServiceTimes = ({ invert = false, ...props }) => {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Ubicación" invert={invert}>
          7122 Robinson Church Rd
          <br />
          Charlotte, NC 28215
        </Office>
      </li>
      <li>
        <Office name="Tiempos de servicios" invert={invert}>
          Escuela Dominical 9:45AM
          <br />
          Culto General 11:00AM
        </Office>
      </li>
    </ul>
  );
};

export default ServiceTimes;
