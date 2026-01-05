import UserEditForm from "@/app/dashboard/user-management/_components/UserEditForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserEditModal = ({ open, onOpenChange }: UserProfileModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-xs" />
      <DialogContent className="max-w-205 border-0 bg-[#0D0F10]/95 text-white shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            User Basic Info
          </DialogTitle>
        </DialogHeader>

        <UserEditForm />
      </DialogContent>
    </Dialog>
  );
};

export default UserEditModal;
