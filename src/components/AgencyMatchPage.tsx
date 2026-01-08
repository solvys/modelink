"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Briefcase,
  Filter,
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockJobPostings } from "@/data/mockJobPostings";
import type { JobCategory, JobPosting } from "@/data/types";

const categories: { id: JobCategory | "all"; label: string }[] = [
  { id: "all", label: "All Jobs" },
  { id: "editorial", label: "Editorial" },
  { id: "commercial", label: "Commercial" },
  { id: "runway", label: "Runway" },
  { id: "beauty", label: "Beauty" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "influencer", label: "Influencer" },
];

function JobCard({ job }: { job: JobPosting }) {
  const [saved, setSaved] = useState(false);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const daysAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-transparent border border-white/[0.06] rounded-2xl p-4 sm:p-6 hover:bg-white/[0.05] transition-all group w-full min-w-0"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors text-sm sm:text-base truncate">
              {job.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 truncate">{job.company}</p>
          </div>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
        >
          {saved ? (
            <BookmarkCheck className="w-5 h-5 text-violet-400" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-white/70 mb-4 line-clamp-2">{job.description}</p>

      {/* Tags - Horizontal scroll on mobile */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {job.tags?.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium bg-white/5 text-white/60 rounded-full whitespace-nowrap flex-shrink-0"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Job Details - Stack on mobile */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/50 mb-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">{job.location}</span>
          {job.isRemote && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 rounded flex-shrink-0">
              Remote
            </span>
          )}
        </div>
        {job.compensation && (
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            {job.compensation}
          </div>
        )}
        {job.applicants && (
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            {job.applicants} applicants
          </div>
        )}
      </div>

      {/* Footer - Stack on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/40">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
          <span>Posted {daysAgo(job.postedAt)}</span>
          {job.deadline && (
            <>
              <span className="text-white/20 hidden sm:inline">·</span>
              <span className="text-amber-400 sm:inline">
                Deadline {formatDate(job.deadline)}
              </span>
            </>
          )}
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-gray-900 text-sm font-medium hover:bg-white/90 transition-colors w-full sm:w-auto">
          Apply Now <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

export function AgencyMatchPage() {
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = mockJobPostings.filter((job) => {
    const matchesCategory =
      selectedCategory === "all" || job.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-full pt-28 pb-12">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[764px] lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Agency Match</h1>
          <p className="text-white/60 mt-2 text-sm sm:text-base">
            Find casting calls, campaigns, and opportunities
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, companies, keywords..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-transparent border border-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:border-white/15 transition-colors text-sm sm:text-base"
            />
          </div>

          {/* Categories - Horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0",
                  selectedCategory === cat.id
                    ? "bg-white text-gray-900"
                    : "bg-transparent text-white/70 hover:bg-white/[0.06]"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs sm:text-sm text-white/50">
            {filteredJobs.length} opportunities found
          </p>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <Filter className="w-4 h-4" /> Filters
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {filteredJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="min-w-0"
            >
              <JobCard job={job} />
            </motion.div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <p className="text-white/50 text-sm sm:text-base">
                No jobs found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
