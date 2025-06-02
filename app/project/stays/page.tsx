import { getCustomers } from "@/features/customers/data";
import { StayTable } from "@/features/stay/components/stay-table";
import { getRooms } from "@/features/rooms/data";
import { getStays } from "@/features/stay/data";

export default async function StaysHomePage() {
    const stays = await getStays();
    const customers = await getCustomers();
    const rooms = await getRooms();
    return (
        <div>
            <StayTable stays={stays || []} customers={customers || []} rooms={rooms || []} />
        </div>
    )
}