import { StayCreate } from "@/features/stay/components/stay-create";
import { getAvailableRooms, getRooms } from "@/features/rooms/data";
import { Room } from "@/lib/generated/prisma";
import { get } from "http";

export default async function KonaklamaPage({ params }: { params: { customerId: string } }) {

    const avilableRooms = await getAvailableRooms() as Room[];  // Oda arryi undafined olmadığından emin olmak için type assertion kullanıldı
    const customerId = await params.customerId;
    return (
        <div>
            <StayCreate avilableRooms={avilableRooms} customerId={customerId} />
        </div>
    )
}