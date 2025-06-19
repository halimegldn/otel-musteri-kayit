import z from "zod";

export const StaySchema = z.object({
    price: z.preprocess((val) => typeof val === "string" ? Number.parseFloat(val) : val, z.number().min(1, "Tutar en az 1 olmalıdır.")),
    roomId: z.string().min(1, "Oda ID boş olamaz."),
    checkin: z.string().min(1, { message: "Lütfen başlangıç tarihi giriniz" }),
    checkout: z.string().min(1, { message: "Lütfen bitiş tarihi giriniz." }),
})