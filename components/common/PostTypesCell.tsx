import { cn } from "@/lib/utils";
import React from "react";

import Mic from "../icons/Mic";
import TextIcon from "../icons/TextIcon";

export const POST_TYPES = [
  {
    type: "text",
    icon: TextIcon,
  },
  {
    type: "audio",
    icon: Mic,
  },
] as const;

type PostType = (typeof POST_TYPES)[number]["type"];

interface PostTypesCellProps {
  stats: {
    postsType: Record<PostType, number>;
  };
  postTypes?: readonly {
    type: PostType;
    icon: React.ComponentType<any>;
  }[];
}

export const PostTypesCell: React.FC<PostTypesCellProps> = ({
  stats,
  postTypes = POST_TYPES,
}) => {
  return (
    <div className="inline-flex items-center gap-1">
      {postTypes.map((postType, index) => {
        const IconComponent = postType.icon;

        return (
          <div
            key={index}
            className={cn(
              "items-center gap-2 p-2 rounded-lg inline-flex",
              { "text-green-600": postType.type === "audio" },
              { "text-blue-400": postType.type === "text" },
            )}
          >
            <div className="inline-flex items-center gap-1.5">
              <div className="w-6.5 h-6.5 border border-current rounded-full flex items-center justify-center">
                <IconComponent />
              </div>

              <span className="text-gray-50 font-['Inter'] font-medium text-xs">
                {stats.postsType[postType.type]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
