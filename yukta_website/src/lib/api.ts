import type {
  ContactPayload,
  CreateSubscriptionPayload,
  CreateSubscriptionResponse,
  DeleteAccountPayload,
} from "@/types";

/**
 * The YUKTA AI app backend. Subscriptions are created there rather than in a
 * route handler here, because that is also where the Razorpay webhook lands and
 * where entitlement is recorded — keeping both on one server means there is a
 * single owner of a subscription's lifecycle.
 */
const APP_API_BASE = "https://api.udaansparkai.com";

async function post<T>(path: string, body: T): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { success: false, error: data.error ?? "Something went wrong. Please try again." };
  }

  return { success: true };
}

/** Like `post`, but returns the parsed response body so the caller can act on it. */
async function postFor<TResult>(
  path: string,
  body: unknown
): Promise<{ ok: true; data: TResult } | { ok: false; error: string }> {
  let res: Response;

  try {
    res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, error: "Network error. Check your connection and try again." };
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // `error` is what this site's own routes return; `detail` is FastAPI's
    // default shape, which is what the app backend sends.
    const message = typeof data.error === "string" ? data.error : data.detail;
    return {
      ok: false,
      error: typeof message === "string" ? message : "Something went wrong. Please try again.",
    };
  }

  return { ok: true, data: data as TResult };
}

export const api = {
  contact: (payload: ContactPayload) => post("/api/contact", payload),
  deleteAccount: (payload: DeleteAccountPayload) => post("/api/delete-account", payload),
  createSubscription: (payload: CreateSubscriptionPayload) =>
    postFor<CreateSubscriptionResponse>(
      `${APP_API_BASE}/subscriptions/razorpay/create-subscription`,
      payload
    ),
};
