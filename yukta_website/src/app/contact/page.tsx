import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/ui/ContactForm";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the YUKTA AI team. We're here to help with any questions, feedback, or support requests.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: info */}
        <div>
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-8">
            Whether you have a question about YUKTA AI, need technical support, or just want to
            share feedback — our team is ready to help.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                style={{ background: "rgba(22,163,74,0.08)" }}
                aria-hidden="true"
              >
                ✉️
              </div>
              <div>
                <p className="font-semibold text-text text-sm">Email Support</p>
                <a
                  href={`mailto:${BRAND.supportEmail}`}
                  className="text-muted text-sm hover:text-primary transition-colors"
                >
                  {BRAND.supportEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                style={{ background: "rgba(132,204,22,0.12)" }}
                aria-hidden="true"
              >
                🕐
              </div>
              <div>
                <p className="font-semibold text-text text-sm">Response Time</p>
                <p className="text-muted text-sm">Typically within 24–48 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                style={{ background: "rgba(22,163,74,0.08)" }}
                aria-hidden="true"
              >
                🌐
              </div>
              <div>
                <p className="font-semibold text-text text-sm">Company</p>
                <a
                  href={BRAND.companyUrl}
                  className="text-muted text-sm hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {BRAND.companyUrl}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 p-5 rounded-2xl border border-border bg-subtle">
            <p className="text-sm font-semibold text-text mb-1">Looking to delete your account?</p>
            <p className="text-sm text-muted mb-3">
              Use our dedicated account deletion page for a faster response.
            </p>
            <a
              href="/delete-account"
              className="text-primary font-semibold text-sm hover:underline"
            >
              Delete Account →
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-white rounded-3xl border border-border shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-dark mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
