import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { startTransition } from "react";
import { deleteCustomerAction } from "../customers/actions";
import { useRouter } from "next/navigation";

export function DeleteCustomer({ customerId }: { customerId: string }) {

    const router = useRouter();
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <AlertDialogTitle className="flex items-center text-sm text-white font-normal gap-2">
                    <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                    Sil
                </AlertDialogTitle>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="dark:text-white">Müşteriyi silmek istediğinize emin misiniz?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="dark:text-white">Vazgeç</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={
                            () => (
                                startTransition(async () => {
                                    await deleteCustomerAction(customerId);
                                    router.push("/project/customers")
                                })
                            )
                        }>Sil
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}