"use client";

import { useState } from "react";
import { Upload, Eye, EyeOff } from "lucide-react";
import { AgencyCustomization } from "@/data/types";
import { applyPaletteStyles } from "@/lib/palette";

interface CustomizationPanelProps {
  customization: AgencyCustomization;
  onUpdate: (customization: AgencyCustomization) => void;
}

export function CustomizationPanel({ customization, onUpdate }: CustomizationPanelProps) {
  const [localCustomization, setLocalCustomization] = useState(customization);
  const [previewMode, setPreviewMode] = useState(false);

  const handlePaletteChange = (palette: AgencyCustomization["palette"]) => {
    const updated = { ...localCustomization, palette };
    setLocalCustomization(updated);
    onUpdate(updated);
  };

  const handleFontChange = (font: AgencyCustomization["font"]) => {
    const updated = { ...localCustomization, font };
    setLocalCustomization(updated);
    onUpdate(updated);
  };

  const handleLogoPlacementChange = (placement: AgencyCustomization["logoPlacement"]) => {
    const updated = { ...localCustomization, logoPlacement: placement };
    setLocalCustomization(updated);
    onUpdate(updated);
  };

  const handleCustomColorChange = (colorKey: "primary" | "secondary" | "accent", value: string) => {
    const customColors = localCustomization.customColors || {
      primary: "#F8E8E8",
      secondary: "#FDF5F5",
      accent: "#F0D8D8",
    };
    const updated = {
      ...localCustomization,
      palette: "custom" as const,
      customColors: { ...customColors, [colorKey]: value },
    };
    setLocalCustomization(updated);
    onUpdate(updated);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Customize Theme</h2>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-white/15 bg-white/5 text-white hover:border-white/40 transition-colors"
        >
          {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {previewMode ? "Exit Preview" : "Preview"}
        </button>
      </div>

      {/* Color Palette */}
      <div className="glass-card border border-white/10 p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Color Palette</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {(["blush", "sage", "lavender"] as const).map((palette) => (
            <button
              key={palette}
              onClick={() => handlePaletteChange(palette)}
              className={`p-4 rounded-2xl border transition-all ${
                localCustomization.palette === palette
                  ? "border-white/70 bg-white/10 shadow-lg"
                  : "border-white/15 bg-white/5 hover:border-white/40"
              }`}
            >
              <div
                className="w-full h-16 rounded-lg mb-2"
                style={{
                  backgroundColor:
                    palette === "blush"
                      ? "#F8E8E8"
                      : palette === "sage"
                      ? "#E8F0E8"
                      : "#EDE8F5",
                }}
              />
              <p className="text-sm font-medium capitalize">{palette}</p>
            </button>
          ))}
          <button
            onClick={() => handlePaletteChange("custom")}
            className={`p-4 rounded-2xl border transition-all ${
              localCustomization.palette === "custom"
                ? "border-white/70 bg-white/10 shadow-lg"
                : "border-white/15 bg-white/5 hover:border-white/40"
            }`}
          >
            <div className="w-full h-16 rounded-lg mb-2 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200" />
            <p className="text-sm font-medium">Custom</p>
          </button>
        </div>

        {localCustomization.palette === "custom" && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <input
                type="color"
                value={localCustomization.customColors?.primary || "#F8E8E8"}
                onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                className="w-full h-12 rounded-2xl cursor-pointer border border-white/20 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Color</label>
              <input
                type="color"
                value={localCustomization.customColors?.secondary || "#FDF5F5"}
                onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                className="w-full h-12 rounded-2xl cursor-pointer border border-white/20 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Accent Color</label>
              <input
                type="color"
                value={localCustomization.customColors?.accent || "#F0D8D8"}
                onChange={(e) => handleCustomColorChange("accent", e.target.value)}
                className="w-full h-12 rounded-2xl cursor-pointer border border-white/20 bg-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Font Selection */}
      <div className="glass-card border border-white/10 p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Font Pairing</h3>
        <div className="grid grid-cols-3 gap-4">
          {(["inter", "outfit", "playfair"] as const).map((font) => (
            <button
              key={font}
              onClick={() => handleFontChange(font)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                localCustomization.font === font
                  ? "border-gray-900 shadow-medium"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p
                className={`text-lg mb-2 ${
                  font === "inter"
                    ? "font-sans"
                    : font === "outfit"
                    ? "font-outfit"
                    : "font-serif"
                }`}
              >
                Sample Text
              </p>
              <p className="text-xs text-white/60 capitalize">{font}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Logo Upload */}
      <div className="glass-card border border-white/10 p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Logo</h3>
        <div className="border-2 border-dashed border-white/25 rounded-2xl p-8 text-center bg-white/5">
          <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
          <p className="text-sm text-white/70 mb-2">Upload your agency logo</p>
          <button className="px-4 py-2 rounded-2xl border border-white/25 bg-white/5 text-white hover:border-white/50 transition-colors text-sm liquid-hover">
            Choose File
          </button>
        </div>
      </div>

      {/* Logo Placement */}
      <div className="glass-card border border-white/10 p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Logo Placement</h3>
        <div className="grid grid-cols-3 gap-4">
          {(["header", "footer", "both"] as const).map((placement) => (
            <button
              key={placement}
              onClick={() => handleLogoPlacementChange(placement)}
              className={`p-4 rounded-2xl border transition-all ${
                localCustomization.logoPlacement === placement
                  ? "border-white/70 bg-white/10 shadow-lg"
                  : "border-white/15 bg-white/5 hover:border-white/40"
              }`}
            >
              <p className="text-sm font-medium capitalize">{placement}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Section Visibility */}
      <div className="glass-card border border-white/10 p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Section Visibility</h3>
        <div className="space-y-3">
          {["Video Reel", "Portfolio", "Experience"].map((section) => (
            <label
              key={section}
              className="flex items-center justify-between p-3 rounded-2xl cursor-pointer bg-white/5 border border-white/10 hover:border-white/40 transition-colors"
            >
              <span className="font-medium">{section}</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded cursor-pointer accent-baby-blue" />
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            console.log("Saving customization:", localCustomization);
            alert("Customization saved! (Wireframe mode)");
          }}
          className="px-8 py-3 rounded-2xl font-semibold bg-gradient-to-r from-baby-pink via-baby-blue to-baby-pink text-white shadow-2xl liquid-hover"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

