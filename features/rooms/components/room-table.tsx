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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Star } from "lucide-react";

export function RoomTable({ rooms, stays, roomImages }: { rooms: Room[], stays: Stay[]; roomImages: RoomImages[] }) {

    const [dateRange, setDateRange] = useState<Record<string, DateRange | undefined>>({})

    return (
        <div className="grid grid-cols-3 gap-10 px-32 py-10">
            {rooms.map((room) => {
                const roomDate = stays.find((stay) => stay.roomId === room.id)

                // Bu alan stay tablsounun checkin-checkout değerlerini almak için roomDate id değerine göre çekildi ve roomDate from kısmı checkin to kısmı checkout a atıyor.
                const defaultDateRange: DateRange | undefined = roomDate
                    ? {
                        from: new Date(roomDate.checkin),
                        to: new Date(roomDate.checkout),
                    }
                    : undefined

                const selectedRange = dateRange[room.id] || defaultDateRange
                const images = roomImages.filter((image) => image.roomId === room.id)
                const roomPrice = stays.find((stay) => stay.roomId === room.id)?.price || 0;
                return (
                    <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="relative">
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {images.length > 0 ? (
                                        images.map((img, index) => (
                                            <CarouselItem key={index}>
                                                <div className="relative">
                                                    <Image
                                                        src={img.imageUrl || "/placeholder.svg"}
                                                        alt={img.id}
                                                        width={300}
                                                        height={200}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                    <div className="absolute top-2 right-2">
                                                        <Badge variant="secondary" className="bg-white/90 text-black">
                                                            {index + 1}/{images.length}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))
                                    ) : (
                                        <CarouselItem>
                                            <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                                                <p className="text-slate-500 dark:text-slate-400">No images available</p>
                                            </div>
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                            </Carousel>
                        </div>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl">ODA {room.roomNumber}</CardTitle>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-500">${roomPrice}</div>
                                </div>
                            </div>
                            <CardDescription className="text-gray-600">Otel Odası</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/70 dark:bg-zinc-800/70 min-w-[220px]">
                                    <CalendarIcon className="w-4 h-4 text-zinc-500" />
                                    <span className="text-sm text-slate-800 dark:text-slate-200">
                                        {selectedRange?.from && selectedRange.to
                                            ? `${format(selectedRange.from, "dd.MM.yyyy")} – ${format(selectedRange.to, "dd.MM.yyyy")}`
                                            : "Tarih Aralığı Yok"}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <Badge variant="outline" className="text-xs">
                                        {room.customerNumber} Kişilik
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}