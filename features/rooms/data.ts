import { prisma } from "@/lib/prisma";
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

export async function getAvailableRooms() {
    noStore();
    try {
        const avilableRooms = await prisma.room.findMany({
            where: {
                stay: null
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return avilableRooms;
    } catch (error) {
        console.log("Error fetching rooms:", error);
    }
}

export async function getRoomById(id: string) {
    noStore();

    try {
        const room = await prisma.room.findUnique({
            where: {
                id: id,
            }
        })
        return room;
    } catch (error) {
        console.log("Error fetching room by ID:", error);
        throw new Error("Room not found");
    }
}