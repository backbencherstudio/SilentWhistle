import baseApi from "../baseApi";
import {
  IGetAllUsersParams,
  IGetAllUsersResponse,
  IGetSingleUserParams,
  IGetSingleUserResponse,
} from "./types";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IGetAllUsersResponse, IGetAllUsersParams>({
      query: (params) => ({
        url: "/admin/user",
        method: "GET",
        params,
      }),

      providesTags: ["USER"],
    }),

    getSingleUserById: builder.query<
      IGetSingleUserResponse,
      IGetSingleUserParams
    >({
      query: ({ id, ...params }) => ({
        url: `/admin/user/${id}`,
        method: "GET",
        params,
      }),

      providesTags: ["USER"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetSingleUserByIdQuery } =
  userManagementApi;
