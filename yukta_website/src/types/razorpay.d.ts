/** Minimal typings for the Razorpay Standard Checkout script (checkout.js). */

/**
 * What Checkout hands back on success.
 *
 * Subscription payments return `razorpay_subscription_id` — there is no order
 * in a subscription flow, so `razorpay_order_id` is never present.
 */
export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

export interface RazorpayFailureResponse {
  error: {
    code: string;
    description: string;
    reason?: string;
    step?: string;
    source?: string;
  };
}

/**
 * A subscription checkout is opened with `subscription_id` alone. The amount
 * and currency come from the plan attached to the subscription server-side, so
 * passing `amount`/`currency`/`order_id` here is neither needed nor correct.
 */
export interface RazorpayCheckoutOptions {
  key: string;
  subscription_id: string;
  name: string;
  description?: string;
  image?: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

export interface RazorpayInstance {
  open(): void;
  on(event: "payment.failed", handler: (response: RazorpayFailureResponse) => void): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}
