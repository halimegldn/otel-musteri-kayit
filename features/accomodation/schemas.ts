import z from "zod";

export const AccomodationSchema = z.object({
    tutar: z.preprocess((val) => typeof val === "string" ? Number.parseFloat(val) : val, z.number().min(1, "Tutar en az 1 olmalıdır.")),
    odaId: z.string().min(1, "Oda ID boş olamaz."),
})