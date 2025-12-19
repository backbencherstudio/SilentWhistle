/**
 * Reports & Moderation Page
 * 
 * @page
 * @route /dashboard/reports-moderation
 */

'use client';

import DashboardLayout from '@/components/common/DashboardLayout';

export default function ReportsModerationPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white">Reports & Moderation</h1>
      </div>
    </DashboardLayout>
  );
}

