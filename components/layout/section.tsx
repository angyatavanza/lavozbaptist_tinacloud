import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLProps<HTMLElement> {
  background?: string;
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ className, children, background, ...props }) => {
  return (
    <div className={background || "bg-primary-background"}>
      <section
        className={cn("", className)}
        {...props}
      >
        {children}
      </section>
    </div>
  );
};

export const tailwindBackgroundOptions = [
  { label: "Default", value: "bg-primary-background" },
  { label: "Peach", value: "bg-primary-background-peach"},
  { label: "White", value: "bg-secondary-background-white" },
  { label: "OffWhite", value: "bg-secondary-background-offwhite" },
  { label: "Gray", value: "bg-secondary-background-gray" },
  { label: "DarkGray", value: "bg-secondary-background-darkgray" },
  { label: "LVBlue", value:"bg-secondary-background-blue"},
  { label: "LVPurple", value:"bg-secondary-background-purple"},
  { label: "LaVozPurple", value: "bg-primary" },
  { label: "LaVozPurple1", value: "bg-primary-muted-100" },
  { label: "LaVozPurple2", value: "bg-primary-muted-200" },
  { label: "LaVozPurple3", value: "bg-primary-muted-300" },
  { label: "LaVozPurple4", value: "bg-primary-muted-400" },
  { label: "LaVozOrange", value: "bg-secondary" },
  { label: "LaVozOrange1", value: "bg-secondary-muted-100" },
  { label: "LaVozOrange2", value: "bg-secondary-muted-200" },
  { label: "LaVozOrange3", value: "bg-secondary-muted-300" },
  { label: "LaVozOrange4", value: "bg-secondary-muted-400" },
  { label: "Zinc", value: "bg-zinc-50" },
  { label: "Black", value: "bg-black/80" },
  { label: "Red", value: "bg-red-50/80" },
  { label: "Orange", value: "bg-orange-50/80" },
  { label: "Fuchsia", value: "bg-fuchsia-50/80" },
  { label: "Pink", value: "bg-pink-50/80" },
  { label: "Rose", value: "bg-rose-50/80" },
  { label: "Yellow", value: "bg-yellow-50/80" },
  { label: "Green", value: "bg-green-50/80" },
  { label: "Lime", value: "bg-lime-50/80" },
  { label: "Emerald", value: "bg-emerald-50/80" },
  { label: "Teal", value: "bg-teal-50/80" },
  { label: "Cyan", value: "bg-cyan-50/80" },
  { label: "Blue", value: "bg-blue-50/80" },
  { label: "Purple", value: "bg-purple-50/80" },
  { label: "Sky", value: "bg-sky-50/80" },
  { label: "Indigo", value: "bg-indigo-50/80" },
  { label: "Violet", value: "bg-violet-50/80" },
];

export const sectionBlockSchemaField = {
  type: "string",
  label: "Background",
  name: "background",
  options: tailwindBackgroundOptions,
};