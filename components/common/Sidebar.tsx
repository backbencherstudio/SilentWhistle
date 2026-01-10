/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Sidebar Component
 *
 * A reusable navigation sidebar component for the application.
 * Features:
 * - Responsive design (desktop sidebar, mobile overlay)
 * - Active route highlighting with purple accent
 * - Smooth hover transitions
 * - Body scroll locking on mobile when open
 * - Logout functionality
 *
 * @component
 * @example
 * <Sidebar isOpen={true} onClose={() => {}} />
 */

"use client";

import React, { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserService } from "@/service/user/user.service";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import LogoutModal from "./LogoutModal";
// Custom icons
import { logoIcon } from "@/components/icons/logoicon";
import { logoTextIcon } from "@/components/icons/logotext";
import { svg as dashboardIcon } from "@/components/icons/dashboardicon";
import { userManagementIcon } from "@/components/icons/usermanagementicon";
import { svg as postIcon } from "@/components/icons/posticon";
import { contentManagementIcon } from "@/components/icons/contentmanagementicon";
import { svg as settingIcon } from "@/components/icons/settingicon";
import { svg as reportsIcon } from "@/components/icons/reportsicon";
import FinanceAndPaymentIcon from "../icons/FinanceAndPaymentIcon";
import NotificationIcon2 from "../icons/NotificationIcon2";
import { useAdminLogoutMutation } from "@/redux/features/auth/auth.api";
import { showDashboardToast } from "../ui/CustomToast";

/**
 * Navigation item interface
 * Defines the structure of each navigation menu item
 */
interface NavItem {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  href: string;
  isActive?: boolean;
}

/**
 * Sidebar component props
 */
interface SidebarProps {
  /** Whether the sidebar is open (for mobile) */
  isOpen: boolean;
  /** Callback function to close the sidebar */
  onClose: () => void;
  /** Whether the sidebar is collapsed (for desktop) */
  isCollapsed?: boolean;
  /** Callback function to toggle collapse state */
  onToggleCollapse?: () => void;
}

/**
 * Sidebar Component
 *
 * Main sidebar navigation component with logo, menu items, and logout button
 */
