/**
 * Dashboard Layout Component
 *
 * A layout wrapper component that provides the common structure for dashboard pages.
 * Includes:
 * - Sidebar navigation (desktop and mobile)
 * - Top header with user info and notifications
 * - Responsive mobile menu button
 * - Consistent styling and spacing
 *
 * @component
 * @example
 * <DashboardLayout>
 *   <YourDashboardContent />
 * </DashboardLayout>
 */

"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { User } from "lucide-react";
import { Notificationicon } from "@/components/icons/notificationicon";
import Link from "next/link";
import { useGetMeQuery } from "@/redux/features/profile/profile.api";
import { UserAvatar } from "@/app/dashboard/user-management/_components/UserAvatar";
import { Skeleton } from "../ui/skeleton";

/**
 * Props for DashboardLayout component
 */
interface DashboardLayoutProps {
  /** Child components to render inside the layout */
  children: React.ReactNode;
}

/**
 * Dashboard Layout Component
 *
 * Provides the main layout structure for all dashboard pages.
 * Handles sidebar visibility, header, and responsive behavior.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // State to control mobile sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State to control desktop sidebar collapse

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  // Save collapsed state to localStorage
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
      {/* Desktop Sidebar - Fixed position, always visible on medium screens and up */}
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

      {/* Mobile Sidebar - Overlay that appears when opened */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area - Adjusted for fixed sidebar */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? "md:ml-20" : "md:ml-64 lg:ml-72"
        }`}
      >
        {/* Mobile Menu Button - Only visible on mobile devices */}
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

            {/* User Information Section */}
            <div className="flex items-center gap-3">
              {/* User Name and Role */}
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
              {/* Profile Picture Placeholder */}
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                <UserAvatar name={user?.data.name} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Area */}
        <main className="flex-1 overflow-y-auto bg-black">{children}</main>
      </div>
    </div>
  );
}
