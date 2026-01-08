"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Palette,
  Settings,
  Menu,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import { creatorHubNavLinks } from "@/data/navigation";

const CREATOR_HUB_EXPANDED_KEY = "modelink-creator-hub-expanded";

const navItems = [
  {
    label: "Creator Hub",
    to: "/",
    icon: <LayoutDashboard className="w-4 h-4" />,
    children: creatorHubNavLinks,
  },
  {
    label: "Portfolio Studio",
    to: "/portfolio-studio",
    icon: <Palette className="w-4 h-4" />,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: <Settings className="w-4 h-4" />,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { collapsed, toggleCollapsed } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);
  const [creatorHubExpanded, setCreatorHubExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CREATOR_HUB_EXPANDED_KEY);
      return stored === "true";
    }
    return false;
  });

  // Persist creator hub expanded state
  useEffect(() => {
    localStorage.setItem(CREATOR_HUB_EXPANDED_KEY, String(creatorHubExpanded));
  }, [creatorHubExpanded]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isRouteActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const handleNavClick = () => {
    // Close menu after navigation
    if (!collapsed) {
      toggleCollapsed();
    }
  };

  const toggleCreatorHub = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCreatorHubExpanded((prev) => !prev);
  };

  const mobileMenuPortal =
    isMounted &&
    createPortal(
      <>
        {/* Mobile floating menu button - always visible on mobile */}
        <button
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Open menu" : "Close menu"}
          className="lg:hidden fixed bottom-6 right-6 p-4 rounded-3xl border backdrop-blur-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all z-[60]"
          style={{
            borderColor: "var(--border-muted)",
            backgroundColor: "var(--bg-elevated)",
            color: "var(--text-primary)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
          }}
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
        <AnimatePresence>
          {!collapsed && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden fixed inset-0 z-[55]"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}
                onClick={toggleCollapsed}
              />
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="lg:hidden fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-[320px] rounded-3xl backdrop-blur-2xl p-4 space-y-3 z-[58] shadow-2xl"
                style={{
                  borderWidth: "1px",
                  borderColor: "var(--border-muted)",
                  backgroundColor: "var(--bg-elevated)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p 
                      className="text-[10px] uppercase tracking-[0.35em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Menu
                    </p>
                    <p
                      className="text-lg font-serif"
                      style={{ fontFamily: '"Playfair Display", serif', color: "var(--text-primary)" }}
                    >
                      ModelLink
                    </p>
                  </div>
                  <button
                    onClick={toggleCollapsed}
                    aria-label="Close menu"
                    className="p-2 rounded-2xl transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {navItems.map((item) => {
                  const hasChildren = Boolean(item.children?.length);
                  const active = hasChildren
                    ? item.children!.some((child) => isRouteActive(child.href))
                    : isRouteActive(item.to);

                  return (
                    <div key={`mobile-${item.label}`} className="space-y-1">
                      <div
                        className="flex items-center justify-between rounded-2xl border px-3.5 py-2.5 text-sm transition-colors"
                        style={{
                          borderColor: active ? "var(--border-muted)" : "var(--border-subtle)",
                          backgroundColor: active ? "rgba(107, 46, 143, 0.1)" : "transparent",
                          color: active ? "var(--text-primary)" : "var(--text-secondary)",
                        }}
                      >
                        <Link
                          to={item.to}
                          onClick={handleNavClick}
                          className="flex items-center gap-2 flex-1"
                        >
                          <div
                            className="p-1.5 rounded-xl"
                            style={{
                              backgroundColor: active ? "rgba(107, 46, 143, 0.15)" : "rgba(107, 46, 143, 0.05)",
                              color: active ? "var(--text-primary)" : "var(--text-secondary)",
                            }}
                          >
                            {item.icon}
                          </div>
                          {item.label}
                        </Link>
                        {hasChildren && (
                          <button
                            onClick={toggleCreatorHub}
                            aria-label="Toggle Creator Hub submenu"
                            className="p-1.5 rounded-xl transition-colors"
                            style={{ color: "var(--text-muted)" }}
                          >
                            <ChevronDown
                              className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                creatorHubExpanded ? "rotate-180" : "rotate-0"
                              )}
                            />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {hasChildren && creatorHubExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden ml-3 space-y-1"
                          >
                            {item.children!.map((child) => {
                              const ChildIcon = child.icon;
                              return (
                                <Link
                                  key={`mobile-${child.href}`}
                                  to={child.href}
                                  onClick={handleNavClick}
                                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors"
                                  style={{
                                    backgroundColor: isRouteActive(child.href) ? "rgba(107, 46, 143, 0.1)" : "transparent",
                                    color: isRouteActive(child.href) ? "var(--text-primary)" : "var(--text-muted)",
                                  }}
                                >
                                  <ChildIcon className="w-3.5 h-3.5" />
                                  {child.label}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <div 
                  className="pt-3"
                  style={{ borderTop: "1px solid var(--border-subtle)" }}
                >
                  <Link
                    to="/linda"
                    onClick={handleNavClick}
                    className="flex items-center justify-between rounded-2xl border px-4 py-3 transition-colors"
                    style={{
                      borderColor: "var(--border-muted)",
                      background: "linear-gradient(135deg, rgba(107, 46, 143, 0.2), rgba(58, 15, 93, 0.2))",
                      color: "var(--text-primary)",
                    }}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <div 
                        className="p-2 rounded-xl"
                        style={{ backgroundColor: "rgba(107, 46, 143, 0.2)", color: "var(--accent-primary)" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </div>
                      Ask Linda
                    </div>
                    <span 
                      className="text-xs italic"
                      style={{ color: "var(--text-muted)" }}
                    >AI</span>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>,
      document.body
    );

  return (
    <>
      {mobileMenuPortal}
      {/* Floating Hamburger Button (desktop) */}
      <button
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Open menu" : "Close menu"}
        className="hidden lg:flex items-center justify-center fixed left-4 top-6 p-3 rounded-2xl border border-white/10 bg-white/[0.08] backdrop-blur-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors z-50"
      >
        {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </button>

      {/* Desktop Floating Menu */}
      <AnimatePresence>
        {!collapsed && (
          <>
            {/* Desktop Backdrop - click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block fixed inset-0 z-40"
              onClick={toggleCollapsed}
            />

            {/* Floating Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="hidden lg:flex flex-col fixed left-4 top-20 z-50 w-64 rounded-2xl border border-white/10 backdrop-blur-2xl bg-black/60 p-3 space-y-2"
            >
              {/* Main Nav Pills */}
              {navItems.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const active = hasChildren
                  ? item.children!.some((child) => isRouteActive(child.href))
                  : isRouteActive(item.to);

                return (
                  <div key={item.label} className="space-y-1">
                    <div
                      className={cn(
                        "flex items-center justify-between rounded-2xl border px-4 py-3 transition-colors",
                        active
                          ? "border-white/20 bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-white"
                          : "border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/20"
                      )}
                    >
                      <Link
                        to={item.to}
                        onClick={handleNavClick}
                        className="flex items-center gap-2 text-sm font-semibold flex-1"
                      >
                        <div
                          className={cn(
                            "p-2 rounded-xl",
                            active
                              ? "bg-white/15 text-white/90"
                              : "bg-white/10 text-white/60"
                          )}
                        >
                          {item.icon}
                        </div>
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          onClick={toggleCreatorHub}
                          className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="Toggle Creator Hub submenu"
                        >
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              creatorHubExpanded ? "rotate-180" : "rotate-0"
                            )}
                          />
                        </button>
                      )}
                    </div>

                    {/* Creator Hub Children */}
                    <AnimatePresence>
                      {hasChildren && creatorHubExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden ml-2 space-y-1"
                        >
                          {item.children!.map((child) => {
                            const ChildIcon = child.icon;
                            return (
                              <Link
                                key={child.href}
                                to={child.href}
                                onClick={handleNavClick}
                                className={cn(
                                  "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors",
                                  isRouteActive(child.href)
                                    ? "bg-white/10 text-white"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                                )}
                              >
                                <ChildIcon className="w-3.5 h-3.5" />
                                {child.label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Divider */}
              <div className="border-t border-white/10 my-1" />

              {/* Ask Linda Pill */}
              <Link
                to="/linda"
                onClick={handleNavClick}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/20 to-blue-500/20 px-4 py-3 text-white hover:border-white/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <div className="p-2 rounded-xl bg-white/15 text-white/90">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  Ask Linda
                </div>
                <span className="text-xs text-white/50 italic">AI Assistant</span>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
