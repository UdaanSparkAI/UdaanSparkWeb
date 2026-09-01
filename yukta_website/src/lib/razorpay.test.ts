import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PRICING } from "@/lib/constants";
import {
  RazorpayApiError,
  createPremiumOrder,
  isValidPaymentSignature,
  premiumAmountPaise,
  publicKeyId,
} from "@/lib/razorpay";

const KEY_ID = "rzp_test_example";
const KEY_SECRET = "test_secret_value";

function sign(orderId: string, paymentId: string, secret = KEY_SECRET): string {
  return createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
}

beforeEach(() => {
  process.env.RAZORPAY_KEY_ID = KEY_ID;
  process.env.RAZORPAY_KEY_SECRET = KEY_SECRET;
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("premiumAmountPaise", () => {
  it("converts the rupee price to paise", () => {
    expect(premiumAmountPaise()).toBe(PRICING.monthlyPrice * 100);
  });

  it("stays above Razorpay's 100 paise minimum", () => {
    expect(premiumAmountPaise()).toBeGreaterThanOrEqual(100);
  });
});

describe("isValidPaymentSignature", () => {
  it("accepts a signature produced with the key secret", () => {
    expect(isValidPaymentSignature("order_A", "pay_A", sign("order_A", "pay_A"))).toBe(true);
  });

  it("rejects a signature belonging to a different payment", () => {
    expect(isValidPaymentSignature("order_A", "pay_A", sign("order_A", "pay_B"))).toBe(false);
  });

  it("rejects a signature belonging to a different order", () => {
    expect(isValidPaymentSignature("order_A", "pay_A", sign("order_B", "pay_A"))).toBe(false);
  });

  it("rejects a signature made with the wrong secret", () => {
    expect(isValidPaymentSignature("order_A", "pay_A", sign("order_A", "pay_A", "wrong"))).toBe(
      false
    );
  });

  it("rejects a malformed signature instead of throwing", () => {
    expect(isValidPaymentSignature("order_A", "pay_A", "short")).toBe(false);
    expect(isValidPaymentSignature("order_A", "pay_A", "")).toBe(false);
  });

  it("refuses to verify when the key secret is missing", () => {
    delete process.env.RAZORPAY_KEY_SECRET;
    expect(() => isValidPaymentSignature("order_A", "pay_A", "x")).toThrow(/RAZORPAY_KEY_ID/);
  });
});

describe("publicKeyId", () => {
  it("exposes the key id", () => {
    expect(publicKeyId()).toBe(KEY_ID);
  });
});

describe("createPremiumOrder", () => {
  it("sends the server-side amount and carries the buyer email as an order note", async () => {
    const calls: Array<{ url: string; init: RequestInit }> = [];

    vi.stubGlobal("fetch", async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return new Response(JSON.stringify({ id: "order_test", amount: 3900, currency: "INR" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const order = await createPremiumOrder("rcpt_1", "buyer@example.com");
    expect(order).toEqual({ id: "order_test", amount: 3900, currency: "INR" });
    expect(calls).toHaveLength(1);

    const body = JSON.parse(calls[0].init.body as string);
    expect(body.amount).toBe(PRICING.monthlyPrice * 100);
    expect(body.currency).toBe(PRICING.currency);
    // The webhook on the app backend reads this to decide whose account to activate.
    expect(body.notes.email).toBe("buyer@example.com");
    expect(body.receipt).toBe("rcpt_1");
    expect(body.receipt.length).toBeLessThanOrEqual(40);
  });

  it("authenticates with the key id and secret", async () => {
    let header = "";

    vi.stubGlobal("fetch", async (_url: string, init: RequestInit) => {
      header = (init.headers as Record<string, string>).Authorization;
      return new Response(JSON.stringify({ id: "o", amount: 3900, currency: "INR" }), {
        status: 200,
      });
    });

    await createPremiumOrder("rcpt_1", "buyer@example.com");
    expect(Buffer.from(header.replace("Basic ", ""), "base64").toString()).toBe(
      `${KEY_ID}:${KEY_SECRET}`
    );
  });

  it("reports a Razorpay auth failure as a 401", async () => {
    vi.stubGlobal("fetch", async () => new Response("unauthorized", { status: 401 }));

    await expect(createPremiumOrder("rcpt_1", "buyer@example.com")).rejects.toBeInstanceOf(
      RazorpayApiError
    );
    await expect(createPremiumOrder("rcpt_1", "buyer@example.com")).rejects.toMatchObject({
      status: 401,
    });
  });
});
