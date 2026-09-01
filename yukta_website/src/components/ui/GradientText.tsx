import { clsx } from "clsx";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export function GradientText({ children, className, as: Tag = "span" }: GradientTextProps) {
  return (
    <Tag className={clsx("gradient-text", className)}>
      {children}
    </Tag>
  );
}
