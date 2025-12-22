// TODO: Add Notion-specific types for database queries, page properties, etc.
export type NotionPageId = string;
export type NotionDatabaseId = string;

export interface NotionEventProperties {
  Name: { title: Array<{ plain_text: string }> };
  Date: { date: { start: string; end?: string } | null };
  Location?: { rich_text: Array<{ plain_text: string }> };
  Description?: { rich_text: Array<{ plain_text: string }> };
  Status: { select: { name: string } | null };
  Published?: { checkbox: boolean };
  'RSVP (Link)'?: { url: string | null };
}

