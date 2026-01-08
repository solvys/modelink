"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Heart,
  Calendar,
  Briefcase,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Sparkles,
  StickyNote,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Inbox } from "./Inbox";
import { Notepad } from "./Notepad";
import { dashboardData } from "@/data/mockDashboard";
import { mockModels } from "@/data/mockModels";

const NOTE_STORAGE_KEY = "modelink-notepad";

interface KPICardProps {
  label: string;
  value: string | number;
  change?: number;
  meta?: string;
  icon: React.ReactNode;
  delay?: number;
  isActive?: boolean;
}

function KPICard({
  label,
  value,
  change,
  meta,
  icon,
  delay = 0,
  isActive = false,
}: KPICardProps) {
  const isPositive = change && change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        "bg-transparent border border-white/[0.06] rounded-2xl transition-colors",
        // Mobile: compact horizontal row
        "p-3 sm:p-5",
        // Desktop: card style with hover
        "sm:hover:bg-white/[0.05]",
        isActive && "border-white/30 bg-white/[0.07] shadow-lg shadow-violet-500/20"
      )}
    >
      {/* Mobile Layout: Horizontal row */}
      <div className="flex sm:hidden items-center gap-3">
        <div className="p-2 rounded-lg bg-white/[0.05] text-white/60 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white/50 truncate">{label}</p>
        </div>
        <p className="text-lg font-bold text-white flex-shrink-0">{value}</p>
        {meta ? (
          <div className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/15 text-white/70 flex-shrink-0">
            {meta}
          </div>
        ) : (
          change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-0.5 text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0",
                isPositive
                  ? "text-emerald-400 bg-emerald-500/10"
                  : "text-rose-400 bg-rose-500/10"
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-2.5 h-2.5" />
              ) : (
                <TrendingDown className="w-2.5 h-2.5" />
              )}
              {Math.abs(change)}%
            </div>
          )
        )}
      </div>

      {/* Desktop Layout: Vertical card */}
      <div className="hidden sm:block">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 rounded-xl bg-white/[0.05] text-white/60">
            {icon}
          </div>
          {meta ? (
            <div className="text-[11px] font-medium px-2 py-1 rounded-full border border-white/15 text-white/70">
              {meta}
            </div>
          ) : (
            change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                isPositive
                  ? "text-emerald-400 bg-emerald-500/10"
                  : "text-rose-400 bg-rose-500/10"
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(change)}%
            </div>
          ))}
        </div>
        <p className="text-2xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-white/50">{label}</p>
      </div>
    </motion.div>
  );
}

