"use client";

import { ExternalLink, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Experience } from "@/data/types";

interface ExperienceTimelineProps {
  experience: Experience[];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  if (experience.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Experience & Work History</h2>
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{exp.brand}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{exp.projectType}</p>
                
                {exp.industry && exp.industry.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {exp.industry.map((industry, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-baby-pink/20 dark:bg-baby-pink/30 text-baby-pink dark:text-baby-pink rounded-full text-xs font-medium"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  {exp.date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(exp.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>
                  )}
                  {exp.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {exp.link && (
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span className="text-sm font-medium">View Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

