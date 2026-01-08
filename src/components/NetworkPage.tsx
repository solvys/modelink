"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, Plus, Search, X, Check, ArrowLeft } from "lucide-react";
import { DMConversation } from "@/data/types";
import { mockDMConversations } from "@/data/mockDMs";
import { mockConnections } from "@/data/mockConnections";
import { cn } from "@/lib/utils";
import { DMConversationList } from "./DMConversationList";
import { DMChatView } from "./DMChatView";

export function NetworkPage() {
  const [conversations, setConversations] = useState<DMConversation[]>(mockDMConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [newChatSearch, setNewChatSearch] = useState("");

  const activeConversation = conversations.find((conv) => conv.id === activeId);

  const handleSendMessage = (message: string) => {
    if (!activeId) return;
    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== activeId) return conversation;
        const newMessage = {
          id: `${conversation.id}-${Date.now()}`,
          direction: "outbound" as const,
          content: message,
          timestamp: new Date().toISOString(),
          status: "delivered" as const,
        };
        return {
          ...conversation,
          messages: [...conversation.messages, newMessage],
          lastMessage: message,
          lastActivity: "now",
          unreadCount: 0,
        };
      })
    );
  };

  const filteredContacts = useMemo(() => {
    if (!newChatSearch.trim()) return mockConnections;
    const query = newChatSearch.toLowerCase();
    return mockConnections.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(query) ||
        (contact.location?.toLowerCase().includes(query) ?? false) ||
        (contact.title?.toLowerCase().includes(query) ?? false)
      );
    });
  }, [newChatSearch]);

  const selectedContact = selectedContactId
    ? mockConnections.find((contact) => contact.id === selectedContactId) ?? null
    : null;

  const handleStartNewChat = () => {
    if (!selectedContact) return;

    const timestamp = new Date().toISOString();
    const baseHandle = selectedContact.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const sanitizedHandle = baseHandle ? `@${baseHandle}` : `@contact-${selectedContact.id}`;

    const newConversation: DMConversation = {
      id: `dm-${Date.now()}`,
      participant: {
        name: selectedContact.name,
        handle: sanitizedHandle,
        avatar: selectedContact.avatar,
        platform: selectedContact.type === "agency" ? "email" : "instagram",
        location: selectedContact.location,
        verified: selectedContact.type === "brand",
      },
      lastMessage: "Excited to explore a new collaboration.",
      lastActivity: "now",
      unreadCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          direction: "outbound",
          content: "Hi! Thanks for connecting — let's sync on upcoming opportunities.",
          timestamp,
          status: "delivered",
        },
      ],
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveId(newConversation.id);
    setSelectedContactId(null);
    setNewChatSearch("");
    setIsNewChatOpen(false);
  };

  const closeNewChatModal = () => {
    setIsNewChatOpen(false);
    setSelectedContactId(null);
    setNewChatSearch("");
  };

  // Handle selecting a conversation on mobile
  const handleSelectConversation = (id: string) => {
    setActiveId(id);
  };

  // Handle going back to list on mobile
  const handleBackToList = () => {
    setActiveId(null);
  };

  return (
    <div className="relative min-h-full pt-28 pb-12">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[764px] lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-wide text-white/40">Studio Inbox</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Networking</h1>
              <p className="text-white/60 mt-2 text-sm sm:text-base">
                Instagram-inspired DMs that keep collabs, agencies, and brands in one lane.
              </p>
            </div>
            <button
              onClick={() => setIsNewChatOpen(true)}
              className="flex items-center justify-center gap-2 rounded-full bg-white text-gray-900 px-4 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" /> New Chat
            </button>
          </div>
        </motion.div>

        {/* Stats - 2x2 on mobile, 4 columns on lg */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4 mb-6 lg:mb-8"
        >
          {[
            { label: "Response time", value: "4m 12s" },
            { label: "Active threads", value: conversations.length },
            { label: "Unread", value: conversations.filter((c) => c.unreadCount > 0).length },
            { label: "AI assists", value: "3 scripts" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-transparent border border-white/[0.06] rounded-2xl p-3 sm:p-4"
            >
              <p className="text-[10px] sm:text-xs uppercase tracking-wide text-white/40">{stat.label}</p>
              <p className="text-lg sm:text-2xl font-semibold text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Chat Area - Mobile shows list OR chat, Desktop shows both */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-4 lg:gap-6">
          {/* Conversation List - Hidden on mobile when chat is active */}
          <div className={cn(
            "lg:block",
            activeId ? "hidden" : "block"
          )}>
            <DMConversationList
              conversations={conversations}
              activeId={activeId}
              onSelect={handleSelectConversation}
            />
          </div>

          {/* Chat View - Hidden on mobile when no chat is active */}
          <div className={cn(
            "flex flex-col gap-4 lg:block",
            activeId ? "block" : "hidden lg:block"
          )}>
            {/* Mobile Back Button */}
            {activeId && (
              <button
                onClick={handleBackToList}
                className="lg:hidden flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to messages</span>
              </button>
            )}
            
            <DMChatView conversation={activeConversation} onSendMessage={handleSendMessage} />
            
            {/* AI Auto-forward Banner */}
            <div className="hidden lg:flex items-center justify-between rounded-2xl border border-white/[0.06] bg-transparent p-4 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-violet-300" />
                Auto-forward DMs to Linda for instant script drafts.
              </div>
              <button className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1 text-xs text-white/80 hover:border-white/40 transition-colors">
                <Sparkles className="w-3 h-3" />
                Enable
              </button>
            </div>
          </div>
        </div>

        {/* Mobile AI Banner - Show below chat on mobile when chat is active */}
        {activeId && (
          <div className="lg:hidden mt-4 flex items-center justify-between rounded-2xl border border-white/[0.06] bg-transparent p-3 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-violet-300" />
              <span>Auto-forward DMs to Linda</span>
            </div>
            <button className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-1 text-[10px] text-white/80 hover:border-white/40 transition-colors">
              <Sparkles className="w-3 h-3" />
              Enable
            </button>
          </div>
        )}
      </div>

      {/* New Chat Modal - Mobile-optimized */}
      <AnimatePresence>
        {isNewChatOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeNewChatModal}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 sm:inset-0 z-50 sm:flex sm:items-center sm:justify-center sm:px-4"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[--bg-base] sm:bg-[#0b0b0f] p-4 sm:p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40">Start new chat</p>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mt-1">Choose a connection</h3>
                  </div>
                  <button
                    onClick={closeNewChatModal}
                    className="rounded-full p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close new chat modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    value={newChatSearch}
                    onChange={(e) => setNewChatSearch(e.target.value)}
                    placeholder="Search brands, agencies, or collaborators"
                    className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-transparent pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="max-h-60 sm:max-h-72 overflow-y-auto pr-1 space-y-2">
                  {filteredContacts.length === 0 && (
                    <p className="text-sm text-white/50 text-center py-6">
                      No matches yet. Try another name or invite someone new.
                    </p>
                  )}
                  {filteredContacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => setSelectedContactId(contact.id)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-xl sm:rounded-2xl border border-white/5 bg-transparent px-3 py-3 text-left transition-all",
                        selectedContactId === contact.id
                          ? "border-white/40 bg-white/[0.08]"
                          : "hover:border-white/20 hover:bg-white/[0.05]"
                      )}
                    >
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-10 h-10 rounded-xl sm:rounded-2xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{contact.name}</p>
                        <p className="text-xs text-white/50 truncate">
                          {contact.title ?? contact.type.toUpperCase()}
                          {contact.location ? ` · ${contact.location}` : ""}
                        </p>
                      </div>
                      {selectedContactId === contact.id && <Check className="w-4 h-4 text-emerald-300 shrink-0" />}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-col-reverse sm:flex-row justify-end gap-3">
                  <button
                    onClick={closeNewChatModal}
                    className="px-4 py-2.5 rounded-xl sm:rounded-2xl border border-white/15 text-sm text-white/70 hover:text-white hover:border-white/40 transition-colors w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStartNewChat}
                    disabled={!selectedContact}
                    className="inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-white text-gray-900 px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-40 w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Start chat
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
