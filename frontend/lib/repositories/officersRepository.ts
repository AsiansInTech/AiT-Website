import type { Officer } from "@/types/content";

/**
 * Officers Repository
 * TODO: Implement Notion database queries for officers
 */

export async function getOfficers(): Promise<Officer[]> {
  // TODO: Fetch officers from Notion
  return [];
}

export async function getOfficerById(id: string): Promise<Officer | null> {
  // TODO: Fetch single officer from Notion
  return null;
}

