"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { StaySchema } from "./schemas";
import { revalidatePath } from "next/cache";


export async function createStayAction(customerId: string, formData: FormData) {
    console.log("Form Data:", formData);
    const validationFields = StaySchema.safeParse({
        price: formData.get("price"),
        roomId: formData.get("roomId"),
        checkin: formData.get("startDate"),
        checkout: formData.get("endDate"),
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
            message: "Lütfen konaklama bilgilerini eksiksiz doldurun.",
        }
    };
    const { price, roomId, checkin, checkout } = validationFields.data;

    const createdAccomodation = await prisma.stay.create({
        data: {
            price,
            roomId,
            checkin,
            checkout,
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

export async function updateStayAction(id: string, prevState: null, formData: FormData) {
    // Buraya tarih eklenecek
    const validationFields = StaySchema.safeParse({
        price: formData.get("price"),
        roomId: formData.get("roomId"),
        checkin: formData.get("checkin"),
        checkout: formData.get("checkout"),

    });

    if (!validationFields.success) {
        return {
            errors: validationFields.error.flatten().fieldErrors,
            message: "Eksik alanlar mevcut. Konaklama güncellenemedi."
        };
    };

    const { price, roomId, checkin, checkout } = validationFields.data;

    try {
        await prisma.stay.update({
            where: { id },
            data: {
                price,
                roomId,
                checkin,
                checkout,
            }
        })
    } catch (error) {
        return {
            message: `Hata konaklama güncellenemedi. ${error}`,
        }
    }
    revalidatePath("/project/stays")
}
