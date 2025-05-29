import { getCustomers } from "@/features/customers/data";
import { MusteriTablosu } from "@/features/home/customer-table";

export default async function Home() {
    const customers = await getCustomers();
    return (
        <div>
            <MusteriTablosu customers={customers} />
        </div>
    );
}