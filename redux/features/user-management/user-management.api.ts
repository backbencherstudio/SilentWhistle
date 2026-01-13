import baseApi from "../baseApi";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/user",
        method: "GET",
      }),

      providesTags: ["USER"],
    }),
  }),
});

export const { useGetAllUsersQuery } = userManagementApi;
