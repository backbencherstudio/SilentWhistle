"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type UserData = {
  id: string;
  name: string;
  username: string;
  email: string;
  status: "Active" | "Inactive";
  documentCount: number;
  joinedDate: string;
  location?: string;
  role?: string;
  totalPosts?: number;
  reportsAgainst?: number;
};

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserData | null;
}

const UserProfileModal = ({
  open,
  onOpenChange,
  user,
}: UserProfileModalProps) => {
  const router = useRouter();

  if (!user) return null;

  const data = [
    { label: "Username:", value: user.username },
    { label: "Location:", value: user.location ?? "New York, USA" },
    { label: "Email:", value: user.email },
    { label: "Role:", value: user.role ?? "Free User" },
    { label: "Join Date:", value: user.joinedDate },
    {
      label: "Total Posts:",
      value: String(user.totalPosts ?? user.documentCount),
    },
    { label: "Status:", value: user.status },
    { label: "Reports Against:", value: String(user.reportsAgainst ?? 2) },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-205 border-0 bg-[#0D0F10]/95 text-white shadow-2xl backdrop-blur-xl rounded-2xl">
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
          className="mt-8 w-full rounded-xl bg-[#0C2A16] text-[#58FF9E] hover:bg-[#0E341B] h-11 font-medium"
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
