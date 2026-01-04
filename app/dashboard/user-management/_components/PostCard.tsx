import LikeIcon from "@/components/icons/LikeIcon";
import Thumbs from "@/components/icons/Thumbs";
import RoundChat from "@/components/icons/RoundChat";
import ShareIcon from "@/components/icons/ShareIcon";
import { Lightbulb, MapPin } from "lucide-react";
import Image from "next/image";
import WaveformPlayer from "./WaveformPlayer";

type PostType = "image" | "audio";

export type Post = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  category: string;
  location: string;
  timeAgo: string;
  description?: string;
  type: PostType;
  mediaUrl?: string;
  liked: boolean;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
};

export default function PostCard({
  post,
  onToggleLike,
}: {
  post: Post;
  onToggleLike: (id: string) => void;
}) {
  return (
    <div className="bg-[#161616] p-5 rounded-xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src={post.user.avatar}
              alt="user image"
              fill
              className="object-cover rounded-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-lg leading-[132%] -tracking-[1%]">
              {post.user.name}
            </h1>

            <div className="flex items-center gap-2">
              <div className="text-[#D2D2D5] flex items-center gap-1">
                <Lightbulb className="size-4" />
                <p className="capitalize text-xs leading-[112%]">
                  {post.category}
                </p>
              </div>
              <div className="text-[#D2D2D5] flex items-center gap-1">
                <MapPin className="size-4" />
                <p className="capitalize text-xs leading-[112%]">
                  {post.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs font-light leading-[132%] -tracking-[1%] text-[#D2D2D5]">
          {post.timeAgo}
        </p>
      </div>

      {/* Description */}
      {post.description && (
        <p className="text-base font-light leading-[160%] -tracking-[1%] text-[#E9E9EA] mt-5 mb-3">
          {post.description}
        </p>
      )}

      {/* Media */}
      {post.type === "image" && post.mediaUrl && (
        <div className="relative w-full h-52.5">
          <Image
            src={post.mediaUrl}
            alt="post image"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}

      {post.type === "audio" && post.mediaUrl && (
        <div className="mt-4">
          <WaveformPlayer audioUrl={post.mediaUrl} />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between mt-5 mb-3">
        <div className="flex gap-1 items-center">
          <LikeIcon />
          <p className="font-medium text-xs leading-[132%] tracking-[0.5%]">
            {formatCount(post.stats.likes)}
          </p>
        </div>

        <div className="text-xs leading-[132%] tracking-[0.5%] flex items-center gap-1">
          <p>{post.stats.comments} comments</p>
          <p className="text-[#484849]">•</p>
          <p>{post.stats.shares} shares</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-t-[#474747] pt-3">
        <button
          onClick={() => onToggleLike(post.id)}
          className={`flex items-center gap-1 transition hover:opacity-80 ${
            post.liked ? "text-[#38E07B]" : "text-white"
          }`}
        >
          {post.liked ? <LikeIcon size="24" /> : <Thumbs />}
          <p>Like</p>
        </button>

        <button className="flex items-center gap-1 hover:opacity-80 transition">
          <RoundChat stroke="white" />
          <p>Comment</p>
        </button>

        <button className="flex items-center gap-1 hover:opacity-80 transition">
          <ShareIcon />
          <p>Share</p>
        </button>
      </div>
    </div>
  );
}

function formatCount(num: number) {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return String(num);
}
