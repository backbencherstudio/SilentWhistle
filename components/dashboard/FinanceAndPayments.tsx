"use client";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import FinanceAndPaymentStats from "./FinanceAndPaymentStats";
import FinanceAndPaymentTable from "./FinanceAndPaymentTable";
import { useGetTransactionAnalyticsQuery } from "@/redux/features/payments/payments.api";

const FinanceAndPayments = () => {
  const { data: analytics } = useGetTransactionAnalyticsQuery();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <div className="text-white">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        {/* Title and Description */}
        <div className="inline-flex flex-col justify-start items-start gap-2">
          <div className="text-gray-50 text-xl font-semibold font-['Inter'] leading-8">
            Finance & Payments
          </div>
          <div className="text-neutral-300 text-base font-['Inter'] leading-4">
            Welcome back! Here&apos;s what&apos;s happening today.
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="flex-1 lg:flex-initial lg:w-96 h-10 px-4 py-2.5 bg-neutral-900 rounded-lg inline-flex justify-start items-center gap-1.5">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search users or shouts..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (page !== 1) setPage(1);
              }}
              className="flex-1 bg-transparent border-0 outline-0 text-zinc-400 text-base font-['Inter'] leading-4 placeholder:text-zinc-400"
            />
          </div>

          {/* Today Filter */}
          <Button
            variant="outline"
            onClick={() => {
              // Handle Today filter
              console.log("Today filter clicked");
            }}
            className="inline-flex items-center justify-center gap-2 p-3 h-10 bg-[#101012] rounded-lg border border-solid border-[#2c2d35] hover:bg-[#101012] hover:text-white min-w-25 cursor-pointer"
          >
            <span className="font-['Inter'] font-normal text-white text-xs">
              Today
            </span>
            <ChevronDown className="w-4 h-4 text-white shrink-0" />
          </Button>
        </div>
      </div>
      <div className="mb-6">
        <FinanceAndPaymentStats analytics={analytics} />
      </div>
      <div>
        <div className="w-full overflow-x-auto">
          <FinanceAndPaymentTable setPage={setPage} page={page} search={search} />
        </div>
      </div>
    </div>
  );
};

export default FinanceAndPayments;
