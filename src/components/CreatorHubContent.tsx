"use client";

import { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Inbox } from "./Inbox";
import { Notepad } from "./Notepad";
import { dashboardData } from "@/data/mockDashboard";
import { mockModels } from "@/data/mockModels";

interface KPICardProps {
  label: string;
  value: string | number;
  change?: number;
  meta?: string;
  icon: React.ReactNode;
  delay?: number;
}

function KPICard({ label, value, change, meta, icon, delay = 0 }: KPICardProps) {
  const isPositive = change && change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-transparent border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-colors"
    >
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
    </motion.div>
  );
}

export function CreatorHubContent() {
  const model = mockModels[0];
  const { topPosts, appointments } = dashboardData;

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

  return (
    <div className="relative min-h-full pt-28 pb-12">
      {/* Subtle Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl space-y-8">
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
              <p className="text-white/60 max-w-lg">
                Here's an overview of your career metrics and recent activity.
              </p>
            </motion.div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((kpi, i) => (
                <KPICard key={kpi.label} {...kpi} delay={0.1 + i * 0.05} />
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Inbox */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Inbox />
              </motion.div>

              {/* Upcoming Appointments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-transparent border border-white/[0.06] rounded-2xl p-5"
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

            {/* Top Performing Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-transparent border border-white/[0.06] rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Top Performing Posts
                  </h3>
                  <p className="text-sm text-white/50">Last 14 days</p>
                </div>
              </div>
              <div className="space-y-3">
                {topPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-transparent border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-white/60 uppercase">
                          {post.platform.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">
                          {post.title}
                        </p>
                        <p className="text-xs text-white/50">
                          {formatDate(post.postedAt)} · {post.platform}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        {post.engagementRate}%
                      </p>
                      <p className="text-xs text-white/50">
                        {post.reach.toLocaleString()} reach
                      </p>
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

