"use client";

import { useState, type ReactNode } from "react";
import { Search, Instagram, MessageCircle, Phone } from "lucide-react";
import { DMConversation } from "@/data/types";
import { cn } from "@/lib/utils";

const platformIconMap: Record<string, ReactNode> = {
  instagram: <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
  whatsapp: <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
  tiktok: <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
  email: <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
};

interface DMConversationListProps {
  conversations: DMConversation[];
  activeId?: string | null;
  onSelect: (id: string) => void;
}

export function DMConversationList({
  conversations,
  activeId,
  onSelect,
}: DMConversationListProps) {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter((conv) => {
    const haystack = `${conv.participant.name} ${conv.participant.handle ?? ""}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  return (
    <div className="bg-transparent border border-white/[0.06] rounded-2xl h-full flex flex-col min-h-[400px] lg:min-h-0">
      <div className="p-3 sm:p-4 border-b border-white/[0.05]">
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search DMs..."
            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-white/40">
            No conversations found
          </div>
        )}
        {filtered.map((conversation) => {
          const isActive = conversation.id === activeId;
          return (
            <button
              key={conversation.id}
              onClick={() => onSelect(conversation.id)}
              className={cn(
                "w-full text-left px-3 sm:px-4 py-3 flex items-center gap-3 border-b border-white/[0.02] hover:bg-white/[0.04] transition-colors",
                isActive && "bg-white/[0.08]"
              )}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={conversation.participant.avatar}
                  alt={conversation.participant.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                {conversation.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-500 text-[10px] sm:text-[11px] font-semibold text-white flex items-center justify-center">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white truncate">
                    {conversation.participant.name}
                  </p>
                  <span className="text-[10px] sm:text-[11px] text-white/40 flex-shrink-0">
                    {conversation.lastActivity}
                  </span>
                </div>
                <p className="text-xs text-white/50 truncate">
                  {conversation.lastMessage}
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/40">
                  {platformIconMap[conversation.participant.platform] ?? (
                    <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  )}
                  <span className="truncate">{conversation.participant.handle}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
