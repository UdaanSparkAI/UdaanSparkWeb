import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { PremiumCheckout } from "@/components/ui/PremiumCheckout";
import { BRAND, PLAN_COMPARISON, PRICING, STORE_LIST } from "@/lib/constants";

const PRICE = `${PRICING.currencySymbol}${PRICING.monthlyPrice}`;

export const metadata: Metadata = generatePageMetadata({
  title: "Get Premium",
  description: `Unlock YUKTA Premium for ${PRICE}. Unlimited price comparison across ${STORE_LIST}, the AI shopping assistant, Chef AI and Nutrition AI.`,
  path: "/premium",
});

function LockIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="inline-block"
    >
      <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="inline-block"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function PremiumPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-14 md:py-16">
      <header className="text-center mb-8">
        <Image
          src="/yukta-icon.png"
          alt=""
          width={84}
          height={84}
          priority
          className="mx-auto rounded-[22px] shadow-card mb-5"
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-2">Choose your plan</h1>
        <p className="text-muted">
          Start free, or unlock everything for{" "}
          <strong className="text-text font-semibold">{PRICE}</strong>.
        </p>
      </header>

      <div className="bg-white border border-border rounded-3xl shadow-card overflow-hidden mb-7">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">
            The free plan compared with YUKTA Premium, feature by feature
          </caption>
          <thead>
            <tr className="align-bottom">
              <th scope="col" className="p-4 md:p-5">
                <span className="sr-only">Feature</span>
              </th>
              <th scope="col" className="p-4 md:p-5 pb-4 w-[22%] text-center">
                <span className="block text-muted font-bold text-base">Free</span>
              </th>
              <th scope="col" className="p-4 md:p-5 pb-4 w-[28%] text-center">
                <span className="inline-block mb-1.5 text-[10px] leading-none uppercase tracking-wider font-extrabold text-white bg-primary px-2.5 py-1.5 rounded-full whitespace-nowrap">
                  Best value
                </span>
                <span className="block text-dark font-extrabold text-base">Premium</span>
                <span className="block text-primary font-bold text-sm">{PRICE}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {PLAN_COMPARISON.map((feature) => (
              <tr key={feature.title} className="border-t border-border">
                <th scope="row" className="text-left font-normal p-4 md:p-5 align-middle">
                  <span className="block font-bold text-dark leading-snug">{feature.title}</span>
                  <span className="block text-muted text-xs mt-0.5 leading-snug">
                    {feature.description}
                  </span>
                </th>

                <td className="p-3 md:p-4 text-center align-middle text-muted font-medium">
                  {feature.free === false ? (
                    <>
                      <LockIcon />
                      <span className="sr-only">Not included</span>
                    </>
                  ) : (
                    feature.free
                  )}
                </td>

                <td className="p-3 md:p-4 text-center align-middle">
                  <span className="inline-flex items-center justify-center w-full min-h-9 px-2 py-2 rounded-xl bg-subtle text-accent-dark font-bold text-[13px] leading-tight">
                    {feature.premium === true ? (
                      <>
                        <CheckIcon />
                        <span className="sr-only">Included</span>
                      </>
                    ) : (
                      feature.premium
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PremiumCheckout />

      <Link
        href="/"
        className="mt-3 w-full inline-flex items-center justify-center py-4 rounded-xl border border-border text-text font-semibold text-sm hover:bg-subtle transition-colors"
      >
        Continue with the free plan
      </Link>

      <div className="mt-8 text-xs text-muted leading-relaxed space-y-2 text-center">
        <p>
          Buying here is a <strong className="text-text">one-time payment for 30 days</strong>. It
          does not renew automatically and no payment method is stored — come back and buy another
          month whenever you like. You can also subscribe from inside the app through Google Play,
          where it does renew monthly.
        </p>
        <p>
          See our{" "}
          <Link href="/refund" className="text-primary hover:underline">
            Refund &amp; Cancellation Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms &amp; Conditions
          </Link>
          . Questions? Email{" "}
          <a href={`mailto:${BRAND.supportEmail}`} className="text-primary hover:underline">
            {BRAND.supportEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
