# Yapay Zeka Destekli Geliştirme Günlüğü (AI_LOG.md)

Bu belge, ContractCheck projesinin geliştirme sürecinde kullanılan yapay zeka araçları, iş akışı, yönlendirmeler, kararlar ve doğrulama süreçlerini belgelemek amacıyla oluşturulmuştur.

---

## 1. Kullanılan Araçlar
- [ADAY DOLDURACAK - Örn: Antigravity AI, Gemini, Claude, Cursor, v.b.]

---

## 2. Görev Dağılımı
- **Yapay Zeka Rolü:** [ADAY DOLDURACAK - Örn: Proje iskeletinin kurulması, Tailwind bileşenlerinin kodlanması, Zod şemalarının ve Vitest testlerinin hazırlanması, Supabase RLS şemasının oluşturulması]
- **Geliştirici Rolü:** [ADAY DOLDURACAK - Örn: Tasarım ve metin yönlendirmeleri, iş kurallarının denetimi, footer ve form düzeltmelerinin talimatlandırılması, güvenlik kontrollerinin onaylanması]

---

## 3. Önemli Yönlendirmeler (Promptlar)
- **Başlangıç Yönlendirmesi:** Enteksis aday değerlendirme isterlerine uygun, Next.js + TypeScript + Tailwind CSS tabanlı, Supabase kalıcı veritabanı bağlantılı, Zod doğrulamalı ve testli minimal landing page ve form oluşturulması.
- **Kapsam Sınırlandırması:** Gerçek AI analizi, auth veya dosya yükleme yapılmaması; yalnızca ön tarama landing page'i ve kalıcı talep kaydı üzerine odaklanılması.
- **Tasarım ve Metin Düzeltmeleri:** Footer'dan adaylık/dahili ifadelerin kaldırılması; yerlerine kurgusal işletme bilgileri (çalışma saatleri, ofis adresi, iletişim, SSS bağlantıları) eklenmesi; talep formundaki veritabanı teknik ifadesinin sadeleştirilmesi.

---

## 4. Kabul Edilen / Değiştirilen / Reddedilen Öneriler
- **Kabul Edilen Öneriler:**
  - Tek kaynaktan beslenen hizmet paketleri (`src/config/services.ts`) hem formda hem landing page kartlarında kullanıldı.
  - Zod şemasının hem istemcide hem sunucuda ortak kullanılması (`src/lib/validations.ts`).
  - Honeypot bot koruması ve IP bazlı rate limit entegrasyonu.
- **Değiştirilen Öneriler:**
  - Footer bileşenindeki geliştirici notları kaldırılarak gerçek bir kurumsal işletme görünümü kazandırıldı.
  - Form başlığındaki "veritabanına kaydedilir" ifadesi daha doğal bir kullanıcı metniyle değiştirildi.
- **Reddedilen Öneriler:**
  - [ADAY DOLDURACAK]

---

## 5. Doğrulama Adımları
- **Birim ve Entegrasyon Testleri:** `vitest` ile 16 adet test çalıştırıldı (şema sınır değerleri, trim kuralları, 201 kayıt, 400 doğrulama ve honeypot, 429 rate limit, 500 DB çökme senaryosu).
- **Kalıcı Veri Yazımı Doğrulaması:** Supabase PostgreSQL üzerinde canlı insert gerçekleştirildi ve `npm run db:list` komutuyla kayıtlar doğrulandı.
- **Erişilebilirlik ve Mobil Duyarlılık Kontrolü:** Ekran okuyucu uyumluluğu (`aria-describedby`, `aria-invalid`, `aria-live`), klavye sekme (focus) akışı, 360px mobil yatay taşma denetimi yapıldı.
- **Üretim Derlemesi:** `npm run build` ve `npm run typecheck` sıfır hatayla doğrulandı.

---

## 6. Bulunan Hatalar ve Düzeltmeler
- **Hata 1:** [ADAY DOLDURACAK / İsteğe bağlı - Örn: Zod şemasında import yolu referansı veya ilk test kurulumundaki modül çözümleme hatası]
- **Düzeltme 1:** [ADAY DOLDURACAK / Vitest config alias yapılandırması ile çözüldü]

---

## 7. Harcanan Süre
- [ADAY DOLDURACAK]
