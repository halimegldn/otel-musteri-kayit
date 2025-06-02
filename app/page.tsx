"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { BedDouble, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">
          🏨 Otel Yönetimi Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
          Müşteri Yönetim | Rezervasyon Yönetim | Oda Durumu
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="w-full h-96 relative rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/dashboard.jpg"
            alt="Hotel Image"
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="flex flex-row justify-center items-center py-12 text-blue-500 dark:bg-blue-100 bg-blue-200">
            <Users />
            <span>Toplam Müşteri</span>
          </Card>
          <Card className="flex flex-row justify-center items-center py-12 text-blue-500 dark:bg-blue-100 bg-blue-200">
            <BedDouble />
            <span>Boş Oda</span>
          </Card>
          <Card className="flex flex-row justify-center items-center py-12 text-blue-500 dark:bg-blue-100 bg-blue-200">
            <Users />
            <span>Otel Doluluk Oranı</span>
          </Card>
          <Card className="flex flex-row justify-center items-center py-12 text-blue-500 dark:bg-blue-100 bg-blue-200">
            <Users />
            <span>Raporlar</span>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white shadow-md p-6 rounded-xl flex items-center gap-4 hover:scale-[1.02] transition">
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
