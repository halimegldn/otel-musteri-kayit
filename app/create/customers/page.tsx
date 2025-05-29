import { CustomersCreate } from "@/features/customers/components/customers-create";
import { getMusteriler } from "@/features/customers/data";
import { Musteri } from "@/lib/generated/prisma/client";

export default function CustomersPage() {

    return (
        <CustomersCreate />
    )
}