# Yapay Zeka Destekli Geliştirme Günlüğü (AI_LOG.md)

Bu belge, ContractCheck projesinin geliştirme sürecinde kullanılan yapay zeka araçları, iş akışı, yönlendirmeler, kararlar ve doğrulama süreçlerini belgelemek amacıyla oluşturulmuştur.

---

## 1. Kullanılan Araçlar
- Antigravity IDE, Gemini 3.8 Flash, Supabase MCP, Vercel MCP, Claude Chat

---

## 2. Görev Dağılımı
- **Yapay Zeka Rolü:** Next.js (App Router) + TypeScript + Tailwind mimarisinin oluşturulması; Zod doğrulama şemalarının istemci ve sunucuda ortaklaştırılması; Supabase PostgreSQL RLS politikaları ve migration şemasının yazılması; Vitest birim ve API entegrasyon testlerinin kurgulanması; Vercel CLI ve MCP üzerinden üretim ortamına dağıtılması.
- **Geliştirici Rolü:** Ürün kapsamının ve sınırlarının belirlenmesi; tasarım ve metin yönlendirmeleri; adaylık/iç referanslarının temizlenerek kurumsal işletme görünümüne dönüştürülmesi; referans takip kodu sorgulama özelliğinin talep edilmesi; iç veritabanı UUID'sinin gizlenmesine yönelik güvenlik/gizlilik müdahalesi; yapılan her adımın manuel ve otomatik olarak denetlenmesi.

---

## 3. Önemli Yönlendirmeler (Promptlar)
- **Başlangıç Yönlendirmesi:** Enteksis aday değerlendirme isterlerine uygun, Next.js + TypeScript + Tailwind CSS tabanlı, Supabase kalıcı veritabanı bağlantılı, Zod doğrulamalı ve testli minimal landing page ve form oluşturulması.
- **Kapsam Sınırlandırması:** Gerçek AI analizi, auth veya dosya yükleme yapılmaması; yalnızca ön tarama landing page'i ve kalıcı talep kaydı üzerine odaklanılması.
- **Tasarım ve Metin Düzeltmeleri:** Footer'dan adaylık/dahili ifadelerin kaldırılması; yerlerine kurgusal işletme bilgileri (çalışma saatleri, ofis adresi, iletişim, SSS bağlantıları) eklenmesi; talep formundaki veritabanı teknik ifadesinin sadeleştirilmesi.
- **Sorgulama Özelliği:** Kullanıcının form gönderimi sonrası aldığı referans kodu ile Supabase üzerindeki durumunu canlı sorgulayabileceği "Talep Sorgula" bölümünün eklenmesi.
- **Gizlilik Müdahalesi:** Sorgulama ekranında ve başarı kutusunda iç veritabanı teknik anahtarı olan UUID değerinin gizlenmesi, sadece müşteri takip kodunun gösterilmesi.
- **Vercel Dağıtımı:** Projenin Vercel production ortamına deploy edilmesi ve canlı bağlantının doğrulanması.

---

## 4. Kabul Edilen / Değiştirilen / Reddedilen Öneriler
- **Kabul Edilen Öneriler:**
  - Tek kaynaktan beslenen hizmet paketleri (`src/config/services.ts`) hem formda hem landing page kartlarında kullanıldı.
  - Zod şemasının hem istemcide hem sunucuda ortak kullanılması (`src/lib/validations.ts`).
  - Honeypot bot koruması ve IP bazlı rate limit entegrasyonu.
  - Vercel dağıtımı için güncel Next.js sürümüne geçiş.
- **Değiştirilen / Müdahale Edilen Öneriler:**
  - Footer bileşenindeki adaylık ve geliştirici notları kaldırılarak gerçek bir kurumsal işletme görünümü (iletişim, mesai, adres) kazandırıldı.
  - Form başlığındaki "veritabanına kaydedilir" teknik ifadesi daha doğal bir kullanıcı metniyle değiştirildi.
  - Geliştirici müdahalesiyle "Referans Takip Kodu ile Talep Sorgulama" arayüzü ve API rotası sisteme dahil edildi.
  - Geliştirici uyarısıyla sorgulama ekranındaki teknik `UUID` (Veritabanı Kimliği) gizlendi, yalnızca genel referans numarası bırakıldı.
- **Reddedilen Öneriler:**
  - Kapsamı gereksiz yere büyütecek olan karmaşık kimlik doğrulama (auth), harici dosya yükleme (PDF/DOCX ayrıştırma) ve admin paneli arayüzü gibi unsurlar isterler gereği reddedildi; kayıt denetimi yalnızca konsol komutu (`npm run db:list`) ve Supabase paneli ile sınırlandırıldı.

---

## 5. Doğrulama Adımları
- **Birim ve Entegrasyon Testleri:** `vitest` ile 16 adet test çalıştırıldı (şema sınır değerleri, trim kuralları, 201 kayıt, 400 doğrulama ve honeypot, 429 rate limit, 500 DB çökme senaryosu).
- **Kalıcı Veri Yazımı Doğrulaması:** Supabase PostgreSQL üzerinde canlı kayıt oluşturuldu ve `npm run db:list` komutuyla kayıtlar konsoldan doğrulandı.
- **Canlı Vercel Doğrulaması:** Canlı URL (`https://contractcheck-chi.vercel.app`) üzerinden hem form kaydı hem de referans sorgulama fonksiyonu test edildi ve veritabanı ile senkron çalıştığı teyit edildi.
- **Erişilebilirlik ve Mobil Duyarlılık Kontrolü:** Ekran okuyucu uyumluluğu (`aria-describedby`, `aria-invalid`, `aria-live`), klavye sekme (focus) akışı, 360px mobil yatay taşma denetimi yapıldı.
- **Üretim Derlemesi:** `npm run build` ve `npm run typecheck` sıfır hatayla doğrulandı.

---

## 6. Bulunan Hatalar ve Düzeltmeler
- **Hata 1:** İlk Vitest çalıştırmasında `@/*` path alias tanımının vitest tarafından çözümlenememesi ve testlerin dosya yükleme hatası vermesi.
- **Düzeltme 1:** `vitest.config.ts` dosyası oluşturularak `resolve.alias` yapılandırması Next.js `tsconfig.json` ile eşitlendi ve tüm testler başarıyla çalıştırıldı.
- **Hata 2:** İlk Vercel deployment denemesinde eski Next.js 15.1.7 sürümünün güvenlik açığı (CVE-2025-66478) sebebiyle Vercel derleyicisi tarafından engellenmesi.
- **Düzeltme 2:** `next` ve `eslint-config-next` paketleri en güncel stabil sürüme (16.4.0) yükseltilerek derleme hatasız biçimde tamamlandı.
- **Hata 3:** Referans sorgulama özelliği ilk yazıldığında Postgres UUID tipi üzerinde doğrudan `ilike` operatörünün çalışmaması (`operator does not exist: uuid ~~* unknown`).
- **Düzeltme 3:** Sorgulama rotasında tam UUID için doğrudan `.eq()` eşleşmesi, kısa referans kodu araması için ise veritabanından güvenli prefix filtresi uygulanarak hata giderildi.

---

## 7. Harcanan Süre
- 3 saat
