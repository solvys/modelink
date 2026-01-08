"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockStories } from "@/data/mockFeed";

export function Stories() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {/* Your Story */}
      <div className="flex-shrink-0 flex flex-col items-center gap-2">
        <div 
          className="relative w-16 h-16 rounded-full p-0.5"
          style={{ background: "linear-gradient(135deg, #3a0f5d, #FFC038)" }}
        >
          <div className="w-full h-full rounded-full bg-[--bg-base] flex items-center justify-center">
            <Plus className="w-6 h-6" style={{ color: "var(--text-primary)" }} />
          </div>
        </div>
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Your Story</span>
      </div>

      {/* Other Stories */}
      {mockStories.map((story) => (
        <button
          key={story.id}
          className="flex-shrink-0 flex flex-col items-center gap-2 group"
        >
          <div
            className="relative w-16 h-16 rounded-full p-0.5"
            style={{ 
              background: story.isViewed 
                ? "rgba(128, 128, 128, 0.3)" 
                : "linear-gradient(135deg, #3a0f5d, #FFC038)" 
            }}
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

