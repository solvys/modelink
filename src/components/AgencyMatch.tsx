"use client";

import { Building2, MapPin, Sparkles } from "lucide-react";
import { AgencyProfile } from "@/data/types";

interface AgencyMatchProps {
  agencies: AgencyProfile[];
}

export function AgencyMatch({ agencies }: AgencyMatchProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white/70 text-sm uppercase tracking-[0.3em]">
        <Building2 className="w-4 h-4" />
        Agency Match
      </div>
      <div className="space-y-3">
        {agencies.map((agency) => (
          <div
            key={agency.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div>
                <p className="text-sm font-semibold text-white">{agency.name}</p>
                <p className="text-xs text-white/60 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {agency.location}
                </p>
              </div>
              <span className="text-xs rounded-full bg-white/10 px-2 py-1 text-white/70">
                {agency.openBriefs} briefs
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {agency.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="text-[10px] uppercase tracking-widest text-white/60 bg-white/5 border border-white/10 rounded-full px-2 py-1"
                >
                  {specialty}
                </span>
              ))}
            </div>
            <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold text-white py-2 hover:bg-white/20 transition-colors">
              <Sparkles className="w-4 h-4 text-baby-blue" />
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

