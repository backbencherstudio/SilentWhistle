import { formatCount, getRelativeTime } from "@/lib/utils/formatter";
import { IShout } from "@/redux/features/user-management/types";
import { Lightbulb, MapPin } from "lucide-react";
import Image from "next/image";
import { UserAvatar } from "./UserAvatar";
import WaveformPlayer from "./WaveformPlayer";
import LikeIcon from "@/components/icons/LikeIcon";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostCard({ post }: { post: IShout }) {
  return (
    <div className="bg-[#161616] last:mb-6 p-5 rounded-xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <UserAvatar
            className="size-10"
            name={post.user.name}
            avatar={post.user.avatar}
          />

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
          {getRelativeTime(post.created_at)}
        </p>
      </div>

      {/* Description */}
      {post.content && (
        <p className="text-base font-light leading-[160%] -tracking-[1%] text-[#E9E9EA] mt-5 mb-3">
          {post.content}
        </p>
      )}

      {/* Media */}
      <div className="space-y-4">
        {post.medias.map((media) => {
          return (
            <div key={media.id}>
              {media.type === "IMAGE" && media.url && (
                <div className="relative w-full h-52.5">
                  <Image
                    src={media.url}
                    alt="post image"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              )}

              {media.type === "AUDIO" && (
                <WaveformPlayer audioUrl={media.url} />
              )}
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mt-5 mb-3">
        <div className="flex gap-1 items-center">
          <LikeIcon />
          <p className="font-medium text-xs leading-[132%] tracking-[0.5%]">
            {formatCount(post?._count?.likes ?? 0)}
          </p>
        </div>

        <div className="text-xs leading-[132%] tracking-[0.5%] flex items-center gap-1">
          <p>{formatCount(post._count.comments)} comments</p>
          <p className="text-[#484849]">•</p>
          <p>{formatCount(post._count.shares)} shares</p>
        </div>
      </div>

      {/* Actions */}
      {/* <div className="flex items-center justify-between border-t border-t-[#474747] pt-3"> */}
      {/*   <button */}
      {/*     onClick={() => onToggleLike(post.id)} */}
      {/*     className={`flex items-center gap-1 transition hover:opacity-80 ${ */}
      {/*       post.liked ? "text-[#38E07B]" : "text-white" */}
      {/*     }`} */}
      {/*   > */}
      {/*     {post.liked ? <LikeIcon size="24" /> : <Thumbs />} */}
      {/*     <p>Like</p> */}
      {/*   </button> */}
      {/**/}
      {/*   <button className="flex items-center gap-1 hover:opacity-80 transition"> */}
      {/*     <RoundChat stroke="white" /> */}
      {/*     <p>Comment</p> */}
      {/*   </button> */}
      {/**/}
      {/*   <button className="flex items-center gap-1 hover:opacity-80 transition"> */}
      {/*     <ShareIcon /> */}
      {/*     <p>Share</p> */}
      {/*   </button> */}
      {/* </div> */}
    </div>
  );
}

export function PostCardSkeleton() {
  return <Skeleton className="h-60" />;
}
