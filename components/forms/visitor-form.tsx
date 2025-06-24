import { useForm } from 'react-hook-form';
import { FadeIn } from "../fade-in";
import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { Button } from "../ui/second-button";
import MailSentState from "@/components/forms/mail-sent-state";
import { useState } from 'react';

//done 41: add functionality to ftvisitor-form  TINA CMS/BACKEND

interface FTVisitorFormInputs {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  citystatezip: string;
  visitcount: string;
  subject: string;
}

interface FTVisitorFormProps {
  placeholder: string;
  buttonText: string;
}

export const FTVisitorForm: React.FC<FTVisitorFormProps> = ({
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
  } = useForm<FTVisitorFormInputs>();

  const onSubmit = async (data: FTVisitorFormInputs) => {
    try {
      const form = {
        ...data,
        spreadsheet: "ftvisitor",
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
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Tiene preguntas? Contáctenos un mensaje:
        </h2>

        {hasError && (
          <p className="text-red-500 text-sm mt-2">
            No se pudo enviar el mensaje. Inténtelo de nuevo.
          </p>
        )}

        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput
            {...register("name", { required: true })}
            placeholder="Su nombre"
            label="Nombre"
          />
          {errors.name && <span className="text-red-500 text-sm">Requerido</span>}

          <TextInput
            {...register("lastname")}
            placeholder="Su apellido"
            label="Apellido"
          />

          <TextInput
            type="tel"
            {...register("phone")}
            placeholder="Su número de teléfono"
            label="Número de teléfono"
          />

          <TextInput
            type="email"
            {...register("email", { required: true })}
            placeholder={placeholder}
            label="Correo electrónico"
          />
          {errors.email && <span className="text-red-500 text-sm">Correo requerido</span>}
          
          <TextInput
            {...register("address", { required: false})}
            placeholder="Calle"
            label="Línea de dirección 1"
          />

          <TextInput
            {...register("citystatezip", { required: false})}
            placeholder="Ciudad Estado Código Postal"
            label="Línea de dirección 2"
          />
          
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Estoy Visitando:</legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {["1a. Vez", "2a. Vez" ].map((value) => (
                <RadioInput
                  key={value}
                  label={`${value}`}
                  value={value}
                  {...register("visitcount", { required: true })}
                />
              ))}
            </div>
            {errors.visitcount && <span className="text-red-500 text-sm mt-2">Selecciona una de las opciones</span>}
          </div>
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Me Gustaría:</legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {["Conocer Más Acerca De Jesús", "Buscar Un Lugar Para Reunirme", "Visita Del Pastor", "Ser Bautizado","Ser Parte De La Familia Espiritual"].map((value) => (
                <RadioInput
                  key={value}
                  label={`${value}`}
                  value={value}
                  {...register("subject", { required: true })}
                />
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