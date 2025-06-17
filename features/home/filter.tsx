"use client";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function FilterCOmponent() {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setMail] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [price, setPrice] = useState(0);

    const router = useRouter();

    const filterButton = () => {
        const queryParams = new URLSearchParams(window.location.search);

        if (name) queryParams.set("name", name);
        if (surname) queryParams.set("surname", surname);
        if (email) queryParams.set("email", email);
        if (customerId) queryParams.set("customerId", customerId);
        if (roomNumber) queryParams.set("roomNumber", roomNumber);
        if (price) queryParams.set("price", price.toString());

        router.push(`?${queryParams.toString()}`)
    }
    return (
        <div className="mt-2">
            <Sheet>
                <SheetTrigger><FilterIcon /></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <div className="flex flex-col">
                            <Label>Müşteri Adı</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <Label>Müşteri Soyadı</Label>
                            <Input id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <Label>Müşteri Maili</Label>
                            <Input id="email" value={email} onChange={(e) => setMail(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <Label>Müşteri Id</Label>
                            <Input id="customerId" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <Label>Oda</Label>
                            <Input id="roomNumber" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <Label>Oda Fiyatı</Label>
                            <Input id="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </div>
                    </SheetHeader>
                    <SheetClose asChild>
                        <Button type="button" onClick={filterButton}>Filtrele</Button>
                    </SheetClose>
                </SheetContent>
            </Sheet>
        </div>
    )
}