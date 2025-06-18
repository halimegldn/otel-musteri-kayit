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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-blue-900/20 dark:to-purple-900/20">
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                        Dashboard
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Müşteri ve konaklama bilgilerinizi renkli arayüzle yönetin
                    </p>
                </div>

                {/* Search and Filter */}
                <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-r from-white via-blue-50/50 to-purple-50/50 dark:from-slate-700/80 dark:via-blue-800/30 dark:to-purple-800/30 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
                    <CardContent className="p-8">
                        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <FilterComponent />
                                <SearchComponent />
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 text-white rounded-full shadow-lg">
                                    <Users className="h-5 w-5" />
                                    <span className="font-semibold">{customers?.length || 0} Müşteri</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 text-white rounded-full shadow-lg">
                                    <BedDouble className="h-5 w-5" />
                                    <span className="font-semibold">{stays?.length || 0} Konaklama</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Customers Table */}
                    <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white/90 dark:bg-slate-700/50 backdrop-blur-sm">
                        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                        <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30">
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    Müşteri Listesi
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <CustomersTable customers={customers ?? []} />
                        </CardContent>
                    </Card>
                    {/* Stays Table */}
                    <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white/90 dark:bg-slate-700/50 backdrop-blur-sm">
                        <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
                        <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30">
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                                    <BedDouble className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                                    Konaklama Listesi
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <StayTable stays={stays ?? []} customers={customers ?? []} rooms={rooms ?? []} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
