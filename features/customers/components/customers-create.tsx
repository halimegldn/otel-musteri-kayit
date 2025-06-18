"use client";

import { useActionState } from "react"
import { createCustomerAction } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Save, User, UserPlus } from "lucide-react";

export function CustomersCreate() {
    const [state, formAction] = useActionState(createCustomerAction, null);
    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800/50 dark:to-blue-900/10 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                            <UserPlus className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Yeni Müşteri Ekle</h2>
                            <p className="text-slate-600 dark:text-slate-400">Müşteri bilgilerini doldurun</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="p-6">
                    <form action={formAction} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Ad */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="name"
                                    className="text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2"
                                >
                                    <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                                        <User className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    Müşteri Adı
                                </Label>
                                <Input
                                    name="name"
                                    id="name"
                                    type="text"
                                    placeholder="Müşteri Adı"
                                    className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 transition-all duration-300"
                                />
                            </div>

                            {/* Soyad */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="surname"
                                    className="text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2"
                                >
                                    <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded">
                                        <User className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    Müşteri Soyadı
                                </Label>
                                <Input
                                    name="surname"
                                    id="surname"
                                    type="text"
                                    placeholder="Müşteri Soyadı"
                                    className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500/20 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2"
                            >
                                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                                    <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                </div>
                                Müşteri Mail
                            </Label>
                            <Input
                                name="email"
                                id="email"
                                type="email"
                                placeholder="ornek@email.com"
                                className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 transition-all duration-300"
                            />
                        </div>

                        {/* Telefon */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="phone"
                                className="text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2"
                            >
                                <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded">
                                    <Phone className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                </div>
                                Müşteri Telefon
                            </Label>
                            <Input
                                name="phone"
                                id="phone"
                                type="text"
                                placeholder="+90 555 123 45 67"
                                className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500/20 transition-all duration-300"
                            />
                        </div>

                        {/* Adres */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="address"
                                className="text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2"
                            >
                                <div className="p-1 bg-orange-100 dark:bg-orange-900/30 rounded">
                                    <MapPin className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                                </div>
                                Müşteri Adres
                            </Label>
                            <Input
                                name="address"
                                id="address"
                                type="text"
                                placeholder="Tam adres bilgisi"
                                className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-orange-500/20 transition-all duration-300"
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] py-3 text-lg font-semibold"
                            >
                                <Save className="mr-2 h-5 w-5" />
                                Müşteriyi Kaydet
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}