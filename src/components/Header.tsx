import Link from "next/link";
import { FileCheck, ShieldAlert } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-slate-900 text-lg hover:text-brand-600 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 rounded p-1"
          aria-label="ContractCheck Ana Sayfa"
        >
          <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow-sm">
            <FileCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="tracking-tight">Contract<span className="text-brand-600">Check</span></span>
        </Link>

        <nav aria-label="Ana Gezinti" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#problems" className="hover:text-brand-600 transition-colors py-2">
            Sorunlar
          </a>
          <a href="#how-it-works" className="hover:text-brand-600 transition-colors py-2">
            Nasıl Çalışır?
          </a>
          <a href="#packages" className="hover:text-brand-600 transition-colors py-2">
            Paketler
          </a>
          <a href="#sample-report" className="hover:text-brand-600 transition-colors py-2">
            Örnek Rapor
          </a>
          <a href="#faq" className="hover:text-brand-600 transition-colors py-2">
            SSS
          </a>
          <a href="#lookup" className="hover:text-brand-600 transition-colors py-2 font-semibold text-brand-600">
            Talep Sorgula
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#request-form"
            className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-lg shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Talep Oluştur
          </a>
        </div>
      </div>
    </header>
  );
}
