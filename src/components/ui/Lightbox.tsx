"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { extractVideoId } from "@/lib/utils";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    type: "image" | "video";
    url: string;
    thumbnail?: string;
    caption?: string;
    credit?: string;
  }>;
  initialIndex?: number;
}

export function Lightbox({ isOpen, onClose, items, initialIndex = 0 }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const currentItem = items[currentIndex];
  if (!currentItem) return null;

  const renderContent = () => {
    if (currentItem.type === "image") {
      return (
        <img
          src={currentItem.url}
          alt={currentItem.caption || ""}
          className="max-w-full max-h-[90vh] object-contain"
        />
      );
    }

    // Video handling
    const videoInfo = extractVideoId(currentItem.url);
    if (videoInfo.type === "youtube" && videoInfo.id) {
      return (
        <iframe
          width="800"
          height="450"
          src={`https://www.youtube.com/embed/${videoInfo.id}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full max-w-4xl aspect-video"
        />
      );
    }
    if (videoInfo.type === "vimeo" && videoInfo.id) {
      return (
        <iframe
          width="800"
          height="450"
          src={`https://player.vimeo.com/video/${videoInfo.id}?autoplay=1`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full max-w-4xl aspect-video"
        />
      );
    }
    return (
      <video
        src={currentItem.url}
        controls
        autoPlay
        className="max-w-full max-h-[90vh]"
      />
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-7xl w-full"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>

            {/* Navigation buttons */}
            {items.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Content */}
            <div className="flex flex-col items-center">
              {renderContent()}
              {(currentItem.caption || currentItem.credit) && (
                <div className="mt-4 text-white text-center">
                  {currentItem.caption && <p className="font-medium">{currentItem.caption}</p>}
                  {currentItem.credit && <p className="text-sm text-gray-300 mt-1">{currentItem.credit}</p>}
                </div>
              )}
              {items.length > 1 && (
                <p className="text-white/70 text-sm mt-2">
                  {currentIndex + 1} / {items.length}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

