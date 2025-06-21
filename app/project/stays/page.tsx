import { getCustomers } from "@/features/customers/data";
import { StayTable } from "@/features/stay/components/stay-table";
import { getRooms } from "@/features/rooms/data";
import { getStays } from "@/features/stay/data";
import { Card, CardContent } from "@/components/ui/card";
import { FilterComponent } from "@/features/home/filter";
import { SearchComponent } from "@/features/home/search";
import { BedDouble, Users } from "lucide-react";

export default async function StaysHomePage() {
    const stays = await getStays();
    const customers = await getCustomers();
    const rooms = await getRooms();
    return (
        <div className="flex flex-col">
            <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-r from-white via-blue-50/50 to-purple-50/50 dark:from-slate-700/80 dark:via-blue-800/30 dark:to-purple-800/30 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
                    <CardContent className="p-8">
                        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <FilterComponent />
                                <SearchComponent />
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                                 <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 text-white rounded-full shadow-lg">
                                    <BedDouble className="h-5 w-5" />
                                    <span className="font-semibold">{stays?.length || 0} Konaklama</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            <StayTable stays={stays || []} customers={customers || []} rooms={rooms || []} />
        </div>
    )
}