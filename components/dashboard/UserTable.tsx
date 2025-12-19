'use client';

import { MoreVerticalIcon, FileText, User } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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
  const [openActionsId, setOpenActionsId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenActionsId(null);
      }
    };

    if (openActionsId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openActionsId]);

  return (
    <div className="flex flex-col w-full items-start bg-[#101012] rounded-xl overflow-hidden">
      <header className="flex h-14 items-center w-full bg-[#1a1a1a]">
        {headerColumns.map((column, index) => (
          <div
            key={index}
            className="flex items-center flex-1 h-full px-[18px]"
          >
            <span className="font-['Inter'] font-medium text-gray-50 text-lg tracking-[0] leading-[normal]">
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
          <div className="flex-1 flex items-center gap-2 px-[18px]">
            <Avatar className="w-9 h-9 rounded-full border border-solid border-[#e3e5e6] bg-gray-700">
              <AvatarFallback className="bg-gray-700 text-gray-300">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="font-['Inter'] font-medium text-white text-sm tracking-[0] leading-normal">
                {user.name}
              </div>
              <div className="font-['Inter'] font-normal text-gray-400 text-xs tracking-[0] leading-normal">
                {user.username}
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center px-[18px]">
            <div className="font-['Inter'] font-medium text-gray-50 text-sm tracking-[0] leading-normal">
              {user.email}
            </div>
          </div>
          <div className="flex-1 flex items-center px-[18px]">
            <Badge
              className={`inline-flex items-center justify-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-opacity-100 border-0 ${
                user.status === "Active"
                  ? "bg-[#162924] hover:bg-[#162924]"
                  : "bg-[#2f1300] hover:bg-[#2f1300]"
              }`}
            >
              <span
                className={`text-base font-['Inter'] font-medium tracking-[0] leading-normal ${
                  user.status === "Active" ? "text-[#38e07b]" : "text-[#ff8000]"
                }`}
              >
                {user.status}
              </span>
            </Badge>
          </div>
          <div className="flex-1 flex items-center px-2">
            <div className="inline-flex items-center gap-2 px-2 py-1.5 rounded-lg">
              <div className="inline-flex items-center justify-center gap-2">
                <FileText className="w-5 h-5 text-gray-50" />
                <div className="font-['Inter'] font-normal text-gray-50 text-base tracking-[0] leading-normal whitespace-nowrap">
                  {user.documentCount}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center px-[18px]">
            <div className="font-['Inter'] font-medium text-gray-50 text-sm tracking-[0] leading-normal">
              {user.joinedDate}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 p-0"
              onClick={() =>
                setOpenActionsId(openActionsId === user.id ? null : user.id)
              }
            >
              <MoreVerticalIcon className="w-6 h-6 text-gray-50" />
            </Button>
            {openActionsId === user.id && (
              <div className="absolute right-0 top-full mt-2 bg-neutral-900 rounded-lg shadow-lg border border-zinc-800 z-10 min-w-[120px]">
                <button
                  onClick={() => setOpenActionsId(null)}
                  className="w-full px-4 py-2 text-left text-white hover:bg-neutral-800 flex items-center gap-2 text-sm"
                >
                  <span>View</span>
                </button>
                <button
                  onClick={() => setOpenActionsId(null)}
                  className="w-full px-4 py-2 text-left text-white hover:bg-neutral-800 flex items-center gap-2 text-sm"
                >
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setOpenActionsId(null)}
                  className="w-full px-4 py-2 text-left text-white hover:bg-neutral-800 flex items-center gap-2 text-sm"
                >
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

