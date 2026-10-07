import { ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" aria-hidden="true"></span>
            Kurgusal Hizmet & Ön Tarama Girişimi
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight md:leading-[1.15]">
            Sözleşme taslaklarındaki gizli riskleri imzalamadan önce görün
          </h1>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
            Küçük işletmeler ve freelancer&apos;lar için tasarlanmış bağımsız ön tarama hizmeti.
            Ağır cezai şartları, belirsiz fesih hükümlerini ve dengesiz sorumluluk maddelerini
            hukukçu masasına gitmeden önce somutlaştırın.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#request-form"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-6 py-3 text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-lg shadow-md hover:shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <span>Talep Oluştur</span>
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </a>

            <a
              href="#sample-report"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-6 py-3 text-base font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Örnek Çıktıyı İncele
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Avukat öncesi net risk haritası</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Kişisel verisiz test amaçlı süreç</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
              <span>Ön taramadır; avukatlık danışmanlığı değildir</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
