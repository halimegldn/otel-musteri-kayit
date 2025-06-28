"use server";

import { prisma } from "./prisma";
import { LoginSchema } from "./schema";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function LoginAction(formData: FormData) {
    const validation = LoginSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validation.success) {
        return {
            error: validation.error.flatten().fieldErrors,
            message: "Lütfen formu doğru doldurun.",
        };
    }

    const { email, password } = validation.data;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { error: { email: ["Kullanıcı bulunamadı."] } };
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return { error: { password: ["Şifre yanlış."] } };
        }

        // Giriş başarılı, yönlendir
        redirect("/project");
    } catch (e) {
        return { error: "Beklenmeyen bir hata oluştu." };
    }
}

export default async function CreateUserAction(prevState: any, formData: FormData) {
    const validation = LoginSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if (!validation.success) {
        return {
            error: validation.error.flatten().fieldErrors,
            message: "Lütfen formu doğru doldurun.",
        }
    };

    const { name, email, password } = validation.data;

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: password,
            }
        })
        return {
            success: true,
            message: "Kayıt başarılı, yönlendiriliyorsunuz."
        };


    } catch (error) {
        console.log("error", error);

    }
}
