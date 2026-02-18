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

import AdminRoute from "@/components/auth/AdminRoute";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminRoute>{children}</AdminRoute>;
}
