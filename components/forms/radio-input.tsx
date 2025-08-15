import { InputHTMLAttributes } from "react";

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const RadioInput = ({ label, ...props }: RadioInputProps) => {
  return (
    <label className="flex gap-5">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-primary/20 outline-none checked:border-[0.5rem] checked:border-primary focus-visible:ring-1 focus-visible:ring-primarycus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-primary">{label}</span>
    </label>
  );
};

//export default RadioInput;
