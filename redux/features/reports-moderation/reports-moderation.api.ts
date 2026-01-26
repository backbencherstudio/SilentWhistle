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

    updateRepostStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/reports/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["REPORT"],
    }),

    warnUserFromReport: builder.mutation({
      query: (body) => ({
        url: "/admin/reports/warn",
        method: "POST",
        body,
      }),

      invalidatesTags: ["USER", "REPORT"],
    }),

    removeWarnFromReport: builder.mutation({
      query: (body) => ({
        url: "/admin/reports/remove-warning",
        method: "POST",
        body,
      }),

      invalidatesTags: ["USER", "REPORT"],
    }),

    banUser: builder.mutation({
      query: (body) => ({
        url: "/admin/reports/ban",
        method: "POST",
        body,
      }),

      invalidatesTags: ["USER", "REPORT"],
    }),

    UnBanUser: builder.mutation({
      query: (body) => ({
        url: "/admin/reports/unban",
        method: "POST",
        body,
      }),

      invalidatesTags: ["USER", "REPORT"],
    }),

    repostSendToUser: builder.mutation({
      query: (body) => ({
        url: "/admin/reports/message",
        method: "POST",
        body,
      }),
      invalidatesTags: ["USER", "REPORT"],
    }),

    deleteReport: builder.mutation({
      query: (id) => ({
        url: `/admin/reports/${id}`,  
        method: "DELETE",
      }),
      invalidatesTags: ["REPORT"],
    }),

  }),
  overrideExisting: true,
});

export const {
  useGetReportAnalyticsQuery,
  useGetAllReportsQuery,
  useUpdateRepostStatusMutation,
  useWarnUserFromReportMutation,
  useRemoveWarnFromReportMutation,
  useBanUserMutation,
  useUnBanUserMutation,
  useRepostSendToUserMutation,
  useDeleteReportMutation,
  useGetSingleReportQuery,
} = reportsModerationApi;
