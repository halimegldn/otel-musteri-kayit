import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Frown className="w-10" />
            <h2 className="text-xl font-bold">404 Bulunamadı</h2>
            <p>Uygulama Bulunamadı.</p>
            <Button>
                <Link href="/project">Geri Dön</Link>
            </Button>
        </div>
    )
}