const Sidebar: FC<SidebarProps> = ({
  isOpen,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [adminLogout, { isLoading: isLogoutLoading }] = useAdminLogoutMutation()

  /**
   * Effect hook to prevent body scrolling when sidebar is open on mobile
   * This improves UX by preventing background scrolling when overlay is visible
   */
  useEffect(() => {
    if (isOpen) {
      // Lock the body scroll when sidebar is open
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Reset body styles when sidebar closes
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      // Cleanup: Reset body styles when component unmounts
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  /**
   * Determines if a navigation path is currently active
   *
   * @param path - The path to check for active state
   * @returns {boolean} True if the path matches the current route
   */
  const isActive = (path: string) => {
    // For dashboard/home, check both "/" and "/dashboard"
    if (path === "/dashboard" || path === "/") {
      return pathname === "/dashboard" || pathname === "/";
    }

    // For other routes, check if the current path starts with the given path
    // but make sure it's not just the dashboard path
    return (
      pathname.startsWith(path) && pathname !== "/dashboard" && pathname !== "/"
    );
  };

  /**
   * Handles navigation to a new route
   * Closes the sidebar after navigation (useful for mobile)
   *
   * @param href - The route to navigate to
   */
  const handleNavigation = (href: string) => {
    router.push(href);
    onClose(); // Close the sidebar after navigation
  };

  /**
   * Opens the logout confirmation modal
   */
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  /**
   * Handles user logout confirmation
   * Clears authentication tokens and redirects to login page
   */
  const handleLogoutConfirm = async () => {
    // Close the modal
    setShowLogoutModal(false);

    try {
      await adminLogout().unwrap();

      showDashboardToast({
        variant: "success",
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      showDashboardToast({
        variant: "error",
        title: "Logout Failed",
        description: error?.data?.message || "Something went wrong. Try again.",
      });
    } finally {
      UserService.clearTokens()
      router.push("/login");
    }

    // Redirect to login page
  };

  /**
   * Navigation items configuration
   * Defines all menu items with their icons, labels, and routes
   */
  const navItems: NavItem[] = [
    {
      icon: dashboardIcon,
      label: "Dashboard",
      href: "/",
      isActive: isActive("/"),
    },
    {
      icon: userManagementIcon,
      label: "User Management",
      href: "/dashboard/user-management",
      isActive: isActive("/dashboard/user-management"),
    },
    {
      icon: postIcon,
      label: "Shouts/Post",
      href: "/dashboard/shouts-post",
      isActive: isActive("/dashboard/shouts-post"),
    },
    {
      icon: contentManagementIcon,
      label: "Content Management",
      href: "/dashboard/content-management",
      isActive: isActive("/dashboard/content-management"),
    },
    {
      icon: FinanceAndPaymentIcon,
      label: "Finance & Payment",
      href: "/dashboard/finance-payments",
      isActive: isActive("/dashboard/finance-payments"),
    },
    {
      icon: NotificationIcon2,
      label: "Notifications",
      href: "/dashboard/notification",
      isActive: isActive("/dashboard/notification"),
    },
    {
      icon: settingIcon,
      label: "Profile & Account",
      href: "/dashboard/admin-profile",
      isActive: isActive("/dashboard/admin-profile"),
    },
    {
      icon: reportsIcon,
      label: "Reports & Moderation",
      href: "/dashboard/reports-moderation",
      isActive: isActive("/dashboard/reports-moderation"),
    },
  ];

  return (
    <>
      {/* Dark overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      {/* Main sidebar container */}
      <div
        className={`${isOpen
          ? "inset-0 z-50 h-[90vh] overflow-hidden bg-black relative "
          : "h-screen bg-black"
          } 
        flex flex-col justify-between border-r border-[#262626] transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-64 lg:w-72"}
      `}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {/* Top section with logo and navigation */}
        <div className="flex flex-col flex-1">
          {/* Logo section with toggle button */}
          <div
            className={`p-6 flex items-center ${isCollapsed ? "justify-center flex-col gap-4" : "justify-between"
              }`}
          >
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                {/* Logo Icon */}
                <div className="shrink-0">{logoIcon({ size: 36 })}</div>
                {/* Logo Text */}
                <div className="shrink-0">{logoTextIcon({ size: 20 })}</div>
              </div>
            )}
            {isCollapsed && (
              <div className="shrink-0">{logoIcon({ size: 36 })}</div>
            )}
            {/* Toggle Button - Only show on desktop */}
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className={`hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-[#181818] hover:bg-[#1f1f1f] text-white transition-all duration-200 ${isCollapsed ? "" : "ml-auto"
                  }`}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 overflow-y-auto">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const active = isActive(item.href);

                return (
                  <div
                    key={index}
                    onClick={() => handleNavigation(item.href)}
                    className="self-stretch h-13 relative group cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Navigate to ${item.label}`}
                    title={isCollapsed ? item.label : ""}
                  >
                    {/* Menu item content */}
                    <div
                      className={`w-full ${isCollapsed ? "px-0 justify-center" : "px-4"
                        } py-4 relative rounded-lg inline-flex ${isCollapsed ? "justify-center" : "justify-start"
                        } items-center gap-3
                         transition-all duration-300 ease-in-out
                         ${active ? "bg-[#181818]" : "group-hover:bg-[#181818]"}
                       `}
                    >
                      {/* Icon and text container */}
                      <div
                        className={`inline-flex ${isCollapsed ? "justify-center" : "justify-start"
                          } items-center gap-3 transition-all duration-300 ease-in-out ${active && !isCollapsed ? "ml-2.5" : ""
                          }`}
                      >
                        {/* Navigation icon */}
                        <div
                          className={`w-4.5 h-4.5 flex items-center justify-center transition-transform duration-300 ease-in-out ${active ? "scale-110" : "group-hover:scale-110"
                            }`}
                        >
                          <div className="[&_svg_path]:stroke-white [&_svg_circle]:stroke-white">
                            <IconComponent size={18} />
                          </div>
                        </div>
                        {/* Navigation label - hidden when collapsed */}
                        {!isCollapsed && (
                          <div
                            className={`text-center justify-start leading-tight tracking-tight whitespace-nowrap ${active
                              ? "text-sm font-medium text-white"
                              : "text-sm font-medium text-white"
                              }`}
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            {item.label}
                          </div>
                        )}
                      </div>

                      {/* Active indicator - thin green line on right edge with gradient */}
                      {active && !isCollapsed && (
                        <div
                          className="w-px h-full absolute right-0 top-0 rounded-tr-lg rounded-br-lg"
                          style={{
                            background:
                              "linear-gradient(to bottom, rgba(56, 224, 123, 0) 0%, rgba(56, 224, 123, 0) 15%, rgba(56, 224, 123, 0) 16%, rgba(56, 224, 123, 1) 50%, rgba(56, 224, 123, 0) 84%, rgba(56, 224, 123, 0) 85%, rgba(56, 224, 123, 0) 100%)",
                          }}
                        />
                      )}
                      {/* Active indicator for collapsed state - circle */}
                      {active && isCollapsed && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#38e07b]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Logout button section */}
        <div className={`${isCollapsed ? "px-0" : "px-4"} pb-4 md:pb-8`}>
          <div
            onClick={handleLogoutClick}
            className="self-stretch h-13 relative cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Logout"
            title={isCollapsed ? "Logout" : ""}
          >
            {/* Logout button content */}
            <div
              className={`w-full ${isCollapsed ? "px-0 justify-center" : "px-4"
                } py-4 relative rounded-lg inline-flex ${isCollapsed ? "justify-center" : "justify-start"
                } items-center gap-3 bg-[#181818] hover:bg-[#181818] transition-all duration-300 ease-in-out`}
            >
              {/* Icon and text container */}
              <div
                className={`inline-flex ${isCollapsed ? "justify-center" : "justify-start"
                  } items-center gap-3`}
              >
                {/* Logout icon */}
                <div className="w-4.5 h-4.5 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110">
                  <LogOut className="w-4.5 h-4.5 text-white" />
                </div>
                {/* Logout text - hidden when collapsed */}
                {!isCollapsed && (
                  <div
                    className="text-center justify-start leading-tight tracking-tight whitespace-nowrap text-sm font-medium text-white"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Logout
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        isLoading={isLogoutLoading}
      />
    </>
  );
};

export default Sidebar;
