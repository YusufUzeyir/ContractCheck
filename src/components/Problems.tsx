import { AlertTriangle, Clock, DollarSign, Scale } from "lucide-react";

export function Problems() {
  const problems = [
    {
      icon: DollarSign,
      title: "Yüksek Danışmanlık Maliyeti Bariyeri",
      desc: "Her küçük taslak veya 2 sayfalık NDA için tam teşekküllü hukuk bürosu bütçesi ayırmak serbest çalışanlar ve yeni kurulan işletmeler için sürdürülebilir olmuyor."
    },
    {
      icon: Clock,
      title: "Hızlı İmza Baskısı ve Zaman Darlığı",
      desc: "Müşteri veya iş ortağı işe başlamak için acele ettirdiğinde, onlarca sayfalık sözleşme metinleri yüzeysel okunup aceleyle imzalanabiliyor."
    },
    {
      icon: AlertTriangle,
      title: "Karmaşık Hukuki Dil ve Gizli Tuzaklar",
      desc: "Tek taraflı fesih hakkı, sınırsız tazminat sorumlulukları ve teslim sonrası belirsiz revizyon talepleri gibi riskli maddeler ustaca gizlenebiliyor."
    },
    {
      icon: Scale,
      title: "Müzakere Masasında Güç Dengesi Eksikliği",
      desc: "Hangi maddelerin standart, hangi maddelerin ise aşırı orantısız olduğunu bilememek, karşı tarafla müzakere ederken çekingen kalmaya neden oluyor."
    }
  ];

  return (
    <section id="problems" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Sözleşme masasında en çok yaşanan problemler
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Freelancer&apos;lar ve KOBİ&apos;ler ticari ilişkilerinde çoğu zaman sözleşmelerin risklerini ancak bir ihtilaf çıktığında fark eder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-7 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
