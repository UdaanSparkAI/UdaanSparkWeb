import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyYuktaSection } from "@/components/sections/WhyYuktaSection";
import { AppPreviewSection } from "@/components/sections/AppPreviewSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BRAND, PRICING, STORE_LIST } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: `YUKTA AI compares grocery prices across ${STORE_LIST} in real time. Our AI finds the cheapest overall basket, generates recipes, and tracks your nutrition.`,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: BRAND.name,
  operatingSystem: "ANDROID",
  applicationCategory: "ShoppingApplication",
  description: `AI-powered grocery price comparison across ${STORE_LIST}, plus Chef AI recipes and Nutrition AI health scores. Shop smarter and save money on every order.`,
  offers: {
    "@type": "Offer",
    price: String(PRICING.monthlyPrice),
    priceCurrency: PRICING.currency,
    description: `${PRICING.trialDays}-day free trial, then ${PRICING.currencySymbol}${PRICING.monthlyPrice} per month. Cancel anytime.`,
  },
  url: BRAND.siteUrl,
  creator: {
    "@type": "Organization",
    name: BRAND.company,
    url: BRAND.companyUrl,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyYuktaSection />
      <AppPreviewSection />
      <FAQSection />
    </>
  );
}
