"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Database,
  CalendarDays,
  Activity,
  TrendingUp,
  Hash,
  X,
  type LucideIcon,
} from "lucide-react";
import { mockHashtags } from "@/data/mockFeed";
import { cn } from "@/lib/utils";

const contentIdeas = [
  {
    title: "Behind-the-Lens Story",
    hook: "Highlight the technical artistry from a recent runway fitting.",
    format: "15s Reel",
    metrics: "+32% saves",
  },
  {
    title: "Modeling Myth Busting",
    hook: "Clarify one industry misconception with receipts.",
    format: "Carousel",
    metrics: "+18% shares",
  },
  {
    title: "Color Grading Breakdown",
    hook: "Show before/after shots for a branded editorial.",
    format: "Shorts",
    metrics: "+41% watch time",
  },
];

const calendarBeats = [
  { date: "Jan 10", focus: "NYFW castings open", action: "Share casting tape checklist" },
  { date: "Jan 15", focus: "Beauty launch cycle", action: "Pitch glow skincare routine" },
  { date: "Jan 20", focus: "Valentine's prep", action: "Moodboard color palette post" },
];

type MetricKey = "briefs" | "ideas" | "alerts";

const discoverStats: { key: MetricKey; label: string; value: string; icon: LucideIcon }[] = [
  { key: "briefs", label: "Briefs synced", value: "42", icon: Database },
  { key: "ideas", label: "Content ideas queued", value: "9", icon: Lightbulb },
  { key: "alerts", label: "Industry alerts", value: "3", icon: Activity },
];

type Timeframe = "day" | "week" | "month" | "year";

const timeframeOptions: Timeframe[] = ["day", "week", "month", "year"];

interface MetricTrendDefinition {
  label: string;
  unit: string;
  series: Record<Timeframe, number[]>;
}

const metricTrendData: Record<MetricKey, MetricTrendDefinition> = {
  briefs: {
    label: "Briefs synced",
    unit: "briefs",
    series: {
      day: [32, 34, 35, 31, 38, 40],
      week: [24, 26, 28, 30, 33, 37, 42],
      month: [14, 17, 24, 28, 32, 35, 40, 42, 44, 46, 45, 47],
      year: [8, 12, 15, 20, 28, 32, 37, 41, 45, 48, 50, 52],
    },
  },
  ideas: {
    label: "Content ideas queued",
    unit: "ideas",
    series: {
      day: [5, 7, 6, 8, 9, 9],
      week: [4, 6, 7, 8, 9, 9, 10],
      month: [3, 4, 5, 6, 7, 8, 9, 9, 10, 11, 10, 9],
      year: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 9],
    },
  },
  alerts: {
    label: "Industry alerts",
    unit: "alerts",
    series: {
      day: [1, 2, 1, 2, 3, 3],
      week: [1, 1, 2, 2, 3, 3, 3],
      month: [0, 1, 1, 2, 2, 3, 3, 3, 4, 4, 3, 3],
      year: [0, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 3],
    },
  },
} as const;

