import DeleteIcon from "@/components/icons/DeleteIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  desc?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
}

const UserDeleteModal = ({
  open,
  onOpenChange,
  desc = "Are you sure you to Delete this Account?",
  onConfirm,
  isLoading = false,
}: UserProfileModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-xs" />
      <DialogContent
        showCloseButton={false}
        className="max-w-205 border-0 bg-[#0D0F10]/95 text-white shadow-2xl rounded-2xl flex flex-col items-center gap-3"
      >
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-3.25">
            <div className="bg-[#003515] px-4 py-3.5 rounded-full w-fit">
              <DeleteIcon />
            </div>
            <span className="text-lg font-medium leading-[110%]">
              Delete Account
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col items-center">
          <p className="text-sm leading-[160%] tracking-[0.2px] text-[#E9E9EA] text-center">
            {desc}
          </p>

          <div className="w-full flex items-center gap-4">
            <DialogClose asChild>
              <Button className="mt-4 w-full rounded-xl bg-[#0C2A16] text-[#E9E9EA] hover:bg-[#0E341B] h-11 font-medium focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className=" mt-4 w-full rounded-xl bg-[#0C2A16] text-[#EB3D4D] hover:bg-[#0E341B] h-11 font-medium cursor-pointer disabled:opacity-60"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDeleteModal;
