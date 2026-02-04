import UserEditForm from "@/app/dashboard/user-management/_components/UserEditForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { IUser } from "@/redux/features/user-management/types";

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser | null;
}

const UserEditModal = ({ open, onOpenChange, user }: UserProfileModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-xs" />
      <DialogContent className="max-w-205 border-0 bg-[#0D0F10]/95 text-white shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            User Basic Info
          </DialogTitle>
        </DialogHeader>

        <UserEditForm
          onUpdateDone={() => onOpenChange(false)}
          id={user?.id}
          defaultValue={{
            name: user?.name,
            email: user?.email,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserEditModal;
