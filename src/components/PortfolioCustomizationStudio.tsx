"use client";

import { useState } from "react";
import { Droplet, Type } from "lucide-react";

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
}

interface PortfolioCustomizationStudioProps {
  availableFonts: string[];
  initialFont?: string;
  initialColors: ColorPalette;
}

export function PortfolioCustomizationStudio({
  availableFonts,
  initialFont,
  initialColors,
}: PortfolioCustomizationStudioProps) {
  const [selectedFont, setSelectedFont] = useState(initialFont ?? availableFonts[0]);
  const [colors, setColors] = useState<ColorPalette>(initialColors);

  const handleColorChange = (key: keyof ColorPalette, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white/70 text-sm uppercase tracking-[0.3em]">
        <Type className="w-4 h-4" />
        Portfolio Center
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50 block mb-2">
            Font Family
          </label>
          <select
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-white/60"
          >
            {availableFonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-white/50 mb-2 flex items-center gap-2">
            <Droplet className="w-4 h-4" />
            Theme Colors
          </p>
          <div className="grid grid-cols-3 gap-3">
            {(["primary", "secondary", "accent"] as Array<keyof ColorPalette>).map((key) => (
              <div key={key} className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-white/50">
                  {key}
                </span>
                <label className="relative flex items-center gap-2 rounded-xl border border-white/10 bg-black/10 px-2 py-2 text-sm text-white">
                  <span
                    className="h-5 w-5 rounded-full border border-white/40"
                    style={{ backgroundColor: colors[key] }}
                  />
                  <input
                    type="color"
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label={`${key} color`}
                  />
                  <span className="text-xs tracking-wide">{colors[key]}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-2">Live Preview</p>
          <p
            className="text-lg font-semibold"
            style={{
              fontFamily: selectedFont,
              color: colors.primary,
            }}
          >
            Elevated portrait storytelling
          </p>
          <p className="text-sm mt-2" style={{ color: colors.secondary }}>
            Showcase looks, campaigns, and reels in a cohesive brand language.
          </p>
          <div className="mt-3 h-1 rounded-full" style={{ backgroundColor: colors.accent }} />
        </div>
      </div>
    </div>
  );
}

