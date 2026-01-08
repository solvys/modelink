"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlugZap,
  Building2,
  Bot,
  Send,
  ChevronRight,
  ExternalLink,
  Check,
  Instagram,
  Youtube,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AgencyProfile, Integration } from "@/data/types";

interface ModelSidebarProps {
  integrations: Integration[];
  agencies: AgencyProfile[];
  customization: {
    availableFonts: string[];
    fontFamily: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  onSettingsClick?: () => void;
}

type SidebarTab = "integrations" | "agencies" | "ai";

const platformIcons: Record<string, React.ReactNode> = {
  Instagram: <Instagram className="w-4 h-4" />,
  TikTok: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  YouTube: <Youtube className="w-4 h-4" />,
  Email: <Mail className="w-4 h-4" />,
};

export function ModelSidebar({
  integrations,
  agencies,
  onSettingsClick,
}: ModelSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<SidebarTab>("integrations");
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hi! I'm your AI assistant. I can help with booking insights, content ideas, and career advice. What would you like to know?" },
  ]);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    setAiMessages((prev) => [...prev, { role: "user", content: aiInput }]);
    
    // Mock AI response
    setTimeout(() => {
      setAiMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Based on your recent performance, I'd suggest focusing on beauty content - it's driving 40% higher engagement. Would you like specific content ideas?",
        },
      ]);
    }, 1000);

    setAiInput("");
  };

  const tabs: { id: SidebarTab; icon: React.ReactNode; label: string }[] = [
    { id: "integrations", icon: <PlugZap className="w-4 h-4" />, label: "Integrations" },
    { id: "agencies", icon: <Building2 className="w-4 h-4" />, label: "Agencies" },
    { id: "ai", icon: <Bot className="w-4 h-4" />, label: "AI Agent" },
  ];

  return (
    <motion.aside
      className="hidden lg:block fixed left-0 top-20 z-30 h-[calc(100vh-5rem)]"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      animate={{ width: isExpanded ? 320 : 64 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="h-full bg-[--bg-base] border-r border-white/[0.06]">
        {/* Collapsed State - Icon buttons */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-4 gap-3"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    activeTab === tab.id
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  )}
                  title={tab.label}
                >
                  {tab.icon}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded State */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col p-4"
            >
              {/* Tabs */}
              <div className="flex gap-1 mb-4 p-1 bg-white/[0.03] rounded-xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-colors",
                      activeTab === tab.id
                        ? "bg-white text-gray-900"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {tab.icon}
                    <span className="truncate">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide">
                {activeTab === "integrations" && (
                  <div className="space-y-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                      Connected Platforms
                    </p>
                    {integrations.map((integration) => (
                      <div
                        key={integration.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-white/70">
                            {platformIcons[integration.platform] || <PlugZap className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {integration.platform}
                            </p>
                            {integration.handle && (
                              <p className="text-xs text-white/50">{integration.handle}</p>
                            )}
                          </div>
                        </div>
                        <span
                          className={cn(
                            "text-[10px] px-2 py-1 rounded-full font-medium",
                            integration.status === "connected"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : integration.status === "pending"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-white/10 text-white/50"
                          )}
                        >
                          {integration.status === "connected" && <Check className="w-3 h-3" />}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "agencies" && (
                  <div className="space-y-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                      Agency Listings
                    </p>
                    {agencies.map((agency) => (
                      <div
                        key={agency.id}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-white">{agency.name}</p>
                          <ExternalLink className="w-3.5 h-3.5 text-white/40" />
                        </div>
                        <p className="text-xs text-white/50 mb-2">{agency.location}</p>
                        <div className="flex flex-wrap gap-1">
                          {agency.specialties.map((spec) => (
                            <span
                              key={spec}
                              className="px-2 py-0.5 text-[10px] bg-white/5 text-white/60 rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                        {agency.openBriefs > 0 && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-violet-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                            {agency.openBriefs} open briefs
                          </div>
                        )}
                      </div>
                    ))}
                    <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-colors">
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {activeTab === "ai" && (
                  <div className="flex flex-col h-full">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                      AI Assistant
                    </p>
                    <div className="flex-1 space-y-3 mb-4 overflow-y-auto">
                      {aiMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={cn(
                            "p-3 rounded-xl text-sm",
                            msg.role === "ai"
                              ? "bg-white/[0.02] border border-white/[0.06] text-white/80"
                              : "bg-violet-500/10 text-violet-200 ml-4"
                          )}
                        >
                          {msg.content}
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleAiSubmit} className="flex gap-2">
                      <input
                        type="text"
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        placeholder="Ask anything..."
                        className="flex-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/15"
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-xl bg-white text-gray-900 hover:bg-white/90 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
