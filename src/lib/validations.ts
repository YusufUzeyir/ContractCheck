import { z } from "zod";
import { VALID_SERVICE_IDS } from "@/config/services";

// Exact validation requirements:
// - Ad Soyad: zorunlu, 2–80 karakter, trim
// - E-posta: zorunlu, geçerli format, max 254
// - Hizmet seçimi: zorunlu, yalnızca tanımlı paket değerlerinden biri
// - Açıklama: zorunlu, 20–1000 karakter, trim
// - Honeypot: bot detection string, must be empty

export const contractRequestSchema = z.object({
  name: z
    .string({ required_error: "Lütfen adınızı ve soyadınızı giriniz." })
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(2, "Ad Soyad en az 2 karakter olmalıdır.")
        .max(80, "Ad Soyad en fazla 80 karakter olabilir.")
    ),
  email: z
    .string({ required_error: "Lütfen e-posta adresinizi giriniz." })
    .transform((val) => val.trim().toLowerCase())
    .pipe(
      z
        .string()
        .email("Lütfen geçerli bir e-posta adresi giriniz.")
        .max(254, "E-posta adresi en fazla 254 karakter olabilir.")
    ),
  service: z
    .string({ required_error: "Lütfen bir hizmet paketi seçiniz." })
    .refine((val) => (VALID_SERVICE_IDS as readonly string[]).includes(val), {
      message: "Lütfen geçerli bir hizmet paketi seçiniz."
    }),
  description: z
    .string({ required_error: "Lütfen inceleme açıklamasını giriniz." })
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(20, "Açıklama en az 20 karakter olmalıdır.")
        .max(1000, "Açıklama en fazla 1000 karakter olabilir.")
    ),
  companyWebsite: z.string().optional().default("") // Honeypot field
});

export type ContractRequestInput = z.input<typeof contractRequestSchema>;
export type ContractRequestOutput = z.output<typeof contractRequestSchema>;
