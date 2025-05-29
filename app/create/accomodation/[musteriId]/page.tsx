import { AccomodationCreate } from "@/features/accomodation/components/accomodation-create";
import { getRooms } from "@/features/rooms/data";
import { Oda } from "@/lib/generated/prisma";
import { get } from "http";

export default async function KonaklamaPage({ params }: { params: { musteriId: string } }) {

    const odalar = await getRooms() as Oda[];  // Oda arryi undafined olmadığından emin olmak için type assertion kullanıldı
    const musteriId = await params.musteriId;
    return (
        <div>
            <AccomodationCreate odalar={odalar} musteriId={musteriId} />
        </div>
    )
}