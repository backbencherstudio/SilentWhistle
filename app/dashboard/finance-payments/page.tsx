"use client";

import DashboardLayout from "@/components/common/DashboardLayout";
import FinanceAndPayments from "@/components/dashboard/FinanceAndPayments";

export default function FinanceAndPaymentPage() {
  return (
    <DashboardLayout>
      <div className="p-6 w-full">
        <FinanceAndPayments />
      </div>
    </DashboardLayout>
  );
}
