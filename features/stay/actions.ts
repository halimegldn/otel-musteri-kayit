"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AccomodationSchema } from "./schemas";
import { revalidatePath } from "next/cache";


export async function createAccomodationAction(customerId: string, formData: FormData) {
    console.log("Form Data:", formData);
    const validationFields = AccomodationSchema.safeParse({
        price: formData.get("price"),
        roomId: formData.get("roomId"),
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
            message: "Lütfen konaklama bilgilerini eksiksiz doldurun.",
        }
    };
    const { price, roomId } = validationFields.data;

    const createdAccomodation = await prisma.stay.create({
        data: {
            price,
            roomId,
            customerId: customerId,
        }
    });
    revalidatePath("/project");
    redirect("/project");
    return {
        success: true,
        message: "Konaklama başarıyla kaydedildi!",
        data: createdAccomodation,
    }
}