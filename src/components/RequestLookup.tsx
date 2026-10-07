"use client";

import React, { useState } from "react";
import { Search, Loader2, CheckCircle2, AlertCircle, Calendar, User, Tag } from "lucide-react";
import { SERVICE_PACKAGES } from "@/config/services";

interface QueryResult {
  shortId: string;
  name: string;
  service: string;
  description: string;
  createdAt: string;
  status: string;
}

export function RequestLookup() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const res = await fetch(`/api/requests/query?code=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setResult(data.data);
      } else {
        setErrorMessage(data.error || "Talep bulunamadı.");
      }
    } catch {
      setErrorMessage("Bağlantı hatası oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPackageName = (serviceId: string) => {
    const pkg = SERVICE_PACKAGES.find((p) => p.id === serviceId);
    return pkg ? pkg.name : serviceId;
  };

  return (
    <section id="lookup" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-600">
            Talep Sorgulama
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Referans Numarası ile Talep Sorgula
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Form gönderiminde aldığınız takip kodunu (ör. <span className="font-mono font-semibold text-slate-800">ED0ED810</span> veya tam UUID) girerek Supabase veritabanındaki güncel durumu sorgulayabilirsiniz.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Örn: ED0ED810 veya UUID"
                aria-label="Referans Takip Kodu"
                required
                className="w-full min-h-[48px] px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-mono placeholder:font-sans placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !code.trim()}
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                  Sorgulanıyor...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" aria-hidden="true" />
                  Sorgula
                </>
              )}
            </button>
          </div>
        </form>

        {/* Sonuç Alanı */}
        <div className="mt-8" aria-live="polite">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm font-medium">{errorMessage}</p>
            </div>
          )}

          {result && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Kayıtlı Referans Kodu</span>
                  <span className="text-lg font-mono font-bold text-slate-900">
                    {result.shortId}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span>{result.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs text-slate-500 block">Talep Eden</span>
                    <span className="font-medium text-slate-800">{result.name}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Tag className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs text-slate-500 block">Hizmet Paketi</span>
                    <span className="font-medium text-slate-800">{getPackageName(result.service)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-xs text-slate-500 block">Talep Tarihi</span>
                    <span className="font-medium text-slate-800">
                      {new Date(result.createdAt).toLocaleString("tr-TR")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Talep Notu / Açıklama:</span>
                <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                  {result.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
