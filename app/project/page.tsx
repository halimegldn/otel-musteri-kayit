import { CustomersTable } from "@/features/customers/components/customer-table";
import { getCustomers } from "@/features/customers/data";
import { StayTable } from "@/features/home/stay-table";
import { getRooms } from "@/features/rooms/data";
import { getStays } from "@/features/stay/data";



export default async function ProjectHome() {
    const customers = await getCustomers();
    const stays = await getStays();
    const roomd = await getRooms();

    return (
        <div className="px-6 py-6 space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className=" shadow-md rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Müşteri Listesi</h2>
                    <CustomersTable customers={customers ?? []} />
                </div>
                <div className=" shadow-md rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Konaklama Listesi</h2>
                    <StayTable stays={stays ?? []} customers={customers ?? []} rooms={roomd ?? []} />
                </div>
            </div>
        </div>
    );
}
