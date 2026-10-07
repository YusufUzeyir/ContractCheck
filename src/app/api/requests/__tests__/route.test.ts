import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../route";
import * as supabaseLib from "@/lib/supabase";
import * as rateLimitLib from "@/lib/rate-limit";

describe("POST /api/requests Route Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    rateLimitLib.resetRateLimitForTesting();
  });

  const validBody = {
    name: "Barış Can",
    email: "baris@example.com",
    service: "quick-scan",
    description: "Sözleşmemdeki cezai şartların ve fikri mülkiyet maddelerinin incelenmesini istiyorum."
  };

  it("should successfully save request to DB and return 201 with id", async () => {
    const mockInsert = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: { id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", created_at: "2026-10-07T10:00:00Z" },
          error: null
        })
      })
    });

    vi.spyOn(supabaseLib, "getSupabaseClient").mockReturnValue({
      from: vi.fn().mockReturnValue({
        insert: mockInsert
      })
    } as any);

    const req = new NextRequest("http://localhost:3000/api/requests", {
      method: "POST",
      body: JSON.stringify(validBody),
      headers: { "Content-Type": "application/json" }
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.id).toBe("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
    expect(data.shortId).toBe("A1B2C3D4");
    expect(mockInsert).toHaveBeenCalledWith({
      name: "Barış Can",
      email: "baris@example.com",
      service: "quick-scan",
      description: validBody.description
    });
  });

  it("should return 400 when validation fails and NOT invoke DB insert", async () => {
    const mockInsert = vi.fn();
    vi.spyOn(supabaseLib, "getSupabaseClient").mockReturnValue({
      from: vi.fn().mockReturnValue({ insert: mockInsert })
    } as any);

    const req = new NextRequest("http://localhost:3000/api/requests", {
      method: "POST",
      body: JSON.stringify({
        name: "A", // too short
        email: "not-an-email",
        service: "invalid-package",
        description: "short" // < 20 chars
      }),
      headers: { "Content-Type": "application/json" }
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.code).toBe("VALIDATION_ERROR");
    expect(data.fieldErrors).toBeDefined();
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("should silently reject or return 400 when honeypot field is filled by bot, without DB insert", async () => {
    const mockInsert = vi.fn();
    vi.spyOn(supabaseLib, "getSupabaseClient").mockReturnValue({
      from: vi.fn().mockReturnValue({ insert: mockInsert })
    } as any);

    const req = new NextRequest("http://localhost:3000/api/requests", {
      method: "POST",
      body: JSON.stringify({
        ...validBody,
        companyWebsite: "https://spam-bot.xyz"
      }),
      headers: { "Content-Type": "application/json" }
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.code).toBe("BOT_DETECTED");
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("should return 429 when rate limit is exceeded (5 requests per min)", async () => {
    const mockInsert = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: { id: "mock-id-123", created_at: "2026-10-07T10:00:00Z" },
          error: null
        })
      })
    });

    vi.spyOn(supabaseLib, "getSupabaseClient").mockReturnValue({
      from: vi.fn().mockReturnValue({ insert: mockInsert })
    } as any);

    // Send 5 valid requests
    for (let i = 0; i < 5; i++) {
      const req = new NextRequest("http://localhost:3000/api/requests", {
        method: "POST",
        body: JSON.stringify(validBody),
        headers: { "Content-Type": "application/json", "x-forwarded-for": "192.168.1.100" }
      });
      const res = await POST(req);
      expect(res.status).toBe(201);
    }

    // 6th request from same IP should get 429
    const req6 = new NextRequest("http://localhost:3000/api/requests", {
      method: "POST",
      body: JSON.stringify(validBody),
      headers: { "Content-Type": "application/json", "x-forwarded-for": "192.168.1.100" }
    });
    const res6 = await POST(req6);
    const data6 = await res6.json();

    expect(res6.status).toBe(429);
    expect(data6.code).toBe("RATE_LIMITED");
  });

  it("CRITICAL RULE: should return 500 when DB insert fails and NEVER return success or reference ID", async () => {
    // Simulate Supabase failure / DB offline
    vi.spyOn(supabaseLib, "getSupabaseClient").mockReturnValue({
      from: vi.fn().mockReturnValue({
        insert: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { message: "Database connection failed", code: "PGRST500" }
            })
          })
        })
      })
    } as any);

    const req = new NextRequest("http://localhost:3000/api/requests", {
      method: "POST",
      body: JSON.stringify(validBody),
      headers: { "Content-Type": "application/json" }
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.code).toBe("DATABASE_ERROR");
    expect(data.id).toBeUndefined();
    expect(data.shortId).toBeUndefined();
  });
});
