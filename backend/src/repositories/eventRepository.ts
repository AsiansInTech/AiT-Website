import { notionClient } from './notion/notionClient';
import { Event } from '../types/content';
import { NotionDatabaseId, NotionEventProperties } from '../types/notion';
import { logger } from '../utils/logger';

// This should be set via environment variable
const EVENTS_DATABASE_ID = process.env.NOTION_EVENTS_DB_ID as NotionDatabaseId;

export const eventRepository = {
  /**
   * Get all events from Notion database
   */
  getAll: async (): Promise<Event[]> => {
    if (!notionClient) {
      throw new Error('Notion client is not initialized. Please set NOTION_TOKEN.');
    }

    if (!EVENTS_DATABASE_ID) {
      throw new Error('NOTION_EVENTS_DB_ID is not set.');
    }

    try {
      const response = await notionClient.databases.query({
        database_id: EVENTS_DATABASE_ID,
        sorts: [
          {
            property: 'Date',
            direction: 'ascending',
          },
        ],
      });

      return response.results.map((page: any) => {
        const props = page.properties as NotionEventProperties;
        return {
          id: page.id,
          name: props.Name?.title[0]?.plain_text || '',
          date: props.Date?.date?.start || '',
          endDate: props.Date?.date?.end,
          location: props.Location?.rich_text[0]?.plain_text,
          description: props.Description?.rich_text[0]?.plain_text,
          status: (props.Status?.select?.name?.toLowerCase() || 'planned') as 'confirmed' | 'planned' | 'cancelled',
          published: props.Published?.checkbox || false,
          rsvpLink: props['RSVP (Link)']?.url || undefined,
          createdAt: page.created_time,
          updatedAt: page.last_edited_time,
        };
      });
    } catch (error: any) {
      logger.error('Error fetching events from Notion:', error);
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  },

  /**
   * Get a single event by ID
   */
  getById: async (id: string): Promise<Event | null> => {
    if (!notionClient) {
      throw new Error('Notion client is not initialized. Please set NOTION_TOKEN.');
    }

    try {
      const page = await notionClient.pages.retrieve({ page_id: id });
      const props = (page as any).properties as NotionEventProperties;

      return {
        id: page.id,
        name: props.Name?.title[0]?.plain_text || '',
        date: props.Date?.date?.start || '',
        endDate: props.Date?.date?.end,
        location: props.Location?.rich_text[0]?.plain_text,
        description: props.Description?.rich_text[0]?.plain_text,
        status: (props.Status?.select?.name?.toLowerCase() || 'planned') as 'confirmed' | 'planned' | 'cancelled',
        published: props.Published?.checkbox || false,
        rsvpLink: props['RSVP (Link)']?.url || undefined,
        createdAt: (page as any).created_time,
        updatedAt: (page as any).last_edited_time,
      };
    } catch (error: any) {
      if (error.code === 'object_not_found') {
        return null;
      }
      logger.error('Error fetching event from Notion:', error);
      throw new Error(`Failed to fetch event: ${error.message}`);
    }
  },
};

