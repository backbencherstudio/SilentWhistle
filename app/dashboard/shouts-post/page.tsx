/**
 * Shouts/Post Page
 * 
 * @page
 * @route /dashboard/shouts-post
 */

'use client';

import DashboardLayout from '@/components/common/DashboardLayout';

export default function ShoutsPostPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white">Shouts/Post</h1>
      </div>
    </DashboardLayout>
  );
}

