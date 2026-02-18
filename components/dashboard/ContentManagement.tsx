"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGetAllShoutContentManagementQuery } from "@/redux/features/shout-manage/shout-manage.api";
import { ChevronDown, Search, User } from "lucide-react";
import React, { useState } from "react";
import { DateRangeSelect } from "../common/DateRangeSelect";
import { PostTypesCell } from "../common/PostTypesCell";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AllContentViewModal from "./modal/AllContentViewModal";
import { EmptyTableState, UserTableSkeleton } from "./UserTable";

export interface UserData {
  id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
  status: "Active" | "Inactive";
  documentCount: number;
  joinedDate: string;
}

export const ContentManagement = (): React.ReactElement => {
  const [contentViewModal, setContentViewModalOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);

  const [range, setRange] = useState<
    undefined | { startDate: string; endDate: string }
  >(undefined);
  const {
    data,
    isLoading: shoutsAllContentDataIsLoading,
    isFetching: shoutsAllContentDataIsFetching,
  } = useGetAllShoutContentManagementQuery(range);
  const shoutsAllContentData = data?.data || [];

  return (
    <div className="w-full">
      {/* Header Section with Search and Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Title and Description */}
        <div className="inline-flex flex-col justify-start items-start gap-2">
          <div className="text-gray-50 text-xl font-semibold font-['Inter'] leading-8">
            Content Management
          </div>
          <div className="text-neutral-300 text-base font-['Inter'] leading-4">
            Review, moderate, and manage all posts.
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
          {/* Search Bar */}
          {/* <div className="flex-1 lg:flex-initial lg:w-96 h-10 px-4 py-2.5 bg-neutral-900 rounded-lg inline-flex justify-start items-center gap-1.5"> */}
          {/*   <Search className="w-5 h-5 text-zinc-400 shrink-0" /> */}
          {/*   <input */}
          {/*     type="text" */}
          {/*     placeholder="Search users or shouts..." */}
          {/*     className="flex-1 bg-transparent border-0 outline-0 text-zinc-400 text-base font-['Inter'] leading-4 placeholder:text-zinc-400" */}
          {/*   /> */}
          {/* </div> */}

          {/* Today Filter */}
          <DateRangeSelect
            onChange={(range) => {
              setRange(range ?? undefined);
            }}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <div className="flex flex-col w-full items-start bg-[#101012] rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="h-14 border-0 border-b border-[#212529] hover:bg-transparent">
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Author
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Shouts/Post
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  User Type
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Status
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {shoutsAllContentDataIsLoading ||
              shoutsAllContentDataIsFetching ? (
                <UserTableSkeleton cols={5} rows={5} />
              ) : shoutsAllContentData.length ? (
                shoutsAllContentData.map((row, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <TableRow
                      key={index}
                      className={`h-16 border-t border-[#212529] cursor-pointer ${
                        isEven ? "bg-[#101012]" : "bg-[#141417]"
                      } hover:bg-[#1d1d22] transition-colors`}
                      onClick={() => {
                        setContentViewModalOpen(true);
                        setSelectedRowIndex(index);
                      }}
                    >
                      <TableCell className="p-0">
                        <div className="flex items-center gap-2 px-4.5">
                          <Avatar className="w-9 h-9 rounded-full border border-solid border-[#e6e3e3] bg-gray-700">
                            <AvatarFallback className="bg-gray-700 text-gray-300">
                              <User className="w-5 h-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-1">
                            <div className="font-medium text-white text-sm font-['Inter']">
                              {row.user.name}
                            </div>
                            <div className="font-['Inter'] font-normal text-gray-400 text-xs">
                              {row.user.username}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-0">
                        <PostTypesCell stats={row.stats} />
                      </TableCell>
                      <TableCell className="p-0">
                        <StyledBadges
                          data={row.stats.userType}
                          styles={{
                            profile: "bg-[#162924] text-[#38e07b]",
                            anonymous: "bg-[#1E0040] text-[#A800FF]",
                          }}
                        />
                      </TableCell>
                      <TableCell className="p-0">
                        <StyledBadges
                          data={row.stats.status}
                          styles={{
                            published: "bg-[#162924] text-[#38e07b]",
                            flagged: "bg-[#3f0005] text-[#ff0012]",
                          }}
                        />
                      </TableCell>
                      <TableCell className="p-0">
                        <div className="pl-8">
                          <ChevronDown className="text-gray-400" />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <EmptyTableState />
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AllContentViewModal
        selectedContent={shoutsAllContentData[selectedRowIndex]}
        open={contentViewModal}
        onOpenChange={setContentViewModalOpen}
      />

      {/* <UserProfileModal */}
      {/*   open={profileOpen} */}
      {/*   onOpenChange={setProfileOpen} */}
      {/*   user={selectedUser} */}
      {/* /> */}
      {/**/}
      {/* <UserEditModal */}
      {/*   user={selectedUser} */}
      {/*   open={editOpen} */}
      {/*   onOpenChange={setEditOpen} */}
      {/* /> */}
    </div>
  );
};

type StyledBadgesProps<T extends Record<string, number>> = {
  data: T;
  styles?: Partial<Record<keyof T, string>>;
};

export const StyledBadges = <T extends Record<string, number>>({
  data,
  styles = {},
}: StyledBadgesProps<T>) => {
  return (
    <div className="inline-flex items-center gap-2">
      {Object.entries(data).map(([key, value]) => (
        <Badge
          key={key}
          className={cn(
            "px-2 py-2 rounded-md border-none text-xs font-medium capitalize",
            styles[key as keyof T],
          )}
        >
          {key} {value}
        </Badge>
      ))}
    </div>
  );
};
