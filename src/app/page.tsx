import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problems } from "@/components/Problems";
import { HowItWorks } from "@/components/HowItWorks";
import { Packages } from "@/components/Packages";
import { SampleReport } from "@/components/SampleReport";
import { FAQ } from "@/components/FAQ";
import { RequestForm } from "@/components/RequestForm";
import { RequestLookup } from "@/components/RequestLookup";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Sorun */}
        <Problems />

        {/* 3. Nasıl Çalışır (4 adım) */}
        <HowItWorks />

        {/* 4. Hizmet Paketleri */}
        <Packages />

        {/* 5. Örnek Risk Özeti */}
        <SampleReport />

        {/* 6. SSS */}
        <FAQ />

        {/* 7. Talep Formu */}
        <RequestForm />

        {/* 8. Referans / Takip Numarası Sorgulama */}
        <RequestLookup />
      </main>
      {/* 9. Footer */}
      <Footer />
    </>
  );
}
