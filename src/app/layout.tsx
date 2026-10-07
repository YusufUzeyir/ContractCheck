import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContractCheck | KOBİ ve Freelancer'lar İçin Sözleşme Ön Tarama Hizmeti",
  description:
    "Sözleşme taslaklarındaki kritik cezai şartları, fesih maddelerini ve orantısız yükümlülükleri ön taramadan geçirin. Hukuki danışmanlık öncesi risklerinizi fark edin.",
  keywords: ["sözleşme inceleme", "sözleşme risk analizi", "freelancer sözleşme", "kobi sözleşme ön tarama"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col">
        {/* Skip to main content link for screen readers and keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          Doğrudan ana içeriğe geç
        </a>
        {children}
      </body>
    </html>
  );
}
