import Image from "next/image";
import LoopIcon from "../icons/LoopIcon";
import LoveIcon from "../icons/LoveIcon";

interface NotificationCardProps {
  notification: {
    id: string;
    type: "message" | "system" | "reaction";
    title: string;
    description: string;
    time: string;
    highlight?: boolean;
    user?: {
      name: string;
      avatar: string;
    };
    icon?: "echo" | "heart";
  };
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <div className="bg-[#141414] p-4 rounded-3xl border-l border-transparent hover:border-l-[#38E07B] transition-all ease-in-out duration-500 flex items-start justify-between">
      <div className="flex items-center gap-3">
        {notification.user ? (
          <Image
            src={notification.user.avatar}
            alt="user image"
            width={48}
            height={48}
            className="object-cover"
          />
        ) : (
          <div className="p-3 flex items-center justify-center rounded-full bg-green-900 text-green-400">
            {notification.icon === "heart" ? <LoveIcon /> : <LoopIcon />}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-1">
            <h1 className="font-semibold text-base leading-[120%] -tracking-[1%]">
              {notification.user?.name ?? notification.title}
            </h1>
            <p className="text-sm leading-[160%] text-[#A5A5AB]">
              {notification.user && <>{notification.title}</>}
            </p>
          </div>
          <p className="text-sm font-light leading-[160%] text-[#A5A5AB]">
            {notification.description}
          </p>
        </div>
      </div>
      <p className="text-[#777980] text-sm font-light leading-[110%] -tracking-[1%]">
        {notification.time}
      </p>
    </div>
  );
};

export default NotificationCard;
