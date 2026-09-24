export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface DeleteAccountPayload {
  email: string;
  reason: string;
  note?: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface WhyCard {
  icon: string;
  title: string;
  description: string;
}

export interface CreateSubscriptionPayload {
  email: string;
}

/**
 * Returned by the app backend's create-subscription endpoint. The key id comes
 * back with the response rather than from a NEXT_PUBLIC_ env var so there is
 * exactly one place that decides which Razorpay account (test or live) is used.
 */
export interface CreateSubscriptionResponse {
  subscription_id: string;
  key_id: string;
}

export interface PlanFeature {
  title: string;
  description: string;
  /** Free-plan allowance, or `false` to render a "not included" lock. */
  free: string | false;
  /** Premium allowance, or `true` to render an "included" tick. */
  premium: string | true;
}
