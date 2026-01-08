"use client";

import { Check } from "lucide-react";
import { Model } from "@/data/types";
import { cn } from "@/lib/utils";

interface ProfileHeroProps {
  model: Model;
  agencyName?: string;
}

export function ProfileHero({ model, agencyName }: ProfileHeroProps) {
  const stats = model.stats;

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Profile Photo */}
        <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden glass-card elevation-3">
          <img
            src={model.profilePhoto}
            alt={model.name}
            className="w-full h-full object-cover"
          />
          {model.availability && (
            <div className="absolute top-4 right-4">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm",
                  model.availability === "available"
                    ? "bg-green-500/80 text-white"
                    : model.availability === "limited"
                    ? "bg-yellow-500/80 text-white"
                    : "bg-gray-500/80 text-white"
                )}
              >
                {model.availability === "available"
                  ? "Available"
                  : model.availability === "limited"
                  ? "Limited"
                  : "Unavailable"}
              </span>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-6 text-white">
          {/* Name and Agency */}
          <div>
            <h1 className="text-5xl font-serif font-bold mb-2">
              {model.name}
            </h1>
            {agencyName && (
              <div className="flex items-center gap-2 text-white/70">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium">{agencyName}</span>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.height && (
              <div className="glass-card rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Height</p>
                <p className="text-lg font-semibold text-white">{stats.height}</p>
              </div>
            )}
            {stats.bust && (
              <div className="glass-card rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Bust</p>
                <p className="text-lg font-semibold text-white">{stats.bust}</p>
              </div>
            )}
            {stats.waist && (
              <div className="glass-card rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Waist</p>
                <p className="text-lg font-semibold text-white">{stats.waist}</p>
              </div>
            )}
            {stats.hips && (
              <div className="glass-card rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Hips</p>
                <p className="text-lg font-semibold text-white">{stats.hips}</p>
              </div>
            )}
            {stats.shoeSize && (
              <div className="glass-card rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Shoe Size</p>
                <p className="text-lg font-semibold text-white">{stats.shoeSize}</p>
              </div>
            )}
            {stats.hairColor && (
              <div className="glass-card rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Hair</p>
                <p className="text-lg font-semibold text-white">{stats.hairColor}</p>
              </div>
            )}
            {stats.eyeColor && (
              <div className="glass-card rounded-2xl p-4 border border-white/10">
                <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Eyes</p>
                <p className="text-lg font-semibold text-white">{stats.eyeColor}</p>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button className="w-full rounded-[1.75rem] bg-white text-gray-900 py-4 px-6 font-semibold shadow-[0_6px_0_rgba(0,0,0,0.18)] transition-transform active:translate-y-[2px]">
            Book Now / Inquire
          </button>
        </div>
      </div>
    </div>
  );
}

