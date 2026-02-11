import { UserAvatar } from "@/app/dashboard/user-management/_components/UserAvatar";
import { getRelativeTime } from "@/lib/utils/formatter";
import { NotificationItem } from "@/redux/features/notification/types";
import { LucideLoader } from "lucide-react";
import { MdDelete } from "react-icons/md";
import LoopIcon from "../icons/LoopIcon";

interface NotificationCardProps {
  notification: NotificationItem;
  onDelete?: () => void;
  isDeleting?: boolean;
}

const formatEventTitle = (value: string | undefined) => {
  if (!value) {
    return "Notification";
  }
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const NotificationCard = ({
  notification,
  onDelete,
  isDeleting,
}: NotificationCardProps) => {
  return (
    <div className="bg-[#141414] p-4 rounded-3xl border-l border-transparent hover:border-l-[#38E07B] transition-all ease-in-out duration-500 flex items-start justify-between">
      <div className="flex items-center gap-3">
        {notification.sender ? (
          <UserAvatar
            className="size-12"
            avatar={notification.sender?.avatar}
            name={notification.sender?.name}
          />
        ) : (
          <div className="size-12 flex items-center justify-center rounded-full bg-green-900 text-green-400">
            <LoopIcon />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-1">
            <h1 className="font-semibold text-base leading-[120%] -tracking-[1%]">
              {notification?.sender?.name ??
                formatEventTitle(notification?.notification_event?.type)}
            </h1>
          </div>
          <p className="text-sm font-light leading-[160%] text-[#A5A5AB]">
            {notification?.notification_event?.text}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="text-[#777980] text-sm font-light leading-[110%] -tracking-[1%]">
          {getRelativeTime(notification.created_at)}
        </p>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="p-1 rounded text-xs bg-red-500/20 text-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <p>
                <LucideLoader size={24} className="animate-spin" />
              </p>
            ) : (
              <MdDelete size={24} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
