import { prisma } from "@/lib/prisma";
import { create } from "domain";
import { unstable_noStore as noStore } from "next/cache";

export async function getRooms() {
    noStore();
    try {
        const rooms = await prisma.room.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return rooms;
    } catch (error) {
        console.log("Error fetching rooms:", error);
    }
}