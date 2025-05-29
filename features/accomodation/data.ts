
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getAccomodations() {
    noStore();
    try {
        const konaklamalar = await prisma.konaklama.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return konaklamalar;
    } catch (error) {
        console.log("Error fetching accomodations:", error);
    }
}