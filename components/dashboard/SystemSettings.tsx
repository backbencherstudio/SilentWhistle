"use client";

import { cn } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/profile/profile.api";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import SystemSettingsForm from "./SystemSettingsForm";

export const SystemSettings = (): React.ReactElement => {
  const { data, isLoading } = useGetMeQuery();
  const [openEditForm, setOpenEditForm] = useState(false);

  const profileData = data?.data;

  const profileFields = [
    { label: "Name", value: profileData?.name ?? "N/A" },
    { label: "Username", value: profileData?.username ?? "N/A" },
    { label: "Email", value: profileData?.email ?? "N/A" },
    // { label: "Phone", value: profileData?.phone_number ?? "N/A" },
    { label: "Status", value: profileData?.status ?? "N/A" },
    { label: "Account Type", value: profileData?.type ?? "N/A" },
    { label: "Address", value: profileData?.address ?? "N/A" },
    // {
    //   label: "Email Verified At",
    //   value: formatDate(profileData?.email_verified_at),
    // },
    // {
    //   label: "Created At",
    //   value: formatDate(profileData?.created_at),
    // },
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Title and Description */}
        <div className="inline-flex flex-col justify-start items-start gap-2">
          <div className="text-gray-50 text-xl font-semibold font-['Inter'] leading-8">
            System Settings
          </div>
          <div className="text-neutral-300 text-base font-light font-['Inter'] leading-4">
            Configure app and admin settings
          </div>
        </div>

        <Button
          onClick={() => setOpenEditForm(true)}
          className="rounded-lg bg-[#0C2A16] text-[#58FF9E] hover:bg-[#0E341B] h-11 font-medium"
        >
          Edit Profile
        </Button>
      </div>

      {/* Profile Information Card */}
      <Card className="bg-neutral-900 rounded-2xl border-0">
        <CardContent className="p-6">
          <div className="flex flex-col gap-8">
            <div className="flex pb-4 border-b border-neutral-800 justify-between items-center gap-5">
              <div className="text-white text-xl font-semibold font-['Roboto'] leading-6 tracking-tight">
                Profile Information
              </div>
            </div>

            {profileData ? (
              <SystemSettingsForm
                open={openEditForm}
                onOpenChange={setOpenEditForm}
                id={profileData?.id}
                defaultValue={profileData}
              />
            ) : null}

            <div className="grid grid-cols-2 gap-4">
              {profileFields.map((field, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col lg:flex-row justify-start items-start gap-5",
                    // { "col-span-2": field.label === "Address" },
                  )}
                >
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5 w-full">
                    <div className="self-stretch text-zinc-400 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                      {field.label}
                    </div>
                    <div className="self-stretch h-14 p-4 rounded-xl  outline-neutral-800 inline-flex justify-end items-center gap-4 bg-[#101012]">
                      <div className="flex-1 text-zinc-200 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                        {isLoading ? (
                          <Skeleton className="h-6 w-50" />
                        ) : (
                          field.value
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
