import { CustomersCreate } from "@/features/customers/components/customers-create";
import { getMusteriler } from "@/features/customers/data";
import { Musteri } from "@/lib/generated/prisma/client";

export default async function CustomersPage() {

    return (
        <CustomersCreate />
    )
}