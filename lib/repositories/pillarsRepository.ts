import type { Pillar } from "@/types/content";

/**
 * Pillars Repository
 * TODO: Implement Notion database queries for pillars
 */

export async function getPillars(): Promise<Pillar[]> {
  // TODO: Fetch pillars from Notion
  return [];
}

export async function getPillarById(id: string): Promise<Pillar | null> {
  // TODO: Fetch single pillar from Notion
  return null;
}

