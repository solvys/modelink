"use client";

import { useState } from "react";
import { X, TrendingUp, FileText, Mail, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface KPI {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

interface Proposal {
  id: string;
  title: string;
  brand: string;
  date: string;
  status: "pending" | "accepted" | "declined";
  link: string;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const kpis: KPI[] = [
    { label: "Profile Views", value: "1,234", change: "+12%", trend: "up" },
    { label: "Proposals Sent", value: "45", change: "+5", trend: "up" },
    { label: "Response Rate", value: "68%", change: "+3%", trend: "up" },
    { label: "Active Projects", value: "8", change: "+2", trend: "up" },
  ];

  const proposals: Proposal[] = [
    {
      id: "1",
      title: "Summer Campaign",
      brand: "Zara",
      date: "2024-01-15",
      status: "pending",
      link: "mailto:proposal@example.com",
    },
    {
      id: "2",
      title: "Editorial Feature",
      brand: "Vogue",
      date: "2024-01-10",
      status: "accepted",
      link: "https://dm.example.com/proposal-2",
    },
    {
      id: "3",
      title: "Product Launch",
      brand: "Nike",
      date: "2024-01-05",
      status: "pending",
      link: "mailto:proposal@example.com",
    },
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
            className="fixed inset-0 bg-black/60 backdrop-blur-lg z-40 md:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 glass-panel rounded-r-3xl border border-white/10 text-white z-50 overflow-y-auto backdrop-blur-2xl"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white/80" />
                </button>
              </div>

              {/* KPIs Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-baby-blue" />
                  <h3 className="text-lg font-semibold text-white">KPIs</h3>
                </div>
                <div className="space-y-3">
                  {kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="glass-card rounded-2xl p-4 border border-white/10"
                    >
                      <p className="text-sm text-white/60 mb-1">{kpi.label}</p>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-white">{kpi.value}</p>
                        <span
                          className={`text-sm font-medium ${
                            kpi.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proposals Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-baby-pink" />
                  <h3 className="text-lg font-semibold text-white">Proposals</h3>
                </div>
                <div className="space-y-3">
                  {proposals.map((proposal) => (
                    <div
                      key={proposal.id}
                      className="glass-card rounded-2xl p-4 border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{proposal.title}</h4>
                          <p className="text-sm text-white/60">{proposal.brand}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            proposal.status === "accepted"
                              ? "bg-green-500/20 text-green-200"
                              : proposal.status === "pending"
                              ? "bg-yellow-400/20 text-yellow-200"
                              : "bg-red-500/20 text-red-200"
                          }`}
                        >
                          {proposal.status}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 mb-3">{proposal.date}</p>
                      <a
                        href={proposal.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-baby-blue hover:text-baby-blue/80 transition-colors"
                      >
                        {proposal.link.startsWith("mailto:") ? (
                          <Mail className="w-4 h-4" />
                        ) : (
                          <MessageCircle className="w-4 h-4" />
                        )}
                        View Proposal
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}



