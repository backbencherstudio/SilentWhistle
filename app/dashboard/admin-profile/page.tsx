/**
 * Admin Profile Page
 * 
 * @page
 * @route /dashboard/admin-profile
 */

'use client';

import DashboardLayout from '@/components/common/DashboardLayout';

export default function AdminProfilePage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white">Admin Profile</h1>
      </div>
    </DashboardLayout>
  );
}

