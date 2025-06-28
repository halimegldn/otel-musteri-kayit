"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginAction } from "@/lib/login";

export default function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

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

            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="p-2 rounded bg-gray-800 border border-gray-600"
            />
            <input
                type="password"
                name="password"
                placeholder="Şifre"
                required
                className="p-2 rounded bg-gray-800 border border-gray-600"
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
            >
                Giriş Yap
            </button>
        </form>
    );
}
