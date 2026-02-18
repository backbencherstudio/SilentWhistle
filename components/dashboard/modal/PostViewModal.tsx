"use client";

import { UserAvatar } from "@/app/dashboard/user-management/_components/UserAvatar";
import WaveformPlayer from "@/app/dashboard/user-management/_components/WaveformPlayer";
import LikeIcon from "@/components/icons/LikeIcon";
import MapPin from "@/components/icons/MapPin";
import { Button } from "@/components/ui/button";
import { showDashboardToast } from "@/components/ui/CustomToast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { getErrorMessage } from "@/lib/utils";
import { formatCount, getRelativeTime } from "@/lib/utils/formatter";
import { useDeleteShoutMutation } from "@/redux/features/shout-manage/shout-manage.api";
import { ShoutContentManagementItem } from "@/redux/features/shout-manage/types";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserDeleteModal from "./UserDeleteModal";
import { useState } from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shout?: ShoutContentManagementItem["shouts"][number];
  user?: ShoutContentManagementItem["user"];
}

const PostViewModal = ({ open, onOpenChange, shout, user }: ModalProps) => {
  const router = useRouter();

  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  const [deleteShout, { isLoading: isDeleteLoading }] =
    useDeleteShoutMutation();

  const handleDelete = async (shoutId: string) => {
    try {
      setDeleteConfirmModalOpen(false);
      onOpenChange(false);
      await deleteShout({ shoutId }).unwrap();
    } catch (err) {
      showDashboardToast({
        title: getErrorMessage(err, "Failed to delete shout"),
        variant: "error",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogOverlay className="bg-black/40 backdrop-blur-xs" />
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-4xl border-none max-h-[90svh] overflow-y-scroll bg-[#0D0F10]/95 text-white shadow-2xl rounded-2xl"
        >
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              Post Details
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-start justify-between ">
            <div className="flex items-center gap-3">
              <UserAvatar
                className="size-10"
                name={user?.name}
                avatar={user?.avatar}
              />
              <div className="flex flex-col items-start">
                <h1 className="text-lg leading-[132%] -tracking-[1%]">
                  {user?.name}
                </h1>
                <div className="flex items-center gap-1">
                  {/* <div className="flex items-center gap-1 text-[#D2D2D5]"> */}
                  {/*   <Lightbulb size={17} /> */}
                  {/*   <p>Idea</p> */}
                  {/* </div> */}
                  <div className="flex items-center gap-1 text-[#D2D2D5]">
                    <MapPin size={17} />
                    <p>{shout?.location ? shout?.location : "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="font-light text-xs leading-[132%] -tracking-[1%] text-[#D2D2D5]">
              {getRelativeTime(shout?.createdAt)}
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-5">
              <p>{shout?.content}</p>

              {/* Media */}
              <div className="space-y-4">
                {shout?.medias.map((media) => {
                  return (
                    <div key={media.id}>
                      {media.type === "IMAGE" && media.url && (
                        <div className="relative w-full h-52.5">
                          <Image
                            src={media.url}
                            alt="post image"
                            fill
                            className="object-cover rounded-xl"
                          />
                        </div>
                      )}

                      {media.type === "AUDIO" && (
                        <WaveformPlayer audioUrl={media.url} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* <div className="space-y-4"> */}
              {/*   {shout?.medias.map((media) => { */}
              {/*     return ( */}
              {/*       <div key={media.id}> */}
              {/*         {media.type === "IMAGE" && media.url && ( */}
              {/*           <div className="relative w-full h-52.5"> */}
              {/*             <Image */}
              {/*               src={media.url} */}
              {/*               alt="post image" */}
              {/*               fill */}
              {/*               className="object-cover rounded-xl" */}
              {/*             /> */}
              {/*           </div> */}
              {/*         )} */}
              {/**/}
              {/*         {media.type === "AUDIO" && ( */}
              {/*           <WaveformPlayer audioUrl={media.url} /> */}
              {/*         )} */}
              {/*       </div> */}
              {/*     ); */}
              {/*   })} */}
              {/* </div> */}
            </div>

            <DropdownMenuSeparator />

            <div className="flex items-center justify-between border-t border-t-[#474747] pt-3">
              <button className="flex items-center gap-1 transition hover:opacity-80 text-sm">
                <LikeIcon size="17" />
                <p>{formatCount(shout?.stats.likes ?? 0)}</p>
              </button>

              <div className="text-sm leading-[132%] tracking-[0.5%] flex items-center gap-1">
                <p>{formatCount(shout?.stats.comments ?? 0)} comments</p>
                <p className="text-[#484849]">•</p>
                <p>{formatCount(shout?.stats.shares ?? 0)} shares</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="green"
              onClick={() => {
                if (user?.id) {
                  router.push(`/dashboard/user-management/user/${user?.id}`);
                }
              }}
            >
              View Profile
            </Button>
            <Button
              variant="green"
              className="text-[#EB3D4D]"
              disabled={isDeleteLoading}
              onClick={() => {
                setDeleteConfirmModalOpen(true);
              }}
            >
              {isDeleteLoading ? "Deleting..." : "Delete Shout"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <UserDeleteModal
        desc="Are you sure you to Delete this Shout?"
        title="Delete shout"
        open={deleteConfirmModalOpen}
        onOpenChange={setDeleteConfirmModalOpen}
        onConfirm={() => {
          if (shout?.id) {
            onOpenChange(false);
            handleDelete(shout.id);
          }
        }}
      />
    </>
  );
};

export default PostViewModal;
