/**
 * Overview Cards Component
 * 
 * Displays four key metric cards on the dashboard:
 * - Total Users (with active/inactive breakdown)
 * - Total Shouts/Posts (with text/voice breakdown)
 * - Total Reports (with pending/resolved breakdown)
 * - Global Reach (world map visualization)
 * 
 * @component
 * @example
 * <OverviewCards />
 */

'use client';

import { Users, FileEdit, FileText, Globe } from 'lucide-react';

/**
 * Overview Cards Component
 * 
 * Renders a grid of four metric cards displaying key statistics
 */
export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Users Card */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-sm font-medium">Total Users</h3>
          <Users className="w-5 h-5 text-gray-400" />
        </div>
        {/* Main metric value */}
        <div className="mb-3">
          <p className="text-3xl font-bold text-white">24,592</p>
        </div>
        {/* Breakdown metrics */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-[#22c55e]">Active: 18,234</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-400">Inactive: 6,358</span>
        </div>
      </div>

      {/* Total Shouts/Posts Card */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-sm font-medium">Total Shouts/Posts</h3>
          <FileEdit className="w-5 h-5 text-gray-400" />
        </div>
        {/* Main metric value */}
        <div className="mb-3">
          <p className="text-3xl font-bold text-white">156,428</p>
        </div>
        {/* Breakdown metrics */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-blue-400">Text: 124,562</span>
          <span className="text-gray-400">|</span>
          <span className="text-purple-400">Voice: 31,866</span>
        </div>
      </div>

      {/* Total Reports Card */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-sm font-medium">Total Reports</h3>
          <FileText className="w-5 h-5 text-gray-400" />
        </div>
        {/* Main metric value */}
        <div className="mb-3">
          <p className="text-3xl font-bold text-white">1,248</p>
        </div>
        {/* Breakdown metrics */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-yellow-400">Pending: 89</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-400">Resolved: 1,159</span>
        </div>
      </div>

      {/* World Map Card - Global Reach Visualization */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-sm font-medium">Global Reach</h3>
          <Globe className="w-5 h-5 text-gray-400" />
        </div>
        {/* Map visualization container */}
        <div className="h-32 flex items-center justify-center">
          {/* Simplified World Map Visualization */}
          <div className="relative w-full h-full bg-gray-800 rounded">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              {/* Simplified world map with green dots representing user locations */}
              <circle cx="100" cy="80" r="3" fill="#22c55e" />
              <circle cx="150" cy="70" r="3" fill="#22c55e" />
              <circle cx="200" cy="90" r="3" fill="#22c55e" />
              <circle cx="250" cy="75" r="3" fill="#22c55e" />
              <circle cx="300" cy="85" r="3" fill="#22c55e" />
              <circle cx="120" cy="120" r="3" fill="#22c55e" />
              <circle cx="180" cy="130" r="3" fill="#22c55e" />
              <circle cx="220" cy="140" r="3" fill="#22c55e" />
              <circle cx="280" cy="125" r="3" fill="#22c55e" />
              <circle cx="320" cy="135" r="3" fill="#22c55e" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
