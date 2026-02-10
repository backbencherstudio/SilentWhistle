import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  avatar?: string | null;
  name?: string;
  className?: string;
  imageClassName?: string;
  iconClassName?: string;
}

export function UserAvatar({
  avatar,
  name = "User",
  className,
  imageClassName,
  iconClassName = "size-5",
}: UserAvatarProps) {
  const baseClasses =
    "size-17 rounded-full border border-solid border-[#212529]";

  if (avatar) {
    return (
      <div className={cn("relative", baseClasses, className)}>
        <Image
          src={avatar}
          alt={name}
          fill
          className={cn("object-cover rounded-full", imageClassName)}
        />
      </div>
    );
  }

  return (
    <Avatar className={cn(baseClasses, "bg-gray-700", className)}>
      <AvatarFallback className="bg-gray-700 text-gray-300">
        <User className={cn("size-8", iconClassName)} />
      </AvatarFallback>
    </Avatar>
  );
}
