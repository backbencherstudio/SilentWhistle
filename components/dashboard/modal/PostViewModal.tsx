import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostViewModal = ({ open, onOpenChange }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-xs" />
      <DialogContent
        showCloseButton={false}
        className="max-w-205 border-0 bg-[#0D0F10]/95 text-white shadow-2xl rounded-2xl"
      >
        <DialogHeader hidden>
          <DialogTitle hidden className="text-center text-lg font-semibold">
            User Basic Info
          </DialogTitle>
        </DialogHeader>
        Post Content here
      </DialogContent>
    </Dialog>
  );
};

export default PostViewModal;
