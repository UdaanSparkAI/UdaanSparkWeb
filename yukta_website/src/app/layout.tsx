import type { Metadata } from "next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BRAND, STORE_LIST } from "@/lib/constants";
import "./globals.css";

/** Google Tag Manager container, for any tags managed from the GTM dashboard. */
const GTM_ID = "GTM-PR5DBK7J";

/**
 * GA4 measurement ID, loaded directly rather than through GTM.
 *
 * Do NOT also add a GA4 Configuration tag inside the GTM container — both would
 * fire on every page and each pageview would be counted twice.
 */
const GA_ID = "G-Q9WSM92YCW";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: `YUKTA AI compares grocery prices across ${STORE_LIST} so you always get the best deal. Shop smarter and save money on every order.`,
  metadataBase: new URL(BRAND.siteUrl),
  // See src/lib/metadata.ts — `images` is deliberately omitted so app/opengraph-image.tsx
  // supplies the OG image for every route.
  openGraph: {
    siteName: BRAND.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
  // Google Search Console site verification. Public by design — it only proves
  // domain ownership, so it belongs in the source rather than an env var.
  verification: {
    google: "S90xm-Fq1OV9-eQa6nkUJdoTX4JT2dlUacYbA5uMHys",
  },
  // Icons come from the app/ file conventions — favicon.ico, icon.png and
  // apple-icon.png — so Next emits the correct <link> tags with real sizes.
  // Declaring `icons` here would override them, which is how the default
  // create-next-app favicon stayed pinned to the tab.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable}`}
    >
      <GoogleTagManager gtmId={GTM_ID} />
      <GoogleAnalytics gaId={GA_ID} />
      <body className="min-h-screen flex flex-col antialiased">
        {/* Fallback for browsers with JavaScript disabled. <GoogleTagManager />
            emits only the script tags, so this iframe has to be added by hand. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
