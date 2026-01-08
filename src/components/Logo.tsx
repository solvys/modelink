"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = false }: LogoProps) {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: "h-6",
    md: "h-10",
    lg: "h-14",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src="/images/modelink-logo.png"
        alt="ModelLink"
        className={cn(
          sizeClasses[size],
          "w-auto object-contain",
        )}
        style={{
          // Dark theme: invert to make black lines white
          // Light theme: keep original dark lines
          filter: theme === "dark" ? "invert(1)" : "none",
        }}
      />
      {showText && (
        <span 
          className={cn(
            "font-serif italic font-bold tracking-wide",
            size === "sm" && "text-base",
            size === "md" && "text-xl",
            size === "lg" && "text-2xl",
          )}
          style={{ color: "var(--text-primary)" }}
        >
          ModelLink
        </span>
      )}
    </div>
  );
}

// Mobile header logo - shows at top center on all mobile pages
export function MobileHeaderLogo() {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pb-2 pointer-events-none">
      <Logo size="md" />
    </div>
  );
}
