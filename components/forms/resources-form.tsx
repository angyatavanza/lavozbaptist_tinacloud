import { useForm } from 'react-hook-form';
import { FadeIn } from "../motion-primitives/fade-in";
import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { Button } from "@/components/ui/second-button";
import MailSentState from "@/components/forms/mail-sent-state";
import { useState } from 'react';

/*En la forma no se que idea tengas.  
No se si poner un listado de los recursos o bien que ellos pongan directamente .
Y pues lo datos que necesitamos en nombre, 
teléfono y dirección (la dirección es porque hasta ahorita la mayor 
parte de los servicios disponibles (que yo conozco) es en el condado de Mecklenburg
*/
//done 51b: add address to resource form fields + change radioinput options
//to-do 85: replace text + images in content/resources+serve and details components TINA CMS CONTENT
//done 55: implement address, email, phone, name fields required in resources/visitor/contact/serve forms + add the options to serve form BACKEND

interface ResourcesFormInputs {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  address: string;
  address2: string;
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
        <h2 className="font-display text-base font-nunito font-medium text-primary">
          Para poder apoyarte mejor, nos gustaría saber más sobre tu situación:
        </h2>

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