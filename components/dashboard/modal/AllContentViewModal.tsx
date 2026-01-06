"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import PostViewModal from "./PostViewModal";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AllContentViewModal = ({ open, onOpenChange }: ModalProps) => {
  const [postModalOpen, setPostModalOpen] = useState(false);
  return (
    <>
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
          <div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-xl leading-[110%] -tracking-[1%]">
                Just discovered an.....
              </p>
              <Button className="bg-[#38E07B] hover:bg-[#38E07B] text-base text-[#101012]">
                View
              </Button>
            </div>
            <DropdownMenuSeparator className="bg-[#282A39] my-4" />
            <div className="flex items-center justify-between">
              <p className="font-medium text-xl leading-[110%] -tracking-[1%]">
                The traffic lights at.....
              </p>
              <Button
                onClick={() => {
                  onOpenChange(false);
                  setTimeout(() => setPostModalOpen(true), 100);
                }}
                className="bg-[#38E07B] hover:bg-[#38E07B] text-base text-[#101012]"
              >
                View
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <PostViewModal open={postModalOpen} onOpenChange={setPostModalOpen} />
    </>
  );
};

export default AllContentViewModal;
