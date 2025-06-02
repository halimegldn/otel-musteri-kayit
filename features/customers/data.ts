import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getCustomers(search?: string, filters: Record<string, any> = {}) {
    noStore();
    try {
        const baseWhere: any = { ...filters };
        if (search && search.trim() !== "") {
            baseWhere.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { surname: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
            ];
        }
        const customers = await prisma.customer.findMany({
            where: baseWhere,
            orderBy: { createdAt: "desc" },
        });
        return customers;
    } catch (error) {
        console.log("Error fetching customers:", error);
    }
}


export async function getCustomerById(id: string) {
    noStore();
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                id: id,
            }
        })
        return customer;
    } catch (error) {
        console.log("Error fetching customer by ID:", error);
        throw new Error("Customer not found");
    }
}