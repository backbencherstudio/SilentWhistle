import baseApi from "../baseApi";
import {
  IForgotPasswordPayload,
  IForgotPasswordResponse,
  ILoginPayload,
  ILoginResponse,
  ILogoutResponse,
} from "./types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),

      invalidatesTags: ["USER"],
    }),

    adminLogout: builder.mutation<ILogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      invalidatesTags: ["USER"],
    }),

    forgotPassword: builder.mutation<
      IForgotPasswordResponse,
      IForgotPasswordPayload
    >({
      query: (userInfo) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: userInfo,
      }),

      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useForgotPasswordMutation,
} = authApi;
