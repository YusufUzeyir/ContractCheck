import { Send, Search, FileText, Compass } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Send,
      title: "Talep Gönder",
      desc: "İhtiyacınıza uygun ön tarama paketini seçin, odaklanmak istediğiniz konuları belirten kısa talep formunu iletin."
    },
    {
      number: "02",
      icon: Search,
      title: "Ön Tarama",
      desc: "Sözleşme taslağınız genel şablon kriterleri, yaygın risk maddeleri ve kritik dengesizlikler açısından incelenir."
    },
    {
      number: "03",
      icon: FileText,
      title: "Risk Özeti",
      desc: "Düşük, orta ve yüksek risk seviyeleriyle etiketlenmiş, anlaşılır ve eyleme geçirilebilir maddeler halinde özet rapor hazırlanır."
    },
    {
      number: "04",
      icon: Compass,
      title: "Sonraki Adım Önerisi",
      desc: "Müzakerelerde isteyebileceğiniz düzeltmeler ve gerektiğinde avukat danışmanlığına başvurulacak kritik noktalar listelenir."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-600">
            Adım Adım Süreç
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Nasıl çalışır?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Sözleşme sürecinizi karmaşıklaştırmadan 4 net adımda netlik kazanın.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      Adım {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
