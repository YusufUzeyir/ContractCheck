import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  try {
    // Rate limit check: 10 inquiries per minute per IP
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) || "127.0.0.1";

    const rateLimit = checkRateLimit(`query_${clientIp}`, 10, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Çok fazla sorgulama yapıldı. Lütfen biraz bekleyiniz.",
          code: "RATE_LIMITED"
        },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code")?.trim().toLowerCase();

    if (!code || code.length < 4 || code.length > 36) {
      return NextResponse.json(
        {
          success: false,
          error: "Lütfen en az 4 karakterden oluşan geçerli bir referans kodu giriniz.",
          code: "INVALID_CODE"
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();

    let matchedRow: {
      id: string;
      name: string;
      service: string;
      description: string;
      created_at: string;
    } | null = null;

    if (code.includes("-") && code.length === 36) {
      // Full UUID query
      const { data, error } = await supabase
        .from("contract_requests")
        .select("id, name, service, description, created_at")
        .eq("id", code)
        .maybeSingle();

      if (error) {
        console.error("[ContractCheck Query Error]:", error.message);
        return NextResponse.json(
          { success: false, error: "Veritabanı hatası oluştu.", code: "DATABASE_ERROR" },
          { status: 500 }
        );
      }
      matchedRow = data;
    } else {
      // Short ID prefix query
      const { data, error } = await supabase
        .from("contract_requests")
        .select("id, name, service, description, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[ContractCheck Query Error]:", error.message);
        return NextResponse.json(
          { success: false, error: "Veritabanı hatası oluştu.", code: "DATABASE_ERROR" },
          { status: 500 }
        );
      }

      if (data) {
        matchedRow = data.find((row) => row.id.toLowerCase().startsWith(code)) || null;
      }
    }

    if (!matchedRow) {
      return NextResponse.json(
        {
          success: false,
          error: "Belirtilen referans kodu ile eşleşen bir talep kaydı bulunamadı.",
          code: "NOT_FOUND"
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: matchedRow.id,
        shortId: matchedRow.id.split("-")[0]?.toUpperCase(),
        name: matchedRow.name,
        service: matchedRow.service,
        description: matchedRow.description,
        createdAt: matchedRow.created_at,
        status: "Ön Tarama Sırasında"
      }
    });
  } catch (error: unknown) {
    console.error("[ContractCheck Query Exception]:", error);
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