function MobileQuickNotes() {
  const [content, setContent] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [showSaved, setShowSaved] = useState(false);
  const hideSavedRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(NOTE_STORAGE_KEY);
    if (stored) {
      setContent(stored);
    }
  }, []);

  useEffect(() => {
    if (isSaved) return;
    const saveTimeout = window.setTimeout(() => {
      localStorage.setItem(NOTE_STORAGE_KEY, content);
      setIsSaved(true);
      setShowSaved(true);
      if (hideSavedRef.current) {
        window.clearTimeout(hideSavedRef.current);
      }
      hideSavedRef.current = window.setTimeout(() => setShowSaved(false), 1500);
    }, 600);

    return () => window.clearTimeout(saveTimeout);
  }, [content, isSaved]);

  useEffect(() => {
    return () => {
      if (hideSavedRef.current) {
        window.clearTimeout(hideSavedRef.current);
      }
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    setIsSaved(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="xl:hidden border border-white/[0.06] rounded-2xl p-5 bg-white/[0.02] w-full"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-amber-300" />
          <div>
            <h3 className="text-base font-semibold text-white">Quick Notes</h3>
            <p className="text-xs text-white/50">Capture sparks while on the go.</p>
          </div>
        </div>
        {showSaved && (
          <div className="flex items-center gap-1 text-xs text-emerald-300">
            <Check className="w-3 h-3" />
            Saved
          </div>
        )}
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        rows={4}
        placeholder="Draft a reminder, idea, or caption..."
        className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-3 py-2 text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
      />
      <div className="mt-2 flex items-center justify-between text-[11px] text-white/40">
        <span>{content.length} characters</span>
        <span className={cn(!isSaved && "text-amber-300")}>
          {isSaved ? "Synced" : "Saving..."}
        </span>
      </div>
    </motion.div>
  );
}

export function CreatorHubContent() {
  const model = mockModels[0];
  const { topPosts, appointments } = dashboardData;
  const kpiRefs = useRef<Array<HTMLDivElement | null>>([]);
  const seenKPIRef = useRef<Set<number>>(new Set());
  const timersRef = useRef<number[]>([]);
  const [activeKPIs, setActiveKPIs] = useState<Set<number>>(new Set());

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  const lastPostTimestamp =
    topPosts.length > 0
      ? topPosts.reduce((latest, post) => {
          const postDate = new Date(post.postedAt);
          return postDate > new Date(latest) ? post.postedAt : latest;
        }, topPosts[0].postedAt)
      : null;

  const lastPostDate = lastPostTimestamp ? new Date(lastPostTimestamp) : null;
  const lastPostDisplay = lastPostDate
    ? lastPostDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "—";
  const lastPostDaysSince =
    lastPostDate !== null
      ? Math.max(
          0,
          Math.round((Date.now() - lastPostDate.getTime()) / (1000 * 60 * 60 * 24))
        )
      : null;
  const lastPostMeta =
    lastPostDaysSince === null
      ? "No data"
      : lastPostDaysSince === 0
      ? "Today"
      : lastPostDaysSince === 1
      ? "1 day ago"
      : `${lastPostDaysSince} days ago`;

  const kpis = [
    {
      label: "Profile Views",
      value: "12.4K",
      change: 18,
      icon: <Eye className="w-5 h-5" />,
    },
    {
      label: "Avg Likes/Post",
      value: "2.8K",
      change: 8,
      icon: <Heart className="w-5 h-5" />,
    },
    {
      label: "Last Post Date",
      value: lastPostDisplay,
      meta: lastPostMeta,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: "Active Projects",
      value: 3,
      change: -12,
      icon: <Briefcase className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }
    const observers = kpiRefs.current.map((node, index) => {
      if (!node) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !seenKPIRef.current.has(index)) {
              seenKPIRef.current.add(index);
              setActiveKPIs((prev) => {
                const next = new Set(prev);
                next.add(index);
                return next;
              });
              const timeoutId = window.setTimeout(() => {
                setActiveKPIs((prev) => {
                  const next = new Set(prev);
                  next.delete(index);
                  return next;
                });
              }, 1200);
              timersRef.current.push(timeoutId);
            }
          });
        },
        { threshold: 0.65 }
      );
      observer.observe(node);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  return (
    <div className="relative min-h-full pt-20 sm:pt-28 pb-12">
      {/* Subtle Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[764px] lg:max-w-5xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 w-full space-y-8 xl:max-w-4xl">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-white/50">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Creator Hub</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Welcome back, {model.name.split(" ")[0]}
              </h1>
            </motion.div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((kpi, i) => (
                <div
                  key={kpi.label}
                  ref={(el) => {
                    kpiRefs.current[i] = el;
                  }}
                >
                  <KPICard
                    {...kpi}
                    delay={0.1 + i * 0.05}
                    isActive={activeKPIs.has(i)}
                  />
                </div>
              ))}
            </div>

            {/* Inbox & Upcoming */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="min-w-0"
              >
                <Inbox />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="min-w-0 bg-transparent border border-white/[0.06] rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Upcoming
                  </h3>
                  <button className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1">
                    View all <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {appointments.slice(0, 3).map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-transparent border border-white/[0.04]"
                    >
                      <div>
                        <p className="font-medium text-white text-sm">
                          {apt.client}
                        </p>
                        <p className="text-xs text-white/50">
                          {formatDate(apt.date)} · {apt.time}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full font-medium",
                          apt.status === "confirmed"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : apt.status === "pending"
                            ? "bg-amber-500/15 text-amber-300"
                            : "bg-blue-500/15 text-blue-300"
                        )}
                      >
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Notes - Mobile */}
            <MobileQuickNotes />

            {/* Top Performing Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-transparent border border-white/[0.06] rounded-2xl p-4 sm:p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Top Performing Posts
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50">Last 14 days</p>
                </div>
              </div>
              <div className="space-y-3">
                {topPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-transparent border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] sm:text-xs font-medium text-white/60 uppercase">
                          {post.platform.slice(0, 2)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white text-sm truncate">
                          {post.title}
                        </p>
                        <p className="text-xs text-white/50">
                          {formatDate(post.postedAt)} · {post.platform}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end sm:text-right gap-4 pl-[52px] sm:pl-0">
                      <div className="sm:hidden text-xs text-white/40">Engagement</div>
                      <div>
                        <p className="text-base sm:text-lg font-bold text-white">
                          {post.engagementRate}%
                        </p>
                        <p className="text-[10px] sm:text-xs text-white/50">
                          {post.reach.toLocaleString()} reach
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar - Notepad */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-28 mt-[8.25rem]">
              <Notepad />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

