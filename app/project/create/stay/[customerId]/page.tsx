import { StayCreate } from "@/features/stay/components/stay-create";
import { getRooms } from "@/features/rooms/data";
import { Room } from "@/lib/generated/prisma";
import { get } from "http";

export default async function KonaklamaPage({ params }: { params: { customerId: string } }) {

    const rooms = await getRooms() as Room[];  // Oda arryi undafined olmadığından emin olmak için type assertion kullanıldı
    const customerId = await params.customerId;
    return (
        <div>
            <StayCreate rooms={rooms} customerId={customerId} />
        </div>
    )
}