"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary-dark",
  // Bright fill with dark-green text — intended for use on the dark brand panels.
  secondary:
    "bg-bright text-accent-dark shadow-md shadow-black/20 hover:bg-primary-light",
  ghost: "bg-transparent text-text hover:bg-gray-100",
  outline:
    "bg-transparent border border-primary text-primary hover:bg-primary/5",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 cursor-pointer select-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...(props as Parameters<typeof motion.button>[0])}
    >
      {children}
    </motion.button>
  );
}
