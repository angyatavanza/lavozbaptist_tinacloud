import { useForm } from 'react-hook-form';
import { FadeIn } from "../motion-primitives/fade-in";
import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { Button } from "@/components/ui/second-button";
import MailSentState from "@/components/forms/mail-sent-state";
import { useState } from 'react';

interface PrayerFormInputs {
  name: string;
  lastname: string;
  phone: string;
  message: string;
}

interface PrayerFormProps {
  placeholder: string;
  buttonText: string;
}

export const PrayerForm: React.FC<PrayerFormProps> = ({
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
  } = useForm<PrayerFormInputs>();

  const onSubmit = async (data: PrayerFormInputs) => {
    try {
      const form = {
        ...data,
        spreadsheet: "prayer",
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
          Envíanos tu petición de oración:
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
            {...register("message", { required: true })}
            placeholder="Su petición de oración"
            label="Petición de oración"
          />
          {errors.message && <span className="text-red-500 text-sm">Requerido</span>}

        </div>
        <Button type="submit" className="mt-10" disabled={isSubmitting}>
          {buttonText}
        </Button>
      </form>
    </FadeIn>
  );
};