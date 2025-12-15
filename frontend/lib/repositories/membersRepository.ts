import type { Member } from "@/types/content";

/**
 * Members Repository
 * TODO: Implement Notion database queries for members
 */

export async function getMembers(): Promise<Member[]> {
  // TODO: Fetch members from Notion
  return [];
}

export async function getMemberById(id: string): Promise<Member | null> {
  // TODO: Fetch single member from Notion
  return null;
}

