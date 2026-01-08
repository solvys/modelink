import { mockAgencies } from "@/data/mockAgencies";
import { mockModels } from "@/data/mockModels";
import type { Agency, Model } from "@/data/types";

export interface AgencyWithModels extends Agency {
  modelEntries: Model[];
}

function buildAgencyPayload(agency: Agency): AgencyWithModels {
  const modelEntries = mockModels.filter((model) => agency.models.includes(model.id));
  return { ...agency, modelEntries };
}

export function getAgencies(): AgencyWithModels[] {
  return mockAgencies.map((agency) => buildAgencyPayload(agency));
}

export function getAgencyBySlug(slug: string): AgencyWithModels | null {
  const agency = mockAgencies.find((entry) => entry.slug === slug);
  return agency ? buildAgencyPayload(agency) : null;
}

export function getAgencyById(id: string): AgencyWithModels | null {
  const agency = mockAgencies.find((entry) => entry.id === id);
  return agency ? buildAgencyPayload(agency) : null;
}

