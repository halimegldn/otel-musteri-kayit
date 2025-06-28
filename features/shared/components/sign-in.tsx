"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginAction } from "@/lib/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPageComponent() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.get("email");
        formData.get("password");

        try {
            await LoginAction(formData);
            router.push("/project");
        } catch (err: any) {
            setError(err.message || "Bir hata oluştu.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
            {error && <p className="text-red-500">{error}</p>}

            <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="p-2 rounded bg-gray-800 border border-gray-600"
            />
            <Input
                type="password"
                name="password"
                placeholder="Şifre"
                required
                className="p-2 rounded bg-gray-800 border border-gray-600"
            />
            <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
            >
                Giriş Yap
            </Button>
        </form>
    );
}
