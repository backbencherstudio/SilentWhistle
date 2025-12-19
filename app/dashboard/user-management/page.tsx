/**
 * User Management Page
 * 
 * @page
 * @route /dashboard/user-management
 */

'use client';

import DashboardLayout from '@/components/common/DashboardLayout';

export default function UserManagementPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
      </div>
    </DashboardLayout>
  );
}

