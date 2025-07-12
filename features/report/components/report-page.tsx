"use client";

import { Customer } from "@/lib/generated/prisma";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'


export function ReportComponent({ customers }: { customers: Customer[] }) {
    const totalCustomers = customers.length;

    // Her tarih için müşteri sayısı tutar
    const count: { [date: string]: number } = {};

    const rawDates = customers.map((customer) =>
        new Date(customer.createdAt).toISOString().split("T")[0]
    );

    // Aynı tarihte gelen müşterileri sayar
    rawDates.map((sayi) => {
        count[sayi] = (count[sayi] || 0) + 1;
    })

    // Countı grafik için { date, sayi } objelerine dönüştürür
    const data = Object.entries(count).map((([date, sayi]) => ({
        date,
        sayi,
    })))

    return (
        <div className="flex flex-col items-center gap-4 p-4 max-w-md mx-auto">
            <h3 className="font-bold text-2xl text-green-600">Günlük Rapor</h3>
            <div className="w-full h-64 bg-gray-100 rounded-md p-3">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="sayi" fill="#4ade80" radius={3} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

    );
}