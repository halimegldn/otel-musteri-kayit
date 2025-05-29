
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getAccomodations() {
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