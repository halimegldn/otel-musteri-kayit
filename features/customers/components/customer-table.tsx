"use client";

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updateCustomerAction } from "../actions"
import type { Customer } from "@/lib/generated/prisma"
import { Edit, Mail, MoreHorizontal, Phone, Trash2, Eye, UserCheck } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

export function CustomersTable({ customers }: { customers: Customer[] }) {

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
        <div className="rounded-xl overflow-hidden bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800/50 dark:to-blue-900/10 backdrop-blur-sm">
            <Table>
                <TableCaption className="text-slate-600 dark:text-slate-300 font-medium py-4">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        Toplam {customers.length} müşteri kaydı bulunmaktadır.
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 border-0">
                        <TableHead className="font-bold text-slate-700 dark:text-slate-200 w-[180px]">Ad Soyad</TableHead>
                        <TableHead className="font-bold text-slate-700 dark:text-slate-200">İletişim Bilgileri</TableHead>
                        <TableHead className="font-bold text-slate-700 dark:text-slate-200">Adres</TableHead>
                        <TableHead className="font-bold text-slate-700 dark:text-slate-200">Telefon</TableHead>
                        <TableHead className="text-right font-bold text-slate-700 dark:text-slate-200">İşlemler</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-12">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full">
                                        <UserCheck className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">Henüz müşteri kaydı bulunmamaktadır.</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        customers.map((customer, index) => (

                            editCustomer === customer.id ?
                                (
                                    <TableRow
                                        key={customer.id}
                                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-300 border-slate-100 dark:border-slate-700"
                                    >
                                        <TableCell colSpan={5}>
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    updateClick(customer.id);
                                                }}
                                                className="flex items-center gap-4"
                                            >
                                                <Input
                                                    value={customerFullName}
                                                    onChange={(e) => setCustomerFullName(e.target.value)}
                                                // className="w-[200px]"
                                                />
                                                {/* <Input
                                                    value={customerSurname}
                                                    onChange={(e) => setCustomerSurname(e.target.value)}
                                                /> */}
                                                <Input
                                                    value={customerMail}
                                                    onChange={(e) => setCustomerMail(e.target.value)}
                                                />
                                                <Input
                                                    value={customerPhone}
                                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                                />
                                                <Input
                                                    value={customerAddress}
                                                    onChange={(e) => setCustomerAddress(e.target.value)}
                                                />
                                                <Button variant="ghost" onClick={() => setEditCustomer(null)}>
                                                    İptal
                                                </Button>
                                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                                                    Kaydet
                                                </Button>
                                            </form>
                                        </TableCell>
                                    </TableRow>
                                ) :
                                (
                                    < TableRow
                                        key={customer.id}
                                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-300 border-slate-100 dark:border-slate-700"
                                    >
                                        <TableCell className="font-semibold text-slate-800 dark:text-slate-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                    {customer.name.charAt(0)}
                                                    {customer.surname.charAt(0)}
                                                </div>
                                                {customer.name} {customer.surname}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                                                    <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <span className="text-slate-600 dark:text-slate-300">{customer.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate text-slate-600 dark:text-slate-300">
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded">
                                                    <Phone className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                                </div>
                                                <span className="text-slate-600 dark:text-slate-300">{customer.phone}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate text-slate-600 dark:text-slate-300">
                                            {customer.address}
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
                                                            setEditCustomer(customer.id)
                                                            setCustomerFullName(`${customer.name} ${customer.surname}`)
                                                            setCustomerMail(customer.email)
                                                            setCustomerPhone(customer.phone ?? "")
                                                            setCustomerAddress(customer.address ?? "")
                                                        }}
                                                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-200">
                                                        <Edit className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                        Düzenle
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="hover:bg-purple-50 dark:hover:bg-purple-900/20 text-slate-700 dark:text-slate-200">
                                                        <Eye className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                        Konaklamaları Görüntüle
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Sil
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )

                        ))
                    )}
                </TableBody>
            </Table>
        </div >
    )
}
