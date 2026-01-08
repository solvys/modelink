"use client";

import { useState } from "react";
import { MapPin, MessageCircle, UserPlus, UserMinus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Connection, ProfileType } from "@/data/types";

interface ConnectionCardProps {
  connection: Connection;
  showConnect?: boolean;
}

const typeColors: Record<ProfileType, string> = {
  model: "text-violet-400 bg-violet-500/10",
  agency: "text-blue-400 bg-blue-500/10",
  brand: "text-amber-400 bg-amber-500/10",
};

export function ConnectionCard({ connection, showConnect }: ConnectionCardProps) {
  const [isConnected, setIsConnected] = useState(connection.isConnected);
  const [scriptPreview, setScriptPreview] = useState<string | null>(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);

  const handleGenerateScript = () => {
    if (isGeneratingScript) return;
    setIsGeneratingScript(true);
    setTimeout(() => {
      setScriptPreview(
        `Linda suggests referencing ${connection.name}'s latest booking and re-framing it as a ` +
          "quick POV: hook, hero shot, CTA. Finish with a soft reminder to DM for the deck."
      );
      setIsGeneratingScript(false);
    }, 800);
  };

  return (
    <div className="bg-transparent border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-colors">
      <div className="flex items-start gap-4">
        <img
          src={connection.avatar}
          alt={connection.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-white truncate">{connection.name}</p>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium uppercase",
                typeColors[connection.type]
              )}
            >
              {connection.type}
            </span>
          </div>
          {connection.title && (
            <p className="text-sm text-white/60 truncate">{connection.title}</p>
          )}
          {connection.location && (
            <div className="flex items-center gap-1.5 mt-1 text-xs text-white/40">
              <MapPin className="w-3.5 h-3.5" />
              {connection.location}
            </div>
          )}
        </div>
      </div>

      {connection.specialties && connection.specialties.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {connection.specialties.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="px-2 py-1 text-xs bg-white/5 text-white/60 rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
        <p className="text-xs text-white/40">
          {connection.mutualConnections} mutual connections
        </p>
        <div className="flex gap-2">
          {showConnect ? (
            <button
              onClick={() => setIsConnected(!isConnected)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                isConnected
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-white text-gray-900 hover:bg-white/90"
              )}
            >
              {isConnected ? (
                <>
                  <UserMinus className="w-4 h-4" /> Connected
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Connect
                </>
              )}
            </button>
          ) : (
            <>
              <button className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleGenerateScript}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-white text-gray-900 hover:bg-white/90 transition-colors disabled:opacity-50"
                disabled={isGeneratingScript}
              >
                <Sparkles className="w-4 h-4" />
                {isGeneratingScript ? "Generating..." : "Script"}
              </button>
            </>
          )}
        </div>
      </div>
      {scriptPreview && (
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
          {scriptPreview}
        </div>
      )}
    </div>
  );
}

