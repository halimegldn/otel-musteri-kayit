import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getCustomers() {
    noStore();
    try {
        const customers = await prisma.customer.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        return customers
    } catch (error) {
        console.log("Error fetching customers:", error);
    }
}