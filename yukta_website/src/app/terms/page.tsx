import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { BRAND, PRICING, STORE_LIST } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Conditions",
  description:
    "Read the Terms and Conditions governing your use of the YUKTA AI app and website.",
  path: "/terms",
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-dark mb-3">{title}</h2>
      <div className="text-muted leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-16">
      <div className="mb-10">
        <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Legal</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-3">Terms & Conditions</h1>
        <p className="text-muted text-sm">
          Last updated: <time dateTime="2026-08-03">3 August 2026</time>
        </p>
      </div>

      <div>
        <Section title="1. Acceptance of Terms">
          <p>
            By downloading, installing, or using the <strong>{BRAND.name}</strong> mobile
            application or visiting our website at{" "}
            <a href={BRAND.siteUrl} className="text-primary hover:underline">
              {BRAND.siteUrl}
            </a>
            , you agree to be bound by these Terms &amp; Conditions (&ldquo;Terms&rdquo;). If
            you do not agree, please do not use our services.
          </p>
          <p>
            These Terms constitute a legal agreement between you and{" "}
            <strong>{BRAND.company}</strong>, a company incorporated in India.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <p>
            YUKTA AI is an AI-powered grocery price comparison service that fetches real-time
            product and pricing data from third-party grocery platforms ({STORE_LIST}) and uses
            artificial intelligence to recommend the lowest-cost shopping basket. The app also
            provides AI recipe generation, nutrition scoring and diet tracking, and a one-tap
            transfer of your basket into the relevant store&apos;s own app.
          </p>
          <p>
            We are an independent service and are not affiliated with, endorsed by, or partnered
            with {STORE_LIST}, or any other grocery platform.
          </p>
        </Section>

        <Section title="3. Accuracy of Pricing Information">
          <p>
            Prices displayed in YUKTA AI are fetched in real time but may occasionally lag or
            differ from prices shown directly on grocery platforms due to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Platform-level price changes between our fetch and your checkout</li>
            <li>Geo-restricted pricing or promotional offers limited to specific users</li>
            <li>Out-of-stock situations or product unavailability</li>
          </ul>
          <p>
            <strong>
              {BRAND.name} does not guarantee the accuracy, completeness, or currentness of any
              pricing information.
            </strong>{" "}
            Always confirm the final price at checkout on the respective platform.
          </p>
        </Section>

        <Section title="4. User Accounts">
          <p>
            You may use YUKTA AI via Google Sign-In. You are responsible for maintaining the
            security of your Google account credentials. You must not share your account with
            others or use the service for commercial scraping or automated querying.
          </p>
        </Section>

        <Section title="5. Subscriptions and Payments">
          <p>
            YUKTA AI is free to download and includes a one-time{" "}
            {PRICING.trialDays}-day free trial per account. Continued use after the trial requires a
            YUKTA Premium subscription at {PRICING.currencySymbol}
            {PRICING.monthlyPrice} per month.
          </p>
          <p>
            All payments are processed by <strong>Google Play</strong>. We do not collect, process,
            or store your card or bank details. Your subscription renews automatically each month
            through your Google Play account until you cancel it, and cancellation is managed from
            Play Store → Account → Subscriptions.
          </p>
          <p>
            The free trial is limited to one per account and is enforced on our servers.
            Attempting to obtain additional trials — for example by reinstalling the app or
            creating multiple accounts to evade the limit — is a breach of these Terms.
          </p>
          <p>
            We may change subscription pricing in the future. Any price change will be notified in
            advance and will not affect your current billing period. Refunds are governed by our{" "}
            <a href="/refund" className="text-primary hover:underline">
              Refund &amp; Cancellation Policy
            </a>
            .
          </p>
        </Section>

        <Section title="6. Acceptable Use">
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Use YUKTA AI for any unlawful purpose</li>
            <li>Attempt to reverse-engineer, decompile, or disassemble the app</li>
            <li>Scrape, crawl, or programmatically access our service in an automated manner</li>
            <li>Interfere with or disrupt the integrity or performance of our services</li>
            <li>Submit false or misleading information to our support team</li>
          </ul>
        </Section>

        <Section title="7. Intellectual Property">
          <p>
            All content, design, code, and branding associated with YUKTA AI — including the name,
            logo, and AI models — are the intellectual property of {BRAND.company}. You may not
            copy, reproduce, distribute, or create derivative works without our explicit written
            consent.
          </p>
        </Section>

        <Section title="8. Third-Party Links and Services">
          <p>
            YUKTA AI may link to or integrate with third-party services. We are not responsible for
            the content, privacy practices, or terms of those services. Your use of third-party
            services is at your own risk.
          </p>
        </Section>

        <Section title="9. Disclaimer of Warranties">
          <p>
            YUKTA AI is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis
            without warranties of any kind, express or implied. We do not warrant that the service
            will be uninterrupted, error-free, or free of viruses or other harmful components.
          </p>
        </Section>

        <Section title="10. Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, {BRAND.company} shall not be liable
            for any indirect, incidental, special, consequential, or punitive damages arising from
            your use of YUKTA AI, including but not limited to loss of profits, data, or goodwill.
          </p>
        </Section>

        <Section title="11. Governing Law and Jurisdiction">
          <p>
            These Terms are governed by the laws of India. Any disputes arising under these Terms
            shall be subject to the exclusive jurisdiction of the courts of India.
          </p>
        </Section>

        <Section title="12. Modifications">
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective
            immediately upon posting to our website. Your continued use of YUKTA AI after any
            modification constitutes acceptance of the updated Terms.
          </p>
        </Section>

        <Section title="13. Contact">
          <p>
            For questions about these Terms, contact us at{" "}
            <a href={`mailto:${BRAND.supportEmail}`} className="text-primary hover:underline">
              {BRAND.supportEmail}
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
