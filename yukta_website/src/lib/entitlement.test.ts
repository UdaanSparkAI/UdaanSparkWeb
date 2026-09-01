import { describe, expect, it } from "vitest";
import { isValidEmail, normalizeEmail } from "@/lib/entitlement";

describe("normalizeEmail", () => {
  it("trims and lowercases so it matches the address stored by the app", () => {
    expect(normalizeEmail("  User@Example.COM ")).toBe("user@example.com");
  });

  it("returns an empty string for non-string input", () => {
    expect(normalizeEmail(undefined)).toBe("");
    expect(normalizeEmail(null)).toBe("");
    expect(normalizeEmail(42)).toBe("");
  });
});

describe("isValidEmail", () => {
  it("accepts an ordinary address", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("rejects addresses that cannot receive activation", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("user")).toBe(false);
    expect(isValidEmail("user@example")).toBe(false);
    expect(isValidEmail("user @example.com")).toBe(false);
  });

  it("rejects an over-long address", () => {
    expect(isValidEmail(`${"a".repeat(250)}@example.com`)).toBe(false);
  });
});
