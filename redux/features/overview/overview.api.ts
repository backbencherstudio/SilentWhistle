import baseApi from "../baseApi";
import {
  IDashboartOverviewPeriodParams,
  IDashboartOverviewPeriodResponse,
} from "./overview.types";

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverviewStats: builder.query<
      IDashboartOverviewPeriodResponse,
      IDashboartOverviewPeriodParams | void
    >({
      query: (params) => ({
        url: "/admin/dashboard/overview",
        method: "GET",
        params: params ? params : undefined,
      }),
      providesTags: ["OVERVIEW"],
    }),
  }),
});

export const { useGetOverviewStatsQuery } = overviewApi;
