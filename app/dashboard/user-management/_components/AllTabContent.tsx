"use client";

import { IShout } from "@/redux/features/user-management/types";
import { useMemo } from "react";
import PostCard, { PostCardSkeleton } from "./PostCard";
import { Category } from "./UserDataTab";

type Props = {
  category: Category;
  shouts?: IShout[];
  contentIsLoading?: boolean;
};

const AllTabContent = ({ category, contentIsLoading, shouts = [] }: Props) => {
  const filteredPosts = useMemo(() => {
    if (category === "All") return shouts;
    return shouts.filter((post) => post.category === category);
  }, [shouts, category]);

  return (
    <div className="space-y-5">
      {contentIsLoading ? (
        Array.from({ length: 2 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-sm text-gray-400 mt-6">
          No posts found for {category}.
        </p>
      ) : (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};

export default AllTabContent;
