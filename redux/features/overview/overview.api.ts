import baseApi from "../baseApi";

type OverviewPeriod = "week" | "month" | "year" | "all" | undefined;

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverviewStats: builder.query<any, OverviewPeriod>({
      query: (period) => ({
        url: "/admin/dashboard/overview",
        method: "GET",
        params: period ? { period } : undefined,
      }),
      providesTags: ["OVERVIEW"],
    }),
  }),
});

export const { useGetOverviewStatsQuery } = overviewApi;
