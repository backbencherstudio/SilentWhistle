'use client';

import { ChevronDown } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";

export const SystemSettings = (): React.ReactElement => {
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
      </div>

      {/* Profile Information Card */}
      <Card className="bg-neutral-900 rounded-2xl border-0">
        <CardContent className="p-6">
          <div className="flex flex-col gap-8">
            {/* Profile Information Header */}
            <div className="flex flex-col gap-5">
              <div className="pb-4 border-b border-neutral-800 inline-flex justify-start items-center gap-5">
                <div className="text-white text-xl font-semibold font-['Roboto'] leading-6 tracking-tight">
                  Profile Information
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              {/* Row 1: App Name and Email */}
              <div className="flex flex-col lg:flex-row justify-start items-start gap-5">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5 w-full">
                  <div className="self-stretch text-zinc-400 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                    App Name
                  </div>
                  <div className="self-stretch h-14 p-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-neutral-800 inline-flex justify-end items-center gap-4 bg-[#101012]">
                    <div className="flex-1 text-zinc-200 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                      Silent Whistle
                    </div>
                  </div>
                </div>
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5 w-full">
                  <div className="self-stretch text-zinc-400 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                    Email
                  </div>
                  <div className="self-stretch h-14 p-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-neutral-800 inline-flex justify-end items-center gap-4 bg-[#101012]">
                    <div className="flex-1 text-zinc-200 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                      yoursilentwhistle@email.com
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Support Email and Phone */}
              <div className="flex flex-col lg:flex-row justify-start items-start gap-5">
                <div className="flex-1 flex justify-start items-start gap-5 w-full">
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch text-zinc-400 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                      Support Email
                    </div>
                    <div className="self-stretch h-14 p-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-neutral-800 inline-flex justify-end items-center gap-4 bg-[#101012]">
                      <div className="flex-1 text-zinc-200 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                        support@app.com
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5 w-full">
                  <div className="self-stretch text-zinc-400 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                    Phone
                  </div>
                  <div className="self-stretch h-14 p-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-neutral-800 inline-flex justify-end items-center gap-4 bg-[#101012]">
                    <div className="flex-1 text-zinc-200 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                      (225) 555-0118
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Language and Address */}
              <div className="flex flex-col lg:flex-row justify-start items-start gap-5">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5 w-full">
                  <div className="self-stretch text-zinc-400 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                    Language
                  </div>
                  <div className="self-stretch h-14 p-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-neutral-800 inline-flex justify-end items-center gap-4 bg-[#101012] cursor-pointer">
                    <div className="flex-1 text-zinc-200 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                      English
                    </div>
                    <ChevronDown className="w-6 h-6 text-gray-50 rotate-[-90deg] shrink-0" />
                  </div>
                </div>
                <div className="flex-1 flex justify-start items-start gap-5 w-full">
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch text-zinc-400 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                      Address
                    </div>
                    <div className="self-stretch h-14 p-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-neutral-800 inline-flex justify-end items-center gap-4 bg-[#101012]">
                      <div className="flex-1 text-zinc-200 text-base font-normal font-['Inter'] leading-6 tracking-tight">
                        1901 Thornridge Cir. Shiloh, Hawaii 81063
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

