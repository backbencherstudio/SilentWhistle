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

import { Lightbulb, Eye, Brain, HandHeart, AlertTriangle, MessageSquare } from 'lucide-react';

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
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Shout Categories</h2>
        {/* Column headers */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-white">Text Posts</span>
          <span className="text-white">Voice Posts</span>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {/* Category name and icon */}
              <div className="flex items-center gap-3">
                <IconComponent className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">{category.name}</span>
              </div>
              {/* Post counts */}
              <div className="flex items-center gap-4 text-sm">
                <span className="text-white w-16 text-right">{category.textPosts}</span>
                <span className="text-white w-16 text-right">{category.voicePosts}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
