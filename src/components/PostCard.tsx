"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  User,
  Building2,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post, ProfileType } from "@/data/types";

const profileTypeIcons: Record<ProfileType, React.ReactNode> = {
  model: <User className="w-3 h-3" />,
  agency: <Building2 className="w-3 h-3" />,
  brand: <Briefcase className="w-3 h-3" />,
};

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [saved, setSaved] = useState(post.isSaved || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [script, setScript] = useState<string>("");
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);

  const toggleLike = (forceState?: boolean) => {
    setLiked((prev) => {
      const next = forceState ?? !prev;
      if (next !== prev) {
        setLikeCount((prevLikes) => (next ? prevLikes + 1 : prevLikes - 1));
      }
      return next;
    });
  };

  const handleDoubleTap = () => {
    toggleLike(true);
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 750);
    if (post.sourceUrl && typeof window !== "undefined") {
      window.open(post.sourceUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleGenerateScript = () => {
    if (isGeneratingScript) return;

    setIsGeneratingScript(true);
    setTimeout(() => {
      const scriptCopy = buildRemakeScript(post);
      setScript(scriptCopy);
      setIsGeneratingScript(false);
    }, 900);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (hours < 48) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="bg-transparent border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 p-1 rounded-full bg-gray-900">
              <span
                className={cn(
                  "text-white/70",
                  post.authorType === "brand" && "text-amber-400",
                  post.authorType === "agency" && "text-blue-400"
                )}
              >
                {profileTypeIcons[post.authorType]}
              </span>
            </div>
          </div>
          <div>
            <p className="font-medium text-white text-sm">{post.authorName}</p>
            <p className="text-xs text-white/50">{formatTime(post.createdAt)}</p>
          </div>
        </div>
        <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-white/90 text-sm whitespace-pre-wrap">
          {post.content.split(/(#\w+)/g).map((part, i) =>
            part.startsWith("#") ? (
              <span key={i} className="text-violet-400 hover:underline cursor-pointer">
                {part}
              </span>
            ) : (
              part
            )
          )}
        </p>
      </div>

      {/* Images */}
      {(post.images?.length ?? 0) > 0 && (
        <div
          onDoubleClick={handleDoubleTap}
          className={cn(
            "relative grid gap-0.5 select-none",
            post.images!.length === 1 && "grid-cols-1",
            post.images!.length === 2 && "grid-cols-2",
            post.images!.length >= 3 && "grid-cols-2"
          )}
        >
          {post.images!.slice(0, 4).map((image, i) => (
            <div
              key={i}
              className={cn(
                "relative overflow-hidden",
                post.images!.length === 1 && "aspect-[4/3]",
                post.images!.length === 2 && "aspect-square",
                post.images!.length >= 3 && i === 0 && "row-span-2 aspect-[3/4]",
                post.images!.length >= 3 && i > 0 && "aspect-square"
              )}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
              />
              {i === 3 && post.images!.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-semibold text-xl">
                    +{post.images!.length - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
          {showHeartBurst && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Heart className="w-24 h-24 text-white drop-shadow-[0_0_15px_rgba(0,0,0,.4)] fill-rose-500/80" />
            </motion.div>
          )}
        </div>
      )}

      {post.video && (
        <div onDoubleClick={handleDoubleTap} className="relative">
          <video
            src={post.video}
            controls
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button onClick={() => toggleLike()} className="flex items-center gap-2 group">
            <motion.div whileTap={{ scale: 0.8 }}>
              <Heart
                className={cn(
                  "w-5 h-5 transition-colors",
                  liked
                    ? "text-rose-500 fill-rose-500"
                    : "text-white/60 group-hover:text-white"
                )}
              />
            </motion.div>
            <span
              className={cn(
                "text-sm",
                liked ? "text-rose-400" : "text-white/60"
              )}
            >
              {likeCount.toLocaleString()}
            </span>
          </button>
          <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.comments.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="text-sm">{post.shares.toLocaleString()}</span>
          </button>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className="text-white/60 hover:text-white transition-colors"
        >
          <Bookmark
            className={cn("w-5 h-5", saved && "fill-white text-white")}
          />
        </button>
      </div>

      <div className="border-t border-white/[0.04] p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs uppercase tracking-wide text-white/40">
            Double tap to open Instagram source
          </div>
          <button
            onClick={handleGenerateScript}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-white text-gray-900 hover:bg-white/90 transition-colors disabled:opacity-50"
            disabled={isGeneratingScript}
          >
            <Sparkles className="w-4 h-4" />
            {isGeneratingScript ? "Generating..." : "Generate Script"}
          </button>
        </div>
        {script && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/80 whitespace-pre-line">
            {script}
          </div>
        )}
      </div>
    </div>
  );
}

function buildRemakeScript(post: Post) {
  return [
    "Hook: Recreate the moment with a bold first line referencing the original vibe.",
    `Scene: Highlight "${post.content.slice(0, 80)}..." with a quick BTS shot.`,
    "Action: Mirror the key pose or transition, then add your personal twist.",
    "CTA: Invite viewers to compare both versions and tag collaborators.",
  ].join("\n");
}

