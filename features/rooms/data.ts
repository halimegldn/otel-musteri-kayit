import { prisma } from "@/lib/prisma";
import { create } from "domain";
import { unstable_noStore as noStore } from "next/cache";

export async function getRooms() {
    noStore();
    try {
        const odalar = await prisma.oda.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return odalar;
    } catch (error) {
        console.log("Error fetching rooms:", error);
    }
}