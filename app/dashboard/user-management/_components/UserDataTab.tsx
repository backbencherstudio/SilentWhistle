"use client";

import AlertTriangle from "@/components/icons/AlertTriangle";
import AllIcon from "@/components/icons/AllIcon";
import lightbulb from "@/components/icons/lightbulb";
import RoundChat from "@/components/icons/RoundChat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AllTabContent from "./AllTabContent";

type Category = "all" | "idea" | "concern" | "gossip";

const UserDataTab = () => {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const tabHeaders = [
    { icon: AllIcon, value: "all", text: "all" },
    { icon: AlertTriangle, value: "concern", text: "concern" },
    { icon: lightbulb, value: "idea", text: "idea" },
    { icon: RoundChat, value: "gossip", text: "gossip" },
  ] as const;

  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as Category)}
        className="w-full"
      >
        <TabsList className="bg-transparent gap-6">
          {tabHeaders.map((header) => {
            const Icon = header.icon;
            const isActive = activeTab === header.value;

            return (
              <TabsTrigger
                key={header.value}
                value={header.value}
                className={`bg-transparent! border-b-2 rounded-none text-base leading-[140%] tracking-[-1%] capitalize flex items-center gap-2 ${
                  isActive
                    ? "text-[#38E07B] border-b-[#38E07B]"
                    : "text-white border-b-transparent"
                }`}
              >
                <Icon stroke={isActive ? "#38E07B" : "white"} />
                {header.text}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabHeaders.map((header) => (
          <TabsContent key={header.value} value={header.value}>
            <AllTabContent category={header.value} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default UserDataTab;
