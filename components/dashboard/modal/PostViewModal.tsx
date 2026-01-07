import LikeIcon from "@/components/icons/LikeIcon";
import MapPin from "@/components/icons/MapPin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Lightbulb } from "lucide-react";
import Image from "next/image";

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
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Post Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/dashboard/user.png"
                alt="user image"
                width={40}
                height={40}
              />
              <div className="flex flex-col items-start">
                <h1 className="text-lg leading-[132%] -tracking-[1%]">
                  Albert Dera
                </h1>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1 text-[#D2D2D5]">
                    <Lightbulb size={17} />
                    <p>Idea</p>
                  </div>
                  <div className="flex items-center gap-1 text-[#D2D2D5]">
                    <MapPin size={17} />
                    <p>Victoria Island</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="font-light text-xs leading-[132%] -tracking-[1%] text-[#D2D2D5]">
              2m ago
            </p>
          </div>

          <div className="space-y-5">
            <p>
              The traffic lights at Main Street have been broken for three days
              now. Someone needs to fix this before there&apos;s an accident!
            </p>
            <div className="relative w-full h-27.5">
              <Image
                src="/dashboard/post.png"
                alt="post image"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>

          <DropdownMenuSeparator />

          <div className="flex items-center justify-between border-t border-t-[#474747] pt-3">
            <button className="flex items-center gap-1 transition hover:opacity-80 text-sm">
              <LikeIcon size="17" />
              <p>4.8k</p>
            </button>

            <div className="text-sm leading-[132%] tracking-[0.5%] flex items-center gap-1">
              <p>12 comments</p>
              <p className="text-[#484849]">•</p>
              <p>3 shares</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostViewModal;
