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

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

const statsData = [
  {
    title: "Total Users",
    value: "24,592",
    badge: {
      text: "Active: 18,234 | Inactive: 6,358",
      bgColor: "bg-[#0a160d]",
      textColor: "text-[#38e07b]",
    },
  },
  {
    title: "Total Shouts/Posts",
    value: "156,428",
    badge: {
      text: "Text: 124,562 | Voice: 31,866",
      bgColor: "bg-[#14151c]",
      textColor: "text-[#7485ff]",
    },
  },
  {
    title: "Total Reports",
    value: "1,248",
    badge: {
      text: "Pending: 89 | Resolved: 1,159",
      bgColor: "bg-[#1a1600]",
      textColor: "text-[#8ac45c]",
    },
  },
];

export default function OverviewCards() {
  return (
    <section className="flex w-full items-stretch gap-3">
      {statsData.map((stat, index) => (
        <Card key={index} className="flex-1 flex flex-col bg-[#101012] rounded-2xl border-0">
          <CardContent className="flex flex-col items-start gap-4 px-3.5 py-4 flex-1">
            <div className="relative self-stretch -mt-px font-['Inter',Helvetica] font-normal text-gray-400 text-base tracking-[0] leading-[17.6px]">
              {stat.title}
            </div>
            <div className="relative self-stretch font-['Inter',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[38.4px]">
              {stat.value}
            </div>
            <div
              className={`inline-flex items-center justify-center gap-2.5 px-3 py-2 relative flex-[0_0_auto] ${stat.badge.bgColor} rounded-md`}
            >
              <div
                className={`relative w-fit -mt-px font-['Inter',Helvetica] font-light ${stat.badge.textColor} text-sm tracking-[0] leading-[15.4px] whitespace-nowrap`}
              >
                {stat.badge.text}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card className="flex-1 flex flex-col bg-[#101012] rounded-2xl border-0">
        <CardContent className="flex flex-col items-start p-0 flex-1">
          <div className="relative w-full h-full flex-1">
            <Image
              className="w-full h-full object-cover rounded-2xl"
              alt="Global Reach Map"
              src="/dashboard/greenmap.svg"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
