import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  glass?: boolean;
  hover?: boolean;
}

export function Card({ glass, hover, children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-6 border transition-all duration-300",
        glass
          ? "glass-card"
          : "bg-white border-border shadow-sm",
        hover && "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
