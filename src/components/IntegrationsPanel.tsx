"use client";

import { ExternalLink, PlugZap } from "lucide-react";
import { Integration } from "@/data/types";

interface IntegrationsPanelProps {
  integrations: Integration[];
}

const statusStyles: Record<Integration["status"], string> = {
  connected: "bg-emerald-500/15 text-emerald-200",
  pending: "bg-amber-500/15 text-amber-200",
  disconnected: "bg-rose-500/15 text-rose-200",
};

export function IntegrationsPanel({ integrations }: IntegrationsPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white/70 text-sm uppercase tracking-[0.3em]">
        <PlugZap className="w-4 h-4" />
        Integrations
      </div>
      <div className="space-y-3">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  {integration.platform}
                </p>
                {integration.handle && (
                  <p className="text-xs text-white/60">{integration.handle}</p>
                )}
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[integration.status]}`}
              >
                {integration.status === "connected"
                  ? "Connected"
                  : integration.status === "pending"
                  ? "Pending"
                  : "Disconnected"}
              </span>
            </div>
            {integration.dashboardUrl && (
              <a
                href={integration.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-xs text-baby-blue hover:text-baby-blue/80 transition-colors"
              >
                View Creator Analytics
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

