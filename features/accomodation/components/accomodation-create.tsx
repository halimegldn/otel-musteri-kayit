"use client";

import { useActionState, useState } from "react"
import { createAccomodationAction } from "../actions"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Oda } from "@/lib/generated/prisma";
import { Button } from "@/components/ui/button";

export function AccomodationCreate({ odalar, musteriId }: { odalar: Oda[], musteriId: string }) {
    const [state, formAction] = useActionState((prevState: any, formData: FormData) => createAccomodationAction(musteriId, formData), null)
    const [oda, setOda] = useState<string>("");
    return (
        <div>
            <form action={formAction}>
                <Input id="tutar" name="tutar" type="number" placeholder="Oda tutarı" />
                <Select name="odaId" value={oda} onValueChange={setOda}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Odalar" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            odalar.map((oda) => (
                                <SelectItem value={oda.id} key={oda.id}>{oda.numara}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <Button type="submit">Kaydet</Button>
            </form>
        </div>
    )
}