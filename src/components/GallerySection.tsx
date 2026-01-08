"use client";

import { useState } from "react";
import { Gallery, Video } from "@/data/types";
import { Tabs } from "./ui/Tabs";
import { GalleryCarousel } from "./GalleryCarousel";
import { VideoReel } from "./VideoReel";
import {
  Sparkles,
  Shirt,
  Sun,
  Briefcase,
  Clapperboard,
  Camera,
  Film,
  Image,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GallerySectionProps {
  galleries: Gallery[];
  videos?: Video[];
  lookbookMode?: boolean;
}

const genreIcons: Record<string, ReactNode> = {
  formal: <Sparkles className="w-4 h-4" />,
  streetwear: <Shirt className="w-4 h-4" />,
  summer: <Sun className="w-4 h-4" />,
  commercial: <Briefcase className="w-4 h-4" />,
  editorial: <Clapperboard className="w-4 h-4" />,
  custom: <Camera className="w-4 h-4" />,
};

type MediaFilter = "all" | "photos" | "videos";

const VIDEO_TAB_ID = "video-reel";

export function GallerySection({ galleries, videos = [], lookbookMode = false }: GallerySectionProps) {
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>("all");
  
  const hasVideos = videos.length > 0;
  if (!galleries.length && !hasVideos) {
    return null;
  }

  const galleryTabs = galleries.map((gallery) => ({
    id: gallery.id,
    label: gallery.label,
    icon: genreIcons[gallery.genre] || <Camera className="w-4 h-4" />,
  }));

  // Build tabs based on filter
  let tabs = galleryTabs;
  if (mediaFilter === "all" && hasVideos) {
    tabs = [{ id: VIDEO_TAB_ID, label: "Video Reel", icon: <Clapperboard className="w-4 h-4" /> }, ...galleryTabs];
  } else if (mediaFilter === "videos" && hasVideos) {
    tabs = [{ id: VIDEO_TAB_ID, label: "Video Reel", icon: <Clapperboard className="w-4 h-4" /> }];
  } else if (mediaFilter === "photos") {
    tabs = galleryTabs;
  }

  const filterButtons: { id: MediaFilter; label: string; icon: ReactNode }[] = [
    { id: "all", label: "All", icon: <LayoutGrid className="w-4 h-4" /> },
    { id: "photos", label: "Photos", icon: <Image className="w-4 h-4" /> },
    { id: "videos", label: "Videos", icon: <Film className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Selected Work</p>
          <h2 className="text-3xl font-bold text-white mt-2">Portfolio</h2>
          <p className="text-white/60 text-sm mt-3 max-w-xl">
            Browse curated galleries and motion work from recent campaigns and bookings.
          </p>
        </div>
        
        {/* Media Filter Toggle */}
        {hasVideos && (
          <div className="flex gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
            {filterButtons.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setMediaFilter(filter.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  mediaFilter === filter.id
                    ? "bg-white text-gray-900"
                    : "text-white/60 hover:text-white"
                )}
              >
                {filter.icon}
                <span className="hidden sm:inline">{filter.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Show message if filter shows no content */}
      {mediaFilter === "videos" && !hasVideos && (
        <div className="py-16 text-center text-white/60 border border-dashed border-white/15 rounded-[2rem]">
          No videos available yet.
        </div>
      )}

      {/* Gallery Tabs - Single line with smaller pills */}
      {tabs.length > 0 && (
        <Tabs
          tabs={tabs}
          tabsWrapperClassName="justify-start flex-nowrap overflow-x-auto bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1.5 scrollbar-hide"
          tabClassName="px-3 py-1.5 text-sm whitespace-nowrap"
        >
          {(activeTab) => {
            if (activeTab === VIDEO_TAB_ID) {
              if (!hasVideos) {
                return (
                  <div className="py-16 text-center text-white/60 border border-dashed border-white/15 rounded-[2rem]">
                    Video reel coming soon.
                  </div>
                );
              }

              return (
                <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6">
                  <VideoReel videos={videos} />
                </div>
              );
            }

            const activeGallery = galleries.find((g) => g.id === activeTab);
            if (!activeGallery) {
              return null;
            }

            return (
              <div className="w-full">
                <GalleryCarousel
                  images={activeGallery.images}
                  lookbookMode={lookbookMode}
                  onClose={() => {}}
                />
              </div>
            );
          }}
        </Tabs>
      )}
    </div>
  );
}
