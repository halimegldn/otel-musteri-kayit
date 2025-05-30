
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getStays() {
    noStore();
    try {
        const stays = await prisma.stay.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return stays;
    } catch (error) {
        console.log("Error fetching accomodations:", error);
    }
}

export async function getStayById(id: string) {
    noStore();

    try {
        const stay = await prisma.stay.findUnique({
            where: {
                id: id,
            }
        })
    } catch (error) {
        console.log("Error fetching stay by ID:", error);
        throw new Error("Stay not found");
    }
}