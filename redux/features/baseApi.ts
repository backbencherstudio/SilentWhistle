import { UserService } from "@/service/user/user.service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_BASE_API_URL || "http://156.67.221.155:4011/api",
  prepareHeaders: (headers) => {
    const token = UserService.getAccessToken();
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },

  credentials: "include",
});

const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "USER",
    "USERS",
    "REPORT",
    "OVERVIEW",
    "NOTIFICATIONS",
    "TRANSACTIONS",
  ],
  endpoints: () => ({}),
});

export default baseApi;
