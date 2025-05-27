import { CustomersCreate } from "@/features/customers/components/customers-create";
import { getMusteriler } from "@/features/customers/data";
import { Musteri } from "@/lib/generated/prisma/client";

export default async function CustomersPage() {

    const musteriler = await getMusteriler();
    return (
        <CustomersCreate />
    )
}