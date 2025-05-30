import { getCustomers } from "@/features/customers/data";
import { MusteriTablosu } from "@/features/home/customer-table";
import Image from "next/image";

export default async function Home() {
  const customers = await getCustomers();
  return (
    <div>
      <h1 className="text-center text-4xl py-4 text-primary font-semibold">Hotel Customer Registration App GGG</h1>
      <h2>Burası Dashboard</h2>
    </div>
  );
}
