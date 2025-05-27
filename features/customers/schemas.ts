import z from "zod";

export const MusteriSchema = z.object({
    ad: z.string().min(1, "Ad alanı boş bırakılamaz."),
    soyad: z.string().min(1, "Soyad alanı boş bırakılamaz."),
    email: z.string().email("Geçerli bir e-posta giriniz."),
    telefon: z.string().min(10, "Telefon numarası en az 10 karakter olmalı."),
    adres: z.string().min(1, "Adres alanı boş bırakılamaz."),

})