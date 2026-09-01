"use client";

import { motion } from "framer-motion";
import type { Step } from "@/types";

interface StepTimelineProps {
  steps: Step[];
}

export function StepTimeline({ steps }: StepTimelineProps) {
  return (
    <div className="relative flex flex-col gap-0">
      {steps.map((step, i) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex gap-6 relative"
        >
          {/* Connector line */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/25 shrink-0 z-10">
              {step.number}
            </div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                className="w-0.5 flex-1 bg-gradient-to-b from-primary/40 to-accent/40 origin-top my-2"
                style={{ minHeight: "48px" }}
              />
            )}
          </div>

          {/* Content */}
          <div className="pb-10 flex-1">
            <h4 className="font-bold text-text text-lg mb-1">{step.title}</h4>
            <p className="text-muted text-sm leading-relaxed">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
