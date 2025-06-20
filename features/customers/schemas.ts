import z from "zod";

export const CusotmerSchema = z.object({
    name: z.string().min(1, "Ad alanı boş bırakılamaz."),
    surname: z.string().min(1, "Soyad alanı boş bırakılamaz."),
    email: z.string().email("Geçerli bir e-posta giriniz."),
    phone: z.string().min(10, "Telefon numarası en az 10 karakter olmalı."),
    address: z.string().min(1, "Adres alanı boş bırakılamaz."),
})