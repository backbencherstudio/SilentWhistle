"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShoutContentManagementItem } from "@/redux/features/shout-manage/types";
import { useState } from "react";
import PostViewModal from "./PostViewModal";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedContent?: ShoutContentManagementItem;
}

const AllContentViewModal = ({
  open,
  onOpenChange,
  selectedContent,
}: ModalProps) => {
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [selectedShoutIndex, setSelectedShoutIndex] = useState(-1);
  function onPostModalChange(v: boolean) {
    setPostModalOpen(v);
    if (v === false) {
      onOpenChange(true);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogOverlay className="bg-black/40 backdrop-blur-xs" />
        <DialogContent
          showCloseButton={false}
          className="border-0 sm:max-w-5xl bg-[#0D0F10]/95  shadow-2xl rounded-2xl"
        >
          <DialogHeader hidden>
            <DialogTitle hidden className="text-center text-lg font-semibold">
              User Basic Info
            </DialogTitle>
          </DialogHeader>
          <Table className="w-full table-fixed border-y border-[#212529]">
            {/* selectedContent?.shouts.length ? ( */}
            <TableBody className="divide-[#212529] text-white  divide-y">
              {Array.isArray(selectedContent?.shouts) &&
              selectedContent?.shouts.length ? (
                selectedContent?.shouts.map((item, rowIndex) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-transparent [&>td:first-child]:pl-3 [&>td:last-child]:pr-3"
                    // className={`cursor-pointer odd:bg-[#141417] even:bg-[#101012] text-white hover:bg-[#1d1d22]  transition-colors`}
                  >
                    {/* Title */}
                    <td className="py-3">
                      <p className="font-medium line-clamp-2 text-xl leading-[110%] -tracking-[1%]">
                        {item.content.length > 15
                          ? `${item.content.slice(0, 30)}...`
                          : item.content}
                      </p>
                    </td>

                    {/* Location */}
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1">
                        <span>
                          <MapPin className="size-5" />
                        </span>
                        <span className="line-clamp-1">
                          {item.location ? item.location : "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Stats */}
                    <td className="py-3 pr-4">
                      <PostStats stats={item.stats} />
                    </td>

                    {/* Action */}
                    <td className="py-3 text-right">
                      <Button
                        onClick={() => {
                          onOpenChange(false);
                          setSelectedShoutIndex(rowIndex);
                          setTimeout(() => setPostModalOpen(true), 100);
                        }}
                        className="bg-[#38E07B] hover:bg-[#38E07B] cursor-pointer text-base text-[#101012]"
                      >
                        View
                      </Button>
                    </td>
                  </TableRow>
                ))
              ) : (
                <EmptyTableState msg="No shouts available" />
              )}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <PostViewModal
        user={selectedContent?.user}
        shout={selectedContent?.shouts[selectedShoutIndex]}
        open={postModalOpen}
        onOpenChange={onPostModalChange}
      />
    </>
  );
};

export default AllContentViewModal;

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MapPin, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { EmptyTableState } from "../UserTable";

type Stats = {
  likes: number;
  comments: number;
  shares: number;
};

type PostStatsProps = {
  stats: Stats;
};

export const STAT_ITEMS = [
  {
    key: "likes",
    icon: ThumbsUp,
  },
  {
    key: "comments",
    icon: MessageCircle,
  },
  {
    key: "shares",
    icon: Share2,
  },
] as const;

export const PostStats = ({ stats }: PostStatsProps) => {
  return (
    <div className="inline-flex items-center gap-2">
      {STAT_ITEMS.map(({ key, icon: Icon }) => (
        <div
          key={key}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5",
            "rounded-lg bg-[#1c1c1c] text-gray-200",
          )}
        >
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{stats[key]}</span>
        </div>
      ))}
    </div>
  );
};
