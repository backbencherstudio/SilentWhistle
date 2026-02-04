"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { IDashboartOverviewPeriodResponse } from "@/redux/features/overview/overview.api";

export default function OverviewCards({
  cardData,
}: {
  cardData?: IDashboartOverviewPeriodResponse;
}) {
  const statsData = [
    {
      title: "Total Users",
      value: cardData?.totalUsers?.total ?? 0,
      badge: {
        text: `Active: ${cardData?.totalUsers?.active ?? 0} | Inactive: ${cardData?.totalUsers?.inactive ?? 0}`,
        bgColor: "bg-[#0a160d]",
        textColor: "text-[#38e07b]",
      },
    },
    {
      title: "Total Shouts/Posts",
      value: cardData?.totalShouts?.total ?? 0,
      badge: {
        text: `Text: ${cardData?.totalShouts?.text ?? 0} | Voice: ${cardData?.totalShouts?.voice ?? 0}`,
        bgColor: "bg-[#14151c]",
        textColor: "text-[#7485ff]",
      },
    },
    {
      title: "Total Reports",
      value: cardData?.totalReports?.total ?? 0,
      badge: {
        text: `Pending: ${cardData?.totalReports?.pending ?? 0} | Resolved: ${cardData?.totalReports?.resolved ?? 0}`,
        bgColor: "bg-[#1a1600]",
        textColor: "text-[#8ac45c]",
      },
    },
  ];

  return (
    <section className="flex w-full items-stretch gap-3">
      {statsData.map((stat, index) => (
        <Card
          key={index}
          className="flex-1 flex flex-col bg-[#101012] rounded-2xl border-0"
        >
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
