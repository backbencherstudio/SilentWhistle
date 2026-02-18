"use client";

import DashboardLayout from "@/components/common/DashboardLayout";
import OverviewCards from "@/components/dashboard/OverviewCards";
import ShoutCategories from "@/components/dashboard/ShoutCategories";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import { useGetOverviewStatsQuery } from "@/redux/features/overview/overview.api";
import { Period } from "@/redux/features/overview/overview.types";
import { useState } from "react";

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("year");

  const { data: overviews, isLoading } = useGetOverviewStatsQuery({
    period: selectedPeriod,
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Dashboard Overview Heading Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-400">
            Welcome back! Here&apos;s what&apos;s happening with your platform
            today.
          </p>
        </div>

        {/* Overview Cards Section - Key Metrics */}
        <OverviewCards cardData={overviews} />

        <div className="mt-8 space-y-6">
          {/* Overview Title and Filter Section */}
          <div className="w-full flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white mb-1 font-['Inter']">
                Overview
              </h2>
              <p className="text-gray-400 text-sm font-['Inter']">
                User Growth Trends
              </p>
            </div>

            {/* Time Filter Buttons */}
            <TimeFilterButtons
              setSelectedPeriod={(v) => setSelectedPeriod(v)}
              selectedPeriod={selectedPeriod}
            />
          </div>

          {/* Chart and Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* User Growth Chart - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <UserGrowthChart
                selectedPeriod={selectedPeriod}
                data={overviews?.overview}
              />
            </div>

            {/* Shout Categories - Takes 1 column on large screens */}
            <div className="lg:col-span-1">
              <ShoutCategories categories={overviews?.shoutCategories} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function TimeFilterButtons({
  setSelectedPeriod,
  selectedPeriod,
}: {
  setSelectedPeriod: (p: Period) => void;
  selectedPeriod: Period;
}) {
  return (
    <div className="w-95 h-12 relative bg-neutral-900 rounded-xl overflow-hidden">
      <div className="left-2 top-[8.50px] right-2 absolute inline-flex justify-between items-center">
        <button
          onClick={() => setSelectedPeriod("year")}
          className={`w-28 px-3 py-2 rounded-md flex justify-center items-center gap-1 transition-all duration-200 ${
            selectedPeriod === "year"
              ? "bg-zinc-800 shadow-sm"
              : "hover:opacity-80"
          }`}
        >
          <div
            className={`justify-start text-sm font-['Inter'] leading-4 whitespace-nowrap ${
              selectedPeriod === "year"
                ? "text-green-400 font-normal"
                : "text-neutral-300 font-light"
            }`}
          >
            This Year
          </div>
        </button>
        <button
          onClick={() => setSelectedPeriod("month")}
          className={`w-28 px-3 py-2 rounded-md flex justify-center items-center gap-1 transition-all duration-200 ${
            selectedPeriod === "month"
              ? "bg-zinc-800 shadow-sm"
              : "hover:opacity-80"
          }`}
        >
          <div
            className={`justify-start text-sm font-['Inter'] leading-4 whitespace-nowrap ${
              selectedPeriod === "month"
                ? "text-green-400 font-normal"
                : "text-neutral-300 font-light"
            }`}
          >
            Monthly
          </div>
        </button>
        <button
          onClick={() => setSelectedPeriod("week")}
          className={`w-28 px-3 py-2 rounded-md flex justify-center items-center gap-1 transition-all duration-200 ${
            selectedPeriod === "week"
              ? "bg-zinc-800 shadow-sm"
              : "hover:opacity-80"
          }`}
        >
          <div
            className={`justify-start text-sm font-['Inter'] leading-4 whitespace-nowrap ${
              selectedPeriod === "week"
                ? "text-green-400 font-normal"
                : "text-neutral-300 font-light"
            }`}
          >
            Weekly
          </div>
        </button>
      </div>
    </div>
  );
}
