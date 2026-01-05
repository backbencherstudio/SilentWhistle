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
}

const UserDeleteModal = ({ open, onOpenChange }: UserProfileModalProps) => {
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
            <h1 className="text-lg font-medium leading-[110%]">
              Delete Account
            </h1>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col items-center">
          <p className="text-sm leading-[160%] tracking-[0.2px] text-[#E9E9EA]">
            Are you sure you to Delete this Account?
          </p>

          <div className="w-full flex items-center gap-4">
            <DialogClose asChild>
              <Button className="mt-4 w-full rounded-xl bg-[#0C2A16] text-[#E9E9EA] hover:bg-[#0E341B] h-11 font-medium focus-visible:ring-0 focus-visible:ring-offset-0">
                Cancel
              </Button>
            </DialogClose>
            <Button className=" mt-4 w-full rounded-xl bg-[#0C2A16] text-[#EB3D4D] hover:bg-[#0E341B] h-11 font-medium">
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDeleteModal;
