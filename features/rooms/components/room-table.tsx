"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Room, RoomImages, Stay } from "@/lib/generated/prisma";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Bath, CalendarIcon, Coffee, MapPin, Star, Tv, Users, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RoomTable({ rooms, stays, roomImages }: { rooms: Room[], stays: Stay[]; roomImages: RoomImages[] }) {
  const [dateRange, setDateRange] = useState<Record<string, DateRange | undefined>>({})

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header Section */}
      <div className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
              <MapPin className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Luxury Rooms</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-emerald-600 to-teal-600 dark:from-slate-200 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4">
              Oda Galerisi
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Konforlu ve modern odalarımızı keşfedin
            </p>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => {
              const roomDate = stays.find((stay) => stay.roomId === room.id)
              const defaultDateRange: DateRange | undefined = roomDate
                ? {
                    from: new Date(roomDate.checkin),
                    to: new Date(roomDate.checkout),
                  }
                : undefined

              const selectedRange = dateRange[room.id] || defaultDateRange
              const images = roomImages.filter((image) => image.roomId === room.id)
              const roomPrice = stays.find((stay) => stay.roomId === room.id)?.price || 0
              const isOccupied = !!roomDate

              return (
                <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Image Carousel */}
                  <div className="relative overflow-hidden">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {images.length > 0 ? (
                          images.map((img, index) => (
                            <CarouselItem key={index}>
                              <div className="relative">
                                <Image
                                  src={img.imageUrl || "/placeholder.svg?height=250&width=400"}
                                  alt={`Room ${room.roomNumber} - Image ${index + 1}`}
                                  width={400}
                                  height={250}
                                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                <div className="absolute top-4 right-4">
                                  <Badge variant="secondary" className="bg-white/90 text-slate-800 shadow-lg">
                                    {index + 1}/{images.length}
                                  </Badge>
                                </div>
                                {isOccupied && (
                                  <div className="absolute top-4 left-4">
                                    <Badge className="bg-red-500 text-white shadow-lg">Dolu</Badge>
                                  </div>
                                )}
                              </div>
                            </CarouselItem>
                          ))
                        ) : (
                          <CarouselItem>
                            <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
                              <div className="text-center">
                                <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                                <p className="text-slate-500 dark:text-slate-400">Görsel Yok</p>
                              </div>
                            </div>
                          </CarouselItem>
                        )}
                      </CarouselContent>
                      <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
                      <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
                    </Carousel>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                          Oda {room.roomNumber}
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400 flex items-center gap-2 mt-1">
                          <Star className="h-4 w-4 text-amber-500" />
                          Deluxe Suite
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          ₺{roomPrice.toLocaleString()}
                        </div>
                        <p className="text-sm text-slate-500">/ gece</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Date Range */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800">
                      <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Rezervasyon Tarihi</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {selectedRange?.from && selectedRange.to
                            ? `${format(selectedRange.from, "dd.MM.yyyy")} – ${format(selectedRange.to, "dd.MM.yyyy")}`
                            : "Müsait"}
                        </p>
                      </div>
                    </div>

                    {/* Room Features */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {room.customerNumber} Kişilik
                        </span>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs bg-white/50 dark:bg-slate-700/50">
                          <Wifi className="h-3 w-3 mr-1" />
                          WiFi
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-white/50 dark:bg-slate-700/50">
                          <Tv className="h-3 w-3 mr-1" />
                          TV
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-white/50 dark:bg-slate-700/50">
                          <Bath className="h-3 w-3 mr-1" />
                          Banyo
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-white/50 dark:bg-slate-700/50">
                          <Coffee className="h-3 w-3 mr-1" />
                          Minibar
                        </Badge>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      className={`w-full ${
                        isOccupied
                          ? "bg-slate-400 hover:bg-slate-500"
                          : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                      } text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                      disabled={isOccupied}
                    >
                      {isOccupied ? "Rezerve Edilmiş" : "Rezervasyon Yap"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
