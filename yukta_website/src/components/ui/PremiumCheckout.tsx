"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { BRAND, PRICING } from "@/lib/constants";

const CHECKOUT_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

/**
 * Loads Razorpay Checkout on demand and resolves once `window.Razorpay` exists.
 *
 * Done by hand rather than with next/script so the script is only fetched when
 * somebody actually starts a purchase.
 */
function loadCheckoutScript(): Promise<void> {
  if (window.Razorpay) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CHECKOUT_SCRIPT_SRC}"]`
    );
    const script = existing ?? document.createElement("script");

    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("script failed")), { once: true });

    if (!existing) {
      script.src = CHECKOUT_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

type Status =
  | { kind: "idle" }
  | { kind: "working"; label: string }
  | { kind: "submitted" }
  | { kind: "error"; message: string };

export function PremiumCheckout() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const busy = status.kind === "working";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const buyerEmail = email.trim();
    if (!buyerEmail) {
      setStatus({ kind: "error", message: "Enter the email you use in the YUKTA AI app." });
      return;
    }

    setStatus({ kind: "working", label: "Starting secure checkout…" });

    const subscription = await api.createSubscription({ email: buyerEmail });
    if (!subscription.ok) {
      setStatus({ kind: "error", message: subscription.error });
      return;
    }

    try {
      await loadCheckoutScript();
    } catch {
      setStatus({
        kind: "error",
        message: "Could not load Razorpay Checkout. Check your connection and try again.",
      });
      return;
    }

    // Razorpay fires ondismiss when the modal closes — including after a
    // failed or completed payment. Without this guard, closing the modal would
    // reset the status and wipe the outcome off the screen.
    let settled = false;

    const checkout = new window.Razorpay({
      key: subscription.data.key_id,
      subscription_id: subscription.data.subscription_id,
      name: BRAND.name,
      description: `YUKTA Premium — ${PRICING.currencySymbol}${PRICING.monthlyPrice}/month`,
      image: "/yukta-icon.png",
      prefill: { email: buyerEmail },
      theme: { color: "#16a34a" },
      modal: {
        ondismiss: () => {
          // Closed without paying — nothing was charged, so go back to the form.
          if (!settled) {
            setStatus({ kind: "idle" });
          }
        },
      },
      // Razorpay calls this once the mandate is approved and the first payment
      // goes through. It is NOT proof of activation — the browser could be
      // closed or spoofed — so it only reports progress. Premium is granted by
      // the backend when Razorpay's webhook arrives a few seconds later.
      handler: () => {
        settled = true;
        setStatus({ kind: "submitted" });
      },
    });

    checkout.on("payment.failed", (failure) => {
      settled = true;
      setStatus({
        kind: "error",
        message:
          failure.error.description ||
          "The payment did not go through. You have not been charged — please try again.",
      });
    });

    setStatus({ kind: "working", label: "Waiting for payment…" });
    checkout.open();
  }

  if (status.kind === "submitted") {
    return (
      <div className="bg-subtle border border-border rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3" aria-hidden>
          ✅
        </div>
        <h2 className="text-xl font-bold text-dark mb-2">Payment received</h2>
        <p className="text-muted text-sm leading-relaxed">
          We&apos;re activating your subscription now — it usually takes a few seconds. Open the{" "}
          {BRAND.name} app and sign in with <strong className="text-text">{email.trim()}</strong>{" "}
          to start using Premium.
        </p>
        <p className="text-muted text-sm leading-relaxed mt-3">
          Your subscription renews automatically at {PRICING.currencySymbol}
          {PRICING.monthlyPrice} each month. You can cancel it any time from the app.
        </p>
        <a
          href={`mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(
            "Premium activation"
          )}`}
          className="inline-block mt-4 text-sm text-primary font-semibold hover:underline"
        >
          Not active after a few minutes? Email {BRAND.supportEmail}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
          Your {BRAND.name} account email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder-muted text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-60"
        />
        <p className="text-xs text-muted mt-1.5">
          Use the same email you sign in with in the app — that&apos;s the account we activate.
        </p>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {status.message}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={busy}
        whileHover={busy ? undefined : { scale: 1.02 }}
        whileTap={busy ? undefined : { scale: 0.98 }}
        className="gradient-brand w-full py-4 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-primary/30 cursor-pointer transition-opacity hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {busy
          ? status.label
          : `Subscribe — ${PRICING.currencySymbol}${PRICING.monthlyPrice}/month`}
      </motion.button>

      <p className="text-xs text-muted text-center">
        {PRICING.currencySymbol}
        {PRICING.monthlyPrice}/month · Renews automatically · Cancel any time in the app
      </p>

      <p className="text-xs text-muted text-center">
        Payments are processed by Razorpay. {BRAND.company} never sees your card, UPI or bank
        details.
      </p>
    </form>
  );
}
