"use client";

import React, { useState, useRef } from "react";
import { SERVICE_PACKAGES } from "@/config/services";
import { contractRequestSchema } from "@/lib/validations";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Send,
  ShieldAlert
} from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "validation_error" | "server_error" | "rate_limit_error";

interface SuccessData {
  id: string;
  shortId: string;
}

export function RequestForm() {
  // Form input fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: SERVICE_PACKAGES[0]?.id || "quick-scan",
    description: "",
    companyWebsite: "" // Honeypot field
  });

  // State management
  const [formState, setFormState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalErrorMessage, setGeneralErrorMessage] = useState<string>("");
  const [successData, setSuccessData] = useState<SuccessData | null>(null);

  // Field element refs for focusing the first invalid element
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Validate single field on blur
  const validateField = (field: "name" | "email" | "service" | "description") => {
    const singleSchema = contractRequestSchema.pick({ [field]: true } as any);
    const result = singleSchema.safeParse({ [field]: formData[field] });

    if (!result.success) {
      const errorMsg = result.error.errors[0]?.message || "Geçersiz değer";
      setFieldErrors((prev) => ({ ...prev, [field]: errorMsg }));
    } else {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error while typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (formState === "submitting") return;

    // Reset status messages
    setGeneralErrorMessage("");

    // 1. Client-side Zod validation
    const clientValidation = contractRequestSchema.safeParse(formData);
    if (!clientValidation.success) {
      const errors: Record<string, string> = {};
      clientValidation.error.errors.forEach((err) => {
        const fieldName = err.path[0]?.toString() || "general";
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });
      setFieldErrors(errors);
      setFormState("validation_error");

      // Accessibility: Focus first invalid field
      if (errors.name && nameRef.current) {
        nameRef.current.focus();
      } else if (errors.email && emailRef.current) {
        emailRef.current.focus();
      } else if (errors.service && serviceRef.current) {
        serviceRef.current.focus();
      } else if (errors.description && descriptionRef.current) {
        descriptionRef.current.focus();
      }
      return;
    }

    // 2. Set submitting state
    setFormState("submitting");
    setFieldErrors({});

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.status === 201 && data.success) {
        // Success ONLY AFTER confirmed DB commit
        setSuccessData({
          id: data.id,
          shortId: data.shortId || data.id.split("-")[0].toUpperCase()
        });
        setFormState("success");
      } else if (response.status === 429) {
        setFormState("rate_limit_error");
        setGeneralErrorMessage(
          data.error || "Çok fazla istek gönderildi. Lütfen bir süre sonra tekrar deneyiniz."
        );
      } else if (response.status === 400) {
        setFormState("validation_error");
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
          const firstField = Object.keys(data.fieldErrors)[0];
          if (firstField === "name") nameRef.current?.focus();
          else if (firstField === "email") emailRef.current?.focus();
          else if (firstField === "service") serviceRef.current?.focus();
          else if (firstField === "description") descriptionRef.current?.focus();
        }
        setGeneralErrorMessage(data.error || "Lütfen form alanlarını kontrol ediniz.");
      } else {
        // 500 or other errors
        setFormState("server_error");
        setGeneralErrorMessage(
          data.error || "Sunucu veya veritabanı ile iletişim kurulamadı. Lütfen tekrar deneyiniz."
        );
      }
    } catch {
      // Network failure
      setFormState("server_error");
      setGeneralErrorMessage(
        "Ağ bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz."
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      service: SERVICE_PACKAGES[0]?.id || "quick-scan",
      description: "",
      companyWebsite: ""
    });
    setFormState("idle");
    setSuccessData(null);
    setFieldErrors({});
    setGeneralErrorMessage("");
  };

  return (
    <section id="request-form" className="py-16 md:py-24 bg-slate-100/60 border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-600">
            Hizmet Talebi
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Ön Tarama Talep Formu
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Sözleşme taslağınızın ön taraması için bilgilerinizi iletebilir ve talebinizi oluşturabilirsiniz.
          </p>
        </div>

        {/* Mandatory warning banner */}
        <div
          role="note"
          aria-label="Test Verisi Uyarısı"
          className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3 shadow-sm"
        >
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm leading-relaxed">
            <span className="font-bold">ÖNEMLİ UYARI:</span> Yalnızca kurgusal test verisi girin. Gerçek sözleşme metni veya kişisel veri paylaşmayın.
          </div>
        </div>

        {/* Live Region for Screen Readers & Status Announcements */}
        <div
          ref={statusRef}
          aria-live="polite"
          aria-atomic="true"
          className="mb-6"
        >
          {formState === "success" && successData && (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 shadow-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-emerald-950">
                    Talebiniz Başarıyla Kaydedildi!
                  </h3>
                  <p className="mt-1 text-sm text-emerald-800">
                    Ön tarama talebiniz başarıyla alınmış ve kayıt altına alınmıştır.
                  </p>
                  <div className="mt-4 p-3 bg-white rounded-lg border border-emerald-200 inline-block text-xs sm:text-sm">
                    <span className="text-slate-600 block">Referans / Takip Numarası:</span>
                    <span className="font-mono font-bold text-base text-slate-900 select-all">
                      {successData.shortId}
                    </span>
                    <span className="text-slate-400 block text-[11px] font-mono mt-0.5">
                      (UUID: {successData.id})
                    </span>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600"
                    >
                      <RefreshCw className="w-4 h-4" aria-hidden="true" />
                      Yeni Bir Talep Oluştur
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {formState === "rate_limit_error" && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="font-semibold text-sm">İstek Sınırı Aşıldı (429)</h4>
                <p className="text-sm mt-0.5">{generalErrorMessage}</p>
              </div>
            </div>
          )}

          {formState === "server_error" && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Sunucu / Kayıt Hatası</h4>
                <p className="text-sm mt-0.5">{generalErrorMessage}</p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-red-800 underline hover:text-red-950 focus-visible:ring-2 focus-visible:ring-red-600"
                >
                  <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                  Yeniden Dene
                </button>
              </div>
            </div>
          )}
        </div>

        {/* If successfully submitted, hide form fields or show reset view */}
        {formState !== "success" && (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
          >
            {/* Honeypot field - hidden visually and inaccessible via tab */}
            <div
              className="absolute left-[-9999px] top-auto width-[1px] height-[1px] overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="companyWebsite">Web Sitesi (Bot tespiti için boş bırakın)</label>
              <input
                id="companyWebsite"
                name="companyWebsite"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.companyWebsite}
                onChange={handleInputChange}
              />
            </div>

            {/* Ad Soyad */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Ad Soyad <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                ref={nameRef}
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                aria-required="true"
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "name-error" : "name-desc"}
                value={formData.name}
                onChange={handleInputChange}
                onBlur={() => validateField("name")}
                placeholder="Örn: Ayşe Yılmaz"
                className={`w-full min-h-[44px] px-3.5 py-2 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                  fieldErrors.name
                    ? "border-red-400 focus-visible:ring-red-500 bg-red-50/20"
                    : "border-slate-300 focus-visible:ring-brand-500 hover:border-slate-400"
                }`}
              />
              <p id="name-desc" className="text-xs text-slate-500 mt-1">
                2 ile 80 karakter arasında olmalıdır.
              </p>
              {fieldErrors.name && (
                <p id="name-error" role="alert" className="text-xs font-semibold text-red-600 mt-1">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* E-posta */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                E-posta Adresi <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : "email-desc"}
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => validateField("email")}
                placeholder="ornek@alanadi.com"
                className={`w-full min-h-[44px] px-3.5 py-2 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                  fieldErrors.email
                    ? "border-red-400 focus-visible:ring-red-500 bg-red-50/20"
                    : "border-slate-300 focus-visible:ring-brand-500 hover:border-slate-400"
                }`}
              />
              <p id="email-desc" className="text-xs text-slate-500 mt-1">
                Kurgusal test e-posta adresi yazabilirsiniz.
              </p>
              {fieldErrors.email && (
                <p id="email-error" role="alert" className="text-xs font-semibold text-red-600 mt-1">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Hizmet Seçimi */}
            <div>
              <label
                htmlFor="service"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Hizmet Paketi Seçimi <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <select
                ref={serviceRef}
                id="service"
                name="service"
                required
                aria-required="true"
                aria-invalid={!!fieldErrors.service}
                aria-describedby={fieldErrors.service ? "service-error" : undefined}
                value={formData.service}
                onChange={handleInputChange}
                onBlur={() => validateField("service")}
                className={`w-full min-h-[44px] px-3.5 py-2 rounded-lg border text-sm text-slate-900 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                  fieldErrors.service
                    ? "border-red-400 focus-visible:ring-red-500"
                    : "border-slate-300 focus-visible:ring-brand-500 hover:border-slate-400"
                }`}
              >
                {SERVICE_PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} — ({pkg.priceNote})
                  </option>
                ))}
              </select>
              {fieldErrors.service && (
                <p id="service-error" role="alert" className="text-xs font-semibold text-red-600 mt-1">
                  {fieldErrors.service}
                </p>
              )}
            </div>

            {/* Açıklama */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Neyi özellikle kontrol ettirmek istiyorsunuz? <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <textarea
                ref={descriptionRef}
                id="description"
                name="description"
                required
                rows={4}
                aria-required="true"
                aria-invalid={!!fieldErrors.description}
                aria-describedby={
                  fieldErrors.description ? "description-error" : "description-desc"
                }
                value={formData.description}
                onChange={handleInputChange}
                onBlur={() => validateField("description")}
                placeholder="Örn: 5. maddedeki cezai şart miktarının ve tek taraflı fesih hakkının makul olup olmadığını kontrol etmek istiyorum."
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                  fieldErrors.description
                    ? "border-red-400 focus-visible:ring-red-500 bg-red-50/20"
                    : "border-slate-300 focus-visible:ring-brand-500 hover:border-slate-400"
                }`}
              />
              <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
                <span id="description-desc">En az 20, en fazla 1000 karakter.</span>
                <span className={formData.description.length > 1000 ? "text-red-600 font-bold" : ""}>
                  {formData.description.length}/1000
                </span>
              </div>
              {fieldErrors.description && (
                <p
                  id="description-error"
                  role="alert"
                  className="text-xs font-semibold text-red-600 mt-1"
                >
                  {fieldErrors.description}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={formState === "submitting"}
                className={`w-full inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-lg text-base font-semibold text-white shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                  formState === "submitting"
                    ? "bg-brand-400 cursor-not-allowed opacity-80"
                    : "bg-brand-600 hover:bg-brand-700 active:bg-brand-800 hover:shadow-lg"
                }`}
              >
                {formState === "submitting" ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
                    <span>Sunucuya Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                    <span>Ön Tarama Talebi Gönder</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
