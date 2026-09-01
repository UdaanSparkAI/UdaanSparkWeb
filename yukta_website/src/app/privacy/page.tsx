import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { BRAND, STORE_LIST } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how YUKTA AI collects, uses, and protects your personal data. We are committed to your privacy and GDPR/Play Store compliance.",
  path: "/privacy",
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-dark mb-3">{title}</h2>
      <div className="text-muted leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-16">
      <div className="mb-10">
        <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Legal</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-3">Privacy Policy</h1>
        <p className="text-muted text-sm">
          Last updated: <time dateTime="2026-08-03">3 August 2026</time>
        </p>
      </div>

      <div className="prose-like">
        <Section title="1. Introduction">
          <p>
            {BRAND.company} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates the{" "}
            <strong>{BRAND.name}</strong> mobile application and website at{" "}
            <a href={BRAND.siteUrl} className="text-primary hover:underline">
              {BRAND.siteUrl}
            </a>
            . This Privacy Policy explains how we collect, use, store, and share information about
            you when you use our services. By using YUKTA AI, you agree to the practices described
            in this policy.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>
            <strong>Account Information</strong>: When you sign in with Google, we receive your
            name, email address, and Google profile picture from Google&apos;s OAuth service. We do
            not receive or store your Google password.
          </p>
          <p>
            <strong>Location Data</strong>: YUKTA AI requests your device location (with your
            permission) to show geo-relevant pricing from grocery platforms that restrict access
            by pin code. Location is used only during an active search session and is not stored
            permanently on our servers.
          </p>
          <p>
            <strong>Usage Data</strong>: We collect anonymised analytics such as screens viewed,
            features used, and search queries (without personally identifiable details) to improve
            the product.
          </p>
          <p>
            <strong>Device Information</strong>: We may collect device model, operating system
            version, and app version for crash reporting and compatibility.
          </p>
          <p>
            <strong>Subscription Information</strong>: When you start a free trial or purchase a
            YUKTA Premium subscription, we store your entitlement status — the plan, its expiry
            date, whether the trial has been used, and the Google Play purchase token and order ID
            — linked to your account. This is required to grant access and to enforce the one-trial
            limit. <strong>We never receive or store your card, UPI, or bank details</strong>; all
            payments are handled entirely by Google Play.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>To authenticate you and personalise your shopping experience</li>
            <li>To compare grocery prices across {STORE_LIST} on your behalf</li>
            <li>To provide AI-driven basket recommendations and product alternatives</li>
            <li>
              To generate recipes, score products for nutrition, and track your diet goals when you
              use Chef AI and Nutrition AI
            </li>
            <li>To manage your free trial and subscription entitlement</li>
            <li>To improve app performance, fix bugs, and develop new features</li>
            <li>To respond to support requests and enquiries</li>
            <li>To comply with legal obligations</li>
          </ul>
        </Section>

        <Section title="4. Third-Party Services">
          <p>
            YUKTA AI integrates with the following third-party services. Each has its own privacy
            policy.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Google Sign-In (Google LLC)</strong>: Used for authentication. Governed by
              Google&apos;s Privacy Policy.
            </li>
            <li>
              <strong>{STORE_LIST}</strong>: Price and product data is fetched from these platforms
              in real time. We do not share your personal data with them.
            </li>
            <li>
              <strong>Google Play Billing (Google LLC)</strong>: Processes all subscription
              payments. Google shares a purchase token and order ID with us to confirm your
              entitlement; your payment details remain with Google.
            </li>
            <li>
              <strong>Groq AI</strong>: Powers our recipe and AI recommendation features. Queries
              may be processed by Groq&apos;s infrastructure but are not linked to your identity.
            </li>
          </ul>
        </Section>

        <Section title="5. Data Storage and Security">
          <p>
            Your data is stored on secure servers hosted on Amazon Web Services (AWS EC2) located
            in India. We use PostgreSQL with encryption at rest and TLS for all data in transit.
            Access is restricted to authorised personnel only.
          </p>
          <p>
            We retain your account data as long as your account is active. You may request deletion
            at any time (see Section 8).
          </p>
        </Section>

        <Section title="6. Data Sharing">
          <p>
            We do <strong>not</strong> sell, rent, or trade your personal information to third
            parties. We share data only in the following limited circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>With service providers necessary to operate YUKTA AI (e.g., cloud hosting)</li>
            <li>When required by law, court order, or government authority</li>
            <li>To protect the rights, property, or safety of {BRAND.company} or our users</li>
          </ul>
        </Section>

        <Section title="7. Children's Privacy">
          <p>
            YUKTA AI is not directed at children under 13. We do not knowingly collect personal
            information from children. If you believe a child has provided us with personal data,
            please contact us at{" "}
            <a href={`mailto:${BRAND.supportEmail}`} className="text-primary hover:underline">
              {BRAND.supportEmail}
            </a>{" "}
            and we will delete it promptly.
          </p>
        </Section>

        <Section title="8. Your Rights and Data Deletion">
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your account and all associated data</li>
            <li>Withdraw consent for data processing at any time</li>
          </ul>
          <p>
            To delete your account, visit our{" "}
            <a href="/delete-account" className="text-primary hover:underline">
              Delete Account page
            </a>{" "}
            or email{" "}
            <a href={`mailto:${BRAND.supportEmail}`} className="text-primary hover:underline">
              {BRAND.supportEmail}
            </a>
            . We will process your request within 30 days and permanently delete all your data.
          </p>
        </Section>

        <Section title="9. Cookies and Local Storage">
          <p>
            Our website uses minimal cookies for session management and analytics. You can
            configure your browser to reject cookies, though some features may not work as expected.
            The YUKTA AI Android app uses local device storage to cache preferences and session
            tokens.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the
            &ldquo;Last updated&rdquo; date at the top. We encourage you to review this page
            periodically. Continued use of YUKTA AI after any changes constitutes your acceptance
            of the new policy.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <address className="not-italic mt-2">
            <strong>{BRAND.company}</strong>
            <br />
            Email:{" "}
            <a href={`mailto:${BRAND.supportEmail}`} className="text-primary hover:underline">
              {BRAND.supportEmail}
            </a>
            <br />
            Website:{" "}
            <a href={BRAND.companyUrl} className="text-primary hover:underline">
              {BRAND.companyUrl}
            </a>
          </address>
        </Section>
      </div>
    </div>
  );
}
