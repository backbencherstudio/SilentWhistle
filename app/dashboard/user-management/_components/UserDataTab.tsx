"use client";

import AlertTriangle from "@/components/icons/AlertTriangle";
import AllIcon from "@/components/icons/AllIcon";
import lightbulb from "@/components/icons/lightbulb";
import RoundChat from "@/components/icons/RoundChat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AllTabContent from "./AllTabContent";
import { IShout } from "@/redux/features/user-management/types";

export const categories = [
  "All",
  "Idea",
  "Observation",
  "Thought",
  "Gratitude",
  "Concern",
  "Gossip",
] as const;

export type Category = (typeof categories)[number];

type TabHeader<T extends Category = Category> = {
  icon: React.ComponentType<any>;
  value: T;
  text: T;
};

const createTabHeaders = <T extends readonly TabHeader[]>(tabs: T) => tabs;

const tabHeaders = createTabHeaders([
  { icon: AllIcon, value: "All", text: "All" },
  { icon: AlertTriangle, value: "Concern", text: "Concern" },
  { icon: lightbulb, value: "Idea", text: "Idea" },
  { icon: RoundChat, value: "Gossip", text: "Gossip" },
  { icon: RoundChat, value: "Observation", text: "Observation" },
  { icon: RoundChat, value: "Thought", text: "Thought" },
  { icon: RoundChat, value: "Gratitude", text: "Gratitude" },
] as const);

const UserDataTab = (props: {
  shouts?: IShout[];
  contentIsLoading?: boolean;
}) => {
  const [activeTab, setActiveTab] = useState<Category>("All");

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
            <AllTabContent
              contentIsLoading={props.contentIsLoading}
              shouts={props.shouts}
              category={header.value}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default UserDataTab;
