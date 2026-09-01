import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { PremiumCheckout } from "@/components/ui/PremiumCheckout";
import { BRAND, PRICING, STORE_LIST } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Get Premium",
  description: `Buy one month of YUKTA Premium for ${PRICING.currencySymbol}${PRICING.monthlyPrice}. Unlock live price comparison across ${STORE_LIST}, the AI shopping assistant, Chef AI and Nutrition AI.`,
  path: "/premium",
});

const INCLUDED = [
  `Live price comparison across ${STORE_LIST}`,
  "AI shopping assistant that builds your basket",
  "Chef AI — recipes with ingredients sourced at the lowest price",
  "Nutrition AI — health scores and diet tracking",
  "One-tap cart transfer into the store's own app",
];

export default function PremiumPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-16">
      <div className="mb-10">
        <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">
          YUKTA Premium
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-3">
          Unlock the full app for {PRICING.currencySymbol}
          {PRICING.monthlyPrice}
        </h1>
        <p className="text-muted leading-relaxed">
          One month of {BRAND.name} Premium, paid securely through Razorpay. Already using the
          app? Pay with the same email and your account switches over.
        </p>
      </div>

      <div className="bg-white border border-border rounded-2xl p-5 mb-8 shadow-card">
        <h2 className="text-sm font-semibold text-dark mb-3">What you get</h2>
        <ul className="text-sm text-muted space-y-1.5">
          {INCLUDED.map((item) => (
            <li key={item}>
              <span className="text-primary mr-2" aria-hidden>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <PremiumCheckout />

      <div className="mt-8 text-xs text-muted leading-relaxed space-y-2">
        <p>
          <strong className="text-text">This is a one-time payment for 30 days.</strong> It does
          not renew automatically and nothing is stored to charge you again — come back and buy
          another month whenever you like.
        </p>
        <p>
          Prefer to pay through Google Play instead? You can subscribe from inside the app. See our{" "}
          <Link href="/refund" className="text-primary hover:underline">
            Refund &amp; Cancellation Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms &amp; Conditions
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
