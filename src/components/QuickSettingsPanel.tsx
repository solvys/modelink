"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  LogOut,
  CreditCard,
  UserPlus,
  X,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export function QuickSettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    {
      id: "billing",
      label: "Billing & Plans",
      description: "Manage subscription",
      icon: <CreditCard className="w-4 h-4" />,
      href: "/settings?tab=billing",
    },
    {
      id: "accounts",
      label: "Add Account",
      description: "Connect another profile",
      icon: <UserPlus className="w-4 h-4" />,
      href: "/settings?tab=accounts",
    },
  ];

  const handleSignOut = () => {
    // In a real app, this would call an auth service
    console.log("Signing out...");
    setIsOpen(false);
    // Could redirect to login page
  };

  return (
    <>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-4 top-20 z-50 w-72 rounded-2xl border border-[--border-muted] bg-[#1a1a1a] backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[--border-subtle]">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-white/60" />
                  <h3 className="text-sm font-semibold text-white">Quick Settings</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User Preview */}
              <div className="px-4 py-3 border-b border-[--border-subtle]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 p-0.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">Sophia Chen</p>
                    <p className="text-xs text-white/50 truncate">sophia@modelink.com</p>
                  </div>
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="px-4 py-3 border-b border-[--border-subtle]">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-violet-400" />
                    )}
                    <span className="text-sm text-white/80">
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "w-10 h-5 rounded-full p-0.5 transition-colors",
                      theme === "dark" ? "bg-white/20" : "bg-violet-500"
                    )}
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full bg-white shadow-sm"
                      animate={{ x: theme === "dark" ? 0 : 20 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </button>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-white/10 text-white/70">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-xs text-white/50">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </Link>
                ))}
              </div>

              {/* Sign Out */}
              <div className="px-4 py-3 border-t border-[--border-subtle]">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

