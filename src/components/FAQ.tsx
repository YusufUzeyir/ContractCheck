export function FAQ() {
  const faqs = [
    {
      q: "ContractCheck hukuki danışmanlık hizmeti midir?",
      a: "Hayır. ContractCheck kesinlikle bir avukatlık bürosu veya hukuki danışmanlık hizmeti değildir. Amacımız, sözleşme taslaklarındaki orantısız veya riskli maddeleri tespit ederek ön tarama ve risk haritası çıkarmaktır. Herhangi bir dava vekilligi, resmi hukuki mütalaa veya kanuni temsil hizmeti verilmez."
    },
    {
      q: "Bu web sitesindeki talep formuna gerçek sözleşme metni yazmalı mıyım?",
      a: "Hayır. Bu web sitesi Enteksis teknik aday değerlendirme çalışması için hazırlanmış kurgusal bir demonstrasyondur. Lütfen gerçek ticari sözleşme metinleri, gizlilik içeren belgeler veya hassas kişisel veriler girmeyiniz. Yalnızca test amaçlı temsili veriler kullanınız."
    },
    {
      q: "Hangi sözleşme türleri ön tarama kapsamına girer?",
      a: "Kurgusal modelimizde; serbest çalışan hizmet sözleşmeleri, yazılım lisans ve geliştirme anlaşmaları, gizlilik anlaşmaları (NDA), ajans sözleşmeleri ve bağımsız yüklenici anlaşmaları ön tarama için hedeflenmiştir."
    },
    {
      q: "Verilerim nasıl saklanıyor?",
      a: "Talep formunda gönderilen test kayıtları, PostgreSQL tabanlı Supabase veritabanında güvenli, şifrelenmiş bağlantı ve satır düzeyinde güvenlik (RLS) kuralları altında saklanmaktadır. Veriler üçüncü taraflarla paylaşılmaz ve genel erişime açık bir listeleme bulunmaz."
    },
    {
      q: "Ön tarama raporu sonrasında avukata danışmam gerekir mi?",
      a: "Evet. Özellikle 'Yüksek Risk' kategorisinde tespit edilen cezai şart, fikri mülkiyet devri veya sorumluluk sınırlamaları içeren maddeler için her zaman yetkili bir avukata danışarak nihai sözleşmeyi imzalamanız tavsiye edilir."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-600">
            Merak Edilenler
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Hizmetin kapsamı, sınırları ve kurgusal değerlendirme sürecine dair açıklamalar.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-slate-200 bg-slate-50/50"
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                {faq.q}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
