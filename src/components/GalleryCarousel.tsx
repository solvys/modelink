"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryImage } from "@/data/types";

interface GalleryCarouselProps {
  images: GalleryImage[];
  lookbookMode: boolean;
  onClose?: () => void;
}

// Scroll sensitivity configuration
const SCROLL_THRESHOLD = 80; // Minimum scroll delta before changing image
const SCROLL_DEBOUNCE_MS = 200; // Minimum time between image changes

export function GalleryCarousel({ images, lookbookMode, onClose }: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Scroll accumulator for threshold-based navigation
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(0);
  const isScrolling = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!lookbookMode) return;
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!lookbookMode || !touchStart) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!lookbookMode || !touchStart) return;
    
    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;

    // Require more deliberate swipe (50px minimum)
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    }
    setTouchStart(null);
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!lookbookMode) return;
    e.preventDefault();
    e.stopPropagation();

    const now = Date.now();
    
    // Reset accumulator if enough time has passed since last scroll
    if (now - lastScrollTime.current > 300) {
      scrollAccumulator.current = 0;
    }
    
    // Accumulate scroll delta
    scrollAccumulator.current += e.deltaY;
    lastScrollTime.current = now;

    // Only change image when threshold is exceeded and debounce time has passed
    if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD && !isScrolling.current) {
      isScrolling.current = true;
      
      if (scrollAccumulator.current > 0) {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      } else {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }

      // Reset accumulator and set debounce
      scrollAccumulator.current = 0;
      
      setTimeout(() => {
        isScrolling.current = false;
      }, SCROLL_DEBOUNCE_MS);
    }
  }, [lookbookMode, images.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  if (images.length === 0) return null;

  return (
    <div
      ref={carouselRef}
      className={`relative w-full ${
        lookbookMode ? "fixed inset-0 z-50 bg-black overflow-hidden" : ""
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {lookbookMode && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Scrubwheel */}
      <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-2 px-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-white/80 scale-110"
                  : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image.url}
                alt={image.caption || `Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Carousel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className={`${
              lookbookMode
                ? "h-screen flex items-center justify-center"
                : "aspect-[3/4] rounded-2xl overflow-hidden max-w-sm mx-auto bg-white/[0.03] border border-white/10"
            }`}
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].caption || `Image ${currentIndex + 1}`}
              className={`w-full ${lookbookMode ? "h-full object-contain" : "h-full object-cover"}`}
            />
            {(images[currentIndex].caption || images[currentIndex].credit) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {images[currentIndex].caption && (
                  <p className="text-white font-medium">{images[currentIndex].caption}</p>
                )}
                {images[currentIndex].credit && (
                  <p className="text-white/80 text-sm mt-1">{images[currentIndex].credit}</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {!lookbookMode && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Image Counter */}
      <div className="text-center mt-4 text-white/70">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Scroll hint for lookbook mode */}
      {lookbookMode && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm flex items-center gap-2">
          <span>Scroll to navigate</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓
          </motion.div>
        </div>
      )}
    </div>
  );
}
