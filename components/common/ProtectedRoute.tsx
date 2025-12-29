/**
 * Protected Route Component
 * 
 * A wrapper component that protects routes by checking authentication status.
 * Redirects to login page if user is not authenticated.
 * 
 * @component
 * @example
 * <ProtectedRoute>
 *   <YourProtectedContent />
 * </ProtectedRoute>
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserService } from '@/service/user/user.service';

/**
 * Props for ProtectedRoute component
 */
interface ProtectedRouteProps {
  /** Child components to render if authenticated */
  children: React.ReactNode;
}

/**
 * Protected Route Component
 * 
 * Checks authentication status and redirects to login if not authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!UserService.isAuthenticated()) {
      // Redirect to login page if not authenticated
      router.push('/login');
    }
  }, [router]);

  // If not authenticated, don't render children (will redirect)
  if (!UserService.isAuthenticated()) {
    return null;
  }

  // Render children if authenticated
  return <>{children}</>;
}

