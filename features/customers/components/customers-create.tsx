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
                <Input name="ad" id="ad" type="text" placeholder="Müşteri Adı" />
                <Input name="soyad" id="soyad" type="text" placeholder="Müşteri Soyadı" />
                <Input name="email" id="email" type="email" placeholder="Müşteri Mail" />
                <Input name="telefon" id="telefon" type="text" placeholder="Müşteri Telefon" />
                <Input name="adres" id="adres" type="text" placeholder="Müşteri Adres" />
                <Button type="submit">Kaydet</Button>
            </form>

        </div>
    )
}