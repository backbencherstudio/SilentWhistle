"use client";

import { useMemo, useState } from "react";
import PostCard, { Post } from "./PostCard";

type Props = {
  category: "all" | "idea" | "concern" | "gossip";
};

const AllTabContent = ({ category }: Props) => {
  const initialPosts: Post[] = [
    {
      id: "1",
      user: { name: "Ludovic Migneault", avatar: "/dashboard/user.png" },
      category: "idea",
      location: "Victoria Island",
      timeAgo: "2m ago",
      description:
        "The traffic lights at Main Street have been broken for three days now.",
      type: "image",
      mediaUrl: "/dashboard/post.png",
      liked: false,
      stats: { likes: 4800, comments: 12, shares: 3 },
    },
    {
      id: "2",
      user: { name: "Ludovic Migneault", avatar: "/dashboard/user.png" },
      category: "gossip",
      location: "Victoria Island",
      timeAgo: "2m ago",
      type: "audio",
      mediaUrl: "/audio/sample.mp3",
      liked: true,
      stats: { likes: 920, comments: 12, shares: 3 },
    },
    {
      id: "3",
      user: { name: "Someone", avatar: "/dashboard/user.png" },
      category: "concern",
      location: "Dhaka",
      timeAgo: "10m ago",
      description: "Road is damaged and dangerous.",
      type: "image",
      mediaUrl: "/dashboard/post.png",
      liked: false,
      stats: { likes: 120, comments: 2, shares: 0 },
    },
  ];

  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const filteredPosts = useMemo(() => {
    if (category === "all") return posts;
    return posts.filter((post) => post.category === category);
  }, [posts, category]);

  const handleToggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== id) return post;

        const liked = !post.liked;
        const likes = liked ? post.stats.likes + 1 : post.stats.likes - 1;

        return {
          ...post,
          liked,
          stats: { ...post.stats, likes },
        };
      })
    );
  };

  return (
    <div className="h-[calc(80vh-220px)] overflow-y-auto pr-2 space-y-5">
      {filteredPosts.length === 0 ? (
        <p className="text-center text-sm text-gray-400 mt-6">
          No posts found for {category}.
        </p>
      ) : (
        filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onToggleLike={handleToggleLike} />
        ))
      )}
    </div>
  );
};

export default AllTabContent;
