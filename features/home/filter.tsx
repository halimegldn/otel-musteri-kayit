"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilterIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function FilterComponent() {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setMail] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [price, setPrice] = useState(0);

    const router = useRouter();

    const deleteButton = () => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.delete("name");
        queryParams.delete("surname");
        queryParams.delete("email");
        queryParams.delete("customerId");
        queryParams.delete("roomNumber");
        queryParams.delete("price");

        setName("");
        setSurname("");
        setMail("");
        setCustomerId("");
        setRoomNumber("");
        setPrice(0);

        router.push(`?${queryParams.toString()}`)
    }

    const filterButton = () => {
        const queryParams = new URLSearchParams(window.location.search);

        if (name) queryParams.set("name", name);
        else queryParams.delete("name");

        if (surname) queryParams.set("surname", surname);
        else queryParams.delete("surname");

        if (email) queryParams.set("email", email);
        else queryParams.delete("email");

        if (customerId) queryParams.set("customerId", customerId);
        else queryParams.delete("customerId");

        if (roomNumber) queryParams.set("roomNumber", roomNumber);
        else queryParams.delete("roomNumber");

        if (price) queryParams.set("price", price.toString());
        else queryParams.delete("price");

        router.push(`?${queryParams.toString()}`)
    }
    return (
        <div className="flex items-center gap-2">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                        <FilterIcon className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="flex items-center gap-2">
                            <FilterIcon className="h-5 w-5" />
                            Filtreleme Seçenekleri
                        </SheetTitle>
                    </SheetHeader>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Müşteri Adı</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad giriniz" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="surname">Müşteri Soyadı</Label>
                                <Input
                                    id="surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    placeholder="Soyad giriniz"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">E-posta Adresi</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setMail(e.target.value)}
                                placeholder="E-posta giriniz"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="customerId">Müşteri ID</Label>
                                <Input
                                    id="customerId"
                                    value={customerId}
                                    onChange={(e) => setCustomerId(e.target.value)}
                                    placeholder="Müşteri ID"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="roomNumber">Oda Numarası</Label>
                                <Input
                                    id="roomNumber"
                                    value={roomNumber}
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                    placeholder="Oda numarası"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Oda Fiyatı</Label>
                            <Input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                placeholder="Fiyat giriniz"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <SheetClose asChild>
                                <Button onClick={filterButton} className="flex-1">
                                    Filtreleri Uygula
                                </Button>
                            </SheetClose>
                            <Button variant="outline" onClick={deleteButton} className="flex-1">
                                Temizle
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}