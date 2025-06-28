import z from "zod";

export const LoginSchema = z.object({
    name: z.string().min(2, "Ad en az 2 karakter olmalıdır."),
    email: z.string().email("Geçerli bir e-posta adresi girin."),
    password: z.string().min(6, "Parola en az 6 karakter olmalıdır."),
})