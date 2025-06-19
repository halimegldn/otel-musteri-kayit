import { CustomersTable } from "@/features/customers/components/customer-table";
import { getCustomers } from "@/features/customers/data";

export default async function CustomersHomePage({ params }: { params: { customerId: string } }) {
    const customers = await getCustomers();
    return (
        <div>
            <CustomersTable customers={customers || []} customerId={params.customerId} />
        </div>
    )
}