import { PRICING } from "@/lib/constants";
import { isValidEmail, normalizeEmail, recordPremiumPurchase } from "@/lib/entitlement";
import { isValidPaymentSignature, premiumAmountPaise } from "@/lib/razorpay";
import type { VerifyPaymentResponse } from "@/types";

export const runtime = "nodejs";

function error(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return error("Invalid request body.", 400);
  }

  const orderId = readString(body, "razorpay_order_id");
  const paymentId = readString(body, "razorpay_payment_id");
  const signature = readString(body, "razorpay_signature");
  const email = normalizeEmail(body.email);

  if (!orderId || !paymentId || !signature) {
    return error("Missing payment details.", 400);
  }

  if (!isValidEmail(email)) {
    return error("Missing or invalid email address.", 400);
  }

  let signatureValid: boolean;
  try {
    signatureValid = isValidPaymentSignature(orderId, paymentId, signature);
  } catch (cause) {
    console.error("[razorpay] cannot verify signature:", cause);
    return error("Payments are misconfigured. Please contact support.", 500);
  }

  if (!signatureValid) {
    console.error(`[razorpay] signature mismatch for order ${orderId}`);
    return error("Payment could not be verified.", 400);
  }

  // The amount is re-derived here rather than read from the request: the order
  // was created server-side at this price, so this is what was charged.
  const result = await recordPremiumPurchase({
    email,
    paymentId,
    orderId,
    amount: premiumAmountPaise(),
    currency: PRICING.currency,
  });

  if (!result.recorded) {
    // The signature is valid, so the buyer has genuinely been charged. This must
    // never be reported as a failed payment — surface it as pending instead.
    console.error(
      `[entitlement] PAID BUT NOT ACTIVATED — email=${email} payment=${paymentId} order=${orderId}: ${result.reason}`
    );

    const pending: VerifyPaymentResponse = { status: "activation_pending", paymentId };
    return Response.json(pending, { status: 202 });
  }

  const activated: VerifyPaymentResponse = { status: "activated" };
  return Response.json(activated);
}
