"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
  /** The app icon slide is padded and contained; screenshots fill the frame. */
  contain?: boolean;
}

const SLIDES: Slide[] = [
  { src: "/yukta-icon.png", alt: "YUKTA AI app icon", contain: true },
  { src: "/app/chatbot.png", alt: "YUKTA AI chat screen suggesting what to shop for" },
  { src: "/app/nutrition.png", alt: "Nutrition screen with health profile, diet plan and per-store prices" },
  { src: "/app/chef.jpeg", alt: "Chef AI screen generating a recipe and sourcing its ingredients" },
  { src: "/app/chatbot-features.jpeg", alt: "AI assistant building a personalised cart" },
  { src: "/app/sidebar.png", alt: "YUKTA AI dashboard and navigation" },
];

const INTERVAL_MS = 3200;

export function HeroPhoneCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Users who prefer reduced motion get a static first slide they can still page
    // through with the dots.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return;

    const id = window.setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      INTERVAL_MS
    );
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <motion.div
      className="relative flex justify-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Glow behind the device */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(22,163,74,0.22) 0%, transparent 70%)",
          filter: "blur(50px)",
          transform: "scale(1.5)",
        }}
        aria-hidden="true"
      />

      {/* Device */}
      <div
        className="relative rounded-[2.2rem] border-[3px] border-white/20 overflow-hidden shadow-2xl"
        style={{
          width: 220,
          height: 430,
          background: "#14532d",
          boxShadow: "0 32px 80px rgba(5,46,22,0.45), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 rounded-b-xl"
          style={{ width: 72, height: 20, background: "#14532d" }}
          aria-hidden="true"
        />

        {/* Cross-fading slides */}
        <div className="absolute inset-0">
          {SLIDES.map((slide, i) => (
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              aria-hidden={i !== active}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className={
                  slide.contain ? "object-contain p-6" : "object-cover object-top"
                }
                sizes="220px"
                priority={i <= 1}
              />
            </motion.div>
          ))}
        </div>

        {/* Home indicator */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full z-10"
          style={{ width: 52, height: 3, background: "rgba(255,255,255,0.3)" }}
          aria-hidden="true"
        />
      </div>

      {/* Slide indicators */}
      <div className="absolute -bottom-6 flex gap-1.5 left-1/2 -translate-x-1/2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === active}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === active ? 16 : 6,
              height: 6,
              background: i === active ? "#16a34a" : "rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
