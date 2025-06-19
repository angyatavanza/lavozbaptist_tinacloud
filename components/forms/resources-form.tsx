import { FadeIn } from "../fade-in";
import { FormEvent, useState } from "react";
import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { Button } from "../ui/second-button";
/*En la forma no se que idea tengas.  
No se si poner un listado de los recursos o bien que ellos pongan directamente .
Y pues lo datos que necesitamos en nombre, 
teléfono y dirección (la dirección es porque hasta ahorita la mayor 
parte de los servicios disponibles (que yo conozco) es en el condado de Mecklenburg
*/

interface ResourcesFormProps {
  placeholder: string;
  buttonText: string;
}

export const ResourcesForm: React.FC<ResourcesFormProps> = ({
  placeholder,
  buttonText,
}) => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = {
      spreadsheet: "resources",
      name,
      lastname,
      email,
      phone,
      message,
      subject,
    };

    const rawResponse = await fetch("/api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const content = await rawResponse.json();

    // print to screen
    alert("Form submitted");
    //alert(content.data.tableRange);

    // Reset the form fields
    setMessage("");
    setPhone("");
    setName("");
    setLastName("");
    setEmail("");
    setSubject("");
  };
  return (
    <FadeIn>
      <form className="" onSubmit={handleSubmit}>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Envíanos un mensaje:
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            autoComplete="nombre"
            placeholder="Su nombre"
            label="Nombre"
          />
          <TextInput
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            name="lastname"
            autoComplete="apellido"
            placeholder="Su apellido"
            label="Apellido"
          />
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            autoComplete="email"
            required
            //className="w-full px-5 py-3 border border-gray-300 shadow-xs placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs rounded-md"
            placeholder={placeholder}
            label="Correo electrónico"
          />
          <TextInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Su número de teléfono"
            label="Número de teléfono"
          />
          <TextInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            placeholder="Su mensaje"
            label="Mensaje"
          />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Asunto</legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <RadioInput
                label="Necesito oración"
                name="budget"
                value="oración"
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  setSubject(e.currentTarget.value)
                }
              />
              <RadioInput
                label="Quisiera unirme a un grupo"
                name="budget"
                value="grupo"
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  setSubject(e.currentTarget.value)
                }
              />
              <RadioInput
                label="Me gustaría ser bautizado"
                name="budget"
                value="bautismo"
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  setSubject(e.currentTarget.value)
                }
              />
              <RadioInput
                label="Otro asunto"
                name="budget"
                value="other"
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  setSubject(e.currentTarget.value)
                }
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="mt-10">
          {buttonText}
        </Button>
      </form>
    </FadeIn>
  );
};
