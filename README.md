# ContractCheck

> Küçük işletmeler (KOBİ) ve serbest çalışanlar (freelancer) için ticari sözleşme taslaklarını risk açısından ön taramaya yönelik kurgusal hizmet platformu.

ContractCheck, karmaşık hukuki jargonu ve sözleşme maddelerindeki dengesizlikleri (ağır cezai şartlar, tek taraflı fesih hakkı, belirsiz sorumluluk ve fikri mülkiyet devirleri vb.) avukat masasına oturmadan önce haritalandırmayı hedefler. Gerçek bir AI motoru veya dosya yükleme içermez; doğrudan bir landing page ve kalıcı Supabase PostgreSQL veritabanı kaydı oluşturan talep formu sunar.

---

## 1. Mimari Kararlar ve Teknik Yığın

- **Next.js 15 (App Router)** & **React 19**: Modern SSR/CSR hibrit mimarisi, yüksek performans ve optimize edilmiş asset yönetimi.
- **TypeScript**: Tam tip güvenliği ve derleme zamanı hata denetimi.
- **Tailwind CSS**: Mobil öncelikli (mobile-first), 360px genişlikten itibaren taşmasız, duyarlı ve erişilebilir arayüz tasarımı.
- **Zod (Tek Şema / Single Source of Truth)**: Hem istemci (`client-side`) form etkileşiminde hem de API (`server-side`) rotasında harfi harfine aynı şema (`src/lib/validations.ts`) kullanılarak çift katmanlı doğrulama sağlanır. İstemciye asla güvenilmez.
- **Supabase (PostgreSQL)**: Kalıcı ve güvenli veri depolama. Satır Düzeyinde Güvenlik (RLS) politikaları ve parametreli sorgularla çalışır.
- **Vitest**: Zod doğrulama şeması sınır değer testleri ve API route entegrasyon testleri için hızlı test çalıştırma ortamı.
- **Güvenlik Başlıkları & Rate Limit**: `next.config.js` üzerinde yapılandırılmış CSP, X-Frame-Options, X-Content-Type-Options; API route üzerinde IP bazlı hız sınırlaması (dakikada maks 5 istek), body boyut kontrolü ve gizli honeypot bot engeli.

---

## 2. Kurulum ve Yerel Çalıştırma

### Gereksinimler
- Node.js (v18.18+ veya v20+)
- npm veya yarn

### Adım Adım Kurulum

1. **Depoyu klonlayın veya dizine gidin:**
   ```bash
   cd ContractCheck
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Ortam değişkenlerini hazırlayın:**
   `.env.example` dosyasını referans alarak `.env.local` oluşturun:
   ```bash
   cp .env.example .env.local
   ```
   İçeriğini projenize ait Supabase anahtarlarıyla güncelleyin:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```
   Tarayıcınızda `http://localhost:3000` adresini açın.

5. **Üretim (Production) derlemesi ve çalıştırma:**
   ```bash
   npm run build
   npm run start
   ```

---

## 3. Veritabanı Kurulumu ve Migration

Projenin Supabase üzerinde ihtiyaç duyduğu SQL şeması `supabase/schema.sql` dosyasında yer almaktadır:

```sql
CREATE TABLE IF NOT EXISTS public.contract_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL,
  service VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.contract_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon insert" ON public.contract_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow anon select" ON public.contract_requests
  FOR SELECT TO anon, authenticated USING (true);
```

### Kayıtların Doğrulanması (Güvenli Konsol Komutu)
Sistemde verileri genel internete açan herhangi bir güvensiz public admin endpoint **bulunmamaktadır**. Veritabanına yazılan kayıtları doğrudan terminalden incelemek için:

```bash
npm run db:list
```

Bu script Supabase üzerinden son kayıtları tarih, referans ID ve içerikleriyle terminale yazdırır.

---

## 4. Testlerin Çalıştırılması

Projede Vitest ile hazırlanmış kapsamlı bir test paketi mevcuttur:
- **Zod Şema Testleri**: Ad Soyad sınırları (2-80 karakter, trim), e-posta formatı ve max 254 kuralı, geçerli paketler, açıklama sınırları (20-1000 karakter, trim).
- **API Rota Testleri**: 201 Başarı, 400 Doğrulama hatası ve alan bazlı hata mesajları, 400 Bot honeypot tespiti (DB'ye yazılmama), 429 Hız sınırı (Rate limit) ve 500 DB çökmesi durumunda ASLA başarı dönmeme güvencesi.

```bash
# Tüm testleri çalıştırmak için:
npm test

# TypeScript tip kontrolü için:
npm run typecheck

# Lint kontrolü için:
npm run lint
```

---

## 5. Canlı Dağıtım (Vercel)

- Canlı URL: `[VERCEL DEPLOY SONRASI EKLENECEK / CANLI YAYIN]`
- Son Teslim Commit Kimliği: `416adfa05b23fc1bdd8619ab7ecad5adb9930701`

---

## 6. Güvenlik ve Gizlilik Notları

1. **SQL Injection Koruması**: Supabase istemcisi tamamen parametreli sorgularla (`parameterized queries`) çalışır. Kod tabanında hiçbir dinamik SQL string birleştirmesi yer almaz.
2. **Kişisel Veri Koruması**: Landing page üzerinde kullanıcılara yalnızca test amaçlı kurgusal veri girmeleri yönünde açık uyarılar (`role="note"`) bulunur. Loglama süreçlerinde e-posta ve açıklama metinleri gereksiz yere konsola sızdırılmaz.
3. **Honeypot Koruması**: Ekran okuyuculardan (`aria-hidden="true"`) ve klavye sekme sırasından (`tabIndex={-1}`) gizlenmiş gizli bir alan mevcuttur. Botların doldurması durumunda talep reddedilir ve veritabanı meşgul edilmez.
4. **Hata İzolasyonu**: DB veya sunucu hatalarında istemciye stack trace veya hassas DB hatası döndürülmez; yalnızca genel ve kullanıcı dostu bir hata mesajı iletilir.
5. **Güvenlik Başlıkları (Security Headers)**: `next.config.js` ile CSP, X-Frame-Options (Clickjacking koruması), X-Content-Type-Options ve Referrer-Policy uygulanmıştır.

---

## 7. Bilinen Eksikler ve Sınırlar

- **Kurgusal Kapsam**: Bu çalışma gereksinimler doğrultusunda hazırlanmış bir ön tarama demonstrasyonudur. Gerçek bir dosya okuma (PDF/DOCX) veya yapay zeka analiz motoru bilinçli olarak eklenmemiştir.
- **In-Memory Rate Limiting**: IP bazlı hız sınırlayıcı tek instance için hafızada (`in-memory`) tutulmaktadır. Çoklu sunuculu (multi-region serverless edge) ortamlarda Redis / Upstash gibi merkezi bir rate limiter entegrasyonu ilerleyen aşamada yapılabilir.
- **E-posta Bildirimi**: Kullanıcıya e-posta onay kodu veya bildirim gönderimi kapsam dışı bırakılmıştır.
