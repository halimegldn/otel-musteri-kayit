"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WarningArea, type Customer, type Room, type Stay } from "@/lib/generated/prisma"
import { BedDouble, CircleUserRound, Edit, MoreHorizontal, Eye, XCircle, DollarSign, Calendar1Icon } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react"
import { updateStayAction } from "../actions";
import { format, set } from "date-fns";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


export function StayTable({ stays, customers, rooms }: { stays: Stay[]; customers: Customer[]; rooms: Room[] }) {

    const [editStayId, setEditStayId] = useState<string | null>();
    const [stayPrice, setStayPrice] = useState(0);
    const [stayRoomNumber, setStayRoomNumber] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
    const [warningArea, setWarningArea] = useState<{ [id: string]: boolean }>({});
    const [manuleState, setManuelState] = useState<{ [id: string]: boolean }>({});

    const updateClick = async (customerId: string) => {
        const selectedRoom = rooms.find((room) => room.roomNumber === stayRoomNumber) // roomNumber eğer stayRoomNumber değerine eşitse bul ve selectedRoom'a ata

        const formData = new FormData();
        formData.set("price", stayPrice.toString());
        formData.set("roomId", selectedRoom?.id || "");
        if (dateRange?.from) {
            formData.set("checkin", dateRange.from.toISOString());
        }
        if (dateRange?.to) {
            formData.set("checkout", dateRange.to.toISOString());
        }

        try {
            await updateStayAction(customerId, null, formData);
            setEditStayId(null);
        } catch (error) {

        }
    }


    return (
        <div className="rounded-xl overflow-hidden bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-800/50 dark:to-emerald-900/10 backdrop-blur-sm">
            <Table>
                <TableCaption className="text-slate-600 dark:text-slate-300 font-medium py-4">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                        Toplam {stays.length} konaklama kaydı bulunmaktadır.
                        <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30 border-0">
                        <TableHead className="font-bold text-slate-700 dark:text-slate-200">Konaklama ID</TableHead>
                        <TableHead className="font-bold text-slate-700 dark:text-slate-200">Müşteri</TableHead>
                        <TableHead className="font-bold text-slate-700 dark:text-slate-200">Oda</TableHead>
                        <TableHead className="font-bold text-slate-700 dark:text-slate-200">Tutar</TableHead>
                        <TableHead className="font-bold text-slate-700 dark:text-slate-200">Tarih</TableHead>
                        <TableHead className="font-bold text-slate-700 dark:text-slate-200">Oda Durumu</TableHead>
                        <TableHead className="text-right font-bold text-slate-700 dark:text-slate-200">İşlemler</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stays.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-12">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full">
                                        <BedDouble className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                                        Henüz konaklama kaydı bulunmamaktadır.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        stays.map((stay) => {
                            const customerName = customers.find((customer) => customer.id === stay.customerId)
                            const roomNumberState = rooms.find((room) => room.id === stay.roomId)

                            const checkoutDate = stay.checkout ?
                                (new Date(stay.checkout).getTime() - new Date().getTime()) <= (1 * 24 * 60 * 60 * 1000) :
                                false;

                            // bg red ayarlaması için manuel olarak kapatılmış odalar için
                            const warningColor = checkoutDate && !manuleState[stay.id];


                            return (
                                editStayId === stay.id ? (
                                    <TableRow
                                        key={stay.id}
                                        className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 dark:hover:from-emerald-900/10 dark:hover:to-teal-900/10 transition-all duration-300 border-slate-100 dark:border-slate-700"
                                    >
                                        <TableCell colSpan={6} className="py-6">
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    updateClick(stay.id);
                                                }}
                                                className="flex flex-wrap gap-4 items-center justify-between"
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm text-slate-600 dark:text-slate-300 font-medium">Tutar (₺)</label>
                                                    <Input
                                                        value={stayPrice}
                                                        onChange={(e) => setStayPrice(Number(e.target.value))}
                                                        className="w-36"
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm text-slate-600 dark:text-slate-300 font-medium">Oda Numarası</label>
                                                    <Input
                                                        value={stayRoomNumber}
                                                        onChange={(e) => setStayRoomNumber(e.target.value)}
                                                        className="w-36"
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm text-slate-600 dark:text-slate-300 font-medium">Tarih Aralığı</label>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <button
                                                                id="date-range"
                                                                type="button"
                                                                className={`min-w-[220px] text-left pl-10 pr-3 py-2 rounded-lg border bg-white/50 dark:bg-slate-800/50 border-slate-200
                                                                          dark:border-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 ${!dateRange?.from || !dateRange.to
                                                                        ? "text-slate-400 dark:text-slate-500"
                                                                        : "text-slate-800 dark:text-slate-200"
                                                                    }`}
                                                            >
                                                                {dateRange?.from && dateRange.to
                                                                    ? `${format(dateRange.from, "dd.MM.yyyy")} – ${format(dateRange.to, "dd.MM.yyyy")}`
                                                                    : "Tarih Aralığı Seçin"}
                                                            </button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0 mt-2">
                                                            <Calendar
                                                                mode="range"
                                                                selected={dateRange}
                                                                onSelect={setDateRange}
                                                                className="rounded-lg border"
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>

                                                <div className="flex gap-2 mt-6">
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        onClick={() => setEditStayId(null)}
                                                        className="rounded-lg"
                                                    >
                                                        İptal
                                                    </Button>
                                                    <Button type="submit" className="rounded-lg">
                                                        Kaydet
                                                    </Button>
                                                </div>
                                            </form>
                                        </TableCell>
                                    </TableRow>

                                ) : (<TableRow

                                    key={stay.id}
                                    className={`transition-all duration-300 border-slate-100 dark:border-slate-700
        hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 
        dark:hover:from-emerald-900/10 dark:hover:to-teal-900/10
        ${warningColor ? "bg-red-600 dark:bg-red-400" : ""}
    `}
                                >
                                    <TableCell className="font-semibold text-slate-800 dark:text-slate-200">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                                #
                                            </div>
                                            #{stay.id.substring(0, 8)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
                                                <CircleUserRound className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                    {customerName?.name} {customerName?.surname}
                                                </div>
                                                <div className="text-sm text-slate-500 dark:text-slate-400">Müşteri</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg">
                                                <BedDouble className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                    Oda {roomNumberState?.roomNumber}
                                                </div>
                                                <div className="text-sm text-slate-500 dark:text-slate-400">Standart</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded">
                                                <DollarSign className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <span className="font-bold text-lg bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                                                ₺{stay.price?.toLocaleString()}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg">
                                                <Calendar1Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                    {stay.checkin
                                                        ? format(new Date(stay.checkin), "dd.MM.yyyy")
                                                        : "-"}
                                                </div>
                                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                                    {stay.checkout
                                                        ? format(new Date(stay.checkout), "dd.MM.yyyy")
                                                        : "-"}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2" >
                                            <Switch
                                                id={stay.id}
                                                checked={!manuleState[stay.id] && checkoutDate}
                                                onCheckedChange={(checked) => {
                                                    setManuelState((prev) => ({
                                                        ...prev,
                                                        [stay.id]: !checked, // checked false ise manuel olarak kapatılmış demek
                                                    }))
                                                }}
                                            />
                                            <Label htmlFor={`room-status-${stay.id}`}>Oda Durumu</Label>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">İşlemler</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                                            >
                                                <DropdownMenuLabel className="text-slate-700 dark:text-slate-200 font-semibold">
                                                    İşlemler
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                                                <DropdownMenuItem

                                                    onClick={() => {
                                                        setEditStayId(stay.id);
                                                        setStayPrice(stay.price);
                                                        setStayRoomNumber(roomNumberState?.roomNumber || "");
                                                    }}

                                                    className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-700 dark:text-slate-200">
                                                    <Edit className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                                    Düzenle
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-200">
                                                    <Eye className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                    Müşteriyi Görüntüle
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    İptal Et
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>)

                            )
                        })
                    )}
                </TableBody>
            </Table>
        </div >
    )
}
