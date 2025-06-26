import { CustomersTable } from "@/features/customers/components/customer-table"
import { getCustomers } from "@/features/customers/data"
import { StayTable } from "@/features/stay/components/stay-table"
import { getRooms } from "@/features/rooms/data"
import { getStays } from "@/features/stay/data"
import { SearchComponent } from "@/features/home/search"
import { FilterComponent } from "@/features/home/filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BedDouble, TrendingUp, Calendar, Star, MapPin } from 'lucide-react'

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
        name: searchParams.name || undefined,
        surname: searchParams.surname || undefined,
        email: searchParams.email || undefined,
        customerId: searchParams.customerId || undefined,
        roomNumber: searchParams.roomNumber || undefined,
        price: searchParams.price ? Number(searchParams.price) : undefined,
    }

    const customers = await getCustomers(searchQuery, filters)
    const stays = await getStays(searchQuery, filters)

    // Calculate some stats
    const totalRevenue = stays?.reduce((sum, stay) => sum + (stay.price || 0), 0) || 0
    const occupiedRooms = stays?.length || 0
    const occupancyRate = rooms?.length ? Math.round((occupiedRooms / rooms.length) * 100) : 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 px-6 py-8 max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
                        <Star className="h-6 w-6 text-amber-500" />
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Luxury Hotel Management</span>
                    </div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-slate-200 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Müşteri ve konaklama bilgilerinizi modern ve kullanıcı dostu arayüzle yönetin
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Toplam Müşteri</p>
                                    <p className="text-3xl font-bold">{customers?.length || 0}</p>
                                </div>
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <Users className="h-8 w-8" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium">Aktif Konaklama</p>
                                    <p className="text-3xl font-bold">{stays?.length || 0}</p>
                                </div>
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <BedDouble className="h-8 w-8" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-amber-100 text-sm font-medium">Toplam Gelir</p>
                                    <p className="text-3xl font-bold">₺{totalRevenue.toLocaleString()}</p>
                                </div>
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <TrendingUp className="h-8 w-8" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm font-medium">Doluluk Oranı</p>
                                    <p className="text-3xl font-bold">%{occupancyRate}</p>
                                </div>
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <Calendar className="h-8 w-8" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Enhanced Search and Filter */}
                <Card className="mb-8 border-0 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                            <div className="flex items-center gap-4 w-full lg:w-auto">
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                                    <MapPin className="h-5 w-5 text-blue-500" />
                                    <span className="font-semibold">Arama & Filtreleme</span>
                                </div>
                                <div className="flex gap-3">
                                    <FilterComponent />
                                    <SearchComponent />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                                    <Users className="h-4 w-4" />
                                    <span className="font-semibold">{customers?.length || 0} Müşteri</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                                    <BedDouble className="h-4 w-4" />
                                    <span className="font-semibold">{stays?.length || 0} Konaklama</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Grid */}
                <div className="flex flex-col gap-8">
                    {/* Customers Table */}
                    <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                        <CardHeader className="pb-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                        Müşteri Listesi
                                    </span>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                                        Tüm müşteri bilgilerini görüntüleyin ve yönetin
                                    </p>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <CustomersTable customers={customers ?? []} customerId={filters.customerId ?? ""} />
                        </CardContent>
                    </Card>

                    {/* Stays Table */}
                    <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
                        <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20">
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                                    <BedDouble className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                                        Konaklama Listesi
                                    </span>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                                        Rezervasyonları takip edin ve yönetin
                                    </p>
                                </div>
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
