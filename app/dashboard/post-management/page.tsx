/**
 * Post Management Page
 * 
 * @page
 * @route /dashboard/post-management
 */

'use client';

import DashboardLayout from '@/components/common/DashboardLayout';
import { PostManagement } from '@/components/dashboard/PostManagement';

export default function PostManagementPage() {
  return (
    <DashboardLayout>
      <div className="p-6 w-full">
        <PostManagement />
      </div>
    </DashboardLayout>
  );
}

