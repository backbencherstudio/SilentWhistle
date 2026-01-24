import { UserService } from "@/service/user/user.service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
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
  tagTypes: ["USER", "REPORT", "OVERVIEW","NOTIFICATIONS"],
  endpoints: () => ({}),
});

export default baseApi;
