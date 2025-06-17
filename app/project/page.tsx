import { CustomersTable } from "@/features/customers/components/customer-table";
import { getCustomers } from "@/features/customers/data";
import { StayTable } from "@/features/stay/components/stay-table";
import { getRooms } from "@/features/rooms/data";
import { getStays } from "@/features/stay/data";
import { SearchComponent } from "@/features/home/search";
import { FilterCOmponent } from "@/features/home/filter";

export default async function ProjectHome({ searchParams }: { searchParams: { search?: string, name?: string, surname?: string, email?: string, customerId?: string, roomNumber?: string, price?: number; }; }) {

    const searchQuery = (await searchParams).search || "";
    const roomd = await getRooms();

    const filters = {
        name: (await searchParams).name || undefined,
        surname: (await searchParams).surname || undefined,
        email: (await searchParams).email || undefined,
        customerId: (await searchParams).customerId || undefined,
        roomNumber: (await searchParams).roomNumber || undefined,
        price: searchParams.price ? Number(searchParams.price) : undefined,
    }

    const customers = await getCustomers(searchQuery, filters);
    const stays = await getStays(searchQuery, filters);
    return (
        <div className="px-6 py-6 space-y-6">
            <div className="flex justify-end mb-4 items-center gap-3 mx-auto">
                <FilterCOmponent />
                <SearchComponent />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="shadow-md rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Müşteri Listesi</h2>
                    <CustomersTable customers={customers ?? []} />
                </div>
                <div className="shadow-md rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Konaklama Listesi</h2>
                    <StayTable
                        stays={stays ?? []}
                        customers={customers ?? []}
                        rooms={roomd ?? []}
                    />
                </div>
            </div>
        </div>
    );
}
