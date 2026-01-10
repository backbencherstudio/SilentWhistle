'use client';

import { ChevronDown, User } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ReviewReportModal from "./modal/ReviewReportModal";
import WarningModal from "./modal/WarningModal";
import DeleteIcon from "../icons/DeleteIcon";
import UserDeleteModal from "./modal/UserDeleteModal";

const kpiCards = [
  {
    title: "Pending Reports",
    value: "24",
  },
  {
    title: "In Review",
    value: "15",
  },
  {
    title: "Resolved Today",
    value: "1",
  },
  {
    title: "High Severity",
    value: "1",
  },
];

const tableData = [
  {
    reportId: {
      name: "Frank Flores",
      username: "@Ludovic_Migneault",
    },
    time: "08:30 AM",
    date: "2025-10-28",
    reason: "Spam_User",
    status: {
      label: "Pending",
      variant: "pending",
    },
    reportedUser: {
      name: "Flores",
      username: "@Migneault",
    },
  },
  {
    reportId: {
      name: "Frank Flores",
      username: "@Ludovic_Migneault",
    },
    time: "08:30 AM",
    date: "2025-10-28",
    reason: "Spam_User",
    status: {
      label: "Resolved",
      variant: "resolved",
    },
    reportedUser: {
      name: "Flores",
      username: "@Migneault",
    },
  },
  {
    reportId: {
      name: "Frank Flores",
      username: "@Ludovic_Migneault",
    },
    time: "08:30 AM",
    date: "2025-10-28",
    reason: "Spam_User",
    status: {
      label: "High Severity",
      variant: "high-severity",
    },
    reportedUser: {
      name: "Flores",
      username: "@Migneault",
    },
  },
  {
    reportId: {
      name: "Frank Flores",
      username: "@Ludovic_Migneault",
    },
    time: "08:30 AM",
    date: "2025-10-28",
    reason: "Spam_User",
    status: {
      label: "Review",
      variant: "review",
    },
    reportedUser: {
      name: "Flores",
      username: "@Migneault",
    },
  },
];

export const ReportsModeration = (): React.ReactElement => {
  const [contentViewModal, setContentViewModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Header Section with Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Title and Description */}
        <div className="inline-flex flex-col justify-start items-start gap-2">
          <div className="text-gray-50 text-xl font-semibold font-['Inter'] leading-8">
            Reports & Moderation
          </div>
          <div className="text-neutral-300 text-base font-['Inter'] leading-4">
            Handle content and user reports.
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto">
          {/* All Types Filter */}
          <div className="h-10 bg-neutral-900 rounded-lg outline-1 -outline-offset-1 outline-zinc-800 overflow-hidden relative min-w-36">
            <button
              onClick={() => {
                // Handle filter
                console.log('All Types filter clicked');
              }}
              className="w-full h-full inline-flex justify-between items-center gap-2 px-3 cursor-pointer"
            >
              <div className="text-white text-xs font-normal font-['Inter']">
                All Types
              </div>
              <ChevronDown className="w-4 h-4 text-white shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div className="flex w-full items-stretch gap-3 mb-6">
        {kpiCards.map((card, index) => (
          <Card key={index} className="flex-1 flex flex-col bg-[#101012] rounded-2xl border-0">
            <CardContent className="flex flex-col items-start gap-4 px-3.5 py-4 flex-1">
              <div className="relative self-stretch font-['Inter'] font-normal text-gray-400 text-base tracking-[0] leading-[17.6px]">
                {card.title}
              </div>
              <div className="relative self-stretch font-['Inter'] font-semibold text-white text-2xl tracking-[0] leading-[38.4px]">
                {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <div className="flex flex-col w-full items-start bg-[#101012] rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="h-14 border-0 border-b border-[#212529] hover:bg-transparent">
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Report ID
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Time & Date
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Reason
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Status
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Reported User
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow
                  key={index}
                  className="h-16 border-t border-[#212529] hover:bg-transparent cursor-pointer"
                  onClick={() => {
                    setWarningModalOpen(true);
                    console.log("Row clicked", index);
                  }}
                >
                  {/* Report ID Column */}
                  <TableCell className="p-0">
                    <div className="flex items-center gap-2 px-4.5">
                      <Avatar className="w-9 h-9 rounded-full border border-solid border-[#e3e5e6] bg-gray-700">
                        <AvatarFallback className="bg-gray-700 text-gray-300">
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <div className="font-medium text-white text-sm font-['Inter']">
                          {row.reportId.name}
                        </div>
                        <div className="font-['Inter'] font-normal text-gray-400 text-xs">
                          {row.reportId.username}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Time & Date Column */}
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

                  {/* Reason Column */}
                  <TableCell className="p-0">
                    <div className="px-4.5">
                      <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                        {row.reason}
                      </div>
                    </div>
                  </TableCell>

                  {/* Status Column */}
                  <TableCell className="p-0">
                    <div className="px-4.5">
                      <Badge
                        className={`px-2.5 py-1.5 rounded-lg font-normal text-base whitespace-nowrap font-['Inter'] border-none ${row.status.variant === "pending"
                          ? "bg-[#162924] text-[#38e07b] hover:bg-[#162924]"
                          : row.status.variant === "resolved"
                            ? "bg-[#162924] text-[#38e07b] hover:bg-[#162924]"
                            : row.status.variant === "high-severity"
                              ? "bg-[#3f0005] text-[#ff0012] hover:bg-[#3f0005]"
                              : "bg-[#162924] text-[#38e07b] hover:bg-[#162924]"
                          }`}
                      >
                        {row.status.label}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Reported User Column */}
                  <TableCell className="p-0">
                    <div className="flex items-center gap-2 px-4.5">
                      <Avatar className="w-9 h-9 rounded-full border border-solid border-[#e3e5e6] bg-gray-700">
                        <AvatarFallback className="bg-gray-700 text-gray-300">
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <div className="font-medium text-white text-sm font-['Inter']">
                          {row.reportedUser.name}
                        </div>
                        <div className="font-['Inter'] font-normal text-gray-400 text-xs">
                          {row.reportedUser.username}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell className="p-0">
                    <div className="px-4.5 flex items-center">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle review action
                          console.log('Review clicked for row', index);
                          setContentViewModalOpen(true)
                        }}
                        className="px-4 py-2 bg-[#38e07b] text-black hover:bg-[#38e07b] hover:opacity-90 rounded-lg font-['Inter'] font-medium text-sm cursor-pointer"
                      >
                        Review
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();

                          console.log('Review clicked for row', index);
                          setDeleteOpen(true)
                        }}
                        className="bg-transparent hover:bg-transparent cursor-pointer"
                      >
                        <DeleteIcon stroke="#f84355" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <WarningModal
        open={warningModalOpen}
        onOpenChange={setWarningModalOpen}
      />

      <ReviewReportModal
        open={contentViewModal}
        onOpenChange={setContentViewModalOpen}
      />

      <UserDeleteModal desc="This can't be undone. Visit your settings to delete any memories saved during this chat."
        open={deleteOpen} onOpenChange={setDeleteOpen}
      />
    </div>
  );
};

