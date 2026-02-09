import { WithStatus } from "@/types/shared";
import baseApi from "../baseApi";
import { ShoutManageItem } from "./types";

export const shoutManage = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShouts: builder.query<WithStatus<ShoutManageItem[]>, void>({
      query: () => ({
        url: "/admin/shout",
        method: "GET",
      }),
      providesTags: ["SHOUT_MANAGE"],
    }),
    getAllShoutContentManagement: builder.query<WithStatus<ShoutManageItem[]>, void>({
      query: () => ({
        url: "/admin/shout",
        method: "GET",
      }),
      providesTags: ["SHOUT_MANAGE"],
    }),
  }),
});

export const { useGetAllShoutsQuery } = shoutManage;
