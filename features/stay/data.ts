
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getStays(search?: string, filters: Record<string, any> = {}) {
    noStore();
    try {
        const baseWhere: any = { ...filters };
        if (search && search.trim() !== "") {
            baseWhere.OR = [
                { customerId: { contains: search, mode: "insensitive" } },
                { price: { contains: search, mode: "insensitive" } },
                { roomId: { contains: search, mode: "insensitive" } },
            ];
        }
        const total = await prisma.stay.count({
            where: baseWhere,
        });

        const stays = await prisma.stay.findMany({
            where: baseWhere,
            orderBy: {
                createdAt: "desc"
            }
        });
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