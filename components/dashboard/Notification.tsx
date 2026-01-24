"use client";
import {
  useDeleteAllNotificationMutation,
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
} from "@/redux/features/notification/notifocation.api";
import NotificationCard from "./NotificationCard";

type NotificationItem = {
  id: string;
  created_at: string;
  notification_event?: {
    type?: string;
    text?: string;
  };
};

const Notification = () => {
  const { data: notifications } = useGetNotificationsQuery();
  const [deleteNotification, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();
  const [deleteAllNotification, { isLoading: isDeletingAll }] =
    useDeleteAllNotificationMutation();

  const formatEventTitle = (value: string | undefined) => {
    if (!value) {
      return "Notification";
    }
    return value
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatTimeAgo = (value: string) => {
    const created = new Date(value);
    const diffMs = Date.now() - created.getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) {
      return "just now";
    }
    if (minutes < 60) {
      return `${minutes}m ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h ago`;
    }
    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days}d ago`;
    }
    return created.toLocaleDateString();
  };

  const mapNotification = (item: NotificationItem) => {
    const rawType = item.notification_event?.type;
    const normalizedType =
      rawType?.toLowerCase() === "message"
        ? "message"
        : rawType?.toLowerCase().includes("reaction")
          ? "reaction"
          : "system";
    const icon =
      normalizedType === "reaction"
        ? "heart"
        : normalizedType === "system"
          ? "echo"
          : undefined;
    return {
      id: item.id,
      type: normalizedType as "message" | "system" | "reaction",
      icon,
      title: formatEventTitle(rawType),
      description: item.notification_event?.text ?? "",
      time: formatTimeAgo(item.created_at),
    };
  };

  const rawItems: NotificationItem[] = notifications?.data ?? [];
  const todayKey = new Date().toDateString();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayKey = yesterdayDate.toDateString();

  const todayItems = rawItems.filter(
    (item) => new Date(item.created_at).toDateString() === todayKey
  );
  const yesterdayItems = rawItems.filter(
    (item) => new Date(item.created_at).toDateString() === yesterdayKey
  );
  const olderItems = rawItems.filter((item) => {
    const dateKey = new Date(item.created_at).toDateString();
    return dateKey !== todayKey && dateKey !== yesterdayKey;
  });

  const notificationData = {
    today: todayItems.map(mapNotification),
    yesterday: [...yesterdayItems, ...olderItems].map(mapNotification),
  };

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
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="inline-flex flex-col justify-start items-start gap-2">
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
            disabled={isDeletingAll || rawItems.length === 0}
            className="px-3 py-2 text-sm text-red-500 border bg-red-500/20 border-red-500/60 rounded-lg hover:text-red-200 hover:border-red-400/60 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isDeletingAll ? "Deleting..." : "Delete all"}
          </button>
        </div>

        {/* Today */}
        <div className="mb-5">
          <h1 className="font-medium text-lg leading-[132%] -tracking-[1%] mb-3">
            Today
          </h1>
          <div className="space-y-3">
            {notificationData.today.length === 0 && (
              <div className="text-sm text-neutral-400">No notifications.</div>
            )}
            {notificationData.today.map((item) => (
              <NotificationCard
                key={item.id}
                notification={item}
                onDelete={() => handleDelete(item.id)}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-lg font-medium">Yesterday</h2>
          <div className="space-y-3">
            {notificationData.yesterday.length === 0 && (
              <div className="text-sm text-neutral-400">No notifications.</div>
            )}
            {notificationData.yesterday.map((item) => (
              <NotificationCard
                key={item.id}
                notification={item}
                onDelete={() => handleDelete(item.id)}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
