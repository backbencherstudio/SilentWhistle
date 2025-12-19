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

'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { UserService } from '@/service/user/user.service';
import { LogOut } from 'lucide-react';
// Custom icons
import { logoIcon } from '@/components/icons/logoicon';
import { logoTextIcon } from '@/components/icons/logotext';
import { svg as dashboardIcon } from '@/components/icons/dashboardicon';
import { userManagementIcon } from '@/components/icons/usermanagementicon';
import { svg as postIcon } from '@/components/icons/posticon';
import { contentManagementIcon } from '@/components/icons/contentmanagementicon';
import { svg as settingIcon } from '@/components/icons/settingicon';
import { svg as reportsIcon } from '@/components/icons/reportsicon';

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
}

/**
 * Sidebar Component
 * 
 * Main sidebar navigation component with logo, menu items, and logout button
 */
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * Effect hook to prevent body scrolling when sidebar is open on mobile
   * This improves UX by preventing background scrolling when overlay is visible
   */
  useEffect(() => {
    if (isOpen) {
      // Lock the body scroll when sidebar is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Reset body styles when sidebar closes
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      // Cleanup: Reset body styles when component unmounts
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
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
    if (path === '/dashboard' || path === '/') {
      return pathname === '/dashboard' || pathname === '/';
    }
    
    // For other routes, check if the current path starts with the given path
    // but make sure it's not just the dashboard path
    return pathname.startsWith(path) && pathname !== '/dashboard' && pathname !== '/';
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
   * Handles user logout
   * Clears authentication tokens and redirects to home page
   */
  const handleLogout = () => {
    // Clear the authentication token
    UserService.logout();
    
    // Clear any other local storage data if exists
    localStorage.clear();
    
    // Redirect to home page
    router.push('/');
  };

  /**
   * Navigation items configuration
   * Defines all menu items with their icons, labels, and routes
   */
  const navItems: NavItem[] = [
    {
      icon: dashboardIcon,
      label: 'Dashboard',
      href: '/',
      isActive: isActive('/')
    },
    {
      icon: userManagementIcon,
      label: 'User Management',
      href: '/dashboard/user-management',
      isActive: isActive('/dashboard/user-management')
    },
    {
      icon: postIcon,
      label: 'Shouts/Post',
      href: '/dashboard/shouts-post',
      isActive: isActive('/dashboard/shouts-post')
    },
    {
      icon: contentManagementIcon,
      label: 'Content Management',
      href: '/dashboard/content-management',
      isActive: isActive('/dashboard/content-management')
    },
    {
      icon: settingIcon,
      label: 'Admin Profile',
      href: '/dashboard/admin-profile',
      isActive: isActive('/dashboard/admin-profile')
    },
    {
      icon: reportsIcon,
      label: 'Reports & Moderation',
      href: '/dashboard/reports-moderation',
      isActive: isActive('/dashboard/reports-moderation')
    }
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
      <div className={`${isOpen 
        ? 'inset-0 z-50 h-[90vh] overflow-hidden bg-black relative ' 
        : 'h-screen bg-black'} 
        flex flex-col justify-between`} style={{ fontFamily: 'var(--font-inter)' }}>
        
        {/* Top section with logo and navigation */}
        <div className="flex flex-col flex-1">
          {/* Logo section */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              {/* Logo Icon */}
              <div className="flex-shrink-0">
                {logoIcon({ size: 36 })}
              </div>
              {/* Logo Text */}
              <div className="flex-shrink-0">
                {logoTextIcon({ size: 20 })}
              </div>
            </div>
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
                    className="self-stretch h-[52px] relative group cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Navigate to ${item.label}`}
                  >
                     {/* Active indicator bar - thicker primary color bar on left */}
                     <div className={`w-1.5 h-[52px] left-0 top-0 absolute rounded-tr rounded-br transition-colors duration-300 ease-in-out ${
                       active ? 'bg-[#38E07B]' : 'bg-transparent'
                     }`} />
                     
                     {/* Menu item content */}
                     <div 
                       className={`w-[230px] px-4 py-4 absolute rounded-lg inline-flex justify-start items-center gap-3
                         transition-all duration-300 ease-in-out
                         ${active 
                           ? 'bg-[#38E07B] left-[20px]' 
                           : 'left-0 group-hover:left-[20px] group-hover:border group-hover:border-[#38E07B] group-hover:bg-black'
                         }
                       `}
                     >
                       {/* Navigation icon */}
                       <div className={`w-[18px] h-[18px] flex items-center justify-center transition-transform duration-300 ease-in-out ${
                         active ? 'scale-110' : 'group-hover:scale-110'
                       }`}>
                         <div className={active ? '[&_svg_path]:stroke-black [&_svg_circle]:stroke-black' : '[&_svg_path]:stroke-white [&_svg_circle]:stroke-white'}>
                           <IconComponent size={18} />
                         </div>
                       </div>
                       {/* Navigation label */}
                       <div className={`text-center justify-start leading-tight tracking-tight whitespace-nowrap ${
                         active ? 'text-base font-bold text-black' : 'text-sm font-medium text-white'
                       }`} style={{ fontFamily: 'var(--font-inter)' }}>
                         {item.label}
                       </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Logout button section */}
        <div className="self-stretch h-[52px] relative md:mb-8 flex items-center justify-center">
          <button 
            onClick={handleLogout}
            className="w-[200px] px-8 py-4 rounded-lg inline-flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-300 ease-in-out"
            aria-label="Logout"
          >
            {/* Logout icon */}
            <LogOut 
              className="w-[18px] h-[18px] text-white transition-transform duration-300 ease-in-out hover:scale-110"
            />
            {/* Logout text */}
            <div className="whitespace-nowrap text-white text-sm font-medium leading-tight tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
              Logout
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

