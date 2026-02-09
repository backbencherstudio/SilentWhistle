import { WithStatus } from "@/types/shared";
import baseApi from "../baseApi";
import {
  IGetAllUsersParams,
  IGetAllUsersResponse,
  IGetSingleUserParams,
  IGetSingleUserResponse,
  IUser,
} from "./types";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IGetAllUsersResponse, IGetAllUsersParams>({
      query: (params) => ({
        url: "/admin/user",
        method: "GET",
        params,
      }),

      providesTags: ["USERS"],
    }),

    getSingleUserById: builder.query<
      WithStatus<IGetSingleUserResponse>,
      IGetSingleUserParams
    >({
      query: ({ id, ...params }) => ({
        url: `/admin/user/${id}`,
        method: "GET",
        params,
      }),
      providesTags: (_result, _error, { id }) => [{ type: "USERS", id }],
    }),

    deleteSingleUserById: builder.mutation<WithStatus<void>, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/user/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (_result, _error, { id }) => [
        "USERS",
        { type: "USERS", id },
      ],
    }),

    updateSingleUserById: builder.mutation<
      WithStatus<void>,
      { id: string; data: Partial<IUser> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/user/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        "USERS",
        { type: "USERS", id },
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserByIdQuery,
  useDeleteSingleUserByIdMutation,
  useUpdateSingleUserByIdMutation,
} = userManagementApi;
