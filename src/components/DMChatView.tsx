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
      <div className="bg-[--bg-input] border border-dashed border-white/[0.08] rounded-2xl flex items-center justify-center text-white/40">
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
    <div className="bg-transparent border border-white/[0.06] rounded-2xl h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={conversation.participant.avatar}
            alt={conversation.participant.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-white">
              {conversation.participant.name}
            </p>
            <p className="text-sm text-white/50">
              {conversation.participant.handle} · Active {conversation.lastActivity} ago
            </p>
          </div>
        </div>
        <div className="text-xs text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full">
          Instagram DM
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 p-4">
        {conversation.messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
              msg.direction === "outbound"
                ? "ml-auto bg-white text-gray-900"
                : "bg-white/5 text-white/80"
            )}
          >
            {msg.content}
            <p className="mt-1 text-[10px] uppercase tracking-wide text-white/40">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-2 text-[11px]">
          {["Send rate card", "Share casting tape", "Share moodboard"].map((chip) => (
            <button
              key={chip}
              className="px-3 py-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
              onClick={() => setMessage((prev) => `${prev ? `${prev} ` : ""}${chip}`)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/[0.05] flex items-center gap-2">
        <button className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white transition-colors">
          <Paperclip className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white transition-colors">
          <ImagePlus className="w-4 h-4" />
        </button>
        <div className="flex-1 relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
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
          className="p-3 rounded-2xl bg-white text-gray-900 hover:bg-white/90 disabled:opacity-50 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}


