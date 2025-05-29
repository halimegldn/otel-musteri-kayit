"use server";

import { prisma } from "@/lib/prisma";
import { CusotmerSchema } from "./schemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createCustomerAction(prevState: any, formData: FormData) {
    const validationFields = CusotmerSchema.safeParse({
        name: formData.get("name"),
        surname: formData.get("surname"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
            message: " Lütfen formu doğru doldurun.",
        };
    }

    const { name, surname, email, phone, address } = validationFields.data;


    const createdCustomer = await prisma.customer.create({
        data: {
            name,
            surname,
            email,
            phone,
            address,
        }
    });
    revalidatePath("/create/accomodation");
    redirect(`/create/accomodation/${createdCustomer.id}`);

}