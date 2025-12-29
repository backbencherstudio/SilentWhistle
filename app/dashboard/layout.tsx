/**
 * Dashboard Layout
 * 
 * Layout wrapper for all dashboard pages that checks authentication.
 * Redirects to login if user is not authenticated.
 * 
 * @layout
 * @route /dashboard/*
 */

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { UserService } from '@/service/user/user.service';

/**
 * Dashboard Layout Component
 * 
 * Protects all dashboard routes by checking authentication
 */
export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication on mount and route changes
    if (!UserService.isAuthenticated()) {
      // Store the intended destination for redirect after login
      router.push('/login');
    }
  }, [router, pathname]);

  // Don't render children if not authenticated (will redirect)
  if (!UserService.isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}

