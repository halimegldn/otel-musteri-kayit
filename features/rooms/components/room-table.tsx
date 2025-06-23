"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Room, RoomImages, Stay } from "@/lib/generated/prisma";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { se } from "date-fns/locale";
import Image from "next/image";

export function RoomTable({ rooms, stays, roomImages }: { rooms: Room[], stays: Stay[]; roomImages: RoomImages[] }) {

    const [dateRange, setDateRange] = useState<Record<string, DateRange | undefined>>({})

    return (
        <div className="grid grid-cols-3 gap-10 px-32 py-10">
            {
                rooms.map((room) => {
                    const roomDate = stays.find((stay) => stay.roomId === room.id);

                    // Bu alan stay tablsounun checkin-checkout değerlerini almak için roomDate id değerine göre çekildi ve roomDate from kısmı checkin to kısmı checkout a atıyor.
                    const defaultDateRange: DateRange | undefined = roomDate
                        ? {
                            from: new Date(roomDate.checkin),
                            to: new Date(roomDate.checkout),
                        }
                        : undefined;

                    const selectedRange = dateRange[room.id] || defaultDateRange;
                    const images = roomImages.filter((image) => image.roomId === room.id);
                    return (
                        <Card key={room.id} className="w-5/6">
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                                <CardAction>Card Action</CardAction>
                            </CardHeader>
                            <CardContent>
                                <p>{room.roomNumber}</p>
                                {
                                    images.length > 0 ? (

                                        images.map((img) => (
                                            <Image
                                                key={img.id}
                                                src={img.imageUrl}
                                                alt={img.id}
                                                width={300}
                                                height={200}
                                                className="rounded-lg mb-4"
                                            />
                                        ))

                                    ) : (
                                        <p className="text-slate-500 dark:text-slate-400">No images available</p>
                                    )
                                }
                            </CardContent>
                            <CardFooter>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            id="date-range"
                                            type="button"
                                            className={`min-w-[220px] text-left pl-10 pr-3 py-2 rounded-lg border bg-white/50 dark:bg-slate-800/50 border-slate-200
                                                                          dark:border-slate-600 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 ${!selectedRange?.from || !selectedRange.to
                                                    ? "text-slate-400 dark:text-slate-500"
                                                    : "text-slate-800 dark:text-slate-200"
                                                }`}
                                        >
                                            {selectedRange?.from && selectedRange.to
                                                ? `${format(selectedRange.from, "dd.MM.yyyy")} – ${format(selectedRange.to, "dd.MM.yyyy")}`
                                                : "Tarih Aralığı Seçin"}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 mt-2">
                                        <Calendar
                                            mode="range"
                                            selected={selectedRange}
                                            onSelect={(range) => setDateRange(prev => ({ ...prev, [room.id]: range }))}
                                            className="rounded-lg border"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </CardFooter>
                        </Card>
                    );
                })
            }
        </div>
    )
}