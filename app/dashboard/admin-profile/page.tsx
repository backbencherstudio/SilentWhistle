/**
 * Admin Profile Page
 *
 * @page
 * @route /dashboard/admin-profile
 */

"use client";

import DashboardLayout from "@/components/common/DashboardLayout";
import { SystemSettings } from "@/components/dashboard/SystemSettings";

export default function AdminProfilePage() {
  return (
    <DashboardLayout>
      <div className="p-6 w-full">
        <SystemSettings />
      </div>
    </DashboardLayout>
  );
}
