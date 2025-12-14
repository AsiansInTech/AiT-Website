import type { Event } from "@/types/content";

/**
 * Events Repository
 * TODO: Implement Notion database queries for events
 */

export async function getEvents(): Promise<Event[]> {
  // TODO: Fetch events from Notion
  return [];
}

export async function getEventById(id: string): Promise<Event | null> {
  // TODO: Fetch single event from Notion
  return null;
}

