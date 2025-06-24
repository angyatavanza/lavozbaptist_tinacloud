import { useForm } from 'react-hook-form';
import { FadeIn } from "../fade-in";
import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { Button } from "../ui/second-button";
import MailSentState from "@/components/forms/mail-sent-state";
import { useState } from 'react';

/*En la forma no se que idea tengas.  
No se si poner un listado de los recursos o bien que ellos pongan directamente .
Y pues lo datos que necesitamos en nombre, 
teléfono y dirección (la dirección es porque hasta ahorita la mayor 
parte de los servicios disponibles (que yo conozco) es en el condado de Mecklenburg
*/
//done 51b: add dirección to resource form fields + change radioinput options
//to-do 51c: Add to details: Nos gustaría entender mejor tu situación, ¿puedes describirnos tu necesidad?
//to-do 51d: Ask carmen which fields are required

interface ResourcesFormInputs {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  address: string;
  citystatezip: string;
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

          <TextInput
            {...register("message", { required: true })}
            placeholder="Su mensaje"
            label="Mensaje"
          />
          {errors.message && <span className="text-red-500 text-sm">Requerido</span>}

          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">¿Cómo podemos ayudarte a ti y a tu familia? </legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {["Productos para el Cuidado Infantil", "Servicios y Apoyos Locales", "Otros Artículos de Primera Necesidad"].map((value) => (
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