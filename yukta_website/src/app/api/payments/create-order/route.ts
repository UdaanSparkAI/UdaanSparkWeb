import { randomUUID } from "node:crypto";
import { isValidEmail, normalizeEmail } from "@/lib/entitlement";
import { RazorpayApiError, createPremiumOrder, publicKeyId } from "@/lib/razorpay";
import type { CreateOrderResponse } from "@/types";

// node:crypto and the Razorpay key secret keep this on the Node runtime.
export const runtime = "nodejs";

function error(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return error("Invalid request body.", 400);
  }

  const email = normalizeEmail((body as { email?: unknown } | null)?.email);

  if (!isValidEmail(email)) {
    return error("Enter the email address you use in the YUKTA AI app.", 400);
  }

  // Razorpay caps the receipt at 40 characters, so keep it short and free of PII.
  const receipt = `yukta_${Date.now().toString(36)}_${randomUUID().slice(0, 8)}`;

  try {
    const order = await createPremiumOrder(receipt, email);

    const payload: CreateOrderResponse = {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: publicKeyId(),
    };

    return Response.json(payload);
  } catch (cause) {
    if (cause instanceof RazorpayApiError) {
      console.error(`[razorpay] create order failed (${cause.status}):`, cause.message);

      return cause.status === 401
        ? error("Payments are misconfigured. Please contact support.", 401)
        : error("Could not start the payment. Please try again.", 500);
    }

    console.error("[razorpay] create order failed:", cause);
    return error("Could not start the payment. Please try again.", 500);
  }
}
