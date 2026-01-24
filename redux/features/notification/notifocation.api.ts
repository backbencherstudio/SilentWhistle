import baseApi from "../baseApi";

export const notificationApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<any, void>({
      query: () => ({
        url: "/admin/notification",
        method: "GET",
      }),
      providesTags: ["NOTIFICATIONS"],
    }),

    deleteNotification: builder.mutation<any, string>({
      query: (id) => ({
        url: `/admin/notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NOTIFICATIONS"],
    }),

    deleteAllNotification: builder.mutation<any, void>({
      query: () => ({
        url: `/admin/notification`,
        method: "DELETE",
      }),
      invalidatesTags: ["NOTIFICATIONS"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
  useDeleteAllNotificationMutation,
} = notificationApis;
