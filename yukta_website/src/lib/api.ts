import type {
  ContactPayload,
  CreateOrderPayload,
  CreateOrderResponse,
  DeleteAccountPayload,
  VerifyPaymentPayload,
  VerifyPaymentResponse,
} from "@/types";

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
    return { ok: false, error: data.error ?? "Something went wrong. Please try again." };
  }

  return { ok: true, data: data as TResult };
}

export const api = {
  contact: (payload: ContactPayload) => post("/api/contact", payload),
  deleteAccount: (payload: DeleteAccountPayload) => post("/api/delete-account", payload),
  createOrder: (payload: CreateOrderPayload) =>
    postFor<CreateOrderResponse>("/api/payments/create-order", payload),
  verifyPayment: (payload: VerifyPaymentPayload) =>
    postFor<VerifyPaymentResponse>("/api/payments/verify", payload),
};
