export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  priceNote: string;
  idealFor: string;
  features: string[];
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "quick-scan",
    name: "Hızlı Tarama",
    tagline: "Standart sözleşmeler için temel risk ve kritik madde analizi",
    badge: "En Çok Tercih Edilen",
    priceNote: "Hızlı ön tarama",
    idealFor: "Freelance hizmet sözleşmeleri, NDA ve standart gizlilik anlaşmaları",
    features: [
      "Kritik cezai şart ve fesih maddeleri tespiti",
      "Ödeme ve teslim koşulları netlik kontrolü",
      "Temel risk düzeyi puanlaması (Düşük/Orta/Yüksek)",
      "24 saat içinde ön tarama özeti"
    ]
  },
  {
    id: "detailed-review",
    name: "Detaylı İnceleme",
    tagline: "Kapsamlı ticari işbirlikleri ve uzun dönemli sözleşmeler için derin analiz",
    badge: "KOBİ'ler İçin",
    priceNote: "Kapsamlı ön inceleme",
    idealFor: "Yazılım lisans sözleşmeleri, hizmet alım anlaşmaları ve ortaklık protokolleri",
    features: [
      "Hızlı Tarama kapsamındaki tüm kontroller",
      "Fikri mülkiyet ve gizlilik hakları analizi",
      "Tazminat ve sorumluluk sınırlaması kontrolleri",
      "Revizyon ve müzakere için taslak madde önerileri"
    ]
  },
  {
    id: "lawyer-guided",
    name: "Avukat Yönlendirmeli",
    tagline: "Yüksek riskli durumlar için uzman hukukçu değerlendirme köprüsü",
    badge: "Özel İhtiyaçlar",
    priceNote: "Uzman eşleştirme",
    idealFor: "Yüksek hacimli sözleşmeler, hissedarlık veya uluslararası sözleşmeler",
    features: [
      "Detaylı İnceleme raporunun hazırlanması",
      "Sözleşme konusuna göre ilgili bağımsız hukuk uzmanı eşleştirmesi",
      "Görüşme öncesi soru ve risk listesi hazırlığı",
      "Hukuki danışmanlık öncesi zaman ve maliyet optimizasyonu"
    ]
  }
];

export const VALID_SERVICE_IDS = SERVICE_PACKAGES.map((pkg) => pkg.id) as [
  string,
  ...string[]
];
