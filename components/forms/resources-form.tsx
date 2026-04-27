import { useForm } from 'react-hook-form';
import { FadeIn } from "../motion-primitives/fade-in";
import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { Button } from "@/components/ui/second-button";
import MailSentState from "@/components/forms/mail-sent-state";
import { useState } from 'react';

interface ResourcesFormInputs {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  address: string;
  citystate: string;
  zip: string;
}

interface ResourcesFormProps {
  placeholder: string;
  buttonText: string;
}

export const ResourcesForm: React.FC<ResourcesFormProps> = ({
  placeholder,
  buttonText,
}) => {
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResourcesFormInputs>();

  const onSubmit = async (data: ResourcesFormInputs) => {
    try {
      const form = {
        ...data,
        spreadsheet: "resources",
      };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Submission failed");

      setSuccess(true);
      reset();
    } catch (err) {
      setHasError(true);
    }
  };

  if (success) return <MailSentState />;
  
  return (
    <FadeIn>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-base font-nunito font-medium text-primary">
        Llena este formulario para acceder a recursos y apoyo:
        </h4>

        {hasError && (
          <p className="text-red-500 text-sm mt-2">
            No se pudo enviar el mensaje. Inténtelo de nuevo.
          </p>
        )}

        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput
            {...register("name", { required: true })}
            placeholder=""
            label="Nombre"
          />
          {errors.name && <span className="text-red-500 text-sm">Nombre requerido</span>}

          <TextInput
            {...register("lastname")}
            placeholder=""
            label="Apellido"
          />

          <TextInput
            type="tel"
            {...register("phone", { required: true })}
            placeholder=""
            label="Número de teléfono"
          />
          {errors.phone && <span className="text-red-500 text-sm">Número de teléfono requerido</span>}

          <TextInput
            type="email"
            {...register("email", { required: false })}
            placeholder={placeholder}
            label="Correo electrónico"
          />

          <TextInput
            {...register("address", { required: true})}
            placeholder=""
            label="Línea de dirección 1"
          />
          {errors.address && <span className="text-red-500 text-sm">Dirección requerida</span>}

          <TextInput
            {...register("citystate", { required: true})}
            placeholder=""
            label="Ciudad y estado"
          />
          {errors.citystate && <span className="text-red-500 text-sm">Ciudad y estado requerido</span>}

          
          <TextInput
            {...register("zip", { required: true})}
            placeholder=""
            label="Código postal"
          />
          {errors.zip && <span className="text-red-500 text-sm">Código postal requerido</span>}

          <TextInput
            {...register("message", { required: true })}
            placeholder=""
            label="¿Qué situación estás enfrentando y cómo podemos ayudarte?"
          />
          {errors.message && <span className="text-red-500 text-sm">Mensaje requerido</span>}

          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">¿De qué manera podemos asistirte?</legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-12 gap-5">
              
              {["Productos para el Cuidado Infantil", "Servicios y Apoyos Locales", "Otros Artículos de Primera Necesidad"].map((value) => (
                <div key={value} className="col-span-1 md:col-span-6">
                  <RadioInput
                    label={`${value}`}
                    value={value}
                    {...register("subject", { required: true })}
                  />
                </div>
              ))}
            </div>
            {errors.subject && <span className="text-red-500 text-sm mt-2">Selecciona un asunto</span>}
          </div>
        </div>
        <Button type="submit" className="mt-10" disabled={isSubmitting}>
          {buttonText}
        </Button>
      </form>
    </FadeIn>
  );
};