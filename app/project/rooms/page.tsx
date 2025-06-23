import { RoomTable } from "@/features/rooms/components/room-table";
import { getRooms } from "@/features/rooms/data";
import { getStays } from "@/features/stay/data";

export default async function RoomPage({ }) {

    const rooms = await getRooms();
    const stays = await getStays();
    return (
        <RoomTable rooms={rooms || []} stays={stays || []} />
    )
}