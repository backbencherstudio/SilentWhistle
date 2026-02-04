/**
 * Dashboard Layout
 *
 * Layout wrapper for all dashboard pages that checks authentication.
 * Redirects to login if user is not authenticated.
 *
 * @layout
 * @route /dashboard/*
 */

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserService } from "@/service/user/user.service";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = UserService.isAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router, pathname]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
