"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

const REASONS = [
  "I no longer use the app",
  "I have privacy concerns",
  "I found a better alternative",
  "The app is not working correctly",
  "I want to create a new account",
  "Other",
];

export function DeleteAccountForm() {
  const [form, setForm] = useState({ email: "", reason: "", note: "" });
  const [confirmed, setConfirmed] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!confirmed) return;

    const subject = encodeURIComponent("Account Deletion Request — YUKTA AI");
    const body = encodeURIComponent(
      [
        "I would like to request permanent deletion of my YUKTA AI account.",
        "",
        `Registered Email: ${form.email}`,
        `Reason: ${form.reason}`,
        form.note ? `Additional Note: ${form.note}` : "",
        "",
        "Please delete my account and all associated data within 30 days.",
      ]
        .filter((line) => line !== undefined)
        .join("\n")
    );

    window.location.href = `mailto:${BRAND.supportEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-border shadow-sm p-6 md:p-8 flex flex-col gap-5"
      noValidate
    >
      <div>
        <label htmlFor="del-email" className="block text-sm font-medium text-text mb-1.5">
          Registered Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="del-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="The email used to log in to YUKTA AI"
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder-muted text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="del-reason" className="block text-sm font-medium text-text mb-1.5">
          Reason for Deletion <span className="text-red-500">*</span>
        </label>
        <select
          id="del-reason"
          name="reason"
          required
          value={form.reason}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
        >
          <option value="">Select a reason</option>
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="del-note" className="block text-sm font-medium text-text mb-1.5">
          Additional Note{" "}
          <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="del-note"
          name="note"
          rows={3}
          value={form.note}
          onChange={handleChange}
          placeholder="Is there anything we could have done better?"
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder-muted text-sm resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="w-4 h-4 mt-0.5 rounded accent-primary shrink-0"
          required
        />
        <span className="text-sm text-muted leading-relaxed">
          I understand that this action is permanent and irreversible. I confirm that I want to
          delete my YUKTA AI account and all associated data.
        </span>
      </label>

      <motion.button
        type="submit"
        disabled={!confirmed}
        whileHover={confirmed ? { scale: 1.02 } : {}}
        whileTap={confirmed ? { scale: 0.98 } : {}}
        className="w-full py-4 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Send Deletion Request via Email
      </motion.button>

      <p className="text-xs text-muted text-center">
        This opens your email app with the request pre-filled and sends it to{" "}
        <a href={`mailto:${BRAND.supportEmail}`} className="text-primary hover:underline">
          {BRAND.supportEmail}
        </a>
        . We process requests within 30 days.
      </p>

      <p className="text-xs text-muted text-center">
        Changed your mind?{" "}
        <a href="/" className="text-primary hover:underline font-medium">
          Go back to YUKTA AI
        </a>
      </p>
    </form>
  );
}
