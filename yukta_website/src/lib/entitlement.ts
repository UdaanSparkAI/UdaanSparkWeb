/**
 * Recording a paid Premium purchase against the YUKTA app backend — the EC2
 * service that owns the Postgres subscriptions table.
 *
 * The website never talks to Postgres directly: the backend keeps ownership of
 * its own schema, and no database credentials need to exist on Vercel.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Lowercases and trims a candidate email so it matches the app's stored address. */
export function normalizeEmail(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_PATTERN.test(value);
}

export interface PremiumPurchase {
  email: string;
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
}

/**
 * Outcome of the entitlement write.
 *
 * A failure means the buyer has already been charged but is not yet activated,
 * so callers must surface it distinctly rather than as a generic error.
 */
export type EntitlementResult = { recorded: true } | { recorded: false; reason: string };

export async function recordPremiumPurchase(
  purchase: PremiumPurchase
): Promise<EntitlementResult> {
  // The full endpoint URL, not a base — the app backend owns its own route naming.
  const endpoint = process.env.ENTITLEMENT_API_URL;
  const secret = process.env.ENTITLEMENT_API_SECRET;

  if (!endpoint || !secret) {
    return {
      recorded: false,
      reason: "ENTITLEMENT_API_URL / ENTITLEMENT_API_SECRET are not configured",
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
        // The payment id is unique per charge, so a retried request must not
        // grant a second month.
        "Idempotency-Key": purchase.paymentId,
      },
      body: JSON.stringify({ ...purchase, purchasedAt: new Date().toISOString() }),
      // Short on purpose: if the backend is slow the order.paid webhook still
      // grants Premium, so reporting "activating" beats holding the request open.
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      return {
        recorded: false,
        reason: `backend responded ${res.status}: ${(await res.text()).slice(0, 200)}`,
      };
    }

    return { recorded: true };
  } catch (cause) {
    return { recorded: false, reason: `backend unreachable: ${String(cause)}` };
  }
}
