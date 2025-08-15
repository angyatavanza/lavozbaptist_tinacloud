import { useForm } from "react-hook-form";
import { FadeIn } from "../motion-primitives/fade-in";
import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { Button } from "@/components/ui/second-button";
import MailSentState from "@/components/forms/mail-sent-state";
import { useState } from "react";

interface ServeFormInputs {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
  age: string;
  subject: string;
}

interface ServeFormProps {
  placeholder: string;
  buttonText: string;
}

export const ServeForm: React.FC<ServeFormProps> = ({
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
  } = useForm<ServeFormInputs>();

  const onSubmit = async (data: ServeFormInputs) => {
    try {
      const form = {
        ...data,
        spreadsheet: "serve",
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
        Cuéntanos en qué área te gustaría servir:
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
            {...register("email", { required: true })}
            placeholder={placeholder}
            label="Correo electrónico"
          />
          {errors.email && <span className="text-red-500 text-sm">Correo electrónico requerido</span>}

          <TextInput
            {...register("message", { required: true })}
            placeholder="Su respuestas"
            label="¿Por qué le interesa servir?"
          />
          {errors.message && (
            <span className="text-red-500 text-sm">Requerido</span>
          )}

          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">
                Mi edad:
              </legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-12 gap-5">
              {["13 - 28", "29 - 44", "45 - 60", "61 - 70"].map((value) => (
                <div key={value} className="col-span-1 md:col-span-6">
                  <RadioInput
                    label={`${value}`}
                    value={value}
                    {...register("age", { required: true })}
                  />
                </div>
              ))}
            </div>
            {errors.age && (
              <span className="text-red-500 text-sm mt-2">
                Selecciona una de las opciones
              </span>
            )}
          </div>
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">
                ¿Qué área le interesa servir?
              </legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-12 gap-5">
              {[
                "Compañerismo",
                "Comunitario",
                "Tecnología",
                "Jóvenes",
                "Niños",
                "Bienvenida",
                "Limpieza",
                "Transportación",
              ].map((value) => (
                <div key={value} className="col-span-1 md:col-span-6">
                  <RadioInput
                    label={`${value}`}
                    value={value}
                    {...register("subject", { required: true })}
                  />
                </div>
              ))}
            </div>
            {errors.subject && (
              <span className="text-red-500 text-sm mt-2">
                Seleccione su área de interés
              </span>
            )}
          </div>
        </div>
        <Button type="submit" className="mt-10" disabled={isSubmitting}>
          {buttonText}
        </Button>
      </form>
    </FadeIn>
  );
};