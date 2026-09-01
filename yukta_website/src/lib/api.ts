import type { ContactPayload, DeleteAccountPayload } from "@/types";

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

export const api = {
  contact: (payload: ContactPayload) => post("/api/contact", payload),
  deleteAccount: (payload: DeleteAccountPayload) => post("/api/delete-account", payload),
};
