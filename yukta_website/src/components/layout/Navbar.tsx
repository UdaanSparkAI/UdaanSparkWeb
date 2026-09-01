"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <div
          className={`mx-4 mt-3 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "backdrop-blur-xl bg-white/85 border border-gray-200/60 shadow-lg shadow-black/5"
              : "backdrop-blur-md bg-white/60 border border-white/40"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={BRAND.name}>
              <div className="w-9 h-9 rounded-xl overflow-hidden relative shrink-0 shadow-sm">
                <Image
                  src="/yukta-icon.png"
                  alt="YUKTA AI logo icon"
                  fill
                  className="object-cover object-top"
                  sizes="36px"
                  priority
                />
              </div>
              <span className="font-bold text-text text-lg tracking-tight">{BRAND.name}</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted hover:text-primary text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Button href={BRAND.playStoreUrl} size="sm" variant="primary">
                Get the App
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-text rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                className="w-5 h-0.5 bg-text rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-text rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl overflow-hidden relative shrink-0">
                    <Image src="/yukta-icon.png" alt="YUKTA AI" fill className="object-cover object-top" sizes="32px" />
                  </div>
                  <span className="font-bold text-text">{BRAND.name}</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-muted cursor-pointer"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <nav className="flex flex-col p-5 gap-2 flex-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-text font-medium hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="p-5 border-t border-border">
                <Button href={BRAND.playStoreUrl} size="md" className="w-full justify-center">
                  Get the App
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
