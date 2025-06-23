import { RoomTable } from "@/features/rooms/components/room-table";
import { getRoomImages, getRooms } from "@/features/rooms/data";
import { getStays } from "@/features/stay/data";

export default async function RoomPage({ }) {

    const rooms = await getRooms();
    const stays = await getStays();
    const roomImages = await getRoomImages();
    return (
        <RoomTable rooms={rooms || []} stays={stays || []} roomImages={roomImages || []} />
    )
}