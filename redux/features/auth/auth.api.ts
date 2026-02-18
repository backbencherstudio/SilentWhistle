import baseApi from "../baseApi";
import { setCredentials } from "./auth.slice";
import {
  IForgotPasswordPayload,
  IForgotPasswordResponse,
  ILoginPayload,
  ILoginResponse,
  ILogoutResponse,
  IResendVerificationPayload,
  IResendVerificationResponse,
  IResetPasswordPayload,
  IResetPasswordResponse,
  IVerifyOtpPayload,
  IVerifyOtpResponse,
} from "./types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const token = data?.authorization?.access_token;
          const refreshToken = data?.authorization?.refresh_token;
          const role = data?.type;

          dispatch(setCredentials({ token, role, refreshToken }));
        } catch {}
      },

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

    verifyOtp: builder.mutation<IVerifyOtpResponse, IVerifyOtpPayload>({
      query: (userInfo) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: userInfo,
      }),

      invalidatesTags: ["USER"],
    }),

    resendVerfication: builder.mutation<
      IResendVerificationResponse,
      IResendVerificationPayload
    >({
      query: (userInfo) => ({
        url: "/auth/resend-verification-email",
        method: "POST",
        body: userInfo,
      }),

      invalidatesTags: ["USER"],
    }),

    resetPassword: builder.mutation<
      IResetPasswordResponse,
      IResetPasswordPayload
    >({
      query: (userInfo) => ({
        url: "/auth/reset-password",
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
  useVerifyOtpMutation,
  useResendVerficationMutation,
  useResetPasswordMutation,
} = authApi;
