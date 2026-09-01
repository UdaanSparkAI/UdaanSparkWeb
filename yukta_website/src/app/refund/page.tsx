import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { BRAND, PRICING } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Refund & Cancellation Policy",
  description:
    "YUKTA AI's refund and cancellation policy. Understand how we handle refunds for any future premium features.",
  path: "/refund",
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-dark mb-3">{title}</h2>
      <div className="text-muted leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  );
}

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-16">
      <div className="mb-10">
        <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Legal</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-3">
          Refund & Cancellation Policy
        </h1>
        <p className="text-muted text-sm">
          Last updated: <time dateTime="2026-08-03">3 August 2026</time>
        </p>
      </div>

      <div>
        <Section title="1. Pricing and Current App Status">
          <p>
            <strong>{BRAND.name}</strong> is free to download and includes a one-time{" "}
            <strong>{PRICING.trialDays}-day free trial</strong>. No payment is taken to start the
            trial.
          </p>
          <p>
            After the trial ends, continued use of the app requires a{" "}
            <strong>YUKTA Premium</strong> subscription at{" "}
            <strong>
              {PRICING.currencySymbol}
              {PRICING.monthlyPrice} per month
            </strong>
            , billed through your Google Play account. The subscription renews monthly until you
            cancel, and you may cancel at any time.
          </p>
          <p>
            The {PRICING.trialDays}-day trial is limited to one per account. This policy explains
            how we handle cancellations and refunds for that subscription.
          </p>
        </Section>

        <Section title="2. What YUKTA Premium Includes">
          <p>
            A YUKTA Premium subscription unlocks the full app, including live price comparison
            across all five supported stores, the AI shopping assistant, Chef AI recipe generation,
            Nutrition AI health scores and diet tracking, and one-tap cart transfer.
          </p>
          <p>
            You will always be able to see exactly what you are purchasing, and at what price,
            before completing a transaction.
          </p>
        </Section>

        <Section title="3. Cancellation Policy">
          <p>
            You may cancel your subscription at any time through:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              The Google Play Store subscription management page (
              <strong>Play Store → Account → Subscriptions</strong>)
            </li>
            <li>
              Contacting us at{" "}
              <a href={`mailto:${BRAND.supportEmail}`} className="text-primary hover:underline">
                {BRAND.supportEmail}
              </a>
            </li>
          </ul>
          <p>
            Upon cancellation, your access to premium features will continue until the end of the
            current billing period. No future charges will be made.
          </p>
          <p>
            Cancelling during the {PRICING.trialDays}-day free trial means you are never charged.
          </p>
        </Section>

        <Section title="4. Refund Eligibility">
          <p>
            Refund requests may be considered in the following circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Within 7 days of purchase</strong>: If you are unsatisfied with your premium
              purchase, you may request a full refund within 7 days of the transaction.
            </li>
            <li>
              <strong>Technical failure</strong>: If a payment was charged but you did not receive
              access to the purchased features due to a technical error on our part.
            </li>
            <li>
              <strong>Duplicate charge</strong>: If you were charged more than once for the same
              purchase.
            </li>
          </ul>
          <p>
            Refund requests submitted after 7 days of purchase will be considered on a
            case-by-case basis at our sole discretion.
          </p>
        </Section>

        <Section title="5. Non-Refundable Situations">
          <p>Refunds will generally not be issued in the following situations:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Change of mind after the 7-day refund window</li>
            <li>Partial use of a subscription period</li>
            <li>Account suspension due to violation of our Terms & Conditions</li>
          </ul>
        </Section>

        <Section title="6. How to Request a Refund">
          <p>
            To request a refund, please contact us at{" "}
            <a href={`mailto:${BRAND.supportEmail}`} className="text-primary hover:underline">
              {BRAND.supportEmail}
            </a>{" "}
            with:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Your registered email address</li>
            <li>Order ID or Google Play transaction ID</li>
            <li>Reason for refund request</li>
          </ul>
          <p>
            We will respond within <strong>5 business days</strong>. Approved refunds will be
            processed to the original payment method within 7–10 business days, depending on your
            bank or card provider.
          </p>
        </Section>

        <Section title="7. Google Play Refund Policy">
          <p>
            Purchases made through the Google Play Store are also subject to{" "}
            <a
              href="https://support.google.com/googleplay/answer/2479637"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Play&apos;s refund policy
            </a>
            . You may be eligible for an automatic refund within 48 hours of purchase directly
            through Google Play.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            For any questions about this policy, please reach out to us:
          </p>
          <address className="not-italic mt-2">
            <strong>{BRAND.company}</strong>
            <br />
            Email:{" "}
            <a href={`mailto:${BRAND.supportEmail}`} className="text-primary hover:underline">
              {BRAND.supportEmail}
            </a>
          </address>
        </Section>
      </div>
    </div>
  );
}
