"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, SendHorizonal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

interface LindaChatProps {
  variant?: "mini" | "full";
}

const quickPrompts = [
  "Draft a script to recreate my top post.",
  "What content should I shoot this week?",
  "How do I pitch a skincare brand collab?",
];

export function LindaChat({ variant = "mini" }: LindaChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content:
        "Hi! I'm Linda. Ask me anything about collaborations, content ideas, or career strategy.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const containerClasses = useMemo(
    () =>
      cn(
        "flex h-full flex-col rounded-2xl border border-white/10 bg-[--bg-input] w-full min-w-0",
        variant === "mini" ? "p-3" : "p-4 sm:p-6"
      ),
    [variant]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (prompt?: string) => {
    const text = (prompt ?? input).trim();
    if (!text || isStreaming) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    streamAssistantResponse(text);
  };

  const streamAssistantResponse = (question: string) => {
    const assistantId = `assistant-${Date.now()}`;
    const response = craftResponse(question);
    setIsStreaming(true);
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId ? { ...msg, content: response.slice(0, index) } : msg
        )
      );
      if (index >= response.length) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 15);
  };

  return (
    <div className={containerClasses}>
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <div className="p-2 rounded-xl bg-violet-500/10 text-violet-200">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Linda</p>
          <p className="text-[11px] text-white/50">
            {isStreaming ? "Generating insights..." : "Your modeling strategist"}
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 py-3 sm:py-4 pr-1">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm leading-relaxed max-w-[90%]",
              message.role === "assistant"
                ? "bg-white/5 text-white/80"
                : "ml-auto bg-white text-gray-900"
            )}
          >
            {message.content}
          </motion.div>
        ))}
        {isStreaming && (
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Loader2 className="w-3 h-3 animate-spin" />
            Linda is thinking...
          </div>
        )}
      </div>

      {variant === "mini" && (
        <div className="pb-2 -mx-3 sm:mx-0">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-3 sm:px-0">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="text-[10px] sm:text-[11px] px-3 py-1.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors whitespace-nowrap flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none min-w-0"
        />
        <button
          type="submit"
          disabled={!input.trim() || isStreaming}
          className="p-2 rounded-lg bg-white text-gray-900 hover:bg-white/90 transition-colors disabled:opacity-40 flex-shrink-0"
        >
          <SendHorizonal className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

function craftResponse(question: string) {
  if (question.toLowerCase().includes("script")) {
    return (
      "Here's a punchy 4-step script:\n" +
      "1. Hook viewers with the key transformation.\n" +
      "2. Showcase behind-the-scenes prep.\n" +
      "3. Deliver the wow moment.\n" +
      "4. Close with a CTA that links back to the original post."
    );
  }

  if (question.toLowerCase().includes("content")) {
    return (
      "Focus on a 3-part carousel: moodboard, posing breakdown, and styling notes. Post by Wednesday " +
      "evening to catch U.S. engagement peaks."
    );
  }

  return (
    "Let’s set a clear objective: identify your next collaboration, then craft supporting content. " +
    "Share any data you have (reach, saves, IG insights) and I’ll recommend next actions."
  );
}


