"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent(form.subject || "Contact from YUKTA AI Website");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:${BRAND.supportEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder-muted text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder-muted text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-text mb-1.5">
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
        >
          <option value="">Select a topic</option>
          <option value="General Enquiry">General Enquiry</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Account Issue">Account Issue</option>
          <option value="Feature Request">Feature Request</option>
          <option value="Partnership">Partnership</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you…"
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder-muted text-sm resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-primary text-white font-semibold rounded-xl shadow-md shadow-primary/25 hover:bg-primary-dark transition-colors cursor-pointer"
      >
        Open in Email App →
      </motion.button>

      <p className="text-xs text-muted text-center">
        This will open your default email app with the details pre-filled.
        <br />
        Or email us directly at{" "}
        <a href={`mailto:${BRAND.supportEmail}`} className="text-primary hover:underline">
          {BRAND.supportEmail}
        </a>
      </p>
    </form>
  );
}
