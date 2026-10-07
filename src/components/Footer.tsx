import Link from "next/link";
import { FileCheck, ShieldAlert, Mail, MapPin, Clock, HelpCircle, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & About */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow-sm">
                <FileCheck className="w-4 h-4" aria-hidden="true" />
              </div>
              <span>Contract<span className="text-brand-400">Check</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              KOBİ&apos;ler ve serbest çalışanlar için ticari sözleşme taslaklarında risk ön tarama ve hazırlık platformu.
            </p>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} ContractCheck. Tüm hakları saklıdır.
            </div>
          </div>

          {/* Col 2: Hızlı Bağlantılar / SSS */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-400" aria-hidden="true" />
              Hızlı Bilgi & SSS
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Sıkça Sorulan Sorular
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Ön Tarama Süreci Nasıl İşler?
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Hizmet Paketleri ve Kapsam
                </a>
              </li>
              <li>
                <a href="#sample-report" className="hover:text-white transition-colors">
                  Örnek Risk Raporu Çıktısı
                </a>
              </li>
              <li>
                <a href="#request-form" className="hover:text-white transition-colors">
                  Talep Gönderim Formu
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: İletişim Bilgileri (Kurgusal) */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-400" aria-hidden="true" />
              İletişim
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-500">Destek E-posta</span>
                  <span className="text-slate-300">destek@contractcheck.local</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-500">Danışma Hattı</span>
                  <span className="text-slate-300">+90 (555) 555 55 55</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-500">Ofis Konumu</span>
                  <span className="text-slate-300">Levent Mah. Büyükdere Cad. No: 00, Beşiktaş / İstanbul</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Mesai & Yanıt Süreleri */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-400" aria-hidden="true" />
              Çalışma Saatleri
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-xs text-slate-500">Hafta İçi (Pazartesi - Cuma)</span>
                <span className="text-slate-300 font-medium">09:00 – 18:00</span>
              </div>
              <div>
                <span className="block text-xs text-slate-500">Hafta Sonu (Cumartesi - Pazar)</span>
                <span className="text-slate-300 font-medium">Kapalı (Talepler sıraya alınır)</span>
              </div>
              <div className="pt-2 text-xs text-slate-400 bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                <span className="font-semibold text-slate-300 block mb-1">Ortalama Yanıt Süresi</span>
                Hızlı Tarama talepleri mesai saatleri içinde ortalama 24 saatte sonuçlandırılır.
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Legal Notice */}
        <div className="mt-8 pt-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs sm:text-sm font-medium">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span>ContractCheck kurgusal bir değerlendirme çalışmasıdır, hukuki danışmanlık değildir.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