export function DiscoverPage() {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("week");

  const selectedMetricData = selectedMetric ? metricTrendData[selectedMetric] : null;
  const chartValues = selectedMetricData?.series[selectedTimeframe] ?? [];

  const chartGeometry = useMemo(() => {
    if (!selectedMetricData) {
      return { path: "", nodes: [] as Array<{ x: number; y: number; value: number }> };
    }
    const values = selectedMetricData.series[selectedTimeframe];
    if (values.length === 0) {
      return { path: "", nodes: [] as Array<{ x: number; y: number; value: number }> };
    }
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const nodes = values.map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 100;
      const y = 90 - ((value - min) / range) * 70;
      return { x, y, value };
    });
    return {
      path: nodes.map(({ x, y }) => `${x},${y}`).join(" "),
      nodes,
    };
  }, [selectedMetricData, selectedTimeframe]);
  const chartPoints = chartGeometry.path;
  const chartNodes = chartGeometry.nodes;

  const chartAverage =
    chartValues.length > 0
      ? Math.round(chartValues.reduce((sum, value) => sum + value, 0) / chartValues.length)
      : 0;
  const chartMin = chartValues.length > 0 ? Math.min(...chartValues) : 0;
  const chartMax = chartValues.length > 0 ? Math.max(...chartValues) : 0;
  const chartCurrent = chartValues.at(-1) ?? 0;

  const closeMetricModal = () => setSelectedMetric(null);

  return (
    <div className="relative min-h-full pt-28 pb-12">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm uppercase tracking-wide text-white/40">Research Deck</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Discover</h1>
          <p className="text-white/60 mt-2 max-w-2xl">
            Modeling data and content intelligence sourced from partners like Launchmetrics,
            Tagger, and internal booking APIs. Plug the prompts below directly into your creative
            workflow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {discoverStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <button
                key={stat.key}
                type="button"
                onClick={() => {
                  setSelectedMetric(stat.key);
                  setSelectedTimeframe("week");
                }}
                className="rounded-2xl border border-white/10 bg-transparent p-4 flex items-center gap-3 text-left hover:border-white/30 hover:bg-white/10 transition-colors"
              >
                <div className="p-2 rounded-xl bg-white/10 text-white">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wide text-white/50">{stat.label}</p>
                </div>
              </button>
            );
          })}
        </motion.div>

        <section className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-transparent p-6 space-y-4"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <h2 className="text-lg font-semibold text-white">Trending Content Ideas</h2>
            </div>
            {contentIdeas.map((idea) => (
              <div key={idea.title} className="rounded-2xl border border-white/10 p-4 bg-transparent space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{idea.title}</p>
                  <span className="text-xs text-white/50">{idea.format}</span>
                </div>
                <p className="text-sm text-white/70">{idea.hook}</p>
                <p className="text-xs text-emerald-300 uppercase tracking-wide">{idea.metrics}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-transparent p-6 space-y-4"
          >
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-violet-300" />
              <h2 className="text-lg font-semibold text-white">Content Calendar</h2>
            </div>
            {calendarBeats.map((beat) => (
              <div
                key={beat.date}
                className="flex items-center justify-between rounded-2xl border border-white/10 p-4 bg-transparent"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{beat.focus}</p>
                  <p className="text-xs text-white/50">{beat.action}</p>
                </div>
                <span className="text-white/60 text-sm">{beat.date}</span>
              </div>
            ))}
          </motion.div>
        </section>

        <section className="grid lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 rounded-3xl border border-white/10 bg-transparent p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-emerald-300" />
              <h2 className="text-lg font-semibold text-white">Industry Insights</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: "Editorial moodboards", change: "+18%", bar: "w-3/4" },
                { label: "Beauty close-ups", change: "+11%", bar: "w-2/3" },
                { label: "Runway POVs", change: "+27%", bar: "w-5/6" },
              ].map((insight) => (
                <div key={insight.label}>
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <p>{insight.label}</p>
                    <span className="text-emerald-300">{insight.change}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 ${insight.bar}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 rounded-3xl border border-white/10 bg-transparent p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-violet-300" />
              <h2 className="text-lg font-semibold text-white">Signal Tags</h2>
            </div>
            <div className="space-y-3">
              {mockHashtags.slice(0, 6).map((tag) => (
                <div key={tag.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/80">
                    <Hash className="w-4 h-4 text-white/40" />
                    {tag.name}
                  </div>
                  <span className="text-xs text-white/40">
                    {(tag.postsCount / 1000).toFixed(1)}K
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      <AnimatePresence>
        {selectedMetricData && (
          <>
            <motion.div
              key="discover-chart-backdrop"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMetricModal}
            />
            <motion.div
              key="discover-chart-modal"
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#0e0d13] p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Trendline</p>
                    <h3 className="text-2xl font-semibold text-white mt-1">
                      {selectedMetricData.label}
                    </h3>
                    <p className="text-sm text-white/50">
                      {chartCurrent} {selectedMetricData.unit} · {selectedTimeframe}
                    </p>
                  </div>
                  <button
                    onClick={closeMetricModal}
                    className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close metric chart"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {timeframeOptions.map((frame) => (
                    <button
                      key={frame}
                      onClick={() => setSelectedTimeframe(frame)}
                      className={cn(
                        "px-3 py-1.5 rounded-full border transition-colors",
                        selectedTimeframe === frame
                          ? "bg-white text-gray-900 border-white"
                          : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
                      )}
                    >
                      {frame}
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-transparent p-4">
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="w-full h-40 text-violet-200"
                  >
                    <defs>
                      <linearGradient id="discover-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fbcfe8" />
                        <stop offset="100%" stopColor="#c4b5fd" />
                      </linearGradient>
                    </defs>
                    <polyline
                      points={chartPoints}
                      fill="none"
                      stroke="url(#discover-gradient)"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {chartNodes.map((node, index) => (
                      <circle
                        key={`${node.x}-${index}`}
                        cx={node.x}
                        cy={node.y}
                        r={index === chartNodes.length - 1 ? 1.8 : 1.2}
                        fill="white"
                        opacity={index === chartNodes.length - 1 ? 1 : 0.6}
                      />
                    ))}
                  </svg>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-white/60">
                    <div className="rounded-xl bg-transparent p-3">
                      <p className="text-[11px] uppercase tracking-wide">Current</p>
                      <p className="text-lg font-semibold text-white">{chartCurrent}</p>
                    </div>
                    <div className="rounded-xl bg-transparent p-3">
                      <p className="text-[11px] uppercase tracking-wide">Average</p>
                      <p className="text-lg font-semibold text-white">{chartAverage}</p>
                    </div>
                    <div className="rounded-xl bg-transparent p-3">
                      <p className="text-[11px] uppercase tracking-wide">Range</p>
                      <p className="text-lg font-semibold text-white">
                        {chartMin} – {chartMax}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

