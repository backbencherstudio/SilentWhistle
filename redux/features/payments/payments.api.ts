import baseApi from "../baseApi";

export const paymentsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: "/admin/payment-transaction",
        method: "GET",
        params: { page, limit },
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

    getTransactionAnalytics: builder.query<any, void>({
      query: () => ({
        url: "/admin/payment-transaction/analytics",
        method: "GET",
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
} = paymentsApis;
