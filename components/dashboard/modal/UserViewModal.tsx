"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { IUser } from "@/redux/features/user-management/types";
import { useRouter } from "next/navigation";

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser | null;
}

const UserProfileModal = ({
  open,
  onOpenChange,
  user,
}: UserProfileModalProps) => {
  const router = useRouter();

  if (!user) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  };

  const data = [
    { label: "Username:", value: user?.username },
    { label: "Phone:", value: user?.phone_number || "N/A" },
    { label: "Email:", value: user?.email },
    { label: "Role:", value: user?.type ?? "user" },
    { label: "Join Date:", value: formatDate(user?.created_at) },
    {
      label: "Account:",
      value: user?.subscription_status,
      // String(user.totalPosts ?? user.documentCount),
    },
    { label: "Status:", value: user.status },
    // {
    //   label: "Reports Against:",
    //   value: 0,
    //   // String(user.reportsAgainst ?? 2)
    // },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-xs" />
      <DialogContent className="max-w-205 border-0 bg-[#0D0F10]/95 text-white shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            User Profile
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
          {data.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-white/70">{item.label}</p>
              <p className="text-white font-medium wrap-break-word">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <Button
          className="mt-8 w-full rounded-xl bg-[#0C2A16] text-[#58FF9E] hover:bg-[#0E341B] h-11 font-medium focus-visible:outline-0 cursor-pointer"
          onClick={() => {
            onOpenChange(false);
            router.push(`/dashboard/user-management/user/${user.id}`);
          }}
        >
          View Profile
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
