"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeroPhoneCarousel } from "@/components/ui/HeroPhoneCarousel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BRAND } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function HeroSection() {
  return (
    <section
      className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-grid"
      aria-label="Hero"
    >
      {/* Background gradient blobs */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(22,163,74,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(132,204,22,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-6"
          >
            <motion.div variants={item}>
              <Badge variant="accent">
                <span aria-hidden="true">✦</span>
                AI-Powered Grocery Shopping
              </Badge>
            </motion.div>

            {/* Assistant mascot — decorative, sits above the headline */}
            <motion.div variants={item} className="relative" aria-hidden="true">
              <div className="relative w-20 h-20">
                <Image
                  src="/chatbot-hero.jpeg"
                  alt="YUKTA AI assistant"
                  fill
                  // object-cover (not contain, as on the live site) because our source is a
                  // JPEG with a solid background rather than a transparent PNG — filling the
                  // box makes the rounded corners read as a deliberate badge.
                  className="object-cover drop-shadow-xl rounded-2xl"
                  sizes="80px"
                  priority
                />
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark leading-tight"
            >
              Shop Smarter.{" "}
              <span className="gradient-text">Save More.</span>
            </motion.h1>

            <motion.p variants={item} className="text-lg text-muted leading-relaxed max-w-lg">
              {BRAND.description}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <Button href={BRAND.playStoreUrl} size="lg" variant="primary">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3.18 23.76c.39.22.83.24 1.24.04L15.3 12 4.42.2C4.01 0 3.57.02 3.18.24 2.46.65 2 1.38 2 2.22v19.56c0 .84.46 1.57 1.18 1.98z" />
                  <path d="M22 12l-4.04-2.33-3.3 3.33 3.3 3.33L22 14c.65-.37 1-.97 1-1.5 0-.55-.35-1.15-1-1.5z" />
                  <path d="M15.3 12L4.42 23.8l10.88-6.14L15.3 12z" opacity=".6" />
                  <path d="M15.3 12l-.01-5.66L4.42.2 15.3 12z" opacity=".4" />
                </svg>
                Download on Google Play
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-normal">
                  Coming Soon
                </span>
              </Button>

              <Button href="#features" size="lg" variant="outline">
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={item} className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {["#16a34a", "#22c55e", "#15803d", "#84cc16"].map((bg, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: bg }}
                    aria-hidden="true"
                  >
                    {["R", "A", "P", "S"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm" aria-hidden="true">★</span>
                  ))}
                </div>
                <p className="text-xs text-muted">Loved by early users</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: rotating app screenshots */}
          <div className="flex justify-center lg:justify-end lg:pr-8">
            <HeroPhoneCarousel />
          </div>
        </div>
      </div>

      {/* Scroll chevron */}
      <motion.a
        href="#features"
        aria-label="Scroll to features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted/40 hover:text-primary transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.a>
    </section>
  );
}
