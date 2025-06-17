"use client"

import type React from "react"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { BedDouble, Users, TrendingUp, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
          🏨 Otel Yönetimi Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-4 text-2xl font-medium">
          Müşteri Yönetim | Rezervasyon Yönetim | Oda Durumu
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div className="w-full h-96 relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Hotel Image"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Luxury Hotel & Spa</h3>
            <p className="text-lg opacity-90">Premium Konaklama Deneyimi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl">
            <div className="h-2 bg-gradient-to-r from-pink-500 to-rose-500"></div>
            <div className="flex flex-col justify-center items-center py-12 px-6 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
              <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
                Toplam Müşteri
              </span>
            </div>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl">
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            <div className="flex flex-col justify-center items-center py-12 px-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BedDouble className="h-8 w-8 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                Boş Oda
              </span>
            </div>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl">
            <div className="h-2 bg-gradient-to-r from-violet-500 to-purple-500"></div>
            <div className="flex flex-col justify-center items-center py-12 px-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
              <div className="p-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                Otel Doluluk Oranı
              </span>
            </div>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl">
            <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>
            <div className="flex flex-col justify-center items-center py-12 px-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                Raporlar
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-700 dark:to-slate-600 shadow-xl p-8 rounded-2xl flex items-center gap-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 border-0">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl shadow-lg">{icon}</div>
      <div>
        <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">{label}</p>
        <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          {value}
        </p>
      </div>
    </div>
  )
}
