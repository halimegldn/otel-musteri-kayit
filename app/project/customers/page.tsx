import { CustomersTable } from "@/features/customers/components/customer-table";
import { getCustomers } from "@/features/customers/data";

export default async function CustomersHomePage() {
    const customers = await getCustomers();
    return (
        <div>
            <CustomersTable customers={customers || []} />
        </div>
    )
}