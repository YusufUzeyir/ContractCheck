import { NextRequest, NextResponse } from "next/server";
import { contractRequestSchema } from "@/lib/validations";
import { getSupabaseClient } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";

// Maximum body size limit (e.g. 32KB is plenty for JSON form)
const MAX_BODY_BYTES = 32 * 1024;

export async function POST(request: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) || "127.0.0.1";

    const rateLimit = checkRateLimit(clientIp, 5, 60 * 1000); // 5 requests per minute
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Çok fazla istek gönderildi. Lütfen bir süre sonra tekrar deneyiniz.",
          code: "RATE_LIMITED",
          resetInSec: rateLimit.resetInSec
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetInSec.toString(),
            "X-RateLimit-Remaining": "0"
          }
        }
      );
    }

    // 2. Body size check via Content-Length if present
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: "İstek boyutu çok büyük.",
          code: "PAYLOAD_TOO_LARGE"
        },
        { status: 413 }
      );
    }

    // Read and parse JSON
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Geçersiz istek gövdesi. JSON formatı bekleniyor.",
          code: "INVALID_JSON"
        },
        { status: 400 }
      );
    }

    // 3. Honeypot Check (Bot detection)
    // If bot filled out companyWebsite, reject silently without DB insert or with 400
    if (body && typeof body === "object" && "companyWebsite" in body) {
      const hp = (body as Record<string, unknown>).companyWebsite;
      if (typeof hp === "string" && hp.trim().length > 0) {
        // Honeypot triggered
        return NextResponse.json(
          {
            success: false,
            error: "Şüpheli bot etkinliği tespit edildi.",
            code: "BOT_DETECTED"
          },
          { status: 400 }
        );
      }
    }

    // 4. Server-side validation with identical Zod schema
    const validationResult = contractRequestSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        const field = err.path[0]?.toString() || "form";
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          error: "Doğrulama hatası. Lütfen formu kontrol ediniz.",
          code: "VALIDATION_ERROR",
          fieldErrors
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // 5. Database insertion (Supabase parameterized client insert)
    const supabase = getSupabaseClient();
    const { data: insertedData, error: dbError } = await supabase
      .from("contract_requests")
      .insert({
        name: validData.name,
        email: validData.email,
        service: validData.service,
        description: validData.description
      })
      .select("id, created_at")
      .single();

    if (dbError || !insertedData) {
      // Log server-side without leaking sensitive details to the client
      console.error("[ContractCheck API Error] Supabase Insert Failed:", {
        code: dbError?.code,
        message: dbError?.message,
        details: dbError?.details
      });

      return NextResponse.json(
        {
          success: false,
          error: "Sunucu hatası: Talep kaydedilemedi. Lütfen daha sonra tekrar deneyiniz.",
          code: "DATABASE_ERROR"
        },
        { status: 500 }
      );
    }

    // 6. Success response ONLY AFTER DB commit
    return NextResponse.json(
      {
        success: true,
        id: insertedData.id,
        shortId: (insertedData.id as string).split("-")[0]?.toUpperCase() || "REQ",
        createdAt: insertedData.created_at,
        message: "Ön tarama talebiniz başarıyla kaydedildi."
      },
      {
        status: 201,
        headers: {
          "X-RateLimit-Remaining": rateLimit.remaining.toString()
        }
      }
    );
  } catch (error: unknown) {
    // Catch-all server error handler
    console.error("[ContractCheck API Error] Unhandled Exception:", error instanceof Error ? error.message : error);

    return NextResponse.json(
      {
        success: false,
        error: "Beklenmeyen bir sunucu hatası oluştu.",
        code: "INTERNAL_ERROR"
      },
      { status: 500 }
    );
  }
}
