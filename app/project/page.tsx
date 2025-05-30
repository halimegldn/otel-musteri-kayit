import { getStays } from "@/features/stay/data";
import { getCustomers } from "@/features/customers/data";
import { MusteriTablosu } from "@/features/home/customer-table";
import { StayTable } from "@/features/home/stay-table";

export default async function Home() {
    const customers = await getCustomers();
    const stays = await getStays()
    return (
        <div>
            <MusteriTablosu customers={customers ?? []} />
            <StayTable stays={stays ?? []} />
        </div>
    );
}