import { CustomersTable } from "@/features/customers/components/customer-table"
import { getCustomers } from "@/features/customers/data"
import { StayTable } from "@/features/stay/components/stay-table"
import { getRooms } from "@/features/rooms/data"
import { getStays } from "@/features/stay/data"
import { SearchComponent } from "@/features/home/search"
import { FilterComponent } from "@/features/home/filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BedDouble } from "lucide-react"

export default async function ProjectHome({
    searchParams,
}: {
    searchParams: {
        search?: string
        name?: string
        surname?: string
        email?: string
        customerId?: string
        roomNumber?: string
        price?: number
    }
}) {
    const searchQuery = (await searchParams).search || ""
    const rooms = await getRooms()

    const filters = {
        name: (await searchParams).name || undefined,
        surname: (await searchParams).surname || undefined,
        email: (await searchParams).email || undefined,
        customerId: (await searchParams).customerId || undefined,
        roomNumber: (await searchParams).roomNumber || undefined,
        price: searchParams.price ? Number(searchParams.price) : undefined,
    }

    const customers = await getCustomers(searchQuery, filters)
    const stays = await getStays(searchQuery, filters)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Dashboard</h1>
                    <p className="text-slate-600 dark:text-slate-400">Müşteri ve konaklama bilgilerinizi yönetin</p>
                </div>

                {/* Search and Filter */}
                <Card className="mb-8 border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <FilterComponent />
                                <SearchComponent />
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>{customers?.length || 0} Müşteri</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BedDouble className="h-4 w-4" />
                                    <span>{stays?.length || 0} Konaklama</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Customers Table */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Müşteri Listesi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CustomersTable customers={customers ?? []} />
                        </CardContent>
                    </Card>

                    {/* Stays Table */}
                    <Card className="border-0 shadow-lg">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2">
                                <BedDouble className="h-5 w-5 text-green-600" />
                                Konaklama Listesi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <StayTable stays={stays ?? []} customers={customers ?? []} rooms={rooms ?? []} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
