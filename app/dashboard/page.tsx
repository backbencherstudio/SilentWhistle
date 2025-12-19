/**
 * Dashboard Page
 * 
 * Alternative dashboard route that displays the same content as the home page.
 * This page can be used for direct navigation to the dashboard.
 * 
 * @page
 * @route /dashboard
 */

'use client';

import DashboardLayout from '@/components/common/DashboardLayout';
import OverviewCards from '@/components/dashboard/OverviewCards';
import UserGrowthChart from '@/components/dashboard/UserGrowthChart';
import ShoutCategories from '@/components/dashboard/ShoutCategories';

/**
 * Dashboard Page Component
 * 
 * Renders the dashboard page with all overview components
 */
export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Dashboard Overview Heading Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back! Here&apos;s what&apos;s happening with your platform today.</p>
        </div>

        {/* Overview Cards Section - Key Metrics */}
        <OverviewCards />

        {/* Charts Section - Visual Data Representations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* User Growth Chart - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <UserGrowthChart />
          </div>

          {/* Shout Categories - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <ShoutCategories />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
