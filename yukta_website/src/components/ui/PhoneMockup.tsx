import { clsx } from "clsx";
import Image from "next/image";

interface PhoneMockupProps {
  className?: string;
  accentColor?: "primary" | "accent";
  label?: string;
  /** Screenshot in public/app, e.g. "/app/chatbot.png" */
  src: string;
  /** Describes the screenshot for screen readers. */
  alt: string;
  /** Rendered width in px. Height follows the 9:19.5 phone aspect ratio. */
  width?: number;
}

export function PhoneMockup({
  className,
  accentColor = "primary",
  label,
  src,
  alt,
  width = 220,
}: PhoneMockupProps) {
  const borderColor = accentColor === "primary" ? "#16a34a" : "#84cc16";
  const glowColor =
    accentColor === "primary" ? "rgba(22,163,74,0.35)" : "rgba(132,204,22,0.3)";
  const height = Math.round(width * (19.5 / 9));

  return (
    <div className={clsx("relative flex flex-col items-center", className)}>
      <div
        className="relative rounded-[2.5rem] border-[3px] shadow-2xl overflow-hidden"
        style={{
          width,
          height,
          borderColor,
          boxShadow: `0 24px 64px ${glowColor}`,
          background: "#14532d",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes={`${width}px`}
        />

        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-10"
          style={{ width: width * 0.36, height: 22, background: "#14532d" }}
          aria-hidden="true"
        />

        {/* Home indicator */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full z-10"
          style={{ width: width * 0.27, height: 3, background: "rgba(255,255,255,0.5)" }}
          aria-hidden="true"
        />
      </div>

      {label && (
        <p className="mt-4 text-sm font-medium text-white/70 text-center">{label}</p>
      )}
    </div>
  );
}
