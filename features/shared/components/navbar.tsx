import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { BedDouble, Bell, HelpCircle, Menu, User } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
    return (
        <div className="border-b dark:border-white/20 border-black/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2">
                        <BedDouble className="h-6 w-6" />
                        <span className="font-bold text-lg">Otel Yönetim</span>
                    </div>
                    <div className="hidden md:flex items-center ml-6 gap-6">
                        <Link href="/" className="text-sm font-medium">
                            Ana Sayfa
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Müşteriler
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Konaklamalar
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Odalar
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Raporlar
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="sr-only">Notifications</span>
                    </Button>

                    <Button variant="ghost" size="icon">
                        <HelpCircle className="h-5 w-5" />
                        <span className="sr-only">Help</span>
                    </Button>

                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>HG</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                Profil
                            </DropdownMenuItem>
                            <DropdownMenuItem>Ayarlar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Çıkış Yap</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}