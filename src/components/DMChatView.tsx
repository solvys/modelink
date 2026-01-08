"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DMConversation } from "@/data/types";
import { Paperclip, ImagePlus, Smile, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface DMChatViewProps {
  conversation?: DMConversation;
  onSendMessage: (message: string) => void;
}

export function DMChatView({ conversation, onSendMessage }: DMChatViewProps) {
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  if (!conversation) {
    return (
      <div className="bg-[--bg-input] border border-dashed border-white/[0.08] rounded-2xl flex items-center justify-center text-white/40 min-h-[300px] lg:min-h-[400px] text-sm text-center px-4">
        Select a conversation to start messaging.
      </div>
    );
  }

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message.trim());
    setMessage("");
  };

  return (
    <div className="bg-transparent border border-white/[0.06] rounded-2xl h-full flex flex-col min-h-[400px] lg:min-h-[500px]">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-white/[0.05] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            src={conversation.participant.avatar}
            alt={conversation.participant.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm sm:text-base truncate">
              {conversation.participant.name}
            </p>
            <p className="text-xs sm:text-sm text-white/50 truncate">
              {conversation.participant.handle} · Active {conversation.lastActivity} ago
            </p>
          </div>
        </div>
        <div className="text-[10px] sm:text-xs text-emerald-300 bg-emerald-500/10 px-2 sm:px-3 py-1 rounded-full flex-shrink-0 hidden sm:block">
          Instagram DM
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 p-3 sm:p-4">
        {conversation.messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 text-sm leading-relaxed",
              msg.direction === "outbound"
                ? "ml-auto bg-white text-gray-900"
                : "bg-white/5 text-white/80"
            )}
          >
            {msg.content}
            <p className={cn(
              "mt-1 text-[10px] uppercase tracking-wide",
              msg.direction === "outbound" ? "text-gray-500" : "text-white/40"
            )}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions - Horizontal scroll on mobile */}
      <div className="px-3 sm:px-4 pb-2 -mx-3 sm:mx-0">
        <div className="flex gap-2 text-[10px] sm:text-[11px] overflow-x-auto scrollbar-hide px-3 sm:px-0">
          {["Send rate card", "Share casting tape", "Share moodboard"].map((chip) => (
            <button
              key={chip}
              className="px-2.5 sm:px-3 py-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors whitespace-nowrap flex-shrink-0"
              onClick={() => setMessage((prev) => `${prev ? `${prev} ` : ""}${chip}`)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 sm:p-4 border-t border-white/[0.05] flex items-center gap-2">
        <button className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white transition-colors hidden sm:block">
          <Paperclip className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white transition-colors hidden sm:block">
          <ImagePlus className="w-4 h-4" />
        </button>
        <div className="flex-1 relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="w-full rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 sm:py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
            <Smile className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white text-gray-900 hover:bg-white/90 disabled:opacity-50 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
