import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "muted";
  className?: string;
}

const variantStyles = {
  primary: "bg-primary/10 text-primary border-primary/20",
  accent: "bg-accent/10 text-accent border-accent/20",
  muted: "bg-gray-100 text-muted border-gray-200",
};

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
