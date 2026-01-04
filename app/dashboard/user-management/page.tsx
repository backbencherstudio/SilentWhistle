/**
 * User Management Page
 *
 * @page
 * @route /dashboard/user-management
 */

"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { UserTable } from "@/components/dashboard/UserTable";

export default function UserManagementPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-6 w-full">
        {/* Header Section */}
        <div className="w-full mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title Section */}
            <div className="inline-flex flex-col justify-start items-start gap-2">
              <div className="text-gray-50 text-xl font-semibold font-['Inter'] leading-8">
                User Management
              </div>
              <div className="text-neutral-300 text-base font-['Inter'] leading-4">
                Oversee and control user accounts
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="flex-1 lg:flex-initial lg:w-96 h-10 px-4 py-2.5 bg-neutral-900 rounded-lg inline-flex justify-start items-center gap-1.5">
                <Search className="w-5 h-5 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search users or shouts..."
                  className="flex-1 bg-transparent border-0 outline-0 text-zinc-400 text-base font-['Inter'] leading-4 placeholder:text-zinc-400"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="h-10 bg-neutral-900 rounded-lg outline-1 -outline-offset-1 outline-zinc-800 overflow-hidden relative min-w-36">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full h-full inline-flex justify-between items-center gap-2 px-3"
                >
                  <div className="text-white text-xs font-normal font-['Inter']">
                    All User
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform shrink-0 ${
                      isFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="w-full overflow-x-auto">
          <UserTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
