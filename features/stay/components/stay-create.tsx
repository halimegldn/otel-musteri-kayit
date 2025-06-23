"use client";

import { useActionState, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Room } from "@/lib/generated/prisma";
import { Label } from "@/components/ui/label";
import { BedDouble, Calendar1Icon, CheckCircle2, DollarSign, Home, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { createStayAction } from "../actions";

export function StayCreate({ avilableRooms, customerId }: { avilableRooms: Room[], customerId: string }) {
    const [state, formAction] = useActionState((prevState: any, formData: FormData) => createStayAction(customerId, formData), null)
    const [room, setRoom] = useState<string>("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);


    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-800/50 dark:to-emerald-900/10 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
                            <Plus className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Yeni Konaklama Ekle</h2>
                            <p className="text-slate-600 dark:text-slate-400">Konaklama bilgilerini doldurun</p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <form action={formAction} className="space-y-8">
                        {/* Price Input */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="price"
                                className="text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2"
                            >
                                <div className="p-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded">
                                    <DollarSign className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                                </div>
                                Oda Tutarı
                            </Label>
                            <div className="relative">
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="0"
                                    className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-amber-500/20 transition-all duration-300 pl-12 text-lg font-semibold"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 dark:text-amber-400 font-bold">
                                    ₺
                                </div>
                            </div>
                        </div>

                        {/* Room Selection */}
                        <div className="space-y-4">
                            <Label className="text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2">
                                <div className="p-1 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded">
                                    <Home className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                Oda Seçimi
                            </Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {avilableRooms.map((room) => (
                                    <div key={room.id} className="relative">
                                        <Input
                                            type="radio"
                                            id={`room-${room.id}`}
                                            name="roomId"
                                            value={room.id}
                                            checked={selectedRoom === room.id}
                                            onChange={(e) => setSelectedRoom(e.target.value)}
                                            className="sr-only"
                                        />
                                        <Label
                                            htmlFor={`room-${room.id}`}
                                            className={`
                                                block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105
                                                ${selectedRoom === room.id
                                                    ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 shadow-lg"
                                                    : "border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 hover:border-emerald-300 dark:hover:border-emerald-600"
                                                }
                                            `}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex justify-between items-center gap-5">
                                                        <BedDouble />
                                                        <div>
                                                            <div className="font-bold text-slate-800 dark:text-slate-200">Oda {room.roomNumber}</div>
                                                            <div className="text-sm text-slate-500 dark:text-slate-400">Standart Oda</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {selectedRoom === room.id && (
                                                    <div className="text-emerald-500">
                                                        <CheckCircle2 className="h-6 w-6" />
                                                    </div>
                                                )}
                                            </div>
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Kayıt Tarih Aralığı */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="date-range"
                                className="text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2"
                            >
                                <div className="p-1 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded">
                                    <Calendar1Icon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                Kayıt Tarih Aralığı
                            </Label>

                            <div className="relative">
                                {/* Hidden input’larımız burada kalacak */}
                                {dateRange?.from && dateRange.to && (
                                    <>
                                        <input type="hidden" name="startDate" value={dateRange.from.toISOString()} />
                                        <input type="hidden" name="endDate" value={dateRange.to.toISOString()} />
                                    </>
                                )}

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            id="date-range"
                                            type="button"
                                            className={` w-full text-left pl-10 pr-3 py-2 rounded-lg border bg-white/50 dark:bg-slate-800/50 border-slate-200
                                                 dark:border-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 ${!dateRange?.from || !dateRange.to
                                                    ? "text-slate-400 dark:text-slate-500"
                                                    : "text-slate-800 dark:text-slate-200"}`}
                                        >
                                            {dateRange?.from && dateRange.to
                                                ? `${format(dateRange.from, "dd.MM.yyyy")} – ${format(dateRange.to, "dd.MM.yyyy")}`
                                                : "Tarih Aralığı Seçin"}
                                        </button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="range"
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            className="rounded-lg border"
                                        />
                                    </PopoverContent>
                                </Popover>

                                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <Calendar1Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            </div>
                        </div>

                        {dateRange?.from && dateRange.to && (
                            <>
                                <input
                                    type="hidden"
                                    name="startDate"
                                    value={dateRange.from.toISOString()}
                                />
                                <input
                                    type="hidden"
                                    name="endDate"
                                    value={dateRange.to.toISOString()}
                                />
                            </>
                        )}
                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={!selectedRoom}
                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-slate-400 disabled:to-slate-500 text-white border-0 shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] py-3 text-lg font-semibold disabled:transform-none disabled:cursor-not-allowed"
                            >
                                <BedDouble className="mr-2 h-5 w-5" />
                                Konaklamayı Kaydet
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}