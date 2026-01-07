"use client";

import DashboardLayout from "@/components/common/DashboardLayout";
import UserBan from "@/components/icons/UserBan";
import UserWarn from "@/components/icons/UserWarn";

// import EllipseDot from "@/components/dashboard/modal/EllipseDot";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ellipsis, MapPin, Search } from "lucide-react";
import Image from "next/image";
import UserDataTab from "../../_components/UserDataTab";

const SingleUserProfilePage = () => {
  //   const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-6 w-full text-white">
        {/* Header Section */}
        <div className="w-full mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title Section */}
            <div className="inline-flex flex-col justify-start items-start gap-2">
              <div className="text-gray-50 text-xl font-semibold font-['Inter'] leading-8">
                User Profile
              </div>
              <div className="text-neutral-300 text-base font-['Inter'] leading-4">
                Oversee and control user accounts
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

              {/* Filter Dropdown */}
              {/* <div className="h-10 bg-neutral-900 rounded-lg outline-1 -outline-offset-1 outline-zinc-800 overflow-hidden relative min-w-36">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full h-full inline-flex justify-between items-center gap-2 px-3"
                >
                  <div className="text-white text-xs font-normal font-['Inter']">
                    All User
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform shrink-0 ${
                      isFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div> */}
            </div>
          </div>
        </div>
        {/* user detail and dropdown */}
        <div className="w-full overflow-x-auto flex items-center justify-between mb-6">
          <div className="flex flex-row items-center gap-3">
            <div className="relative w-17 h-17">
              <Image
                src="/dashboard/user.png"
                alt="user photo"
                fill
                className="absolute object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-[132%] tracking-[-1%] mb-1">
                Ludovic Migneault
              </h1>
              <p className="font-light text-xs leading-[110%] text-[#D2D2D5] mb-3">
                @Ludovic_Migneault
              </p>
              <div className="font-normal text-sm leading-[110%] text-[#D2D2D5] flex flex-row items-center gap-1">
                <MapPin />
                <span className="capitalize">Victoria Island</span>
              </div>
            </div>
          </div>

          <div className="">
            <div className=" rounded-full size-11 flex items-center justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-11 h-11 bg-[#031409] hover:bg-[#031409]/80 focus-visible:border-none border border-[#041F0D]"
                  >
                    <Ellipsis className="w-5 h-5 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-[#181818] text-white shadow-md font-thin text-base leading-[130%] -tracking-[1] border-none"
                  align="end"
                >
                  <DropdownMenuItem className="hover:bg-[#181818]! hover:text-white!">
                    <UserWarn /> <span>Warn User</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="mx-2 bg-[#282A39]" />
                  <DropdownMenuItem className="hover:bg-[#181818]! hover:text-white!">
                    <UserBan /> <span>Ban User</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        {/* about */}
        <div className="bg-[#161616] flex flex-col gap-3 px-3 py-4 rounded-xl mb-8">
          <p className="text-sm font-medium leading-[140%] tracking-[0.5%] text-[#A5A5AB] capitalize">
            about <span className="text-white">ludovic migneault</span>
          </p>
          <p className="text-sm font-medium leading-[140%] tracking-[0.5%] text-[#A5A5AB]">
            Aspiring actor passionate about stage, screen, and voice
            performance.Currently training at CINACT to grow my performance
            skills and creative confidence.
          </p>
        </div>
        {/* tabs */}
        <UserDataTab />
      </div>
    </DashboardLayout>
  );
};

export default SingleUserProfilePage;
