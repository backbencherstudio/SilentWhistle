/**
 * Content Management Page
 * 
 * @page
 * @route /dashboard/content-management
 */

'use client';

import DashboardLayout from '@/components/common/DashboardLayout';

export default function ContentManagementPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white">Content Management</h1>
      </div>
    </DashboardLayout>
  );
}

