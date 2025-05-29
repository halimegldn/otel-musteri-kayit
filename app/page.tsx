import { MusteriTablosu } from "@/features/home/customer-table";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-4xl text-red-600 font-semibold">Hotel Customer Registration App GGG</h1>
      <MusteriTablosu />
    </div>
  );
}
