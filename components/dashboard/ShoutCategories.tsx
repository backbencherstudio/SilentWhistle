"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import light from "../icons/shout-categories/light";
import eye from "../icons/shout-categories/eye";
import brain from "../icons/shout-categories/brain";
import handHeart from "../icons/shout-categories/handHeart";
import alertTriangle from "../icons/shout-categories/alertTriangle";
import messageSquare from "../icons/shout-categories/messageSquare";

interface Category {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  textPosts: number;
  voicePosts: number;
}

interface ShoutCategoryData {
  category: string;
  textPosts: number;
  voicePosts: number;
}

const defaultCategories: Category[] = [
  { icon: light, name: "Idea", textPosts: 240, voicePosts: 240 },
  { icon: eye, name: "Observation", textPosts: 240, voicePosts: 240 },
  { icon: brain, name: "Thought", textPosts: 240, voicePosts: 240 },
  { icon: handHeart, name: "Gratitude", textPosts: 240, voicePosts: 240 },
  { icon: alertTriangle, name: "Concern", textPosts: 240, voicePosts: 240 },
  { icon: messageSquare, name: "Gossip", textPosts: 240, voicePosts: 240 },
];


export default function ShoutCategories({
  categories,
}: {
  categories?: ShoutCategoryData[];
}) {
  const [selectedType, setSelectedType] = useState<"text" | "voice">("text");
  const categoryIconMap: Record<
    string,
    React.ComponentType<{ className?: string }>
  > = {
    Idea: light,
    Observation: eye,
    Thought: brain,
    Gratitude: handHeart,
    Concern: alertTriangle,
    Gossip: messageSquare,
  };

  const listToRender: Category[] =
    categories && categories.length > 0
      ? categories.map((item) => ({
          icon: categoryIconMap[item.category] ?? messageSquare,
          name: item.category,
          textPosts: item.textPosts,
          voicePosts: item.voicePosts,
        }))
      : defaultCategories;

  return (
    <Card className="bg-[#101012] rounded-2xl border-0 h-full flex flex-col">
      {/* Header Section */}
      <div className="px-6 pt-6 pb-4 flex justify-between items-center gap-7">
        <div className="flex-1 justify-start text-white text-base font-semibold font-['Inter'] leading-7 whitespace-nowrap">
          Shout Categories
        </div>
        <div className="flex justify-start items-center gap-1.5">
          <button
            className={`px-1.5 py-0.75 rounded-lg flex justify-center items-center gap-2.5 transition-colors`}
          >
            <div className="justify-start text-neutral-300 text-sm font-normal font-['Inter'] leading-6 whitespace-nowrap">
              Text Posts
            </div>
          </button>
          <button
            className={`px-1.5 py-0.75 flex justify-center items-center gap-2.5 transition-colors`}
          >
            <div className="justify-start text-neutral-300 text-sm font-normal font-['Inter'] leading-6 whitespace-nowrap">
              Voice Posts
            </div>
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="flex-1 px-6 pb-6 flex flex-col justify-start items-start overflow-y-auto">
        {listToRender.map((category, index) => {
          const IconComponent = category.icon;
          const isLast = index === listToRender.length - 1;

          return (
            <div
              key={index}
              className={`w-full py-1.5 inline-flex justify-between items-center ${
                !isLast ? "border-b border-neutral-800" : ""
              }`}
            >
              <div className="flex-1 px-4 py-2.5 flex justify-start items-center gap-1 min-w-0">
                <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center shrink-0">
                  <IconComponent className="w-4 h-4 text-gray-200" />
                </div>
                <div className="justify-start text-gray-200 text-sm font-normal font-['Inter'] leading-4 whitespace-nowrap truncate">
                  {category.name}
                </div>
              </div>
              <div className="w-32 flex justify-between items-center gap-4 shrink-0">
                <div className="justify-start text-white text-sm font-medium font-['Inter'] leading-4 whitespace-nowrap">
                  {category.textPosts}
                </div>
                <div className="justify-start text-white text-sm font-medium font-['Inter'] leading-4 whitespace-nowrap">
                  {category.voicePosts}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
