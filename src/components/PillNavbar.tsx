"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Palette,
  Bell,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Sun,
  Moon,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { creatorHubNavLinks } from "@/data/navigation";
import { mockNotifications } from "@/data/mockNotifications";
import { useSidebar } from "@/contexts/SidebarContext";
import { useTheme } from "@/contexts/ThemeContext";
import { NotificationsPanel } from "./NotificationsPanel";
import { Logo } from "./Logo";

interface PillNavbarProps {
  onSettingsClick?: () => void;
}

export function PillNavbar({ onSettingsClick }: PillNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMiniMenuExpanded, setIsMiniMenuExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();
  const unreadCount = mockNotifications.filter((n) => !n.read).length;
  const { offset } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 150;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mini menu when scrolling back up
  useEffect(() => {
    if (!isScrolled) {
      setIsMiniMenuExpanded(false);
    }
  }, [isScrolled]);

  const [creatorHubMenuOpen, setCreatorHubMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setCreatorHubMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  // Get current active link for mini menu display
  const currentLink = creatorHubNavLinks.find((link) => isActive(link.href)) || creatorHubNavLinks[0];
  const CurrentIcon = currentLink.icon;

  return (
    <>
      {/* Full Navbar - visible when not scrolled */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.nav
            className="hidden lg:flex fixed top-[21px] right-0 z-50 w-full justify-center px-4 pointer-events-none"
            style={{ left: offset }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ 
              y: -50, 
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            aria-label="Main navigation"
          >
            <motion.div
              className="w-full max-w-[860px] rounded-full border border-white/10 backdrop-blur-2xl flex items-center justify-between gap-2 px-2 py-2.5 pointer-events-auto"
              style={{ backgroundColor: "rgba(28,28,28,0.9)" }}
            >
              {/* Logo */}
              <Link to="/" className="flex items-center px-3">
                <Logo size="sm" />
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
        )}
      </AnimatePresence>

      {/* Mini Menu - Lava lamp transition to bottom center when scrolled */}
      {isMounted && createPortal(
        <AnimatePresence>
          {isScrolled && (
            <>
              {/* Backdrop when expanded */}
              {isMiniMenuExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hidden lg:block fixed inset-0 z-40"
                  onClick={() => setIsMiniMenuExpanded(false)}
                />
              )}

              <motion.div
                className="hidden lg:flex fixed bottom-6 left-1/2 z-50 flex-col items-center pointer-events-auto"
                initial={{ 
                  y: 100, 
                  x: "-50%",
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{ 
                  y: 0, 
                  x: "-50%",
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ 
                  y: 100, 
                  x: "-50%",
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{ 
                  type: "spring", 
                  damping: 20, 
                  stiffness: 300,
                  mass: 0.8
                }}
              >
                {/* Expanded Menu Panel */}
                <AnimatePresence>
                  {isMiniMenuExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      className="mb-3 rounded-2xl border backdrop-blur-2xl overflow-hidden shadow-2xl"
                      style={{
                        borderColor: "var(--border-muted)",
                        backgroundColor: theme === "dark" ? "rgba(20,20,20,0.98)" : "rgba(255,233,194,0.98)",
                      }}
                    >
                      <div className="p-2 space-y-1 min-w-[240px]">
                        {/* Navigation Links */}
                        {creatorHubNavLinks.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.href}
                              to={link.href}
                              onClick={() => setIsMiniMenuExpanded(false)}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                                isActive(link.href)
                                  ? "bg-[--accent-primary] text-white"
                                  : "text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-primary]/10"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                              {link.label}
                            </Link>
                          );
                        })}

                        {/* Divider */}
                        <div className="border-t border-[--border-subtle] my-2" />

                        {/* Extra Links */}
                        <Link
                          to="/portfolio-studio"
                          onClick={() => setIsMiniMenuExpanded(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-primary]/10 transition-colors"
                        >
                          <Palette className="w-4 h-4" />
                          Portfolio Studio
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setIsMiniMenuExpanded(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-primary]/10 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>

                        {/* Divider */}
                        <div className="border-t border-[--border-subtle] my-2" />

                        {/* Quick Actions Row */}
                        <div className="flex items-center justify-between px-2 py-1">
                          <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-primary]/10 transition-colors"
                            title={theme === "dark" ? "Light mode" : "Dark mode"}
                          >
                            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => {
                              setIsNotificationsOpen(true);
                              setIsMiniMenuExpanded(false);
                            }}
                            className="relative p-2 rounded-xl text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-primary]/10 transition-colors"
                          >
                            <Bell className="w-4 h-4" />
                            {unreadCount > 0 && (
                              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-violet-500" />
                            )}
                          </button>
                          <Link
                            to="/models/aria-chen"
                            onClick={() => setIsMiniMenuExpanded(false)}
                            className="p-1"
                          >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 p-0.5">
                              <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                              />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mini Pill Button */}
                <motion.button
                  onClick={() => setIsMiniMenuExpanded(!isMiniMenuExpanded)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-2xl shadow-lg transition-colors"
                  style={{
                    borderColor: "var(--border-muted)",
                    backgroundColor: theme === "dark" ? "rgba(20,20,20,0.95)" : "rgba(255,233,194,0.95)",
                    color: "var(--text-primary)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <motion.div
                    animate={{ rotate: isMiniMenuExpanded ? 180 : 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </motion.div>
                  <CurrentIcon className="w-4 h-4" />
                  <span className="text-xs font-medium">{currentLink.label}</span>
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 p-0.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Notifications Panel - needs to render outside for z-index */}
      {isScrolled && (
        <NotificationsPanel
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
        />
      )}
    </>
  );
}
