"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { BRAND, PRICING } from "@/lib/constants";
import type { RazorpaySuccessResponse } from "@/types/razorpay";

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
  | { kind: "activated" }
  | { kind: "pending"; paymentId: string }
  | { kind: "error"; message: string };

export function PremiumCheckout() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const busy = status.kind === "working";

  async function confirmPayment(response: RazorpaySuccessResponse, buyerEmail: string) {
    setStatus({ kind: "working", label: "Confirming your payment…" });

    const result = await api.verifyPayment({ email: buyerEmail, ...response });

    if (!result.ok) {
      setStatus({ kind: "error", message: result.error });
      return;
    }

    setStatus(
      result.data.status === "activated"
        ? { kind: "activated" }
        : { kind: "pending", paymentId: result.data.paymentId }
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const buyerEmail = email.trim();
    if (!buyerEmail) {
      setStatus({ kind: "error", message: "Enter the email you use in the YUKTA AI app." });
      return;
    }

    setStatus({ kind: "working", label: "Starting secure checkout…" });

    const order = await api.createOrder({ email: buyerEmail });
    if (!order.ok) {
      setStatus({ kind: "error", message: order.error });
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
      key: order.data.keyId,
      amount: order.data.amount,
      currency: order.data.currency,
      order_id: order.data.orderId,
      name: BRAND.name,
      description: "YUKTA Premium — 1 month",
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
      handler: (response) => {
        settled = true;
        void confirmPayment(response, buyerEmail);
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

  if (status.kind === "activated") {
    return (
      <div className="bg-subtle border border-border rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3" aria-hidden>
          ✅
        </div>
        <h2 className="text-xl font-bold text-dark mb-2">You&apos;re Premium</h2>
        <p className="text-muted text-sm leading-relaxed">
          Payment received and your account is active. Open the {BRAND.name} app and sign in with{" "}
          <strong className="text-text">{email.trim()}</strong> to use your Premium features.
        </p>
      </div>
    );
  }

  if (status.kind === "pending") {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3" aria-hidden>
          ⏳
        </div>
        <h2 className="text-xl font-bold text-amber-900 mb-2">Payment received — activating</h2>
        <p className="text-amber-800 text-sm leading-relaxed">
          Your payment went through. Activation is still being confirmed with our servers and
          normally finishes within a minute — reopen the {BRAND.name} app shortly and you&apos;ll
          be Premium. You will not be charged again.
        </p>
        <p className="text-amber-800 text-sm mt-3">
          Still not active after a few minutes? Quote this payment ID:
          <br />
          <code className="inline-block mt-1 px-2 py-1 bg-white/70 rounded font-mono text-xs text-amber-900">
            {status.paymentId}
          </code>
        </p>
        <a
          href={`mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(
            `Premium activation pending — ${status.paymentId}`
          )}`}
          className="inline-block mt-4 text-sm text-primary font-semibold hover:underline"
        >
          Email {BRAND.supportEmail}
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
        {busy ? status.label : `Get Premium — ${PRICING.currencySymbol}${PRICING.monthlyPrice}`}
      </motion.button>

      {/* The app's paywall says "Cancel anytime" because Play Billing renews.
          A website purchase does not renew, so it must not claim that here. */}
      <p className="text-xs text-muted text-center">
        {PRICING.currencySymbol}
        {PRICING.monthlyPrice} one-time · 30 days access · No auto-renewal
      </p>

      <p className="text-xs text-muted text-center">
        Payments are processed by Razorpay. {BRAND.company} never sees your card, UPI or bank
        details.
      </p>
    </form>
  );
}
