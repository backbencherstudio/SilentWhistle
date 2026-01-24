"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import DashboardLayout from "@/components/common/DashboardLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserTable = dynamic(() => import("@/components/dashboard/UserTable"), {
  ssr: false,
});

export default function UserManagementPage() {
  const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "WARNING" | "BANNED">(
    "ALL"
  );
  const [search, setSearch] = useState("");

  const filterLabelMap = {
    ALL: "All User",
    ACTIVE: "Active",
    WARNING: "Warning",
    BANNED: "Banned",
  };

  return (
    <DashboardLayout>
      <div className="p-6 w-full">
        {/* Header Section */}
        <div className="w-full mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title Section */}
            <div className="inline-flex flex-col gap-2">
              <div className="text-gray-50 text-xl font-semibold">
                User Management
              </div>
              <div className="text-neutral-300 text-base">
                Oversee and control user accounts
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex-1 lg:w-96 h-10 px-4 bg-neutral-900 rounded-lg flex items-center gap-1.5">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search users or shouts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-zinc-400"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="focus-visible:ring-0! focus-visible:outline-0!"
                >
                  <button className="h-10 min-w-36 bg-neutral-900 rounded-lg px-3 flex justify-between items-center">
                    <span className="text-white text-xs">
                      {filterLabelMap[filter]}
                    </span>
                    <ChevronDown className="w-4 h-4 text-white transition-transform data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="min-w-36 bg-neutral-900 border border-neutral-800 rounded-lg"
                >
                  <DropdownMenuItem
                    onClick={() => setFilter("ALL")}
                    className="text-white hover:text-white! cursor-pointer hover:bg-neutral-800!"
                  >
                    All User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilter("ACTIVE")}
                    className="text-[#38e07b] hover:text-[#38e07b]! hover:bg-neutral-800! cursor-pointer"
                  >
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilter("WARNING")}
                    className="text-[#ff8000] hover:text-[#ff8000]! hover:bg-neutral-800! cursor-pointer"
                  >
                    Warning
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilter("BANNED")}
                    className="text-red-500 hover:text-red-500! hover:bg-neutral-800! cursor-pointer"
                  >
                    Banned
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="w-full overflow-x-auto">
          <UserTable
            status={filter === "ALL" ? undefined : filter}
            search={search}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
