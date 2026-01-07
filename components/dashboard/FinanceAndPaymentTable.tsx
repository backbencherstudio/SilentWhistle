"use client";

import { MoreVerticalIcon, User } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserProfileModal from "./modal/UserViewModal";
import UserEditModal from "./modal/UserEditModal";
import UserDeleteModal from "./modal/UserDeleteModal";
import { BaseUser, UserFinance, UserProfileData } from "@/app/types/user";

export type FinanceUserRow = BaseUser & UserFinance;
const userData: FinanceUserRow[] = [
  {
    id: "1",
    avatar: "/frame-1597883940.svg",
    name: "Frank Flores",
    username: "@Ludovic_Migneault",
    transactionId: "TXN-2024-001",
    date: "05/12/2024",
    status: "Active",
    amount: 14.99,
    paymentPlan: "Yearly",
  },
  {
    id: "2",
    avatar: "/frame-1597883940.svg",
    name: "Frank Flores",
    username: "@Ludovic_Migneault",
    transactionId: "TXN-2024-001",
    date: "05/12/2024",
    status: "Active",
    amount: 14.99,
    paymentPlan: "Monthly",
  },
  {
    id: "3",
    avatar: "/frame-1597883940.svg",
    name: "Frank Flores",
    username: "@Ludovic_Migneault",
    transactionId: "TXN-2024-001",
    date: "05/12/2024",
    status: "Active",
    amount: 14.99,
    paymentPlan: "Yearly",
  },
];

const headerColumns = [
  { label: "Name" },
  { label: "Transaction ID" },
  { label: "Date" },
  { label: "Status" },
  { label: "Amount" },
  { label: "Payment Plan" },
  { label: "Actions" },
];

export const FinanceAndPaymentTable = (): React.ReactElement => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<BaseUser | null>(null);

  const mapToProfileUser = (user: BaseUser): UserProfileData => ({
    id: user.id,
    name: user.name,
    username: user.username,
    status: user.status,

    email: user.email ?? "notprovided@email.com",
    joinedDate: user.joinedDate ?? "05/12/2024",
    documentCount: user.documentCount ?? 0,

    location: "New York, USA",
    role: "Free User",
    reportsAgainst: 2,
  });

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

            {/* TransactionId */}
            <div className="flex-1 flex items-center px-4.5">
              <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                {user.transactionId}
              </div>
            </div>

            {/* Date */}
            <div className="flex-1 flex items-center px-4.5">
              <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                {user.date}
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

            {/* Amount */}
            <div className="flex-1 flex items-center px-4.5">
              <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                ${user.amount}
              </div>
            </div>

            {/* Payment Plan */}
            <div className="flex-1 flex items-center px-4.5">
              <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                {user.paymentPlan}
              </div>
            </div>

            {/* Actions */}
            <div className="flex-1 flex items-center justify-start">
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
                    className="cursor-pointer text-white focus:bg-neutral-800 focus:text-white"
                  >
                    View
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedUser(user);
                      setEditOpen(true);
                    }}
                    className="cursor-pointer text-white focus:bg-neutral-800 focus:text-white"
                  >
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedUser(user);
                      setDeleteOpen(true);
                    }}
                    className="cursor-pointer text-red-400 focus:bg-neutral-800 focus:text-red-400"
                  >
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
        user={selectedUser ? mapToProfileUser(selectedUser) : null}
      />

      <UserEditModal open={editOpen} onOpenChange={setEditOpen} />
      <UserDeleteModal open={deleteOpen} onOpenChange={setDeleteOpen} />
    </>
  );
};
export default FinanceAndPaymentTable;
