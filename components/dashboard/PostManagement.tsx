"use client";

import { Search, Type, Mic, AlertCircle, MapPin } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import lightbulb from "../icons/lightbulb";
import thumbsup from "../icons/thumbsup";

const tableHeaders = [
  { label: "Name" },
  { label: "Posts Type" },
  { label: "User Type" },
  { label: "Tag" },
  { label: "Reports" },
];

const postTypes = [
  {
    icon: Type,
    count: "284",
  },
  {
    icon: Mic,
    count: "200",
  },
];

const userTypes = [
  {
    count: "284",
    label: "Profile",
    bgColor: "bg-[#162924]",
    textColor: "text-[#38e07b]",
  },
  {
    count: "284",
    label: "Anonymous",
    bgColor: "bg-[#1e003f]",
    textColor: "text-[#a700ff]",
  },
];

const tags = [
  { icon: lightbulb, count: "69" },
  { icon: MapPin, count: "07" },
  { icon: thumbsup, count: "60" },
  { icon: thumbsup, count: "60" },
  { icon: thumbsup, count: "60" },
];

const tableData = [
  {
    name: "Frank Flores",
    email: "fra****@***.com",
    reports: "-2",
  },
  {
    name: "Frank Flores",
    email: "fra****@***.com",
    reports: "-2",
  },
  {
    name: "Frank Flores",
    email: "fra****@***.com",
    reports: "-2",
  },
  {
    name: "Frank Flores",
    email: "fra****@***.com",
    reports: "-2",
  },
  {
    name: "Frank Flores",
    email: "fra****@***.com",
    reports: "-2",
  },
  {
    name: "Frank Flores",
    email: "fra****@***.com",
    reports: "-2",
  },
];

export const PostManagement = (): React.ReactElement => {
  return (
    <div className="w-full">
      {/* Header Section with Search and Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Title and Description */}
        <div className="inline-flex flex-col justify-start items-start gap-2">
          <div className="text-gray-50 text-xl font-semibold font-['Inter'] leading-8">
            Posts Management
          </div>
          <div className="text-neutral-300 text-base font-['Inter'] leading-4">
            Manage and moderate all user posts.
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="flex-1 lg:flex-initial lg:w-96 h-10 px-4 py-2.5 bg-neutral-900 rounded-lg inline-flex justify-start items-center gap-1.5">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search users or shouts..."
              className="flex-1 bg-transparent border-0 outline-0 text-zinc-400 text-base font-['Inter'] leading-4 placeholder:text-zinc-400"
            />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-37 h-10 bg-[#101012] border-[#2c2d35] rounded-lg">
              <SelectValue>
                <span className="font-['Inter'] font-normal text-white text-xs">
                  All Types
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <section className="flex flex-col w-full bg-[#101012] rounded-xl overflow-hidden">
          <header className="flex h-14 items-center w-full">
            {tableHeaders.map((header, index) => (
              <div
                key={index}
                className="flex-1 h-full flex items-center bg-[#1a1a1a] px-4.5"
              >
                <h3 className="font-['Inter'] font-medium text-gray-50 text-lg tracking-[0] leading-[normal]">
                  {header.label}
                </h3>
              </div>
            ))}
          </header>

          {tableData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex h-17 items-center w-full border-t border-solid border-[#212529]"
            >
              {/* Name Column */}
              <div className="flex-1 h-full flex items-center px-4.5">
                <div className="inline-flex items-center gap-2">
                  <Avatar className="w-9 h-9 rounded-full border border-solid border-[#e3e5e6] bg-gray-700">
                    <AvatarFallback className="bg-gray-700 text-gray-300">
                      {row.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-center gap-1">
                    <div className="text-white text-sm leading-[normal] font-['Inter'] font-medium tracking-[0]">
                      {row.name}
                    </div>
                    <div className="font-['Inter'] font-normal text-gray-400 text-xs tracking-[0] leading-[normal]">
                      {row.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts Type Column */}
              <div className="flex-1 h-full flex items-center px-4.5">
                <div className="inline-flex items-center gap-1">
                  {postTypes.map((postType, index) => {
                    const IconComponent = postType.icon;
                    return (
                      <div
                        key={index}
                        className="items-center gap-2 p-2 rounded-lg inline-flex"
                      >
                        <div className="inline-flex items-center justify-center gap-1.5">
                          <div className="relative w-6.5 h-6.5 bg-gray-700 rounded-full flex items-center justify-center">
                            <IconComponent className="w-3.5 h-3.5 text-gray-50" />
                          </div>
                          <span className="text-gray-50 font-['Inter'] font-medium text-xs tracking-[0] leading-[normal]">
                            {postType.count}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* User Type Column */}
              <div className="flex-1 h-full flex items-center px-4.5">
                <div className="inline-flex items-center gap-1">
                  {userTypes.map((userType, index) => (
                    <Badge
                      key={index}
                      className={`inline-flex flex-col items-start gap-0.75 p-2 ${userType.bgColor} rounded-lg border-0 hover:${userType.bgColor}`}
                    >
                      <span
                        className={`${userType.textColor} text-xs leading-[14.4px] whitespace-nowrap font-['Inter'] font-medium tracking-[0]`}
                      >
                        {userType.count}
                      </span>
                      <span
                        className={`${userType.textColor} text-xs leading-[14.4px] whitespace-nowrap font-['Inter'] font-medium tracking-[0]`}
                      >
                        {userType.label}
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tag Column */}
              <div className="flex-1 h-full flex items-center px-4.5">
                <div className="inline-flex items-center gap-1">
                  {tags.map((tag, index) => {
                    const IconComponent = tag.icon;
                    return (
                      <div
                        key={index}
                        className="inline-flex flex-col items-start gap-2.5 p-2 bg-[#1a1a1a] rounded-lg overflow-hidden"
                      >
                        <div className="inline-flex flex-col items-center gap-0.75">
                          <IconComponent className="w-3.5 h-3.5 text-white" />
                          <span className="text-white font-['Inter'] font-medium text-xs tracking-[0] leading-[normal]">
                            {tag.count}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reports Column */}
              <div className="flex-1 h-full flex items-center px-4.5">
                <div className="items-center gap-2 px-2 py-1.5 rounded-lg inline-flex">
                  <div className="inline-flex items-center justify-center gap-0.75">
                    <AlertCircle className="w-4.5 h-4.5 text-[#d54c3f]" />
                    <span className="font-['Inter'] font-medium text-[#d54c3f] text-sm tracking-[0] leading-[normal]">
                      {row.reports}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
