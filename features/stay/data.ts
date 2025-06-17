
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

function buildStayFilters(params: Record<string, string | any>): any {
    const filters: any = {};

    if (params.customerId) {
        filters.customerId = { contains: params.customerId, mode: "insensitive" };
    }
    if (params.roomNumber) {
        filters.room = {
            roomNumber: {
                contains: params.roomNumber, mode: "insensitive"
            }
        };
    }
    if (params.price) {
        filters.price = Number(params.price);
    }
    return filters;
}
export async function getStays(search?: string, filters: Record<string, any> = {}) {
    noStore();
    try {
        const baseWhere: any = { ...buildStayFilters(filters) };
        if (search && search.trim() !== "") {
            baseWhere.OR = [
                { customerId: { contains: search, mode: "insensitive" } },
                {
                    room: {
                        roomNumber: {
                            contains: search, mode: "insensitive"
                        }
                    }
                },
            ];
            const numberSearch = Number(search);
            if (!isNaN(numberSearch)) {
                baseWhere.OR.push({ price: numberSearch });
            }
        }
        const total = await prisma.stay.count({
            where: baseWhere,
        });

        const stays = await prisma.stay.findMany({
            where: baseWhere,
            include: {
                room: true,
                customer: true,
            },
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