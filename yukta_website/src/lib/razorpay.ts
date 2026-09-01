import { createHmac, timingSafeEqual } from "node:crypto";
import { PRICING } from "@/lib/constants";

/** Razorpay rejects any order below 100 paise (₹1). */
const MIN_AMOUNT_PAISE = 100;

const ORDERS_ENDPOINT = "https://api.razorpay.com/v1/orders";

/** A failed Razorpay API call, carrying the upstream HTTP status. */
export class RazorpayApiError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "RazorpayApiError";
  }
}

function credentials(): { keyId: string; keySecret: string } {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      "RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set — see .env.local.example"
    );
  }

  return { keyId, keySecret };
}

/** The Razorpay key id, which is safe to hand to the browser. The secret never leaves the server. */
export function publicKeyId(): string {
  return credentials().keyId;
}

/**
 * One month of YUKTA Premium, in paise, derived on the server from PRICING.
 *
 * Deliberately takes no argument. If the amount arrived in the request body,
 * a caller could edit it in devtools and buy Premium for ₹1.
 */
export function premiumAmountPaise(): number {
  const paise = Math.round(PRICING.monthlyPrice * 100);

  if (paise < MIN_AMOUNT_PAISE) {
    throw new Error(
      `PRICING.monthlyPrice resolves to ${paise} paise, below Razorpay's ${MIN_AMOUNT_PAISE} paise minimum`
    );
  }

  return paise;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

/**
 * Creates a Razorpay order for one month of Premium.
 *
 * The buyer's email is attached as an order note so that anything reading the
 * payment later — in particular the `order.paid` webhook handled by the app
 * backend — can tell which account to activate.
 */
export async function createPremiumOrder(
  receipt: string,
  email: string
): Promise<RazorpayOrder> {
  const { keyId, keySecret } = credentials();
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  let res: Response;
  try {
    res = await fetch(ORDERS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: premiumAmountPaise(),
        currency: PRICING.currency,
        receipt,
        // Set server-side, so it is trustworthy. The email Razorpay reports on
        // the payment entity is whatever the payer typed into the checkout
        // form — they can edit it, so it must not be used to grant access.
        notes: { email, product: "yukta_premium_1m" },
      }),
      // Kept well inside Vercel's serverless function limit so this fails as a
      // clean JSON error rather than the platform killing the function first.
      signal: AbortSignal.timeout(8_000),
    });
  } catch (cause) {
    throw new RazorpayApiError(502, `Could not reach Razorpay: ${String(cause)}`);
  }

  if (!res.ok) {
    throw new RazorpayApiError(res.status, (await res.text()).slice(0, 500));
  }

  const order = (await res.json()) as RazorpayOrder;
  return { id: order.id, amount: order.amount, currency: order.currency };
}

/**
 * Checks the signature Razorpay returns alongside a successful payment.
 *
 * Razorpay signs `order_id|payment_id` with HMAC-SHA256 under the key secret.
 * The comparison is constant-time so a caller cannot discover a valid
 * signature one byte at a time.
 */
export function isValidPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const { keySecret } = credentials();

  const expected = createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const expectedBytes = Buffer.from(expected, "utf8");
  const actualBytes = Buffer.from(signature, "utf8");

  // timingSafeEqual throws when the lengths differ, so guard it first.
  if (expectedBytes.length !== actualBytes.length) {
    return false;
  }

  return timingSafeEqual(expectedBytes, actualBytes);
}
