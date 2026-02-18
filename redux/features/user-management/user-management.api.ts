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
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.id}`;
      },
      merge: (currentCache, newData, { arg }) => {
        const page = arg?.shout_page ?? 1;

        // Always update user fields
        currentCache.data = {
          ...currentCache.data,
          ...newData.data,
          shouts: currentCache.data.shouts,
        };

        // If first page or invalidation → replace shouts
        if (page === 1) {
          currentCache.data.shouts = newData.data.shouts;
          currentCache.data.shouts_meta = newData.data.shouts_meta;
          return;
        }

        // Pagination → merge shouts
        const existingIds = new Set(currentCache.data.shouts.map((s) => s.id));

        const newShouts = newData.data.shouts.filter(
          (s) => !existingIds.has(s.id),
        );

        if (newShouts.length) {
          currentCache.data.shouts.push(...newShouts);
        }

        currentCache.data.shouts_meta = newData.data.shouts_meta;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.shout_page !== previousArg?.shout_page;
      },
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
    warnUser: builder.mutation<void, { userId: string }>({
      query: ({ userId }) => ({
        url: `/admin/user/${userId}/warn`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        "USERS",
        { type: "USERS", id: userId },
      ],
    }),
    banUser: builder.mutation<void, { userId: string }>({
      query: ({ userId }) => ({
        url: `/admin/user/${userId}/ban`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        "USERS",
        { type: "USERS", id: userId },
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserByIdQuery,
  useDeleteSingleUserByIdMutation,
  useUpdateSingleUserByIdMutation,
  useWarnUserMutation,
  useBanUserMutation,
} = userManagementApi;
