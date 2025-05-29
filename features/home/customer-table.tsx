import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Customer } from "@/lib/generated/prisma";

export function MusteriTablosu({ customers }: { customers: Customer[] }) {
    return (
        <div>
            <Table>
                <TableCaption>OTEL MÜŞTERİ KAYIT TABLOSU</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Ad</TableHead>
                        <TableHead>Soyad</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Telefon</TableHead>
                        <TableHead>Adres</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell >{customer.name}</TableCell>
                                <TableCell>{customer.surname}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell className="text-right">Icon</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </div>
    )
}