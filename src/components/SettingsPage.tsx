"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlugZap,
  Link2,
  Palette,
  User,
  Moon,
  Sun,
  ChevronRight,
  Check,
  Instagram,
  Youtube,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import type { ProfileType } from "@/data/types";

type SettingsTab = "integrations" | "links" | "appearance" | "account";

interface TabButtonProps {
  id: SettingsTab;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

// Desktop sidebar tab button
function TabButton({ label, icon, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors",
        active
          ? "bg-white/10 text-white"
          : "text-white/60 hover:text-white hover:bg-white/5"
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}

// Mobile horizontal tab button
function MobileTabButton({
  label,
  icon,
  active,
  onClick,
}: Omit<TabButtonProps, "id">) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl text-center transition-colors flex-shrink-0 min-w-[80px]",
        active
          ? "bg-white/10 text-white"
          : "text-white/60 hover:text-white hover:bg-white/5"
      )}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

const integrations = [
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram className="w-5 h-5" />,
    color: "from-pink-500 to-purple-500",
    connected: true,
    handle: "@modelink",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    color: "from-cyan-400 to-pink-500",
    connected: true,
    handle: "@modelink",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: <Youtube className="w-5 h-5" />,
    color: "from-red-500 to-red-600",
    connected: false,
  },
  {
    id: "email",
    name: "Email",
    icon: <Mail className="w-5 h-5" />,
    color: "from-blue-400 to-blue-600",
    connected: true,
    handle: "creator@modelink.com",
  },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("integrations");
  const [profileType, setProfileType] = useState<ProfileType>("model");
  const { theme, toggleTheme } = useTheme();

  const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: "integrations", label: "Integrations", icon: <PlugZap className="w-5 h-5" /> },
    { id: "links", label: "Links", icon: <Link2 className="w-5 h-5" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="w-5 h-5" /> },
    { id: "account", label: "Account", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="relative min-h-full pt-28 pb-12">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[764px] lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 lg:mb-8"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Settings</h1>
          <p className="text-white/60 mt-2 text-sm lg:text-base">Manage your account and preferences</p>
        </motion.div>

        {/* Mobile Horizontal Tabs - Scrollable */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide"
        >
          <div className="flex gap-2 pb-2 min-w-max">
            {tabs.map((tab) => (
              <MobileTabButton
                key={tab.id}
                label={tab.label}
                icon={tab.icon}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar - Hidden on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden lg:block w-64 flex-shrink-0 space-y-2"
          >
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-1 min-w-0 bg-transparent border border-white/[0.06] rounded-2xl p-4 sm:p-6"
          >
            {activeTab === "integrations" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-white mb-2">
                    Platform Integrations
                  </h2>
                  <p className="text-sm text-white/50">
                    Connect your social accounts to sync messages and analytics
                  </p>
                </div>

                <div className="space-y-3">
                  {integrations.map((integration) => (
                    <div
                      key={integration.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[--bg-input] border border-white/[0.06]"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br flex-shrink-0",
                            integration.color
                          )}
                        >
                          {integration.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white">
                            {integration.name}
                          </p>
                          {integration.connected && integration.handle && (
                            <p className="text-sm text-white/50 truncate">
                              {integration.handle}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        className={cn(
                          "px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto",
                          integration.connected
                            ? "connected-status-btn"
                            : "bg-white/10 text-white hover:bg-white/20"
                        )}
                        style={integration.connected ? {
                          backgroundColor: "var(--connected-bg, rgba(16, 185, 129, 0.15))",
                          color: "var(--connected-text, #34d399)",
                        } : undefined}
                      >
                        {integration.connected ? (
                          <span className="flex items-center justify-center gap-2">
                            <Check className="w-4 h-4" /> Connected
                          </span>
                        ) : (
                          "Connect"
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "links" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-white mb-2">
                    Profile Links
                  </h2>
                  <p className="text-sm text-white/50">
                    Configure your "Get In Touch" social links
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Instagram", placeholder: "@username" },
                    { label: "TikTok", placeholder: "@username" },
                    { label: "YouTube", placeholder: "Channel URL" },
                    { label: "Website", placeholder: "https://..." },
                    { label: "Email", placeholder: "email@example.com" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-xl bg-[--bg-input] border border-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:border-white/15 transition-colors text-base"
                      />
                    </div>
                  ))}
                </div>

                <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-gray-900 font-medium hover:bg-white/90 transition-colors">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-white mb-2">
                    Appearance
                  </h2>
                  <p className="text-sm text-white/50">
                    Customize how the app looks for you
                  </p>
                </div>

                {/* Theme Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[--bg-input] border border-white/[0.06]">
                  <div>
                    <p className="font-medium text-white">Theme</p>
                    <p className="text-sm text-white/50">
                      Choose between light and dark mode
                    </p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors w-full sm:w-auto"
                  >
                    {theme === "dark" ? (
                      <>
                        <Moon className="w-4 h-4" /> Dark
                      </>
                    ) : (
                      <>
                        <Sun className="w-4 h-4" /> Light
                      </>
                    )}
                  </button>
                </div>

                {/* Profile Type Selector */}
                <div className="space-y-3">
                  <p className="font-medium text-white">Profile Type</p>
                  <p className="text-sm text-white/50 -mt-1">
                    Choose how your public profile appears
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {(["model", "agency", "brand"] as ProfileType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setProfileType(type)}
                        className={cn(
                          "px-3 sm:px-4 py-3 rounded-xl text-sm font-medium capitalize transition-all",
                          profileType === type
                            ? "bg-white text-gray-900"
                            : "bg-[--bg-input] border border-white/[0.06] text-white/70 hover:bg-white/[0.05]"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-white mb-2">
                    Account Settings
                  </h2>
                  <p className="text-sm text-white/50">
                    Manage your account information
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Aria Chen"
                      className="w-full px-4 py-3 rounded-xl bg-[--bg-input] border border-white/[0.06] text-white focus:outline-none focus:border-white/15 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="aria@modelink.com"
                      className="w-full px-4 py-3 rounded-xl bg-[--bg-input] border border-white/[0.06] text-white focus:outline-none focus:border-white/15 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Profile URL
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-white/50 text-sm sm:text-base">modelink.com/</span>
                      <input
                        type="text"
                        defaultValue="aria-chen"
                        className="flex-1 px-4 py-3 rounded-xl bg-[--bg-input] border border-white/[0.06] text-white focus:outline-none focus:border-white/15 transition-colors text-base"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-6 py-3 rounded-xl bg-white text-gray-900 font-medium hover:bg-white/90 transition-colors">
                    Save Changes
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-rose-500/10 text-rose-400 font-medium hover:bg-rose-500/20 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
