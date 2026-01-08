"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StickyNote, Save, Trash2, Check, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { LindaChat } from "./LindaChat";

const STORAGE_KEY = "modelink-notepad";
type NotepadTab = "notes" | "linda";

export function Notepad() {
  const [content, setContent] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [showSaved, setShowSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<NotepadTab>("notes");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setContent(saved);
    }
  }, []);

  // Auto-save with debounce
  useEffect(() => {
    if (!isSaved) {
      const timeout = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, content);
        setIsSaved(true);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [content, isSaved]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, content);
    setIsSaved(true);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleClear = () => {
    setContent("");
    localStorage.removeItem(STORAGE_KEY);
    setIsSaved(true);
  };

  const charCount = content.length;
  const tabs = [
    { id: "notes" as NotepadTab, label: "Notes", icon: <StickyNote className="w-3.5 h-3.5" /> },
    { id: "linda" as NotepadTab, label: "Ask Linda", icon: <MessageCircle className="w-3.5 h-3.5" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="border border-[--border-subtle] rounded-2xl p-5 h-[50vh] min-h-[460px] flex flex-col"
    >
      {/* Header */}
      <div className="mb-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-semibold text-white">Quick Notes</h3>
            </div>
            <p className="text-xs text-white/40 mt-1">
              Capture ideas or ask Linda for instant insights.
            </p>
          </div>
          {activeTab === "notes" && showSaved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="hidden sm:flex items-center gap-1 text-emerald-400 text-xs"
            >
              <Check className="w-3 h-3" />
              Saved
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center rounded-full bg-white/5 border border-white/10 px-1 py-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-white text-gray-900"
                    : "text-white/50 hover:text-white/80"
                )}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab === "notes" && (
            <div className="flex items-center gap-2">
              {showSaved && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-1 text-emerald-400 text-[11px]"
                >
                  <Check className="w-3 h-3" />
                  Saved
                </motion.div>
              )}
              <button
                onClick={handleSave}
                disabled={isSaved}
                className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  isSaved
                    ? "text-white/20 cursor-not-allowed"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
                title="Save"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg text-white/60 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                title="Clear"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {activeTab === "notes" ? (
        <>
          {/* Textarea */}
          <div className="flex-1 relative">
            <textarea
              value={content}
              onChange={handleChange}
              placeholder="Jot down ideas, reminders, or notes..."
              className="w-full h-full resize-none bg-[--bg-input] border border-[--border-subtle] rounded-xl p-4 text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
              style={{ lineHeight: 1.6 }}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 text-xs text-white/40">
            <span>{charCount} characters</span>
            <span className={cn(!isSaved && "text-amber-400")}>
              {isSaved ? "All changes saved" : "Unsaved changes..."}
            </span>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-hidden">
          <LindaChat variant="mini" />
        </div>
      )}
    </motion.div>
  );
}

