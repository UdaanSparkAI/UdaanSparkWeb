"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import type { FAQItem } from "@/types";

interface AccordionProps {
  items: FAQItem[];
}

function AccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={clsx(
        "border border-border rounded-2xl overflow-hidden transition-colors duration-200",
        open ? "border-primary/30 bg-primary/2" : "bg-white hover:border-primary/20"
      )}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        id={`faq-btn-${index}`}
        aria-controls={`faq-panel-${index}`}
      >
        <span className="font-semibold text-text text-base leading-snug">{item.question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg leading-none"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-btn-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-muted leading-relaxed text-sm">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <AccordionItem key={i} item={item} index={i} />
      ))}
    </div>
  );
}
