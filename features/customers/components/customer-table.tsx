"use client";

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updateCustomerAction } from "../actions"
import type { Customer } from "@/lib/generated/prisma"
import { Edit, Mail, MoreHorizontal, Phone, Trash2, Eye, UserCheck, Star, MapPin } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { DeleteCustomer } from "@/features/home/delete-customer";
import { Badge } from "@/components/ui/badge";

export function CustomersTable({ customers, customerId }: { customers: Customer[]; customerId: string }) {
 const [editCustomer, setEditCustomer] = useState<string | null>(null)
    const [customerFullName, setCustomerFullName] = useState("");
    const [customerMail, setCustomerMail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    const [customerName, ...res] = customerFullName.trim().split(" ");
    const customerSurname = res.join(" ");

    const updateClick = async (customerId: string) => {
        const formData = new FormData();
        formData.set("name", customerName || "");
        formData.set("surname", customerSurname || "");
        formData.set("email", customerMail);
        formData.set("phone", customerPhone);
        formData.set("address", customerAddress);

        try {
            await updateCustomerAction(customerId, null, formData);
            setEditCustomer(null);

        } catch (error) {
            console.log("Müşteri güncellenemedi", error);
        }
    }

  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-white/95 to-blue-50/50 dark:from-slate-800/95 dark:to-blue-900/20 backdrop-blur-sm shadow-2xl border border-white/20">
      <Table>
        <TableCaption className="text-slate-600 dark:text-slate-300 font-medium py-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <Star className="h-4 w-4 text-amber-500" />
              <span className="font-semibold">Toplam {customers.length} müşteri kaydı</span>
              <Star className="h-4 w-4 text-amber-500" />
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/40 dark:hover:to-purple-900/40 border-0">
            <TableHead className="font-bold text-slate-700 dark:text-slate-200 w-[200px] py-4">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Müşteri Bilgileri
              </div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                İletişim
              </div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Telefon
              </div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Adres
              </div>
            </TableHead>
            <TableHead className="text-right font-bold text-slate-700 dark:text-slate-200">İşlemler</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-16">
                <div className="flex flex-col items-center gap-6">
                  <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full shadow-lg">
                    <UserCheck className="h-12 w-12 text-slate-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                      Henüz müşteri kaydı bulunmamaktadır
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">İlk müşterinizi ekleyerek başlayın</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer, index) =>
              editCustomer === customer.id ? (
                <TableRow
                  key={customer.id}
                  className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700"
                >
                  <TableCell colSpan={5} className="py-6">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        updateClick(customer.id)
                      }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Ad Soyad</label>
                          <Input
                            value={customerFullName}
                            onChange={(e) => setCustomerFullName(e.target.value)}
                            className="bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-600"
                            placeholder="Ad Soyad"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">E-posta</label>
                          <Input
                            value={customerMail}
                            onChange={(e) => setCustomerMail(e.target.value)}
                            className="bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-600"
                            placeholder="E-posta adresi"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Telefon</label>
                          <Input
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-600"
                            placeholder="Telefon numarası"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Adres</label>
                          <Input
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-600"
                            placeholder="Adres bilgisi"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditCustomer(null)}
                          className="bg-white/80 hover:bg-slate-50"
                        >
                          İptal
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                        >
                          Kaydet
                        </Button>
                      </div>
                    </form>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow
                  key={customer.id}
                  className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-300 border-slate-100 dark:border-slate-700 group"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {customer.name.charAt(0)}
                          {customer.surname.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200 text-lg">
                          {customer.name} {customer.surname}
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          Müşteri #{index + 1}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 group-hover:from-blue-100/50 group-hover:to-purple-100/50 transition-all duration-300">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                        <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{customer.email}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20 group-hover:from-emerald-100/50 group-hover:to-teal-100/50 transition-all duration-300">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                        <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{customer.phone}</span>
                    </div>
                  </TableCell>

                  <TableCell className="max-w-[200px]">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 group-hover:from-amber-100/50 group-hover:to-orange-100/50 transition-all duration-300">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
                        <MapPin className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                        {customer.address}
                      </span>
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
                          Müşteri İşlemleri
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                        <DropdownMenuItem
                          onClick={() => {
                            setEditCustomer(customer.id)
                            setCustomerFullName(`${customer.name} ${customer.surname}`)
                            setCustomerMail(customer.email)
                            setCustomerPhone(customer.phone ?? "")
                            setCustomerAddress(customer.address ?? "")
                          }}
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-200 rounded-lg mx-1"
                        >
                          <Edit className="mr-3 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-purple-50 dark:hover:bg-purple-900/20 text-slate-700 dark:text-slate-200 rounded-lg mx-1">
                          <Eye className="mr-3 h-4 w-4 text-purple-600 dark:text-purple-400" />
                          Konaklamaları Görüntüle
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg mx-1">
                          <DeleteCustomer customerId={customer.id} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ),
            )
          )}
        </TableBody>
      </Table>
    </div>
  )
}
