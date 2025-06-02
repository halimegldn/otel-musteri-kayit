import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Customer } from "@/lib/generated/prisma";
import { Edit, Mail, MoreHorizontal, Phone } from "lucide-react";

export function CustomersTable({ customers }: { customers: Customer[] }) {
    return (
        <div className="border-t">
            <Table>
                <TableCaption>Toplam {customers.length} müşteri kaydı bulunmaktadır.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[180px]">Ad Soyad</TableHead>
                        <TableHead>İletişim Bilgileri</TableHead>
                        <TableHead>Adres</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                Henüz müşteri kaydı bulunmamaktadır.
                            </TableCell>
                        </TableRow>
                    ) : (
                        customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell className="font-medium">
                                    {customer.name} {customer.surname}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center gap-1 text-sm">
                                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                            {customer.email}
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                            {customer.phone}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                    {customer.address}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
                                        Aktif
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">İşlemler</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Düzenle
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>Konaklamaları Görüntüle</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}