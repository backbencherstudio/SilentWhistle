import baseApi from "../baseApi";
import {
  IGetAllReportResponse,
  IGetSingleReportParams,
  IReportGetAnalyticsResponse,
  ISingleReportResponse,
} from "./types";

interface IGetAllReportParams {
  page?: number;
  limit?: number;
  type?: string;
}

export const reportsModerationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportAnalytics: builder.query<IReportGetAnalyticsResponse, void>({
      query: () => ({
        url: "/admin/reports/analytics",
        method: "GET",
      }),
      providesTags: ["REPORT"],
    }),

    getAllReports: builder.query<IGetAllReportResponse, IGetAllReportParams>({
      query: (params) => ({
        url: "/admin/reports",
        method: "GET",
        params,
      }),
      providesTags: ["REPORT"],
    }),

    getSingleReport: builder.query<
      ISingleReportResponse,
      IGetSingleReportParams
    >({
      query: ({ id, type }) => ({
        url: `/admin/reports/${id}`,
        method: "GET",
        params: { type },
      }),

      providesTags: ["REPORT"],
    }),

    warnUserFromReport: builder.mutation({
      query: (body) => ({
        url: "/admin/reports/warn",
        method: "POST",
        body,
      }),

      invalidatesTags: ["USER", "REPORT"],
    }),
  }),
});

export const {
  useGetReportAnalyticsQuery,
  useGetAllReportsQuery,
  useGetSingleReportQuery,
} = reportsModerationApi;
