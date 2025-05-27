import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getMusteriler() {
    noStore();
    try {
        const musteriler = await prisma.musteri.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
    } catch (error) {
        console.log("Error fetching customers:", error);
    }
}