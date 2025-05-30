"use client";

import { useActionState, useState } from "react"
import { createAccomodationAction } from "../actions"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Room } from "@/lib/generated/prisma";

export function AccomodationCreate({ rooms, customerId }: { rooms: Room[], customerId: string }) {
    const [state, formAction] = useActionState((prevState: any, formData: FormData) => createAccomodationAction(customerId, formData), null)
    const [room, setRoom] = useState<string>("");
    return (
        <div>
            <form action={formAction}>
                <Input id="price" name="price" type="number" placeholder="Oda tutarı" />
                <Select name="roomId" value={room} onValueChange={setRoom}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Odalar" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            rooms.map((room) => (
                                <SelectItem value={room.id} key={room.id}>{room.roomNumber}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <Button type="submit">Kaydet</Button>
            </form>
        </div>
    )
}