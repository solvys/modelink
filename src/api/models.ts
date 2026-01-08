import { mockModels } from "@/data/mockModels";
import type { Model } from "@/data/types";

export function getAllModels(): Model[] {
  return mockModels;
}

export function getModelBySlug(slug: string): Model | null {
  return mockModels.find((entry) => entry.slug === slug) ?? null;
}

