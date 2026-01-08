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
      className="bg-transparent border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.05] transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white/50" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-white/60">{job.company}</p>
          </div>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        >
          {saved ? (
            <BookmarkCheck className="w-5 h-5 text-violet-400" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>

      <p className="text-sm text-white/70 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.tags?.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium bg-white/5 text-white/60 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {job.location}
          {job.isRemote && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 rounded">
              Remote
            </span>
          )}
        </div>
        {job.compensation && (
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            {job.compensation}
          </div>
        )}
        {job.applicants && (
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {job.applicants} applicants
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Clock className="w-3.5 h-3.5" />
          Posted {daysAgo(job.postedAt)}
          {job.deadline && (
            <>
              <span className="text-white/20">·</span>
              <span className="text-amber-400">
                Deadline {formatDate(job.deadline)}
              </span>
            </>
          )}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-900 text-sm font-medium hover:bg-white/90 transition-colors">
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

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white">Agency Match</h1>
          <p className="text-white/60 mt-2">
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
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-transparent border border-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:border-white/15 transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
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

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">
              {filteredJobs.length} opportunities found
            </p>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">
              <Filter className="w-4 h-4" /> Filters
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {filteredJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/50">
                No jobs found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

