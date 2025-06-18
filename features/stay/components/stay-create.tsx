"use client";

import { useActionState, useState } from "react"
import { createAccomodationAction } from "../actions"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Room } from "@/lib/generated/prisma";
import { Label } from "@/components/ui/label";
import { BedDouble, CheckCircle2, DollarSign, Home, Plus } from "lucide-react";

export function StayCreate({ rooms, customerId }: { rooms: Room[], customerId: string }) {
    const [state, formAction] = useActionState((prevState: any, formData: FormData) => createAccomodationAction(customerId, formData), null)
    const [room, setRoom] = useState<string>("");
    const [selectedRoom, setSelectedRoom] = useState("");
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

                            <Select name="roomId" value={room} onValueChange={setRoom}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Odalar" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        rooms.map((room) => (
                                            <SelectItem value={room.id} key={room.id}>{room.roomNumber}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-slate-400 disabled:to-slate-500 text-white border-0 shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] py-3 text-lg font-semibold disabled:transform-none disabled:cursor-not-allowed"
                            >
                                <BedDouble className="mr-2 h-5 w-5" />
                                Konaklamayı Kaydet
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-slate-50 to-emerald-50/50 dark:from-slate-800/50 dark:to-emerald-900/10 p-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                        Oda seçimi ve tutar bilgisi zorunludur
                        <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}