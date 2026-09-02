import type { FAQItem, FeatureCard, NavLink, PlanFeature, Step, WhyCard } from "@/types";

export const BRAND = {
  name: "YUKTA AI",
  company: "Udaan Spark AI",
  tagline: "Shop Smarter. Save More.",
  description:
    "YUKTA AI is your AI-powered grocery shopping assistant. Compare prices across Blinkit, Zepto, Swiggy Instamart, BigBasket and JioMart instantly, let AI build your cheapest basket, and transfer it to the store app in one tap.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yukta.udaansparkai.com",
  companyUrl: "https://udaansparkai.com",
  supportEmail: "support@udaansparkai.com",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.udaansparkai.smartsaver",
  year: 2026,
} as const;

/**
 * The stores YUKTA AI actually scrapes. Must stay in sync with ALL_STORE_NAMES in
 * the Android app (SearchViewModel.kt / BasketCalculator.kt).
 */
export const STORES = ["Blinkit", "Zepto", "Swiggy Instamart", "BigBasket", "JioMart"] as const;

/** Human-readable store list, e.g. "Blinkit, Zepto, Swiggy Instamart, BigBasket and JioMart". */
export const STORE_LIST = `${STORES.slice(0, -1).join(", ")} and ${STORES[STORES.length - 1]}`;

/**
 * YUKTA Premium pricing. Must stay in sync with the Play Console subscription and
 * SubscriptionScreen.kt in the Android app.
 */
export const PRICING = {
  monthlyPrice: 39,
  currency: "INR",
  currencySymbol: "₹",
  trialDays: 3,
  playProductId: "yukta_ai_app",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Support", href: "/support" },
];

export const FEATURES: FeatureCard[] = [
  {
    icon: "compare",
    title: "AI Price Comparison",
    description:
      `Instantly compare grocery prices across ${STORE_LIST} so you always get the lowest total basket cost.`,
  },
  {
    icon: "assistant",
    title: "AI Shopping Assistant",
    description:
      "Chat with your grocery AI in plain language and it builds the cart for you — cheapest, healthiest, or fully vegan.",
  },
  {
    icon: "chef",
    title: "Chef AI",
    description:
      "Name any dish and Chef AI generates the recipe, then automatically sources every ingredient at the lowest price.",
  },
  {
    icon: "nutrition",
    title: "Nutrition AI",
    description:
      "Every product gets a health score. Track your daily intake and let YUKTA AI keep your cart aligned with your diet goals.",
  },
  {
    icon: "transfer",
    title: "One-Tap Cart Transfer",
    description:
      "Stop re-adding items by hand. YUKTA AI loads your optimised basket straight into the store's own app — completely hands-free.",
  },
  {
    icon: "savings",
    title: "Smart Basket Optimization",
    description:
      "The AI weighs price, delivery fees, and minimum order values across every store to land on your cheapest overall basket.",
  },
];

export const HOW_IT_WORKS: Step[] = [
  {
    number: 1,
    title: "Search Your Groceries",
    description:
      "Type the items you need — from atta and dal to fruits and snacks. No special format required.",
  },
  {
    number: 2,
    title: "Compare Multiple Stores",
    description:
      `YUKTA AI fetches real-time prices from ${STORE_LIST} simultaneously.`,
  },
  {
    number: 3,
    title: "AI Finds the Best Basket",
    description:
      "Our AI analyses thousands of combinations to recommend the cheapest overall basket — including delivery fees.",
  },
  {
    number: 4,
    title: "Transfer and Checkout",
    description:
      "Send the optimised basket to the store's app in one tap, then check out. Save money on every single order.",
  },
];

