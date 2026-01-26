import { PaymentOverviewResponse } from "@/types/transactions";
import baseApi from "../baseApi";

export const paymentsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<
      any,
      { page: number; limit: number; search?: string }
    >({
      query: ({ page, limit, search }) => ({
        url: "/admin/payment-transaction",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["TRANSACTIONS"],
    }),

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
} = paymentsApis;
