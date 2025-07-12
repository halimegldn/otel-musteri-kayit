import { getCustomers } from "@/features/customers/data";
import { ReportComponent } from "@/features/report/components/report-page";

export default async function ReportPage() {
    const customers = await getCustomers();
    return (
        <ReportComponent customers={customers || []} />
    )
}