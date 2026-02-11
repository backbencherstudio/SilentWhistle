import { PaymentOverviewResponse } from "@/types/transactions";
import baseApi from "../baseApi";
import {
  SinglePaymentTransactionResponse,
  TransactionsResponse,
} from "@/components/dashboard/FinanceAndPaymentTable";

export const paymentsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<
      TransactionsResponse,
      { page: number; limit: number; search?: string }
    >({
      query: ({ page, limit, search }) => ({
        url: "/admin/payment-transaction",
        method: "GET",
        params: { page, limit, search },
      }),
      transformResponse: (response: TransactionsResponse) => {
        return {
          ...response,
          data: response.data.map((transaction) => ({
            ...transaction,
            user: {
              ...transaction.user,
              id: transaction.user?.id ?? "",
              name: transaction.user?.name ?? "Unknown User",
              username: transaction.user?.username ?? "N/A",
              email: transaction.user?.email ?? "N/A",
            },
            plan: {
              name: transaction.plan?.name ?? "N/A",
              interval: transaction.plan?.interval ?? "",
              price: transaction.plan?.price ?? "",
            },
            status: transaction.status ?? "Unknown",
          })),
        };
      },
      providesTags: ["TRANSACTIONS"],
    }),
    getTransactionById: builder.query<SinglePaymentTransactionResponse, string>(
      {
        query: (id) => ({
          url: `/admin/payment-transaction/${id}`,
          method: "GET",
        }),
        providesTags: (_, __, id) => [{ type: "TRANSACTIONS", id }],
      },
    ),

    getTransactionDetails: builder.query<any, string>({
      query: (id) => ({
        url: `/admin/payment-transaction/${id}`,
        method: "GET",
      }),
      providesTags: ["NOTIFICATIONS"],
    }),

    getTransactionAnalytics: builder.query<PaymentOverviewResponse, void>({
      query: () => ({
        url: "/admin/payment-transaction/analytics",
        method: "GET",
      }),
      providesTags: ["NOTIFICATIONS"],
    }),

    getSearchTransactions: builder.query<
      PaymentOverviewResponse,
      { page: number; limit: number; search?: string },
      void
    >({
      query: ({ page, limit, search }) => ({
        url: "/admin/payment-transaction",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["NOTIFICATIONS"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTransactionsQuery,
  useGetTransactionDetailsQuery,
  useGetTransactionAnalyticsQuery,
  useGetSearchTransactionsQuery,
  useGetTransactionByIdQuery,
} = paymentsApis;
