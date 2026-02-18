import { WithStatus } from "@/types/shared";
import baseApi from "../baseApi";
import { GroupedNotifications, NotificationItem } from "./types";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const notificationApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<GroupedNotifications[], void>({
      query: () => ({
        url: "/admin/notification",
        method: "GET",
      }),
      transformResponse: (response: WithStatus<NotificationItem[]>) => {
        const grouped: Record<string, NotificationItem[]> = {};

        response.data.forEach((notification) => {
          const date = dayjs(notification.created_at);

          let key = "";

          if (date.isToday()) {
            key = "Today";
          } else if (date.isYesterday()) {
            key = "Yesterday";
          } else {
            key = date.format("MMM DD, YYYY");
          }

          if (!grouped[key]) {
            grouped[key] = [];
          }

          grouped[key].push(notification);
        });

        // Convert object to array
        return Object.entries(grouped).map(([title, items]) => ({
          title,
          items,
        }));
      },

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
