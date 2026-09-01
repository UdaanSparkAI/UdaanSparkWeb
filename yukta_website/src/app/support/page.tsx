import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Support Center",
  description:
    "Get help with YUKTA AI. Find answers to common questions or contact our support team.",
  path: "/support",
});

const CATEGORIES = [
  {
    icon: "👤",
    title: "Account & Login",
    description: "Google Sign-In issues, account settings, profile management.",
    items: [
      "How do I sign in with Google?",
      "How do I update my preferences?",
      "Why is my location not being detected?",
    ],
    link: "/contact?subject=Account%20Issue",
  },
  {
    icon: "🛒",
    title: "Shopping & Prices",
    description: "Price comparison, basket optimisation, product search.",
    items: [
      "Why are prices different from what I see in the app?",
      "Which stores are supported?",
      "How does the AI basket work?",
    ],
    link: "/contact?subject=General%20Enquiry",
  },
  {
    icon: "🔧",
    title: "Technical Issues",
    description: "App crashes, bugs, performance problems.",
    items: [
      "The app is crashing on startup",
      "Search results are not loading",
      "The app is slow or freezing",
    ],
    link: "/contact?subject=Technical%20Support",
  },
  {
    icon: "🔒",
    title: "Privacy & Data",
    description: "Data deletion, privacy questions, account removal.",
    items: [
      "How do I delete my account?",
      "What data does YUKTA AI store?",
      "How do I export my data?",
    ],
    link: "/delete-account",
  },
];

export default function SupportPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
          Support Center
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">
          How Can We Help?
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          Browse our support categories or get in touch with our team. We typically respond within
          24–48 hours.
        </p>
      </div>

      {/* Category grid */}
      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="bg-white rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
          >
            <div className="text-3xl mb-3" aria-hidden="true">{cat.icon}</div>
            <h2 className="font-bold text-text text-lg mb-1">{cat.title}</h2>
            <p className="text-muted text-sm mb-4">{cat.description}</p>
            <ul className="flex flex-col gap-2 mb-5">
              {cat.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted">
                  <span className="text-primary mt-0.5" aria-hidden="true">›</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={cat.link}
              className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"
            >
              Get help with this →
            </a>
          </div>
        ))}
      </div>

      {/* Direct contact */}
      <div
        className="rounded-3xl p-8 md:p-12 text-center"
        style={{ background: "linear-gradient(135deg, rgba(22,163,74,0.06), rgba(132,204,22,0.07))" }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl"
          style={{ background: "linear-gradient(135deg, rgba(22,163,74,0.12), rgba(132,204,22,0.14))" }}
          aria-hidden="true"
        >
          ✉️
        </div>
        <h2 className="text-2xl font-extrabold text-dark mb-2">Still Need Help?</h2>
        <p className="text-muted mb-6 max-w-md mx-auto">
          Our support team is here for you. Send us a message and we&apos;ll get back to you as
          soon as possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-md shadow-primary/25"
          >
            Send a Message
          </a>
          <a
            href={`mailto:${BRAND.supportEmail}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors"
          >
            {BRAND.supportEmail}
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted">
          <div>
            <span className="font-semibold text-text">Response Time</span>
            <br />
            Typically within 24–48 hours
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div>
            <span className="font-semibold text-text">Account Deletion</span>
            <br />
            Processed within 30 days
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div>
            <span className="font-semibold text-text">Languages</span>
            <br />
            English, Hindi
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms & Conditions", href: "/terms" },
          { label: "Refund Policy", href: "/refund" },
          { label: "Delete Account", href: "/delete-account" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="py-3 px-4 rounded-xl border border-border text-sm text-muted hover:text-primary hover:border-primary/30 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
