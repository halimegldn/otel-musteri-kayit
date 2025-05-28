"use server";

import { prisma } from "@/lib/prisma";
import { MusteriSchema } from "./schemas";
import { revalidatePath } from "next/cache";

export async function createCustomerAction(prevState: any, formData: FormData) {
    const validationFields = MusteriSchema.safeParse({
        ad: formData.get("ad"),
        soyad: formData.get("soyad"),
        email: formData.get("email"),
        telefon: formData.get("telefon"),
        adres: formData.get("adres"),
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
            message: " Lütfen formu doğru doldurun.",
        };
    }

    const { ad, soyad, email, telefon, adres } = validationFields.data;


    const createdCustomer = await prisma.musteri.create({
        data: {
            ad,
            soyad,
            email,
            telefon,
            adres,
        }
    });

    revalidatePath("/");
}