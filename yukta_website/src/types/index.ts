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

export interface CreateOrderPayload {
  email: string;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export interface VerifyPaymentPayload {
  email: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/**
 * "activation_pending" means the signature checked out but the entitlement
 * write to the app backend failed. The buyer has been charged, so this must
 * never be presented as a plain failure.
 */
export type VerifyPaymentResponse =
  | { status: "activated" }
  | { status: "activation_pending"; paymentId: string };

export interface PlanFeature {
  title: string;
  description: string;
  /** Free-plan allowance, or `false` to render a "not included" lock. */
  free: string | false;
  /** Premium allowance, or `true` to render an "included" tick. */
  premium: string | true;
}
