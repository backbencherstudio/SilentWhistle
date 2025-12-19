/**
 * Shout Categories Component
 * 
 * Displays a list of shout/post categories with their respective counts.
 * Shows both text posts and voice posts for each category.
 * Categories include: Idea, Observation, Thought, Gratitude, Concern, Gossip
 * 
 * @component
 * @example
 * <ShoutCategories />
 */

'use client';

import { useState } from 'react';
import { Lightbulb, Eye, Brain, HandHeart, AlertTriangle, MessageSquare } from 'lucide-react';
import { Card } from '../ui/card';

/**
 * Category interface
 * Defines the structure of each shout category
 */
interface Category {
  /** Icon component for the category */
  icon: React.ComponentType<{ className?: string }>;
  /** Category name */
  name: string;
  /** Number of text posts in this category */
  textPosts: number;
  /** Number of voice posts in this category */
  voicePosts: number;
}

/**
 * Categories data
 * Array of all shout categories with their icons and counts
 */
const categories: Category[] = [
  { icon: Lightbulb, name: 'Idea', textPosts: 240, voicePosts: 240 },
  { icon: Eye, name: 'Observation', textPosts: 240, voicePosts: 240 },
  { icon: Brain, name: 'Thought', textPosts: 240, voicePosts: 240 },
  { icon: HandHeart, name: 'Gratitude', textPosts: 240, voicePosts: 240 },
  { icon: AlertTriangle, name: 'Concern', textPosts: 240, voicePosts: 240 },
  { icon: MessageSquare, name: 'Gossip', textPosts: 240, voicePosts: 240 },
];

/**
 * Shout Categories Component
 * 
 * Renders a list of categories with their post counts
 */
export default function ShoutCategories() {
  const [selectedType, setSelectedType] = useState<'text' | 'voice'>('text');

  return (
    <Card className="bg-[#101012] rounded-2xl border-0 h-full flex flex-col">
      {/* Header Section */}
      <div className="px-6 pt-6 pb-4 flex justify-between items-center gap-7">
        <div className="flex-1 justify-start text-white text-base font-semibold font-['Inter'] leading-7 whitespace-nowrap">
          Shout Categories
        </div>
        <div className="flex justify-start items-center gap-1.5">
          <button
            onClick={() => setSelectedType('text')}
            className={`px-1.5 py-[3px] rounded-lg flex justify-center items-center gap-2.5 transition-colors ${
              selectedType === 'text' ? 'bg-neutral-800' : ''
            }`}
          >
            <div className="justify-start text-neutral-300 text-sm font-normal font-['Inter'] leading-6 whitespace-nowrap">
              Text Posts
            </div>
          </button>
          <button
            onClick={() => setSelectedType('voice')}
            className={`px-1.5 py-[3px] flex justify-center items-center gap-2.5 transition-colors ${
              selectedType === 'voice' ? 'bg-neutral-800 rounded-lg' : ''
            }`}
          >
            <div className="justify-start text-neutral-300 text-sm font-normal font-['Inter'] leading-6 whitespace-nowrap">
              Voice Posts
            </div>
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="flex-1 px-6 pb-6 flex flex-col justify-start items-start overflow-y-auto">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          const isLast = index === categories.length - 1;
          
          return (
            <div
              key={index}
              className={`w-full py-1.5 inline-flex justify-between items-center ${
                !isLast ? 'border-b border-neutral-800' : ''
              }`}
            >
              <div className="flex-1 px-4 py-2.5 flex justify-start items-center gap-1 min-w-0">
                <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-4 h-4 text-gray-200" />
                </div>
                <div className="justify-start text-gray-200 text-sm font-normal font-['Inter'] leading-4 whitespace-nowrap truncate">
                  {category.name}
                </div>
              </div>
              <div className="w-32 flex justify-between items-center gap-4 flex-shrink-0">
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
