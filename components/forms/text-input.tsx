import React, { useId, InputHTMLAttributes } from "react";

// Define the props interface
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string; // Label is required
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const id = useId(); // Generate a unique ID


  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props} // Spread other props (e.g., placeholder, value, onChange, etc.)
        className="peer block w-full border border-neutral-300 bg-transparent placeholder-transparent focus:placeholder-gray-400 px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  );
};
