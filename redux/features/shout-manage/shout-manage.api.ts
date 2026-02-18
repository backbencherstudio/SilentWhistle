import { WithStatus } from "@/types/shared";
import baseApi from "../baseApi";
import { ShoutContentManagementItem, ShoutManageItem } from "./types";

export const shoutManage = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShouts: builder.query<WithStatus<ShoutManageItem[]>, void>({
      query: () => ({
        url: "/admin/shout",
        method: "GET",
      }),
      providesTags: ["SHOUT_MANAGE"],
    }),
    getAllShoutContentManagement: builder.query<
      WithStatus<ShoutContentManagementItem[]>,
      undefined | { startDate: string; endDate: string }
    >({
      query: (params) => ({
        url: "/admin/shout/content-management",
        method: "GET",
        params: params,
      }),
      providesTags: ["SHOUT_CONTENT_MANAGEMENT"],
    }),
    deleteShout: builder.mutation<WithStatus<void>, { shoutId: string }>({
      query: ({ shoutId }) => ({
        url: `/admin/shout/${shoutId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ shoutId }, { dispatch, queryFulfilled }) {
        const normalize = (value: string) => value.toLowerCase();

        // Optimistic cache update: Remove selected shout from /admin/shout/content-management
        const patchResult = dispatch(
          shoutManage.util.updateQueryData(
            "getAllShoutContentManagement",
            undefined,
            (draft) => {
              draft.data.forEach((user) => {
                const shout = user.shouts.find((s) => s.id === shoutId);
                if (!shout) return;

                const type = normalize(shout.type);
                const userType = normalize(shout.userType);
                const status = normalize(shout.status);

                // Remove stats data safely
                if (type in user.stats.postsType) {
                  user.stats.postsType[
                    type as keyof typeof user.stats.postsType
                  ]--;
                }
                if (userType in user.stats.userType) {
                  user.stats.userType[
                    userType as keyof typeof user.stats.userType
                  ]--;
                }
                if (status in user.stats.status) {
                  user.stats.status[status as keyof typeof user.stats.status]--;
                }

                // remove the shout
                user.shouts = user.shouts.filter((s) => s.id !== shoutId);
              });
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          // rollback if delete fails
          patchResult.undo();
        }
      },
    }),
  }),
});

// invalidatesTags: (_result, _error, { shoutId }) => [
//   "SHOUTS",
//   { type: "SHOUTS", id: shoutId },
// ],

export const {
  useGetAllShoutsQuery,
  useGetAllShoutContentManagementQuery,
  useDeleteShoutMutation,
} = shoutManage;
