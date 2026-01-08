"use client";

import { useState, useEffect } from "react";
import { X, User, Palette, Link as LinkIcon, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "theme" | "social">("profile");
  const [profileData, setProfileData] = useState({
    name: "Sophia Chen",
    bio: "Professional model specializing in editorial and commercial work.",
    email: "sophia@example.com",
    location: "New York, NY",
  });
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    twitter: "",
    tiktok: "",
    website: "",
  });
  const [selectedFont, setSelectedFont] = useState<"great-vibes" | "dancing-script" | "allura">("great-vibes");
  const [selectedTheme, setSelectedTheme] = useState<"default" | "unisex">("default");

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFont = localStorage.getItem("fontTheme") as "great-vibes" | "dancing-script" | "allura" | null;
      const savedTheme = localStorage.getItem("colorTheme") as "default" | "unisex" | null;
      if (savedFont) setSelectedFont(savedFont);
      if (savedTheme) setSelectedTheme(savedTheme);
    }
  }, []);

  // Apply font theme
  useEffect(() => {
    if (typeof document !== "undefined") {
      const body = document.body;
      body.className = body.className.replace(/font-\w+-cursive/g, "");
      body.classList.add(`font-${selectedFont}-cursive`);
    }
  }, [selectedFont]);

  // Apply color theme
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (selectedTheme === "unisex") {
        root.classList.add("theme-unisex");
      } else {
        root.classList.remove("theme-unisex");
      }
    }
  }, [selectedTheme]);

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "theme" as const, label: "Theme", icon: Palette },
    { id: "social" as const, label: "Social", icon: LinkIcon },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="glass-panel fixed right-0 top-0 h-full w-full max-w-md border-l border-white/10 text-white shadow-[0_35px_75px_rgba(15,23,42,0.65)] z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 bg-white/5 border border-white/10 rounded-2xl p-1 backdrop-blur">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-2xl transition-all ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-baby-pink to-baby-blue text-white shadow-lg"
                          : "text-white/70 hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="space-y-6">
                {activeTab === "profile" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-2xl border border-white/15 bg-white/5 text-white placeholder-white/50 outline-none focus:border-white/60 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 rounded-2xl border border-white/15 bg-white/5 text-white placeholder-white/50 outline-none focus:border-white/60 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-2xl border border-white/15 bg-white/5 text-white placeholder-white/50 outline-none focus:border-white/60 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="w-full px-4 py-2 rounded-2xl border border-white/15 bg-white/5 text-white placeholder-white/50 outline-none focus:border-white/60 transition"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "theme" && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium text-white mb-3">Font Style</p>
                      <div className="space-y-2">
                        {[
                          { id: "great-vibes" as const, label: "Great Vibes", preview: "Elegant & Sophisticated" },
                          { id: "dancing-script" as const, label: "Dancing Script", preview: "Playful & Flowing" },
                          { id: "allura" as const, label: "Allura", preview: "Delicate & Feminine" },
                        ].map((font) => (
                          <button
                            key={font.id}
                            onClick={() => {
                              setSelectedFont(font.id);
                              if (typeof window !== "undefined") {
                                localStorage.setItem("fontTheme", font.id);
                              }
                            }}
                            className={`w-full p-3 rounded-2xl border transition-all text-left ${
                              selectedFont === font.id
                                ? "border-white/70 bg-white/10 shadow-lg"
                                : "border-white/15 hover:border-white/40 bg-white/5"
                            }`}
                          >
                            <p 
                              className={`font-semibold mb-1 ${
                                font.id === "great-vibes" ? "font-cursive-primary" :
                                font.id === "dancing-script" ? "font-cursive-secondary" :
                                "font-cursive-tertiary"
                              }`}
                              style={font.id === "great-vibes" ? { fontFamily: "'Great Vibes', cursive" } :
                                     font.id === "dancing-script" ? { fontFamily: "'Dancing Script', cursive" } :
                                     { fontFamily: "'Allura', cursive" }}
                            >
                              {font.label}
                            </p>
                            <p className="text-xs text-white/60">{font.preview}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white mb-3">Color Theme</p>
                      <div className="space-y-2">
                        {[
                          { id: "default" as const, label: "Default", description: "Feminine pastels" },
                          { id: "unisex" as const, label: "Unisex/Manly", description: "Neutral & professional" },
                        ].map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() => {
                              setSelectedTheme(theme.id);
                              if (typeof window !== "undefined") {
                                localStorage.setItem("colorTheme", theme.id);
                              }
                            }}
                            className={`w-full p-3 rounded-2xl border transition-all text-left ${
                              selectedTheme === theme.id
                                ? "border-white/70 bg-white/10 shadow-lg"
                                : "border-white/15 hover:border-white/40 bg-white/5"
                            }`}
                          >
                            <p className="font-semibold mb-1">{theme.label}</p>
                            <p className="text-xs text-white/60">{theme.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "social" && (
                  <div className="space-y-4">
                    <p className="text-sm text-white/60">
                      Connect your social media profiles. Links will be verified via Clerk API integration.
                    </p>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={socialLinks.instagram}
                        onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                        placeholder="@username"
                        className="w-full px-4 py-2 rounded-2xl border border-white/15 bg-white/5 text-white placeholder-white/50 outline-none focus:border-white/60 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Twitter
                      </label>
                      <input
                        type="text"
                        value={socialLinks.twitter}
                        onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                        placeholder="@username"
                        className="w-full px-4 py-2 rounded-2xl border border-white/15 bg-white/5 text-white placeholder-white/50 outline-none focus:border-white/60 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        TikTok
                      </label>
                      <input
                        type="text"
                        value={socialLinks.tiktok}
                        onChange={(e) => setSocialLinks({ ...socialLinks, tiktok: e.target.value })}
                        placeholder="@username"
                        className="w-full px-4 py-2 rounded-2xl border border-white/15 bg-white/5 text-white placeholder-white/50 outline-none focus:border-white/60 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={socialLinks.website}
                        onChange={(e) => setSocialLinks({ ...socialLinks, website: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full px-4 py-2 rounded-2xl border border-white/15 bg-white/5 text-white placeholder-white/50 outline-none focus:border-white/60 transition"
                      />
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <button
                  onClick={() => {
                    console.log("Saving settings:", { profileData, socialLinks });
                    alert("Settings saved! (Will integrate with Clerk/Zapier)");
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-baby-pink via-baby-blue to-baby-pink text-white py-3 rounded-2xl font-semibold shadow-2xl liquid-hover"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}



