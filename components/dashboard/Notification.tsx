"use client";
import {
  useDeleteAllNotificationMutation,
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
} from "@/redux/features/notification/notifocation.api";
import NotificationCard from "./NotificationCard";

const Notification = () => {
  const { data: groupedNotifications, isLoading } = useGetNotificationsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  const [deleteNotification, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();
  const [deleteAllNotification, { isLoading: isDeletingAll }] =
    useDeleteAllNotificationMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllNotification().unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-white">
      <div className="mb-5">
        {/* Title and Description */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="inline-flex flex-col justify-start items-start gap-1">
            <div className="text-gray-50 text-xl font-semibold font-['Inter'] leading-8">
              Notifications Management
            </div>
            <div className="text-neutral-300 text-base font-['Inter'] leading-4">
              Manage global notifications sent to users
            </div>
          </div>
          <button
            type="button"
            onClick={handleDeleteAll}
            disabled={
              isDeletingAll || isDeleting || groupedNotifications?.length === 0
            }
            className="px-3 py-2 text-sm text-red-500 border bg-red-500/20 border-red-500/60 rounded-lg hover:text-red-200 hover:border-red-400/60 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isDeletingAll || isDeleting ? "Deleting..." : "Delete all"}
          </button>
        </div>
        {/* <div className="bg-[#141414] h-20 rounded-3xl  flex items-start justify-between"></div> */}

        {groupedNotifications?.map((group) => (
          <div className="space-y-3 mt-2" key={group.title}>
            <h3 className="text-lg font-medium">{group.title}</h3>

            {group.items.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onDelete={() => handleDelete(notification.id)}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
