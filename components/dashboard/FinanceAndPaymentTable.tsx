"use client";

import { UserAvatar } from "@/app/dashboard/user-management/_components/UserAvatar";
import { useGetTransactionsQuery } from "@/redux/features/payments/payments.api";
import React, { Dispatch, SetStateAction, useState } from "react";
import TablePagination from "../common/TablePagination";
import { Badge } from "../ui/badge";
import FinanceAndPaymentDialog from "./FinanceAndPaymentDialog";
import { EmptyTableState, UserTableSkeleton } from "./UserTable";

interface FinanceAndPaymentTableProps {
  search?: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
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

export interface PaymentTransaction {
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

export interface SinglePaymentTransactionResponse {
  id: string;
  transactionId?: string;
  date?: string;
  status?: string;
  amount?: number | string;
  currency?: string;
  provider?: string;
  type?: string;
  user?: TransactionUser | null;
  subscription?: any | null; // adjust if you have subscription type
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
  page,
  setPage,
}: FinanceAndPaymentTableProps): React.ReactElement => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetTransactionsQuery({
      page,
      limit,
      search: search || undefined,
    });

  const transactions = data?.data || [];

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
      <div className="w-full bg-[#101012] rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-[#1a1a1a] h-14">
            <tr>
              {headerColumns.map((column, index) => (
                <th
                  key={index}
                  className="text-left px-4.5 font-['Inter'] font-medium text-gray-50 text-lg"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <UserTableSkeleton cols={headerColumns.length} />
            ) : transactions.length > 0 ? (
              transactions.map((transaction, index) => {
                const statusStyles = getStatusStyles(transaction.status);

                return (
                  <tr
                    key={transaction.id}
                    className="h-16 border-t border-solid border-[#212529]"
                  >
                    {/* Name */}
                    <td className="px-4.5">
                      <div className="flex items-center gap-2">
                        <UserAvatar
                          className="size-9"
                          avatar={transaction.user?.avatar}
                          name={transaction.user?.name}
                        />
                        <div className="flex flex-col gap-1">
                          <div className="font-['Inter'] font-medium text-white text-sm">
                            {transaction.user?.name}
                          </div>
                          <div className="font-['Inter'] font-normal text-gray-400 text-xs">
                            {transaction.user?.username}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Transaction ID */}
                    <td className="px-4.5 font-['Inter'] font-medium text-gray-50 text-sm">
                      {transaction.transactionId || "N/A"}
                    </td>

                    {/* Date */}
                    <td className="px-4.5 font-['Inter'] font-medium text-gray-50 text-sm">
                      {formatDate(transaction.date)}
                    </td>

                    {/* Status */}
                    <td className="px-4.5">
                      <Badge
                        className={`inline-flex items-center justify-center gap-2.5 px-2.5 py-1.5 rounded-lg border-0 ${statusStyles.bg}`}
                      >
                        <span
                          className={`text-base font-['Inter'] font-medium ${statusStyles.text}`}
                        >
                          {transaction.status}
                        </span>
                      </Badge>
                    </td>

                    {/* Amount */}
                    <td className="px-4.5 font-['Inter'] font-medium text-gray-50 text-sm">
                      {formatAmount(transaction.amount, transaction.currency)}
                    </td>

                    {/* Payment Plan */}
                    <td className="px-4.5 font-['Inter'] font-medium text-gray-50 text-sm">
                      {transaction?.plan?.name}
                    </td>

                    {/* Actions */}
                    <td className="px-4.5">
                      <button
                        onClick={() => {
                          setDetailsModalOpen(true);
                          setSelectedRowIndex(index);
                        }}
                        className="bg-green-600/20 px-3 py-1 rounded cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={headerColumns.length}>
                  <EmptyTableState msg="No transactions found" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

      <FinanceAndPaymentDialog
        transaction={transactions[selectedRowIndex]}
        open={detailsModalOpen}
        onOpenChange={(v) => setDetailsModalOpen(v)}
      />
    </>
  );
};
export default FinanceAndPaymentTable;
