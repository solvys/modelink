"use client";

import { motion } from "framer-motion";
import { PostCard } from "./PostCard";
import { Stories } from "./Stories";
import { mockPosts } from "@/data/mockFeed";
import { getTrendingHashtags } from "@/data/mockFeed";
import { TrendingUp, Hash, Plus, ActivitySquare, ExternalLink, Heart, MessageCircle } from "lucide-react";

export function FeedPage() {
  const trendingHashtags = getTrendingHashtags();
  const totalLikes = mockPosts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = mockPosts.reduce((sum, post) => sum + post.comments, 0);

  return (
    <div className="relative min-h-full pt-28 pb-12">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[764px] lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Engagement Stats - Compact Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mb-6 flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-transparent border border-white/[0.06] flex-shrink-0">
            <div className="p-2 rounded-xl bg-emerald-500/10">
              <Heart className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{totalLikes.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-wide text-white/40">Likes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-transparent border border-white/[0.06] flex-shrink-0">
            <div className="p-2 rounded-xl bg-violet-500/10">
              <MessageCircle className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{totalComments.toLocaleString()}</p>
              <p className="text-[10px] uppercase tracking-wide text-white/40">Comments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-transparent border border-white/[0.06] flex-shrink-0">
            <div className="p-2 rounded-xl bg-amber-500/10">
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{trendingHashtags.length}</p>
              <p className="text-[10px] uppercase tracking-wide text-white/40">Trending</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Feed */}
          <div className="w-full lg:max-w-[520px] mx-auto min-w-0">
            {/* Stories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              <Stories />
            </motion.div>

            {/* Create Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-transparent border border-white/[0.06] rounded-2xl p-3 sm:p-4 mb-6"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Drop a new carousel or BTS moment..."
                    className="flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none text-sm sm:text-base py-2"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-medium hover:bg-white/90 transition-colors w-full sm:w-auto">
                  <Plus className="w-4 h-4" /> Post
                </button>
              </div>
            </motion.div>

            {/* Posts */}
            <div className="space-y-6">
              {mockPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="min-w-0"
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:flex w-[320px] flex-col gap-6 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-transparent border border-white/[0.06] rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <ActivitySquare className="w-4 h-4 text-emerald-400" />
                <h3 className="font-semibold text-white">Engagement Tracker</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    Likes tracked today
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {totalLikes.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    Comments logged
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    {totalComments.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-transparent border border-white/[0.06] rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-violet-400" />
                <h3 className="font-semibold text-white">Trending Tags</h3>
              </div>
              <div className="space-y-3">
                {trendingHashtags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between text-sm text-white/70"
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-white/40" />
                      {tag.name}
                    </div>
                    <span className="text-xs text-white/40">
                      {(tag.postsCount / 1000).toFixed(1)}K
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-transparent border border-white/[0.06] rounded-2xl p-5 space-y-4"
            >
              <h3 className="font-semibold text-white">Remake Queue</h3>
              {mockPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="text-sm text-white/70">
                  <p className="font-medium text-white">{post.authorName}</p>
                  <p className="text-xs text-white/40 line-clamp-2 mb-2">
                    {post.content}
                  </p>
                  <button
                    className="text-xs inline-flex items-center gap-1 text-violet-300 hover:text-violet-100 transition-colors"
                    onClick={() => {
                      if (post.sourceUrl && typeof window !== "undefined") {
                        window.open(post.sourceUrl, "_blank", "noopener,noreferrer");
                      }
                    }}
                  >
                    Open on Instagram <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile Trending Tags Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:hidden mt-8 bg-transparent border border-white/[0.06] rounded-2xl p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-violet-400" />
            <h3 className="font-semibold text-white">Trending Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/[0.06] text-sm text-white/70"
              >
                <Hash className="w-3 h-3 text-white/40" />
                {tag.name}
                <span className="text-[10px] text-white/40 ml-1">
                  {(tag.postsCount / 1000).toFixed(1)}K
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
