"use client";

import { motion, type Transition } from "framer-motion";
import { type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Wheel/Slideshow transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    rotateY: -15,
    scale: 0.95,
    x: 100,
  },
  in: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    rotateY: 15,
    scale: 0.95,
    x: -100,
  },
};

const pageTransition: Transition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.4,
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </motion.div>
  );
}
