"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

interface AnimatedSectionProps extends ComponentPropsWithoutRef<"div"> {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  ...props
}: AnimatedSectionProps) {
  const initial = {
    opacity: 0,
    y: direction === "up" ? 32 : direction === "down" ? -32 : 0,
    x: direction === "left" ? 32 : direction === "right" ? -32 : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className={clsx(className)}
      {...(props as Parameters<typeof motion.div>[0])}
    >
      {children}
    </motion.div>
  );
}
