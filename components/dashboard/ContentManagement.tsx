"use client";

import { Search, ChevronDown, MoreVertical, User } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TextIcon from "../icons/TextIcon";
import Mic from "../icons/Mic";
import AllContentViewModal from "./modal/AllContentViewModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import EyeIcon from "../icons/Eye";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import UserProfileModal from "./modal/UserViewModal";
import UserEditModal from "./modal/UserEditModal";
import UserDeleteModal from "./modal/UserDeleteModal";

interface UserData {
  id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
  status: "Active" | "Inactive";
  documentCount: number;
  joinedDate: string;
}

const tableData = [
  {
    id: "1",
    author: {
      name: "Frank Flores",
      username: "@Ludovic_Migneault",
    },
    shouts: {
      count: 2,
      icon: TextIcon,
      type: "text",
    },
    time: "08:30 AM",
    date: "2025-10-28",
    status: {
      label: "Published",
      variant: "published",
    },
  },
  {
    id: "2",
    author: {
      name: "Frank Flores",
      username: "@Ludovic_Migneault",
    },
    shouts: {
      count: 1,
      icon: Mic,
      type: "audio",
    },
    time: "08:30 AM",
    date: "2025-10-28",
    status: {
      label: "Flagged",
      variant: "flagged",
    },
  },
  {
    id: "3",
    author: {
      name: "Frank Flores",
      username: "@Ludovic_Migneault",
    },
    shouts: {
      count: 2,
      icon: TextIcon,
      type: "text",
    },
    time: "08:30 AM",
    date: "2025-10-28",
    status: {
      label: "Published",
      variant: "published",
    },
  },
];

export const ContentManagement = (): React.ReactElement => {
  const [contentViewModal, setContentViewModalOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

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
          <div className="flex-1 lg:flex-initial lg:w-96 h-10 px-4 py-2.5 bg-neutral-900 rounded-lg inline-flex justify-start items-center gap-1.5">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search users or shouts..."
              className="flex-1 bg-transparent border-0 outline-0 text-zinc-400 text-base font-['Inter'] leading-4 placeholder:text-zinc-400"
            />
          </div>

          {/* Today Filter */}
          <Button
            variant="outline"
            onClick={() => {
              // Handle Today filter
              console.log("Today filter clicked");
            }}
            className="inline-flex items-center justify-center gap-2 p-3 h-10 bg-[#101012] rounded-lg border border-solid border-[#2c2d35] hover:bg-[#101012] hover:text-white min-w-25 cursor-pointer"
          >
            <span className="font-['Inter'] font-normal text-white text-xs">
              Today
            </span>
            <ChevronDown className="w-4 h-4 text-white shrink-0" />
          </Button>

          {/* All Types Filter */}
          <Button
            variant="outline"
            onClick={() => {
              // Handle All Types filter
              console.log("All Types filter clicked");
            }}
            className="inline-flex items-center justify-between gap-2 px-3 h-10 w-37 bg-[#101012] rounded-lg border border-solid border-[#2c2d35] hover:bg-[#101012] hover:text-white cursor-pointer"
          >
            <span className="font-['Inter'] font-normal text-white text-xs">
              All Types
            </span>
            <ChevronDown className="w-4 h-4 text-white shrink-0" />
          </Button>
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
                  Post Details
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Time & Date
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
              {tableData.map((row, index) => {
                const IconComponent = row.shouts.icon;
                const isEven = index % 2 === 0;
                return (
                  <TableRow
                    key={index}
                    className={`h-16 border-t border-[#212529] cursor-pointer ${
                      isEven ? "bg-[#101012]" : "bg-[#141417]"
                    } hover:bg-[#1d1d22] transition-colors`}
                    onClick={() => {
                      setContentViewModalOpen(true);
                      console.log("Row clicked", index);
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
                            {row.author.name}
                          </div>
                          <div className="font-['Inter'] font-normal text-gray-400 text-xs">
                            {row.author.username}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-0">
                      <div className="flex items-center gap-2 p-2 px-4.5 rounded-lg">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="relative w-6.5 h-6.5 bg-gray-700 rounded-full flex items-center justify-center">
                            <IconComponent />
                          </div>
                          <div className="font-['Inter'] font-medium text-gray-50 text-xs">
                            {row.shouts.count}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-0">
                      <Button
                        variant="ghost"
                        onClick={() => toggleRow(index)}
                        className="flex w-37.5 items-start justify-between px-3 py-1.5 mx-4.5 bg-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a] h-auto cursor-pointer"
                      >
                        <span className="font-medium text-gray-50 text-sm font-['Inter']">
                          Content
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-50 transition-transform ${
                            expandedRows.has(index) ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </TableCell>
                    <TableCell className="p-0">
                      <div className="flex items-start gap-1.5 px-4.5">
                        <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                          {row.time}
                        </div>
                        <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                          {row.date}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-0">
                      <div className="px-4.5">
                        <Badge
                          className={`px-2.5 py-1.5 rounded-lg font-normal text-base whitespace-nowrap font-['Inter'] border-0 ${
                            row.status.variant === "published"
                              ? "bg-[#162924] text-[#38e07b] hover:bg-[#162924]"
                              : "bg-[#3f0005] text-[#ff0012] hover:bg-[#3f0005]"
                          }`}
                        >
                          {row.status.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="p-0">
                      <div className="flex-1 flex items-center justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-6 h-6 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="w-6 h-6 text-gray-50" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            align="end"
                            className="min-w-40 bg-neutral-900 border border-zinc-800 rounded-lg"
                          >
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser({
                                  id: row.id,
                                  avatar: "",
                                  name: row.author.name,
                                  username: row.author.username,
                                  email: "unknown",
                                  status: "Active",
                                  documentCount: row.shouts.count,
                                  joinedDate: row.date,
                                });

                                setProfileOpen(true);
                              }}
                              className="cursor-pointer text-white focus:bg-neutral-800 focus:text-white"
                            >
                              <EyeIcon /> View
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser({
                                  id: row.id,
                                  avatar: "",
                                  name: row.author.name,
                                  username: row.author.username,
                                  email: "unknown",
                                  status: "Active",
                                  documentCount: row.shouts.count,
                                  joinedDate: row.date,
                                });
                                setEditOpen(true);
                              }}
                              className="cursor-pointer text-white focus:bg-neutral-800 focus:text-white"
                            >
                              <EditIcon /> Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser({
                                  id: row.id,
                                  avatar: "",
                                  name: row.author.name,
                                  username: row.author.username,
                                  email: "unknown",
                                  status: "Active",
                                  documentCount: row.shouts.count,
                                  joinedDate: row.date,
                                });
                                setDeleteOpen(true);
                              }}
                              className="cursor-pointer text-red-400 focus:bg-neutral-800 focus:text-red-400"
                            >
                              <DeleteIcon stroke="#FF6A4D" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <AllContentViewModal
        open={contentViewModal}
        onOpenChange={setContentViewModalOpen}
      />

      <UserProfileModal
        open={profileOpen}
        onOpenChange={setProfileOpen}
        user={selectedUser}
      />

      <UserEditModal open={editOpen} onOpenChange={setEditOpen} />
      <UserDeleteModal open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
};
