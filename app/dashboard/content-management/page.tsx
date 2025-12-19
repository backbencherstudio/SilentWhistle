/**
 * Content Management Page
 * 
 * @page
 * @route /dashboard/content-management
 */

'use client';

import DashboardLayout from '@/components/common/DashboardLayout';
import { ContentManagement } from '@/components/dashboard/ContentManagement';

export default function ContentManagementPage() {
  return (
    <DashboardLayout>
      <div className="p-6 w-full">
        <ContentManagement />
      </div>
    </DashboardLayout>
  );
}

