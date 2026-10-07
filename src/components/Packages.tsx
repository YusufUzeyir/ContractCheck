import { SERVICE_PACKAGES } from "@/config/services";
import { Check, ArrowRight } from "lucide-react";

export function Packages() {
  return (
    <section id="packages" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-600">
            Hizmet Seçenekleri
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            İhtiyacınıza uygun ön tarama paketleri
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tek sayfadan yüzlerce maddelik ortaklık anlaşmalarına kadar farklı derinlikteki ihtiyaçlar için tanımlanmış paketler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SERVICE_PACKAGES.map((pkg) => {
            const isFeatured = pkg.id === "detailed-review";
            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl p-7 transition-all ${
                  isFeatured
                    ? "border-2 border-brand-600 bg-brand-50/20 shadow-md relative"
                    : "border border-slate-200 bg-white hover:border-slate-300 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {pkg.priceNote}
                    </span>
                    {pkg.badge && (
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          isFeatured
                            ? "bg-brand-600 text-white"
                            : "bg-slate-200 text-slate-800"
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-2">
                    {pkg.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {pkg.tagline}
                  </p>

                  <div className="my-6 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700 block mb-0.5">Uygun Kullanım:</span>
                    {pkg.idealFor}
                  </div>

                  <ul className="space-y-3 text-sm text-slate-700 mb-6">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={`#request-form`}
                    className={`w-full inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      isFeatured
                        ? "bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    <span>Bu Paketi Seç</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
