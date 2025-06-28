"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateUserAction from "@/lib/login";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useReducer } from "react"

export function SignUpPageComponent() {
    const router = useRouter();
    const [state, formAction] = useActionState(CreateUserAction, null);


    useEffect(() => {
        if (state?.success) {
            router.push("/signIn");
        }
    }, [state, router])

    return (
        <>
            <form action={formAction}>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ad"
                    required
                    className="p-2 rounded bg-gray-800 border border-gray-600 mb-4"
                />
                <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="p-2 rounded bg-gray-800 border border-gray-600"
                />
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Şifre"
                    required
                    className="p-2 rounded bg-gray-800 border border-gray-600"
                />
                <Button type="submit">Kaydet</Button>
            </form>
        </>
    )
}