import { WithStatus } from "@/types/shared";
import baseApi from "../baseApi";
import { UserProfile } from "./types";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<WithStatus<UserProfile>, void>({
      query: () => ({
        url: "/admin/user/profile/me",
        method: "GET",
      }),
      providesTags: ["USER_PROFILE"],
    }),
    updateAdminProfileById: builder.mutation<
      WithStatus<void>,
      { id: string; profile: Partial<UserProfile> }
    >({
      query: ({ id, profile }) => ({
        url: `/admin/user/${id}`,
        method: "PATCH",
        body: profile,
      }),
      invalidatesTags: ["USER_PROFILE"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetMeQuery, useUpdateAdminProfileByIdMutation } = profileApi;
