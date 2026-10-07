import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

export function SampleReport() {
  const sampleItems = [
    {
      level: "YÜKSEK RİSK",
      levelColor: "bg-red-100 text-red-800 border-red-200",
      icon: AlertCircle,
      iconColor: "text-red-600",
      clause: "Madde 8.4: Cezai Şart ve Tek Taraflı Fesih Tazminatı",
      issue: "Müşteri sözleşmeyi herhangi bir gerekçe göstermeksizin derhal feshedebilirken, hizmet sağlayıcı fesih durumunda son 6 aylık fatura bedelinin 3 katını cezai şart olarak ödemeyi kabul eder.",
      recommendation: "Tek taraflı cezai şart silinmeli veya her iki taraf için eşit ihbar süresi ve gerçekleşmiş masrafların tazmini şartına bağlanmalıdır."
    },
    {
      level: "ORTA RİSK",
      levelColor: "bg-amber-100 text-amber-800 border-amber-200",
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      clause: "Madde 5.2: Fikri Mülkiyet ve Yan Haklar",
      issue: "Sözleşme kapsamında üretilen tüm kod ve tasarımların haricinde, yüklenicinin daha önce geliştirdiği genel araç ve kütüphanelerin mülkiyeti de müşteriye devredilmektedir.",
      recommendation: "'Arka plan fikri mülkiyeti' (Background IP) ayrımı yapılmalı; genel kod blokları ve hazır kütüphaneler için yalnızca kullanım lisansı verilmelidir."
    },
    {
      level: "DÜŞÜK RİSK",
      levelColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Info,
      iconColor: "text-blue-600",
      clause: "Madde 11.1: Tebligat ve İletişim Kanalları",
      issue: "Tüm bildirimlerin yalnızca noter veya iadeli taahhütlü mektupla yapılması zorunlu kılınmış, kayıtlı e-posta (KEP) veya teyitli e-posta geçerli sayılmamıştır.",
      recommendation: "Operasyonel kolaylık ve hız için e-posta ile bildirim imkanı eklenmesi önerilir."
    }
  ];

  return (
    <section id="sample-report" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-600">
            Örnek Ön Tarama Çıktısı
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Elinize geçecek risk özeti nasıl görünür?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Karmaşık hukuk jargonu yerine her bir risk maddesinin somut analizi ve önerilen revizyonu sunulur.
          </p>
        </div>

        {/* Prominent Kurgusal Banner */}
        <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm">
            <span className="font-bold">ÖNEMLİ BİLGİLENDİRME (KURGUSAL ÇIKTI):</span> Aşağıdaki rapor, ContractCheck ön tarama çıktısının yapısını göstermek amacıyla hazırlanmış <span className="underline font-semibold">tamamen kurgusal bir örnektir</span>. Gerçek bir sözleşmeye veya taraflara ait değildir.
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Doküman Türü</span>
              <span className="text-sm font-bold text-slate-800">Örnek Yazılım Geliştirme ve Hizmet Sözleşmesi (Kurgusal)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                1 Yüksek Risk
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                1 Orta Risk
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                1 Düşük Risk
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 p-6 space-y-6">
            {sampleItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="pt-6 first:pt-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold border ${item.levelColor}`}>
                      {item.level}
                    </span>
                    <h3 className="text-base font-semibold text-slate-900">
                      {item.clause}
                    </h3>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                    <div>
                      <span className="font-semibold text-slate-700 block mb-1">Tespit Edilen Dengesizlik:</span>
                      <p className="text-slate-600 leading-relaxed">{item.issue}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-emerald-800 block mb-1">Müzakere / Revizyon Önerisi:</span>
                      <p className="text-slate-700 leading-relaxed">{item.recommendation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
            ContractCheck Ön Tarama Raporu Taslağı — Nihai kararlar öncesi avukat görüşü tavsiye edilir.
          </div>
        </div>
      </div>
    </section>
  );
}
