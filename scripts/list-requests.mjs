import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://svymmtbwlipgtqxanepc.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2eW1tdGJ3bGlwZ3RxeGFuZXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNTk1OTUsImV4cCI6MjEwNjkzNTU5NX0.7bbPthJdIoDt4Lj4Tw91Ft-QMr4Uyd-mBCqrvg1X1jQ";

const client = createClient(supabaseUrl, supabaseAnonKey);

async function listRequests() {
  console.log("ContractCheck - Supabase Kayıtları Listeleniyor...\n");
  const { data, error } = await client
    .from("contract_requests")
    .select("id, name, email, service, description, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Hata:", error.message);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log("Henüz kayıt bulunmamaktadır.");
    return;
  }

  console.log(`Toplam ${data.length} kayıt bulundu:\n`);
  data.forEach((row, index) => {
    console.log(`[#${index + 1}] ID: ${row.id}`);
    console.log(`    Tarih: ${row.created_at}`);
    console.log(`    Ad Soyad: ${row.name}`);
    console.log(`    E-posta: ${row.email}`);
    console.log(`    Paket: ${row.service}`);
    console.log(`    Açıklama: ${row.description}`);
    console.log("-".repeat(60));
  });
}

listRequests();
