"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WarningArea, type Customer, type Room, type Stay } from "@/lib/generated/prisma"
import { BedDouble, CircleUserRound, Edit, MoreHorizontal, Eye, XCircle, DollarSign, Calendar1Icon, CheckCircle, Star, Clock } from "lucide-react"
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
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-white/95 to-emerald-50/50 dark:from-slate-800/95 dark:to-emerald-900/20 backdrop-blur-sm shadow-2xl border border-white/20">
      <Table>
        <TableCaption className="text-slate-600 dark:text-slate-300 font-medium py-6 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
              <Star className="h-4 w-4 text-amber-500" />
              <span className="font-semibold">Toplam {stays.length} konaklama kaydı</span>
              <Star className="h-4 w-4 text-amber-500" />
              <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40 border-0">
            <TableHead className="font-bold text-slate-700 dark:text-slate-200 py-4">
              <div className="flex items-center gap-2">
                <BedDouble className="h-4 w-4" />
                Rezervasyon
              </div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <CircleUserRound className="h-4 w-4" />
                Müşteri
              </div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <BedDouble className="h-4 w-4" />
                Oda
              </div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Tutar
              </div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <Calendar1Icon className="h-4 w-4" />
                Tarih
              </div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Durum
              </div>
            </TableHead>
            <TableHead className="text-right font-bold text-slate-700 dark:text-slate-200">İşlemler</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {stays.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-16">
                <div className="flex flex-col items-center gap-6">
                  <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full shadow-lg">
                    <BedDouble className="h-12 w-12 text-slate-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                      Henüz konaklama kaydı bulunmamaktadır
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">İlk rezervasyonu oluşturarak başlayın</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            stays.map((stay, index) => {
              const customerName = customers.find((customer) => customer.id === stay.customerId)
              const roomNumberState = rooms.find((room) => room.id === stay.roomId)

              const checkoutDate = stay.checkout
                ? new Date(stay.checkout).getTime() - new Date().getTime() <= 1 * 24 * 60 * 60 * 1000
                : false

              const warningColor = checkoutDate && !manuleState[stay.id]

              return editStayId === stay.id ? (
                <TableRow
                  key={stay.id}
                  className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700"
                >
                  <TableCell colSpan={7} className="py-8">
                    <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-6 shadow-lg">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <Edit className="h-5 w-5 text-emerald-600" />
                        Konaklama Düzenle
                      </h3>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          updateClick(stay.id)
                        }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              Tutar (₺)
                            </label>
                            <Input
                              type="number"
                              value={stayPrice}
                              onChange={(e) => setStayPrice(Number(e.target.value))}
                              className="bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-600"
                              placeholder="0"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <BedDouble className="h-4 w-4" />
                              Oda Numarası
                            </label>
                            <Input
                              value={stayRoomNumber}
                              onChange={(e) => setStayRoomNumber(e.target.value)}
                              className="bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-600"
                              placeholder="101"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <Calendar1Icon className="h-4 w-4" />
                              Tarih Aralığı
                            </label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={`w-full justify-start text-left font-normal bg-white/80 dark:bg-slate-800/80 ${
                                    !dateRange?.from || !dateRange.to
                                      ? "text-slate-400 dark:text-slate-500"
                                      : "text-slate-800 dark:text-slate-200"
                                  }`}
                                >
                                  <Calendar1Icon className="mr-2 h-4 w-4" />
                                  {dateRange?.from && dateRange.to
                                    ? `${format(dateRange.from, "dd.MM.yyyy")} – ${format(dateRange.to, "dd.MM.yyyy")}`
                                    : "Tarih seçin"}
                                </Button>
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
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setEditStayId(null)}
                            className="bg-white/80 hover:bg-slate-50"
                          >
                            İptal
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
                          >
                            Kaydet
                          </Button>
                        </div>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow
                  key={stay.id}
                  className={`transition-all duration-300 border-slate-100 dark:border-slate-700 group
                                            hover:bg-gradient-to-r hover:from-emerald-50/30 hover:to-teal-50/30 
                                            dark:hover:from-emerald-900/10 dark:hover:to-teal-900/10
                                            ${warningColor ? "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20" : ""}
                                        `}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          #{index + 1}
                        </div>
                        {warningColor && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white">
                            <Clock className="h-2 w-2 text-white m-0.5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          #{stay.id.substring(0, 8)}
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        >
                          Rezervasyon
                        </Badge>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 group-hover:from-blue-100/50 group-hover:to-purple-100/50 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {customerName?.name?.charAt(0)}
                        {customerName?.surname?.charAt(0)}
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
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20 group-hover:from-emerald-100/50 group-hover:to-teal-100/50 transition-all duration-300">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                        <BedDouble className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          Oda {roomNumberState?.roomNumber}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Deluxe</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 group-hover:from-amber-100/50 group-hover:to-orange-100/50 transition-all duration-300">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
                        <DollarSign className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                          ₺{stay.price?.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Toplam</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 group-hover:from-blue-100/50 group-hover:to-cyan-100/50 transition-all duration-300">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                        <Calendar1Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {stay.checkin ? format(new Date(stay.checkin), "dd.MM.yyyy") : "-"}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {stay.checkout ? format(new Date(stay.checkout), "dd.MM.yyyy") : "-"}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 group-hover:from-purple-100/50 group-hover:to-pink-100/50 transition-all duration-300">
                      <Switch
                        id={stay.id}
                        checked={!manuleState[stay.id] && checkoutDate}
                        onCheckedChange={(checked) => {
                          setManuelState((prev) => ({
                            ...prev,
                            [stay.id]: !checked,
                          }))
                        }}
                        className="data-[state=checked]:bg-emerald-500"
                      />
                      <Label htmlFor={stay.id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {warningColor ? "Çıkış Yakın" : "Aktif"}
                      </Label>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 rounded-full"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">İşlemler</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-xl rounded-xl"
                      >
                        <DropdownMenuLabel className="text-slate-700 dark:text-slate-200 font-semibold px-4 py-2">
                          Konaklama İşlemleri
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                        <DropdownMenuItem
                          onClick={() => {
                            setEditStayId(stay.id)
                            setStayPrice(stay.price)
                            setStayRoomNumber(roomNumberState?.roomNumber || "")
                          }}
                          className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-700 dark:text-slate-200 rounded-lg mx-1"
                        >
                          <Edit className="mr-3 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-200 rounded-lg mx-1">
                          <Eye className="mr-3 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          Müşteriyi Görüntüle
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg mx-1">
                          <XCircle className="mr-3 h-4 w-4" />
                          İptal Et
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
