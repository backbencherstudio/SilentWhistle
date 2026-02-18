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

import { UserService } from "@/service/user/user.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!UserService.isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
