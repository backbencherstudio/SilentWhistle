import { formatDate } from "@/lib/utils/formatter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";
import { PaymentTransaction } from "./FinanceAndPaymentTable";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: PaymentTransaction;
}

export default function FinanceAndPaymentDialog({
  open,
  onOpenChange,
  transaction,
}: ModalProps) {
  const data = [
    // User Info
    { label: "Full Name", value: transaction?.user?.name ?? "Unknown User" },
    { label: "User Name", value: transaction?.user?.username ?? "N/A" },
    { label: "Email", value: transaction?.user?.email ?? "N/A" },
    { label: "Status", value: transaction?.status ?? "Unknown" },

    // Payment Info
    { label: "Transaction ID", value: transaction?.transactionId ?? "N/A" },
    { label: "Payment Type", value: transaction?.type ?? "N/A" },
    { label: "Payment Gateway", value: transaction?.provider ?? "N/A" },

    // Plan Info
    { label: "Payment Plan", value: transaction?.plan?.name ?? "N/A" },
    { label: "Plan Interval", value: transaction?.plan?.interval ?? "N/A" },
    { label: "Plan Price", value: transaction?.plan?.price ?? "N/A" },
    {
      label: "Subscription Status",
      value: transaction?.subscriptionStatus ?? "N/A",
    },

    // Dates
    { label: "Payment Date", value: formatDate(transaction?.date) },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-xs" />
      <DialogContent
        showCloseButton={false}
        className="border-0 sm:max-w-2xl bg-[#0D0F10]/95  shadow-2xl rounded-2xl"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-white text-lg font-semibold border-b pb-3 border-[#242424]">
            Payment Method Details
          </DialogTitle>
        </DialogHeader>
        <section className="grid grid-cols-2">
          {data.map((item) => (
            <div
              key={item.label}
              className="border-b py-4 border-[#242424] first:pt-0"
            >
              <p className="text-[#B2B5B8]">{item.label}</p>
              <p className="text-[#DFE1E7]">{item.value}</p>
            </div>
          ))}
        </section>
      </DialogContent>
    </Dialog>
  );
}
