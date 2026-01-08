"use client";

import { useState } from "react";
import { Menu, Mail, MessageCircle, Instagram, Twitter, Globe, Youtube, Linkedin, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { mockModels } from "@/data/mockModels";
import { dashboardData, availableFonts as dashboardFonts } from "@/data/mockDashboard";
import { cn } from "@/lib/utils";
import { ProfileHero } from "./ProfileHero";
import { GallerySection } from "./GallerySection";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { Sidebar } from "./Sidebar";
import { ModelSidebar } from "./ModelSidebar";

interface PersonalDashboardProps {
  lookbookMode: boolean;
  onSettingsClick?: () => void;
}

export function PersonalDashboard({ lookbookMode, onSettingsClick }: PersonalDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const model = mockModels[0]; // Use first model as the personal profile
  const { appointments, impressions, topPosts, integrations, agencies, customization } = dashboardData;
  const customizationConfig = {
    ...customization,
    availableFonts: dashboardFonts,
  };
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-white overflow-hidden">
      <ModelSidebar
        integrations={integrations}
        agencies={agencies}
        customization={customizationConfig}
        onSettingsClick={onSettingsClick}
      />
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-20 z-30 md:hidden p-3 bg-khaki rounded-full shadow-medium"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5 text-baby-pink" />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 lg:pl-[360px] pt-24 pb-12">
        <main className="w-full max-w-3xl mx-auto lg:mx-0 space-y-12">
          {/* Profile Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel relative overflow-hidden rounded-[2.5rem] p-6 md:p-8 mb-10 text-white elevation-4"
          >
            <div className="absolute inset-0 opacity-60 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle at 20% 20%, rgba(244,194,194,0.35), transparent 55%)" }} />
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={model.profilePhoto}
                  alt={model.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-baby-pink shadow-medium"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800" />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                  {model.name}
                </h1>
                <p className="text-lg text-gray-300 mb-4">
                  Professional Model • {model.stats.height} • {model.stats.hairColor} • {model.stats.eyeColor}
                </p>
                <p className="text-gray-200 mb-6 max-w-2xl">
                  Specializing in editorial, commercial, and high-fashion work. Available for bookings worldwide.
                </p>

                {/* Social Links */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                  <a
                    href={model.socials?.instagram ? `https://instagram.com/${model.socials.instagram.replace("@", "")}` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-hover flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/10 text-white/90 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-baby-pink" />
                    <span className="text-sm font-medium">Instagram</span>
                  </a>
                  {model.socials?.website && (
                    <a
                      href={model.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-hover flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/10 text-white/90 transition-colors"
                    >
                      <Globe className="w-4 h-4 text-baby-blue" />
                      <span className="text-sm font-medium">Website</span>
                    </a>
                  )}
                  <a
                    href="#contact"
                    className="liquid-hover flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/10 text-white/90 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-rose-200" />
                    <span className="text-sm font-medium">Contact</span>
                  </a>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <button className="px-6 py-3 rounded-[1.75rem] font-semibold text-gray-900 bg-white shadow-[0_6px_0_rgba(0,0,0,0.18)] active:translate-y-[2px] transition-transform">
                    Book Now
                  </button>
                  <button className="px-6 py-3 rounded-[1.75rem] font-semibold border border-white/25 text-white/90 bg-transparent hover:bg-white/10 transition-colors">
                    View Portfolio
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: "Height", value: model.stats.height },
              { label: "Bust", value: model.stats.bust || "N/A" },
              { label: "Waist", value: model.stats.waist || "N/A" },
              { label: "Hips", value: model.stats.hips || "N/A" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-4 text-center text-white/90 elevation-2"
              >
                <p className="text-sm text-white/60 mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Dashboard Widgets */}
          <div className="grid gap-6 lg:grid-cols-2 mb-16">
            <div className="glass-panel rounded-[2rem] p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/40">Schedule</p>
                  <h3 className="text-xl font-semibold text-white">Appointments</h3>
                </div>
                <span className="text-xs text-white/60">Next 7 days</span>
              </div>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{appointment.client}</p>
                      <p className="text-xs text-white/60">
                        {formatDate(appointment.date)} · {appointment.time}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "text-[10px] uppercase tracking-widest px-3 py-1 rounded-full",
                        appointment.status === "confirmed"
                          ? "bg-emerald-500/15 text-emerald-200"
                          : appointment.status === "pending"
                          ? "bg-amber-500/15 text-amber-200"
                          : "bg-blue-500/15 text-blue-200"
                      )}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[2rem] p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/40">Performance</p>
                  <h3 className="text-xl font-semibold text-white">Top Impressions</h3>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {impressions.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 flex flex-col gap-1"
                  >
                    <p className="text-xs uppercase tracking-widest text-white/60">{item.platform}</p>
                    <p className="text-2xl font-semibold text-white">{item.impressions.toLocaleString()}</p>
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        item.change >= 0 ? "text-emerald-300" : "text-rose-300"
                      )}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 border border-white/10 mb-16">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/40">Creator Feed</p>
                <h3 className="text-xl font-semibold text-white">Highest Performing Posts</h3>
              </div>
              <span className="text-xs text-white/60">Last 14 days</span>
            </div>
            <div className="space-y-3">
              {topPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-widest text-white/60 bg-white/10 rounded-full px-2 py-1">
                        {post.platform}
                      </span>
                      <span className="text-xs text-white/60">{formatDate(post.postedAt)}</span>
                    </div>
                    <p className="text-sm font-semibold text-white">{post.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-white">
                      {post.engagementRate}%
                    </p>
                    <p className="text-xs text-white/60">Engagement · {post.reach.toLocaleString()} reach</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div id="portfolio" className="mb-16">
            <GallerySection
              galleries={model.galleries}
              videos={model.videos}
              lookbookMode={lookbookMode}
            />
          </div>

          <div id="experience" className="mb-16">
            <ExperienceTimeline experience={model.experience} />
          </div>

          {/* Contact Section */}
          <div id="contact" className="glass-panel rounded-[2rem] p-8 elevation-3">
            <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {[
                { icon: <Instagram className="w-6 h-6" />, href: model.socials?.instagram ? `https://instagram.com/${model.socials.instagram.replace("@", "")}` : "#", label: "Instagram" },
                { icon: <Twitter className="w-6 h-6" />, href: model.socials?.twitter ? `https://twitter.com/${model.socials.twitter.replace("@", "")}` : "#", label: "X (Twitter)" },
                {
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  ),
                  href: model.socials?.tiktok ? `https://tiktok.com/@${model.socials.tiktok.replace("@", "")}` : "#",
                  label: "TikTok",
                },
                { icon: <Youtube className="w-6 h-6" />, href: "#", label: "YouTube" },
                { icon: <ShoppingBag className="w-6 h-6" />, href: "#", label: "Amazon" },
                { icon: <Linkedin className="w-6 h-6" />, href: "#", label: "LinkedIn" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shooting-star liquid-hover p-3 text-white/80 hover:text-white transition-colors rounded-2xl border border-white/10 bg-white/5"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}



