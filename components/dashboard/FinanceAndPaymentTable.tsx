"use client";

import { User } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import TablePagination from "../common/TablePagination";
import { useGetTransactionsQuery } from "@/redux/features/payments/payments.api";

interface FinanceAndPaymentTableProps {
  search?: string;
}

interface TransactionUser {
  id?: string;
  name?: string;
  username?: string;
  avatar?: string;
  email?: string;
}

interface TransactionPlan {
  name?: string;
  interval?: string;
  price?: number | string;
}

interface PaymentTransaction {
  id: string;
  transactionId?: string;
  date?: string;
  status?: string;
  amount?: number | string;
  currency?: string;
  provider?: string;
  type?: string;
  user?: TransactionUser;
  plan?: TransactionPlan;
  subscriptionStatus?: string;
}

interface TransactionMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TransactionsResponse {
  data: PaymentTransaction[];
  meta: TransactionMeta;
}

const headerColumns = [
  { label: "Name" },
  { label: "Transaction ID" },
  { label: "Date" },
  { label: "Status" },
  { label: "Amount" },
  { label: "Payment Plan" },
  { label: "Actions" },
];

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "N/A";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
};

const getStatusStyles = (status?: string) => {
  const normalized = status?.toLowerCase();
  if (normalized === "success" || normalized === "paid") {
    return { bg: "bg-[#162924]", text: "text-[#38e07b]" };
  }
  if (normalized === "failed" || normalized === "cancelled") {
    return { bg: "bg-[#2f1300]", text: "text-red-500" };
  }
  if (normalized === "pending") {
    return { bg: "bg-[#2f1300]", text: "text-[#ff8000]" };
  }
  return { bg: "bg-neutral-800", text: "text-gray-300" };
};

const formatAmount = (amount?: number | string, currency?: string) => {
  if (amount === undefined || amount === null) return "N/A";
  const numericAmount = Number(amount);
  if (Number.isNaN(numericAmount)) return "N/A";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(numericAmount);
  } catch {
    return `${numericAmount}`;
  }
};

export const FinanceAndPaymentTable = ({
  search,
}: FinanceAndPaymentTableProps): React.ReactElement => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetTransactionsQuery({
      page,
      limit,
      search: search || undefined,
    });

  const formattedTransactions = useMemo(() => {
    if (!data?.data) return [];

    return data?.data.map((transaction) => ({
      ...transaction,
      displayName: transaction.user?.name || "Unknown User",
      displayUsername: transaction.user?.username || "N/A",
      displayAvatar: transaction.user?.avatar || "",
      displayPlan: transaction.plan?.name || "N/A",
      displayStatus: transaction.status || "Unknown",
    }));
  }, [data?.data]);

  const handlePageSizeChange = (size: number) => {
    setLimit(size);
    setPage(1);
  };

  if (isError) {
    return (
      <div className="p-6 text-red-400">
        Failed to load transactions.
        <button onClick={refetch} className="underline ml-2">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full items-start bg-[#101012] rounded-xl overflow-hidden">
        <header className="flex h-14 items-center w-full bg-[#1a1a1a]">
          {headerColumns.map((column, index) => (
            <div key={index} className="flex items-center flex-1 h-full px-4.5">
              <span className="font-['Inter'] font-medium text-gray-50 text-lg">
                {column.label}
              </span>
            </div>
          ))}
        </header>

        {isLoading ? (
          <FinanceTableSkeleton />
        ) : formattedTransactions.length > 0 ? (
          formattedTransactions.map((transaction) => {
            const statusStyles = getStatusStyles(transaction.displayStatus);
            return (
              <div
                key={transaction.id}
                className="flex h-16 items-center w-full border-t border-solid border-[#212529]"
              >
                {/* Name */}
                <div className="flex-1 flex items-center gap-2 px-4.5">
                  {transaction.displayAvatar ? (
                    <div className="relative w-9 h-9 rounded-full border border-solid border-[#e3e5e6]">
                      <Image
                        src={transaction.displayAvatar}
                        alt={transaction.displayName}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <Avatar className="w-9 h-9 rounded-full border border-solid border-[#e3e5e6] bg-gray-700">
                      <AvatarFallback className="bg-gray-700 text-gray-300">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col gap-1">
                    <div className="font-['Inter'] font-medium text-white text-sm">
                      {transaction.displayName}
                    </div>
                    <div className="font-['Inter'] font-normal text-gray-400 text-xs">
                      {transaction.displayUsername}
                    </div>
                  </div>
                </div>

                {/* TransactionId */}
                <div className="flex-1 flex items-center px-4.5">
                  <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                    {transaction.transactionId || "N/A"}
                  </div>
                </div>

                {/* Date */}
                <div className="flex-1 flex items-center px-4.5">
                  <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                    {formatDate(transaction.date)}
                  </div>
                </div>

                {/* Status */}
                <div className="flex-1 flex items-center px-4.5">
                  <Badge
                    className={`inline-flex items-center justify-center gap-2.5 px-2.5 py-1.5 rounded-lg border-0 ${statusStyles.bg}`}
                  >
                    <span
                      className={`text-base font-['Inter'] font-medium ${statusStyles.text}`}
                    >
                      {transaction.displayStatus}
                    </span>
                  </Badge>
                </div>

                {/* Amount */}
                <div className="flex-1 flex items-center px-4.5">
                  <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                    {formatAmount(transaction.amount, transaction.currency)}
                  </div>
                </div>

                {/* Payment Plan */}
                <div className="flex-1 flex items-center px-4.5">
                  <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                    {transaction.displayPlan}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-1 flex items-center justify-start">
                  <button className="bg-green-600/20 px-3 py-1 rounded cursor-pointer">
                    View
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <EmptyState />
        )}
      </div>

      {data?.meta && data?.meta?.totalPages > 1 && (
        <div className="flex justify-center">
          <TablePagination
            page={page}
            totalPages={data?.meta?.totalPages ?? 1}
            onPageChange={setPage}
            pageSize={limit}
            onPageSizeChange={handlePageSizeChange}
            showRefresh
            onRefresh={!isLoading ? refetch : undefined}
            isFetching={isFetching}
          />
        </div>
      )}
    </>
  );
};
export default FinanceAndPaymentTable;

const FinanceTableSkeleton = () => (
  <>
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        className="flex h-16 items-center w-full border-t border-[#212529] animate-pulse"
      >
        {headerColumns.map((_, idx) => (
          <div key={idx} className="flex-1 px-4.5">
            <div className="h-4 bg-neutral-700 rounded w-3/4" />
          </div>
        ))}
      </div>
    ))}
  </>
);

const EmptyState = () => (
  <div className="py-12 text-center w-full text-gray-400">
    No transactions found
  </div>
);
