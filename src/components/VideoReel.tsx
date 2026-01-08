"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Video } from "@/data/types";
import { Lightbox } from "./ui/Lightbox";
import { getVideoThumbnail, extractVideoId } from "@/lib/utils";

interface VideoReelProps {
  videos: Video[];
}

export function VideoReel({ videos }: VideoReelProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const handleVideoClick = (index: number) => {
    setSelectedVideoIndex(index);
    setLightboxOpen(true);
  };

  const lightboxItems = videos.map((video) => ({
    type: "video" as const,
    url: video.url,
    thumbnail: video.thumbnail || getVideoThumbnail(video.url),
    caption: video.title,
    credit: video.brand ? `${video.brand}${video.date ? ` • ${video.date}` : ""}` : undefined,
  }));

  if (videos.length === 0) {
    return null;
  }

  return (
    <>
      <div className="w-full">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {videos.map((video, index) => {
            const thumbnail = video.thumbnail || getVideoThumbnail(video.url);
            return (
              <motion.div
                key={video.id}
                className="flex-shrink-0 w-80 snap-start cursor-pointer group"
                onClick={() => handleVideoClick(index)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden glass-card border border-white/10">
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <Play className="w-16 h-16 text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="bg-white/80 rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-gray-900 fill-gray-900" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-semibold text-sm">{video.title}</p>
                    {video.brand && (
                      <p className="text-white/80 text-xs mt-1">{video.brand}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={lightboxItems}
        initialIndex={selectedVideoIndex}
      />
    </>
  );
}

