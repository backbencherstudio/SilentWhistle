"use client";

import { MoreVerticalIcon, User } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import FileText from "../icons/FileText";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserProfileModal from "./modal/UserViewModal";

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

const userData: UserData[] = [
  {
    id: "1",
    avatar: "/frame-1597883940.svg",
    name: "Frank Flores",
    username: "@Ludovic_Migneault",
    email: "fra****@***.com",
    status: "Active",
    documentCount: 284,
    joinedDate: "05/12/2024",
  },
  {
    id: "2",
    avatar: "/frame-1597883940.svg",
    name: "Frank Flores",
    username: "@Ludovic_Migneault",
    email: "fra****@***.com",
    status: "Active",
    documentCount: 284,
    joinedDate: "05/12/2024",
  },
  {
    id: "3",
    avatar: "/frame-1597883940.svg",
    name: "Frank Flores",
    username: "@Ludovic_Migneault",
    email: "fra****@***.com",
    status: "Inactive",
    documentCount: 284,
    joinedDate: "05/12/2024",
  },
  {
    id: "4",
    avatar: "/frame-1597883940.svg",
    name: "Frank Flores",
    username: "@Ludovic_Migneault",
    email: "fra****@***.com",
    status: "Active",
    documentCount: 284,
    joinedDate: "05/12/2024",
  },
  {
    id: "5",
    avatar: "/frame-1597883940.svg",
    name: "Frank Flores",
    username: "@Ludovic_Migneault",
    email: "fra****@***.com",
    status: "Active",
    documentCount: 284,
    joinedDate: "05/12/2024",
  },
  // others...
];

const headerColumns = [
  { label: "Name" },
  { label: "Email" },
  { label: "Status" },
  { label: "Shouts/Post" },
  { label: "Joined Date" },
  { label: "Actions" },
];

export const UserTable = (): React.ReactElement => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  return (
    <>
      <div className="flex flex-col w-full items-start bg-[#101012] rounded-xl overflow-hidden">
        <header className="flex h-14 items-center w-full bg-[#1a1a1a]">
          {headerColumns.map((column, index) => (
            <div key={index} className="flex items-center flex-1 h-full px-4.5">
              <span className="font-['Inter'] font-medium text-gray-50 text-lg">
                {column.label}
              </span>
            </div>
          ))}
        </header>

        {userData.map((user) => (
          <div
            key={user.id}
            className="flex h-16 items-center w-full border-t border-solid border-[#212529]"
          >
            {/* Name */}
            <div className="flex-1 flex items-center gap-2 px-4.5">
              <Avatar className="w-9 h-9 rounded-full border border-solid border-[#e3e5e6] bg-gray-700">
                <AvatarFallback className="bg-gray-700 text-gray-300">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="font-['Inter'] font-medium text-white text-sm">
                  {user.name}
                </div>
                <div className="font-['Inter'] font-normal text-gray-400 text-xs">
                  {user.username}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex-1 flex items-center px-4.5">
              <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                {user.email}
              </div>
            </div>

            {/* Status */}
            <div className="flex-1 flex items-center px-4.5">
              <Badge
                className={`inline-flex items-center justify-center gap-2.5 px-2.5 py-1.5 rounded-lg border-0 ${
                  user.status === "Active" ? "bg-[#162924]" : "bg-[#2f1300]"
                }`}
              >
                <span
                  className={`text-base font-['Inter'] font-medium ${
                    user.status === "Active"
                      ? "text-[#38e07b]"
                      : "text-[#ff8000]"
                  }`}
                >
                  {user.status}
                </span>
              </Badge>
            </div>

            {/* Shouts/Post */}
            <div className="flex-1 flex items-center px-2">
              <div className="inline-flex items-center gap-2 px-2 py-1.5 rounded-lg">
                <FileText />
                <div className="font-['Inter'] font-normal text-gray-50 text-base whitespace-nowrap">
                  {user.documentCount}
                </div>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex-1 flex items-center px-4.5">
              <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                {user.joinedDate}
              </div>
            </div>

            {/* Actions */}
            <div className="flex-1 flex items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-6 h-6 p-0">
                    <MoreVerticalIcon className="w-6 h-6 text-gray-50" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="min-w-40 bg-neutral-900 border border-zinc-800 rounded-lg"
                >
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedUser(user);
                      setProfileOpen(true);
                    }}
                    className="cursor-pointer text-white focus:bg-neutral-800"
                  >
                    View
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer text-white focus:bg-neutral-800">
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer text-red-400 focus:bg-neutral-800">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <UserProfileModal
        open={profileOpen}
        onOpenChange={setProfileOpen}
        user={selectedUser}
      />
    </>
  );
};
export default UserTable;
