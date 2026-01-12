import baseApi from "../baseApi";
import { IGetAllReportResponse, IReportGetAnalyticsResponse } from "./types";

interface IGetAllReportParams{
    page?: number;
    limit?:number;
    type?:string;
}

export const reportsModerationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReportAnalytics: builder.query<IReportGetAnalyticsResponse, void>({
            query: () => ({
                url: "/admin/reports/analytics",
                method: "GET"
            }),
            providesTags: ["REPORT"]
        }),

        getAllReports: builder.query<IGetAllReportResponse, IGetAllReportParams>({
            query: (params) => ({
                url: "/admin/reports",
                method: "GET",
                params,
            }),
            providesTags:["REPORT"]
        })
    }),
});

export const {useGetReportAnalyticsQuery, useGetAllReportsQuery} = reportsModerationApi;
