"use client";

import { useActionState } from "react"
import { createCustomerAction } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Musteri } from "@/lib/generated/prisma/client";

export function CustomersCreate() {
    const [state, formAction] = useActionState(createCustomerAction, null);
    return (
        <div>
            <form action={formAction}>
                <Input type="text" placeholder="Müşteri Adı" />
                <Input type="text" placeholder="Müşteri Soyadı" />
                <Input type="email" placeholder="Müşteri Mail" />
                <Input type="text" placeholder="Müşteri Telefon" />
                <Input type="text" placeholder="Müşteri Adres" />
                <Button type="submit">Kaydet</Button>
            </form>
        </div>
    )
}