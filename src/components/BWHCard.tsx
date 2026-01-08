"use client";

import { cn } from "@/lib/utils";

interface BWHCardProps {
  bust?: string;
  waist?: string;
  hips?: string;
  height?: string;
  className?: string;
}

export function BWHCard({ bust, waist, hips, height, className }: BWHCardProps) {
  const measurements = [
    { label: "B", value: bust },
    { label: "W", value: waist },
    { label: "H", value: hips },
  ].filter((m) => m.value);

  if (measurements.length === 0 && !height) return null;

  return (
    <div
      className={cn(
        "bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5",
        className
      )}
    >
      {/* BWH Section */}
      {measurements.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
            Measurements
          </p>
          <div className="flex items-center justify-center gap-4">
            {measurements.map((m, i) => (
              <div key={m.label} className="text-center">
                <p className="text-2xl font-bold text-white">{m.value}</p>
                <p className="text-xs text-white/50">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Height */}
      {height && (
        <div className="pt-4 border-t border-white/[0.06]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Height</p>
            <p className="text-lg font-semibold text-white">{height}</p>
          </div>
        </div>
      )}
    </div>
  );
}

