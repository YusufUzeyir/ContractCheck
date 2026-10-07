import { describe, it, expect } from "vitest";
import { contractRequestSchema } from "../validations";

describe("contractRequestSchema Validation Tests", () => {
  const validPayload = {
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    service: "quick-scan",
    description: "Sözleşmemizin fesih ve cezai şart maddelerinin detaylı incelenmesini talep ediyoruz.",
    companyWebsite: ""
  };

  it("should validate and trim a correct payload", () => {
    const result = contractRequestSchema.safeParse({
      ...validPayload,
      name: "  Mehmet Demir  ",
      email: "  MEHMET@EXAMPLE.COM  ",
      description: "  Bu açıklama en az 20 karakter uzunluğundadır ve trim edilmelidir.  "
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Mehmet Demir");
      expect(result.data.email).toBe("mehmet@example.com");
      expect(result.data.service).toBe("quick-scan");
      expect(result.data.description).toBe("Bu açıklama en az 20 karakter uzunluğundadır ve trim edilmelidir.");
    }
  });

  describe("Name field boundaries", () => {
    it("should reject name shorter than 2 characters after trim", () => {
      const res = contractRequestSchema.safeParse({
        ...validPayload,
        name: " A "
      });
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.errors[0]?.message).toContain("en az 2 karakter");
      }
    });

    it("should accept name with exactly 2 characters", () => {
      const res = contractRequestSchema.safeParse({
        ...validPayload,
        name: "Al"
      });
      expect(res.success).toBe(true);
    });

    it("should accept name with 80 characters and reject 81 characters", () => {
      const name80 = "a".repeat(80);
      const name81 = "a".repeat(81);

      expect(contractRequestSchema.safeParse({ ...validPayload, name: name80 }).success).toBe(true);
      expect(contractRequestSchema.safeParse({ ...validPayload, name: name81 }).success).toBe(false);
    });
  });

  describe("Email field", () => {
    it("should reject invalid email format", () => {
      const invalidEmails = ["notanemail", "user@", "@domain.com", "user@domain", ""];
      for (const email of invalidEmails) {
        const res = contractRequestSchema.safeParse({ ...validPayload, email });
        expect(res.success).toBe(false);
      }
    });

    it("should reject email longer than 254 characters", () => {
      const longEmail = "a".repeat(245) + "@example.com"; // > 254
      const res = contractRequestSchema.safeParse({ ...validPayload, email: longEmail });
      expect(res.success).toBe(false);
    });
  });

  describe("Service selection", () => {
    it("should accept valid service IDs: quick-scan, detailed-review, lawyer-guided", () => {
      expect(contractRequestSchema.safeParse({ ...validPayload, service: "quick-scan" }).success).toBe(true);
      expect(contractRequestSchema.safeParse({ ...validPayload, service: "detailed-review" }).success).toBe(true);
      expect(contractRequestSchema.safeParse({ ...validPayload, service: "lawyer-guided" }).success).toBe(true);
    });

    it("should reject undefined or arbitrary service IDs", () => {
      const res = contractRequestSchema.safeParse({ ...validPayload, service: "premium-enterprise" });
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.errors[0]?.message).toContain("geçerli bir hizmet paketi");
      }
    });
  });

  describe("Description field boundaries", () => {
    it("should reject description under 20 characters after trim", () => {
      const res = contractRequestSchema.safeParse({
        ...validPayload,
        description: "   Kısa metin.   "
      });
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.errors[0]?.message).toContain("en az 20 karakter");
      }
    });

    it("should accept description of exactly 20 characters", () => {
      const desc20 = "12345678901234567890";
      const res = contractRequestSchema.safeParse({ ...validPayload, description: desc20 });
      expect(res.success).toBe(true);
    });

    it("should accept description up to 1000 characters and reject 1001", () => {
      const desc1000 = "x".repeat(1000);
      const desc1001 = "x".repeat(1001);

      expect(contractRequestSchema.safeParse({ ...validPayload, description: desc1000 }).success).toBe(true);
      expect(contractRequestSchema.safeParse({ ...validPayload, description: desc1001 }).success).toBe(false);
    });
  });
});
