import { FadeIn } from "../fade-in";
import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { Button } from "../ui/second-button";

export const ContactForm = () => {
  return (
    <FadeIn>
      <form>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Envíanos un mensaje:
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Nombre" name="name" autoComplete="name" />
          <TextInput label="Apellido" name="company" autoComplete="Apellido" />
          <TextInput
            label="Correo electrónico"
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput
            label="Número de teléfono"
            type="tel"
            name="phone"
            autoComplete="tel"
          />
          <TextInput label="Mensaje" name="message" />
          <div className="border border-purple-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Asunto</legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <RadioInput label="Necesito oración" name="budget" value="25" />
              <RadioInput label="Quisiera unirme a un grupo" name="budget" value="50" />
              <RadioInput label="Me gustaría ser bautizado" name="budget" value="100" />
              <RadioInput label="Otro asunto" name="budget" value="150" />
            </div>
          </div>
        </div>
        <Button type="submit" className="mt-10">
          Enviar mensaje
        </Button>
      </form>
    </FadeIn>
  );
};