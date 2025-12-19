/**
 * Reports & Moderation Page
 * 
 * @page
 * @route /dashboard/reports-moderation
 */

'use client';

import DashboardLayout from '@/components/common/DashboardLayout';
import { ReportsModeration } from '@/components/dashboard/ReportsModeration';

export default function ReportsModerationPage() {
  return (
    <DashboardLayout>
      <div className="p-6 w-full">
        <ReportsModeration />
      </div>
    </DashboardLayout>
  );
}

