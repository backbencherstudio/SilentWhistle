"use client";

import { UserAvatar } from "@/app/dashboard/user-management/_components/UserAvatar";
import { Category } from "@/app/dashboard/user-management/_components/UserDataTab";
import { useGetAllShoutsQuery } from "@/redux/features/shout-manage/shout-manage.api";
import { AlertCircle, MapPin } from "lucide-react";
import React from "react";
import { PostTypesCell } from "../common/PostTypesCell";
import light from "../icons/shout-categories/light";
import thumbsup from "../icons/thumbsup";
import { Badge } from "../ui/badge";
import { UserTableSkeleton } from "./UserTable";

const tableHeaders = [
  { label: "Name" },
  { label: "Posts Type" },
  { label: "User Type" },
  { label: "Tag" },
  { label: "Reports" },
];

export const userTypes = [
  {
    type: "profile",
    label: "Profile",
    bgColor: "bg-[#162924]",
    textColor: "text-[#38e07b]",
  },
  {
    type: "anonymous",
    label: "Anonymous",
    bgColor: "bg-[#1e003f]",
    textColor: "text-[#a700ff]",
  },
] as const;

const tags: {
  icon: React.ComponentType<any>;
  type: Exclude<Category, "All">;
}[] = [
  { icon: light, type: "Idea" },
  { icon: MapPin, type: "Observation" },
  { icon: thumbsup, type: "Thought" },
  { icon: thumbsup, type: "Gratitude" },
  { icon: thumbsup, type: "Concern" },
  { icon: thumbsup, type: "Gossip" },
] as const;

export const PostManagement = (): React.ReactElement => {
  const { data, isLoading } = useGetAllShoutsQuery();

  const shoutData = data?.data;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full bg-[#101012] rounded-xl overflow-hidden border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="h-14 bg-[#1a1a1a]">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="px-4.5 text-left font-['Inter'] font-medium text-gray-50 text-lg"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {isLoading && <UserTableSkeleton cols={5} rows={5} />}
          {shoutData?.map((row, rowIndex) => (
            <tr key={rowIndex} className="h-17 border-t border-[#212529]">
              {/* Name Column */}
              <td className="px-4.5">
                <div className="inline-flex items-center gap-2">
                  <UserAvatar
                    className="size-9"
                    name={row.user.name}
                    avatar={row.user.avatar}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-sm font-['Inter'] font-medium">
                      {row.user.name}
                    </span>
                    <span className="text-gray-400 text-xs font-['Inter']">
                      {row.user.email}
                    </span>
                  </div>
                </div>
              </td>

              {/* Posts Type Column */}
              <td className="px-4.5">
                <div className="inline-flex items-center gap-1">
                  <PostTypesCell stats={row.stats} />
                </div>
              </td>

              {/* User Type Column */}
              <td className="px-4.5">
                <div className="inline-flex items-center gap-1">
                  {userTypes.map((userType, index) => (
                    <Badge
                      key={index}
                      className={`inline-flex flex-col gap-0.75 p-2 ${userType.bgColor} rounded-lg border-0 hover:${userType.bgColor}`}
                    >
                      <span
                        className={`${userType.textColor} text-xs font-['Inter'] font-medium`}
                      >
                        {row.stats.userType[userType.type]}
                      </span>
                      <span
                        className={`${userType.textColor} text-xs font-['Inter'] font-medium`}
                      >
                        {userType.label}
                      </span>
                    </Badge>
                  ))}
                </div>
              </td>

              {/* Tag Column */}
              <td className="px-4.5">
                <div className="inline-flex items-center gap-1">
                  {tags.map((tag, index) => {
                    const IconComponent = tag.icon;
                    return (
                      <div
                        key={index}
                        className="inline-flex flex-col items-start gap-2.5 p-2 bg-[#1a1a1a] rounded-lg"
                      >
                        <div className="inline-flex flex-col items-center gap-0.75">
                          <IconComponent className="w-3.5 h-3.5 text-white" />
                          <span className="text-white font-['Inter'] font-medium text-xs">
                            {row.stats.tags[tag.type]}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </td>

              {/* Reports Column */}
              <td className="px-4.5">
                <div className="inline-flex items-center gap-2 px-2 py-1.5 rounded-lg">
                  <AlertCircle className="w-4.5 h-4.5 text-[#d54c3f]" />
                  <span className="font-['Inter'] font-medium text-[#d54c3f] text-sm">
                    {row?.stats?.reports > 0 ? `- ${row?.stats?.reports}` : 0}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
