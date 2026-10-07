# Yapay Zeka Destekli Geliştirme Günlüğü (AI_LOG.md)

Bu belge, ContractCheck projesinin geliştirme sürecinde kullanılan yapay zeka araçları, iş akışı, yönlendirmeler, kararlar ve doğrulama süreçlerini belgelemek amacıyla oluşturulmuştur.

---

## 1. Kullanılan Araçlar
- [ADAY DOLDURACAK - Örn: Antigravity AI, Gemini, Claude, Cursor, v.b.]

---

## 2. Görev Dağılımı
- **Yapay Zeka Rolü:** [ADAY DOLDURACAK - Örn: Proje iskeletinin kurulması, Tailwind bileşenlerinin kodlanması, Zod şemalarının ve Vitest testlerinin hazırlanması, Supabase RLS şemasının oluşturulması, Vercel dağıtımının yönetilmesi]
- **Geliştirici Rolü:** [ADAY DOLDURACAK - Örn: Tasarım ve metin yönlendirmeleri, iş kurallarının denetimi, footer ve form düzeltmelerinin talimatlandırılması, takip sorgulama özelliğinin talep edilmesi, güvenlik kontrollerinin onaylanması]

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
  - Kullanıcı müdahalesiyle "Referans Takip Kodu ile Talep Sorgulama" arayüzü ve API rotası sisteme dahil edildi.
  - Kullanıcı uyarısıyla sorgulama ekranındaki teknik `UUID` (Veritabanı Kimliği) gizlendi, yalnızca genel referans numarası bırakıldı.
- **Reddedilen Öneriler:**
  - [ADAY DOLDURACAK]

---

## 5. Doğrulama Adımları
- **Birim ve Entegrasyon Testleri:** `vitest` ile 16 adet test çalıştırıldı (şema sınır değerleri, trim kuralları, 201 kayıt, 400 doğrulama ve honeypot, 429 rate limit, 500 DB çökme senaryosu).
- **Kalıcı Veri Yazımı Doğrulaması:** Supabase PostgreSQL üzerinde canlı kayıt oluşturuldu ve `npm run db:list` komutuyla kayıtlar konsoldan doğrulandı.
- **Canlı Vercel Doğrulaması:** Canlı URL (`https://contractcheck-chi.vercel.app`) üzerinden hem form kaydı hem de referans sorgulama fonksiyonu test edildi ve veritabanı ile senkron çalıştığı teyit edildi.
- **Erişilebilirlik ve Mobil Duyarlılık Kontrolü:** Ekran okuyucu uyumluluğu (`aria-describedby`, `aria-invalid`, `aria-live`), klavye sekme (focus) akışı, 360px mobil yatay taşma denetimi yapıldı.
- **Üretim Derlemesi:** `npm run build` ve `npm run typecheck` sıfır hatayla doğrulandı.

---

## 6. Bulunan Hatalar ve Düzeltmeler
- **Hata 1:** [ADAY DOLDURACAK - Örn: İlk test kurulumunda modül alias çözümleme hatası]
- **Düzeltme 1:** [ADAY DOLDURACAK - Örn: `vitest.config.ts` alias yapılandırması ile çözüldü]
- **Hata 2:** [ADAY DOLDURACAK - Örn: Vercel dağıtımında eski Next.js sürümü güvenlik uyarısı]
- **Düzeltme 2:** [ADAY DOLDURACAK - Örn: Next.js en güncel stabil sürüme güncellendi]

---

## 7. Harcanan Süre
- [ADAY DOLDURACAK]
