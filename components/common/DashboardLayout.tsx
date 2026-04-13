"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Notificationicon } from "@/components/icons/notificationicon";
import Link from "next/link";
import { useGetMeQuery } from "@/redux/features/profile/profile.api";
import { UserAvatar } from "@/app/dashboard/user-management/_components/UserAvatar";
import { Skeleton } from "../ui/skeleton";


interface DashboardLayoutProps {
  children: React.ReactNode;
}


export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarCollapsed", String(newState));
    }
  };

  const { data: user, isLoading: userIsLoading } = useGetMeQuery();

  return (
    <div className="flex min-h-screen bg-black font-sans">
      <aside
        className={`hidden md:block fixed left-0 top-0 h-screen bg-black z-20 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64 lg:w-72"
        }`}
      >
        <Sidebar
          isOpen={false}
          onClose={() => {}}
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />
      </aside>

      <div
        className={`fixed inset-y-0 left-0 z-50 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? "md:ml-20" : "md:ml-64 lg:ml-72"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-black/80 text-white hover:bg-black/90 transition-colors"
          aria-label="Open menu"
        >
          {/* Hamburger menu icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-black border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/dashboard/notification"
              className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white hover:text-gray-300 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <Notificationicon></Notificationicon>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <div className="text-right">
                {userIsLoading ? (
                  <>
                    <Skeleton className="h-5 w-25" />
                    <Skeleton className="h-5 w-12 mt-1 ml-auto" />
                  </>
                ) : (
                  <>
                    <div className="text-white text-sm font-medium">
                      {user?.data.name}
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-[#22c55e] text-white text-xs font-medium rounded-full">
                        {user?.data.type}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                <UserAvatar name={user?.data.name} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-black">{children}</main>
      </div>
    </div>
  );
}
