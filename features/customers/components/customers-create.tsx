"use client";

import { useActionState } from "react"
import { createCustomerAction } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function CustomersCreate() {
    const [state, formAction] = useActionState(createCustomerAction, null);
    return (
        <div>
            <form action={formAction}>
                <div className="mb-3">
                    <Label htmlFor="name">Müşteri Adı</Label>
                    <Input name="name" id="name" type="text" placeholder="Müşteri Adı" />
                </div>
                <div className="mb-3">
                    <Label htmlFor="surname">Müşteri Soyadı</Label>
                    <Input name="surname" id="surname" type="text" placeholder="Müşteri Soyadı" />
                </div>
                <div className="mb-3">
                    <Label htmlFor="email">Müşteri Mail</Label>
                    <Input name="email" id="email" type="email" placeholder="Müşteri Mail" />
                </div>
                <div className="mb-3">
                    <Label htmlFor="phone">Müşteri Telefon</Label>
                    <Input name="phone" id="phone" type="text" placeholder="Müşteri Telefon" />
                </div>
                <div className="mb-3">
                    <Label htmlFor="address">Müşteri Adres</Label>
                    <Input name="address" id="address" type="text" placeholder="Müşteri Adres" />
                </div>
                <div>
                    <Button type="submit">Kaydet</Button>
                </div>
            </form>
        </div>
    )
}