import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Stay } from "@/lib/generated/prisma";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BedDouble, CircleUserRound, Edit, MoreHorizontal, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export function StayTable({ stays }: { stays: Stay[] }) {
    return (
        <div className="border-t">
            <Table>
                <TableCaption>Toplam {stays.length} konaklama kaydı bulunmaktadır.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Konaklama ID</TableHead>
                        <TableHead>Müşteri</TableHead>
                        <TableHead>Oda</TableHead>
                        <TableHead>Tutar</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stays.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                Henüz konaklama kaydı bulunmamaktadır.
                            </TableCell>
                        </TableRow>
                    ) : (
                        stays.map((stay) => (
                            <TableRow key={stay.id}>
                                <TableCell className="font-medium">#{stay.id.substring(0, 8)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <CircleUserRound />
                                        <div className="font-medium">Müşteri {stay.customerId}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <BedDouble className="h-4 w-4 text-muted-foreground" />
                                        Oda #{stay.roomId}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">₺{stay.price?.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700">
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
                                            <DropdownMenuItem>Müşteriyi Görüntüle</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">İptal Et</DropdownMenuItem>
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