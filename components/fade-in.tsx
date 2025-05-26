"use client";

import { createContext, useContext, ReactNode } from "react";
import { motion, useReducedMotion, HTMLMotionProps } from "framer-motion";

// Context to check if the component is inside a FadeInStagger
const FadeInStaggerContext = createContext(false);

// Use HTMLMotionProps instead of plain HTMLAttributes
type MotionDivProps = HTMLMotionProps<"div"> & {
  children?: ReactNode;
};

const viewport = { once: true, margin: "0px 0px -200px" };

export const FadeIn = (props: MotionDivProps) => {
  const shouldReduceMotion = useReducedMotion();
  const isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport,
          })}
      {...props}
    />
  );
};

type FadeInStaggerProps = MotionDivProps & {
  faster?: boolean;
};

export const FadeInStagger = ({ faster = false, ...props }: FadeInStaggerProps) => {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  );
};