export const WHY_YUKTA: WhyCard[] = [
  {
    icon: "rupee",
    title: "Saves You Money",
    description:
      "Real savings on every order — not cashback, not coupons. Just the cheapest price, guaranteed.",
  },
  {
    icon: "clock",
    title: "Saves You Time",
    description:
      "No more switching apps. Get price comparison results in seconds from a single search.",
  },
  {
    icon: "brain",
    title: "Powered by AI",
    description:
      "Our AI continuously learns to deliver smarter recommendations tailored to your shopping habits.",
  },
  {
    icon: "store",
    title: "Multiple Platforms",
    description:
      `${STORE_LIST} — all in one place. More platforms coming soon.`,
  },
  {
    icon: "decision",
    title: "Smart Decisions",
    description:
      "See nutritional info, quantity comparisons, and unit prices — everything you need to decide wisely.",
  },
  {
    icon: "person",
    title: "Personalised Shopping",
    description:
      "YUKTA AI remembers your preferences and dietary goals to make every suggestion more relevant.",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How does YUKTA AI compare prices across stores?",
    answer:
      `YUKTA AI fetches live product listings from ${STORE_LIST} in real time. Our AI engine then analyses every combination of stores to find the lowest total basket cost — accounting for delivery fees and minimum order values.`,
  },
  {
    question: "Which grocery platforms are currently supported?",
    answer:
      `We currently support five platforms: ${STORE_LIST}. We are actively working on adding more in upcoming releases.`,
  },
  {
    question: "Can YUKTA AI add items to the store app for me?",
    answer:
      "Yes. Once the AI has picked your cheapest basket, one-tap cart transfer loads every item straight into the store's own app — you just review and check out. No re-adding items by hand.",
  },
  {
    question: "What can Chef AI and Nutrition AI do?",
    answer:
      "Chef AI turns any dish name into a full recipe and then sources every ingredient at the lowest price across all five stores. Nutrition AI scores each product for healthiness, tracks your daily intake, and keeps your cart aligned with your personal diet goals.",
  },
  {
    question: "How does the AI decide which basket is best?",
    answer:
      "Our AI evaluates price per unit, total cart value, delivery charges, and estimated delivery time. It recommends the combination that minimises your total spend while meeting your quantity requirements.",
  },
  {
    question: "Is Google Login supported?",
    answer:
      "Yes. YUKTA AI uses Google Sign-In for secure, one-tap authentication. We do not store your Google password — only the basic profile information (name and email) required to personalise your experience.",
  },
  {
    question: "How much does YUKTA AI cost?",
    answer:
      `YUKTA AI is free to download and starts with a ${PRICING.trialDays}-day free trial — no payment is needed to begin. After the trial, YUKTA Premium is ${PRICING.currencySymbol}${PRICING.monthlyPrice} per month, billed through Google Play. You can cancel anytime and there is no lock-in.`,
  },
  {
    question: "What happens when my free trial ends?",
    answer:
      `The ${PRICING.trialDays}-day trial is one-time per account and unlocks everything YUKTA Premium offers. When it ends you will be asked to subscribe for ${PRICING.currencySymbol}${PRICING.monthlyPrice} per month to keep using the app. You are never charged automatically without subscribing, and you can cancel at any time from Play Store → Account → Subscriptions.`,
  },
  {
    question: "How is my personal data protected?",
    answer:
      "Your data is encrypted in transit and at rest. We store only what is necessary to provide the service. You can request deletion of your account and all associated data at any time via our Delete Account page. We never sell your data to third parties.",
  },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About", href: "/support#about" },
    { label: "Contact", href: "/contact" },
    { label: "Support", href: "/support" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Delete Account", href: "/delete-account" },
  ],
  product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Get Premium", href: "/premium" },
  ],
};

/**
 * Free vs Premium allowances shown on /premium. Must stay in sync with the
 * paywall screen in the Android app (SubscriptionScreen.kt).
 */
export const PLAN_COMPARISON: PlanFeature[] = [
  {
    title: "Compare stores",
    description: `Live basket price comparison across ${STORES.length} stores`,
    free: "3 / week",
    premium: "Unlimited",
  },
  {
    title: "One-tap cart transfer",
    description: "Auto-add items to the store app",
    free: "3 / week",
    premium: "Unlimited",
  },
  {
    title: "AI chatbot",
    description: "Build a cart by chatting",
    free: "5 / day",
    premium: "Unlimited",
  },
  {
    title: "Chef AI",
    description: "Recipes + auto-sourced ingredients",
    free: "3 / week",
    premium: "Unlimited",
  },
  {
    title: "Split-cart optimizer",
    description: "Cheapest split, delivery included",
    free: false,
    premium: true,
  },
  {
    title: "Nutrition AI",
    description: "Health scores free · profile & diet plan",
    free: "Scores",
    premium: "Full",
  },
];
