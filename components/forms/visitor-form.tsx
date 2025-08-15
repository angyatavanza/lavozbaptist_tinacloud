import { useForm } from 'react-hook-form';
import { FadeIn } from "../motion-primitives/fade-in";
import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { Button } from "@/components/ui/second-button";
import MailSentState from "@/components/forms/mail-sent-state";
import { useState } from 'react';

interface FTVisitorFormInputs {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  address2: string;
  citystate: string;
  zip: string;
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
        <h4 className="text-base font-nunito font-medium text-primary">
         Completa el formulario de visita:
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
            {...register("address", { required: true})}
            placeholder=""
            label="Línea de dirección 1"
          />
          {errors.address && <span className="text-red-500 text-sm">Dirección requerida</span>}

          <TextInput
            {...register("address2", { required: false})}
            placeholder=""
            label="Línea de dirección 2 (opcional)"
          />

          <TextInput
            {...register("citystate", { required: false})}
            placeholder=""
            label="Ciudad Estado"
          />
          
          <TextInput
            {...register("zip", { required: true})}
            placeholder=""
            label="Código postal"
          />
          {errors.zip && <span className="text-red-500 text-sm">Código postal requerido</span>}

          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Estoy Visitando:</legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-12 gap-5">
              {["1a. Vez", "2a. Vez" ].map((value) => (
                <div key={value} className="col-span-1 md:col-span-6">
                  <RadioInput
                    label={`${value}`}
                    value={value}
                    {...register("visitcount", { required: true })}
                  />
                </div>
              ))}
            </div>
            {errors.visitcount && <span className="text-red-500 text-sm mt-2">Selecciona una de las opciones</span>}
          </div>

          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Me Gustaría:</legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-12 gap-5">
              {["Conocer más acerca de Jesús", "Buscar un lugar para reunirme", "Visita del pastor", "Ser bautizado","Unirme a un grupo","Ser parte de la familia espiritual"].map((value) => (
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