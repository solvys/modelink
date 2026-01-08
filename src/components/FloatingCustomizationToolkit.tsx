"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PaintbrushIcon,
  Droplets,
  X,
  Upload,
  Eye,
  EyeOff,
  Check,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const palettes = [
  { id: "blush", name: "Blush", color: "#F8E8E8", isGradient: false },
  { id: "sage", name: "Sage", color: "#E8F0E8", isGradient: false },
  { id: "lavender", name: "Lavender", color: "#EDE8F5", isGradient: false },
  { id: "custom", name: "Custom", color: "", isGradient: true },
];

const fonts = [
  { id: "inter", name: "Inter", className: "font-sans" },
  { id: "outfit", name: "Outfit", className: "font-outfit" },
  { id: "playfair", name: "Playfair", className: "font-serif" },
] as const;

const placements = ["header", "footer", "both"] as const;

const sections = ["Video Reel", "Portfolio", "Experience"] as const;

export function FloatingCustomizationToolkit() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  // Local customization state
  const [selectedPalette, setSelectedPalette] = useState<string>("blush");
  const [selectedFont, setSelectedFont] = useState<string>("inter");
  const [logoPlacement, setLogoPlacement] = useState<string>("header");
  const [customColors, setCustomColors] = useState({
    primary: "#F8E8E8",
    secondary: "#FDF5F5",
    accent: "#F0D8D8",
  });
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
    "Video Reel": true,
    "Portfolio": true,
    "Experience": true,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSave = () => {
    console.log("Saving customization:", {
      palette: selectedPalette,
      font: selectedFont,
      logoPlacement,
      customColors,
      sectionVisibility,
    });
    setIsOpen(false);
  };

  if (!isMounted) return null;

  return createPortal(
    <>
      {/* Floating Button - Paintbrush + Droplet */}
      <button
        onClick={toggleOpen}
        aria-label="Open customization toolkit"
        className={cn(
          "lg:hidden fixed bottom-6 left-6 p-4 rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all z-[60]",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 hover:scale-105 active:scale-95"
        )}
        style={{
          borderColor: "var(--border-muted)",
          backgroundColor: "var(--bg-elevated)",
          color: "var(--text-primary)",
          boxShadow: "0 8px 32px rgba(107, 46, 143, 0.25)",
        }}
      >
        <div className="relative">
          <PaintbrushIcon className="w-5 h-5" />
          <Droplets className="w-3 h-3 absolute -bottom-1 -right-1" style={{ color: "var(--accent-primary)" }} />
        </div>
      </button>

      {/* Toolkit Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-[55]"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}
              onClick={toggleOpen}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl backdrop-blur-2xl overflow-hidden z-[58] shadow-2xl"
              style={{
                borderWidth: "1px 1px 0 1px",
                borderColor: "var(--border-muted)",
                backgroundColor: "var(--bg-elevated)",
              }}
            >
              {/* Header */}
              <div 
                className="sticky top-0 flex items-center justify-between p-4 border-b z-10"
                style={{ 
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-xl"
                    style={{ backgroundColor: "rgba(107, 46, 143, 0.15)" }}
                  >
                    <PaintbrushIcon className="w-5 h-5" style={{ color: "var(--accent-primary)" }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                      Customization
                    </h2>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Personalize your experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleOpen}
                  className="p-2 rounded-xl transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-4 space-y-6">
                
                {/* Theme Toggle */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                    Theme
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => theme === "dark" && toggleTheme()}
                      className={cn(
                        "flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all",
                        theme === "light" && "ring-2 ring-offset-2"
                      )}
                      style={{
                        borderColor: theme === "light" ? "var(--accent-primary)" : "var(--border-subtle)",
                        backgroundColor: theme === "light" ? "rgba(245, 158, 11, 0.15)" : "transparent",
                        color: "var(--text-primary)",
                      }}
                    >
                      <Sun className="w-5 h-5" />
                      <span className="font-medium">Light</span>
                    </button>
                    <button
                      onClick={() => theme === "light" && toggleTheme()}
                      className={cn(
                        "flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all",
                        theme === "dark" && "ring-2 ring-offset-2"
                      )}
                      style={{
                        borderColor: theme === "dark" ? "var(--accent-primary)" : "var(--border-subtle)",
                        backgroundColor: theme === "dark" ? "rgba(99, 102, 241, 0.15)" : "transparent",
                        color: "var(--text-primary)",
                      }}
                    >
                      <Moon className="w-5 h-5" />
                      <span className="font-medium">Dark</span>
                    </button>
                  </div>
                </div>

                {/* Color Palette */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                    Color Palette
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {palettes.map((palette) => (
                      <button
                        key={palette.id}
                        onClick={() => setSelectedPalette(palette.id)}
                        className={cn(
                          "p-3 rounded-xl border transition-all relative",
                          selectedPalette === palette.id && "ring-2 ring-offset-1"
                        )}
                        style={{
                          borderColor: selectedPalette === palette.id ? "var(--accent-primary)" : "var(--border-subtle)",
                          backgroundColor: "transparent",
                        }}
                      >
                        <div
                          className="w-full h-10 rounded-lg mb-2"
                          style={{
                            background: palette.isGradient 
                              ? "linear-gradient(135deg, #F8E8E8, #EDE8F5, #E8F0E8)"
                              : palette.color,
                          }}
                        />
                        <p className="text-[10px] font-medium truncate" style={{ color: "var(--text-secondary)" }}>
                          {palette.name}
                        </p>
                        {selectedPalette === palette.id && (
                          <div 
                            className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "var(--accent-primary)" }}
                          >
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Custom Colors */}
                  {selectedPalette === "custom" && (
                    <div className="grid grid-cols-3 gap-3 pt-3">
                      {(["primary", "secondary", "accent"] as const).map((colorKey) => (
                        <div key={colorKey} className="space-y-1">
                          <label className="text-[10px] font-medium capitalize" style={{ color: "var(--text-muted)" }}>
                            {colorKey}
                          </label>
                          <input
                            type="color"
                            value={customColors[colorKey]}
                            onChange={(e) => setCustomColors(prev => ({ ...prev, [colorKey]: e.target.value }))}
                            className="w-full h-10 rounded-xl cursor-pointer border"
                            style={{ borderColor: "var(--border-subtle)", backgroundColor: "transparent" }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Font Selection */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                    Font
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {fonts.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => setSelectedFont(font.id)}
                        className={cn(
                          "p-3 rounded-xl border transition-all",
                          selectedFont === font.id && "ring-2 ring-offset-1"
                        )}
                        style={{
                          borderColor: selectedFont === font.id ? "var(--accent-primary)" : "var(--border-subtle)",
                          backgroundColor: "transparent",
                        }}
                      >
                        <p className={cn("text-base mb-1", font.className)} style={{ color: "var(--text-primary)" }}>
                          Aa
                        </p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {font.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logo Upload */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                    Logo
                  </h3>
                  <div 
                    className="border-2 border-dashed rounded-2xl p-6 text-center"
                    style={{ borderColor: "var(--border-muted)", backgroundColor: "rgba(107, 46, 143, 0.05)" }}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--text-muted)" }} />
                    <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Upload your logo</p>
                    <button 
                      className="px-4 py-2 rounded-xl text-sm font-medium border transition-colors"
                      style={{ 
                        borderColor: "var(--border-muted)", 
                        color: "var(--text-primary)",
                        backgroundColor: "transparent",
                      }}
                    >
                      Choose File
                    </button>
                  </div>
                </div>

                {/* Logo Placement */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                    Logo Placement
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {placements.map((placement) => (
                      <button
                        key={placement}
                        onClick={() => setLogoPlacement(placement)}
                        className={cn(
                          "p-3 rounded-xl border transition-all capitalize",
                          logoPlacement === placement && "ring-2 ring-offset-1"
                        )}
                        style={{
                          borderColor: logoPlacement === placement ? "var(--accent-primary)" : "var(--border-subtle)",
                          backgroundColor: "transparent",
                          color: "var(--text-primary)",
                        }}
                      >
                        {placement}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section Visibility */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                    Section Visibility
                  </h3>
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <label
                        key={section}
                        className="flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-colors"
                        style={{ 
                          borderColor: "var(--border-subtle)",
                          backgroundColor: "transparent",
                        }}
                      >
                        <span className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{section}</span>
                        <input 
                          type="checkbox" 
                          checked={sectionVisibility[section]}
                          onChange={(e) => setSectionVisibility(prev => ({ ...prev, [section]: e.target.checked }))}
                          className="w-5 h-5 rounded cursor-pointer accent-violet-500" 
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="w-full py-4 rounded-2xl font-semibold text-white transition-colors"
                  style={{ 
                    background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                  }}
                >
                  Save Changes
                </button>

                {/* Bottom Padding for Safe Area */}
                <div className="h-6" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
