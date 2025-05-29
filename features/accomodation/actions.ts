"use server";

import { prisma } from "@/lib/prisma";
import { AccomodationSchema } from "./schemas";
import { revalidatePath } from "next/cache";

export async function createAccomodationAction(musteriId: string, formData: FormData) {
    console.log("Form Data:", formData);
    const validationFields = AccomodationSchema.safeParse({
        tutar: formData.get("tutar"),
        odaId: formData.get("odaId"),
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
            message: "Lütfen konaklama bilgilerini eksiksiz doldurun.",
        }
    };
    const { tutar, odaId } = validationFields.data;

    const createdAccomodation = await prisma.konaklama.create({
        data: {
            tutar,
            odaId,
            musteriId: musteriId,
        }
    });
    revalidatePath("/");
    return {
        success: true,
        message: "Konaklama başarıyla kaydedildi!",
        data: createdAccomodation,
    }
}