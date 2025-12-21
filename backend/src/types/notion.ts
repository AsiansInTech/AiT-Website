// TODO: Add Notion-specific types for database queries, page properties, etc.
export type NotionPageId = string;
export type NotionDatabaseId = string;

export interface NotionEventProperties {
  name: { title: Array<{ plain_text: string }> };
  date: { date: { start: string; end?: string } };
  location?: { rich_text: Array<{ plain_text: string }> };
  description?: { rich_text: Array<{ plain_text: string }> };
  status: { select: { name: string } | null };
  attendees: { multi_select: Array<{ name: string }> };
}

