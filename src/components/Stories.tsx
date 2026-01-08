"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockStories } from "@/data/mockFeed";

export function Stories() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {/* Your Story */}
      <div className="flex-shrink-0 flex flex-col items-center gap-2">
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 p-0.5">
          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </div>
        <span className="text-xs text-white/70">Your Story</span>
      </div>

      {/* Other Stories */}
      {mockStories.map((story) => (
        <button
          key={story.id}
          className="flex-shrink-0 flex flex-col items-center gap-2 group"
        >
          <div
            className={cn(
              "relative w-16 h-16 rounded-full p-0.5",
              story.isViewed
                ? "bg-white/20"
                : "bg-gradient-to-br from-violet-500 via-pink-500 to-amber-500"
            )}
          >
            <img
              src={story.authorAvatar}
              alt={story.authorName}
              className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <span
            className={cn(
              "text-xs truncate max-w-[64px]",
              story.isViewed ? "text-white/40" : "text-white/70"
            )}
          >
            {story.authorName}
          </span>
        </button>
      ))}
    </div>
  );
}

