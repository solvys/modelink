"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Settings,
  Menu,
  X,
  Palette,
  Bell,
  ChevronDown,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { creatorHubNavLinks } from "@/data/navigation";
import { mockNotifications } from "@/data/mockNotifications";
import { useSidebar } from "@/contexts/SidebarContext";
import { useTheme } from "@/contexts/ThemeContext";
import { NotificationsPanel } from "./NotificationsPanel";

interface PillNavbarProps {
  onSettingsClick?: () => void;
}

export function PillNavbar({ onSettingsClick }: PillNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();
  const unreadCount = mockNotifications.filter((n) => !n.read).length;
  const { offset } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [creatorHubMenuOpen, setCreatorHubMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setCreatorHubMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      className="hidden lg:flex fixed top-[21px] right-0 z-50 w-full justify-center px-4 pointer-events-none"
      style={{ left: offset }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <motion.div
        className="w-full max-w-[860px] rounded-full border border-white/10 backdrop-blur-2xl flex items-center justify-between gap-2 px-2 pointer-events-auto"
        animate={{
          backgroundColor: isScrolled ? "rgba(20,20,20,0.98)" : "rgba(28,28,28,0.9)",
          paddingTop: isScrolled ? "0.4rem" : "0.6rem",
          paddingBottom: isScrolled ? "0.4rem" : "0.6rem",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 px-3">
          <span
            className="font-serif font-semibold text-white text-base hidden sm:block"
            style={{ fontFamily: '"Playfair Display", serif', fontStyle: "normal" }}
          >
            ModelLink
          </span>
          <span
            className="font-serif font-semibold text-white text-base sm:hidden"
            style={{ fontFamily: '"Playfair Display", serif', fontStyle: "normal" }}
          >
            ML
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {creatorHubNavLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all",
                  isActive(link.href)
                    ? "bg-white text-gray-900"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden lg:inline">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
            className="relative p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-violet-500" />
            )}
          </button>

          {/* Settings */}
          <Link
            to="/settings"
            className={cn(
              "p-1.5 rounded-full transition-colors",
              location.pathname === "/settings"
                ? "bg-white text-gray-900"
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            <Settings className="w-4 h-4" />
          </Link>

          {/* Profile */}
          <Link to="/models/aria-chen" className="ml-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 p-0.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 w-full max-w-[860px] rounded-2xl bg-gray-950/95 backdrop-blur-xl border border-white/10 p-3 pointer-events-auto"
          >
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setCreatorHubMenuOpen((prev) => !prev)}
                className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/80"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-300" />
                  Creator Hub
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    creatorHubMenuOpen ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {creatorHubMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1 flex flex-col gap-1">
                      {creatorHubNavLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setCreatorHubMenuOpen(false);
                            }}
                            className={cn(
                              "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                              isActive(link.href)
                                ? "bg-white text-gray-900"
                                : "text-white/70 hover:text-white hover:bg-white/10"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="border-t border-white/10 pt-2 flex flex-col gap-1">
                <Link
                  to="/portfolio-studio"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Palette className="w-4 h-4" />
                  Portfolio Studio
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </motion.nav>
  );
}
