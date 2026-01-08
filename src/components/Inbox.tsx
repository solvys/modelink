"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Mail,
  Star,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockInboxMessages, getUnreadCount } from "@/data/mockInbox";
import type { InboxPlatform } from "@/data/types";

const platformConfig: Record<
  InboxPlatform,
  { icon: React.ReactNode; color: string; bgColor: string }
> = {
  instagram: {
    icon: <Instagram className="w-4 h-4" />,
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  tiktok: {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  email: {
    icon: <Mail className="w-4 h-4" />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  twitter: {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "text-white",
    bgColor: "bg-white/10",
  },
  linkedin: {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "text-blue-500",
    bgColor: "bg-blue-600/10",
  },
};

type FilterType = "all" | InboxPlatform;

export function Inbox() {
  const [filter, setFilter] = useState<FilterType>("all");
  const unreadCount = getUnreadCount();

  const filteredMessages =
    filter === "all"
      ? mockInboxMessages
      : mockInboxMessages.filter((m) => m.platform === filter);

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "All" },
    { id: "instagram", label: "IG" },
    { id: "tiktok", label: "TT" },
    { id: "email", label: "Email" },
  ];

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
    <div className="bg-transparent border border-white/[0.06] rounded-2xl p-5 h-full w-full min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Inbox</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-violet-500/20 text-violet-300 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button 
          className="text-sm transition-colors flex items-center gap-1"
          style={{ color: "var(--text-muted)" }}
        >
          View all <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="px-3 py-1.5 text-xs font-medium rounded-full transition-colors"
            style={{ 
              color: filter === f.id ? "var(--text-primary)" : "var(--text-muted)",
              fontWeight: filter === f.id ? 600 : 500,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {filteredMessages.slice(0, 5).map((message, i) => {
            const platform = platformConfig[message.platform];
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  {message.senderAvatar ? (
                    <img
                      src={message.senderAvatar}
                      alt={message.senderName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 p-0.5">
                    <span className={platform.color}>{platform.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "font-medium text-sm truncate",
                        message.isRead ? "text-white/80" : "text-white"
                      )}
                    >
                      {message.senderName}
                    </p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {message.isStarred && (
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      )}
                      <span className="text-[10px] text-white/40">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                  {message.subject && (
                    <p className="text-xs text-white/60 truncate mt-0.5">
                      {message.subject}
                    </p>
                  )}
                  <p className="text-xs text-white/40 truncate mt-0.5">
                    {message.preview}
                  </p>
                </div>

                {/* Unread indicator */}
                {!message.isRead && (
                  <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-2" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

