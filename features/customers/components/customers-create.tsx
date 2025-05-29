"use client";

import { useActionState } from "react"
import { createCustomerAction } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CustomersCreate() {
    const [state, formAction] = useActionState(createCustomerAction, null);
    return (
        <div>
            <form action={formAction}>
                <Input name="name" id="name" type="text" placeholder="Müşteri Adı" />
                <Input name="surname" id="surname" type="text" placeholder="Müşteri Soyadı" />
                <Input name="email" id="email" type="email" placeholder="Müşteri Mail" />
                <Input name="phone" id="phone" type="text" placeholder="Müşteri Telefon" />
                <Input name="address" id="address" type="text" placeholder="Müşteri Adres" />
                <Button type="submit">Kaydet</Button>
            </form>

        </div>
    )
}