import { notionClient } from './notion/notionClient';
import { Event, CreateEventDto, UpdateEventDto } from '../types/content';
import { NotionDatabaseId, NotionEventProperties } from '../types/notion';
import { logger } from '../utils/logger';

// This should be set via environment variable
const EVENTS_DATABASE_ID = process.env.NOTION_EVENTS_DATABASE_ID as NotionDatabaseId;

export const eventRepository = {
  /**
   * Get all events from Notion database
   */
  getAll: async (): Promise<Event[]> => {
    if (!notionClient) {
      throw new Error('Notion client is not initialized. Please set NOTION_TOKEN.');
    }

    if (!EVENTS_DATABASE_ID) {
      throw new Error('NOTION_EVENTS_DATABASE_ID is not set.');
    }

    try {
      const response = await notionClient.databases.query({
        database_id: EVENTS_DATABASE_ID,
        sorts: [
          {
            property: 'date',
            direction: 'ascending',
          },
        ],
      });

      return response.results.map((page: any) => {
        const props = page.properties as NotionEventProperties;
        return {
          id: page.id,
          name: props.name.title[0]?.plain_text || '',
          date: props.date.date?.start || '',
          endDate: props.date.date?.end,
          location: props.location?.rich_text[0]?.plain_text,
          description: props.description?.rich_text[0]?.plain_text,
          status: (props.status.select?.name || 'planned') as 'confirmed' | 'planned' | 'cancelled',
          attendees: props.attendees.multi_select?.map((item) => item.name) || [],
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
        name: props.name.title[0]?.plain_text || '',
        date: props.date.date?.start || '',
        endDate: props.date.date?.end,
        location: props.location?.rich_text[0]?.plain_text,
        description: props.description?.rich_text[0]?.plain_text,
        status: (props.status.select?.name || 'planned') as 'confirmed' | 'planned' | 'cancelled',
        attendees: props.attendees.multi_select?.map((item) => item.name) || [],
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

  /**
   * Create a new event in Notion
   */
  create: async (eventData: CreateEventDto): Promise<Event> => {
    if (!notionClient) {
      throw new Error('Notion client is not initialized. Please set NOTION_TOKEN.');
    }

    if (!EVENTS_DATABASE_ID) {
      throw new Error('NOTION_EVENTS_DATABASE_ID is not set.');
    }

    try {
      const properties: any = {
        name: {
          title: [
            {
              text: {
                content: eventData.name,
              },
            },
          ],
        },
        date: {
          date: {
            start: eventData.date,
            ...(eventData.endDate && { end: eventData.endDate }),
          },
        },
        status: {
          select: {
            name: eventData.status || 'planned',
          },
        },
        attendees: {
          multi_select: (eventData.attendees || []).map((attendee) => ({
            name: attendee,
          })),
        },
      };

      if (eventData.description) {
        properties.description = {
          rich_text: [
            {
              text: {
                content: eventData.description,
              },
            },
          ],
        };
      }

      if (eventData.location) {
        properties.location = {
          rich_text: [
            {
              text: {
                content: eventData.location,
              },
            },
          ],
        };
      }

      const page = await notionClient.pages.create({
        parent: {
          database_id: EVENTS_DATABASE_ID,
        },
        properties,
      });

      const props = (page as any).properties as NotionEventProperties;
      return {
        id: page.id,
        name: props.name.title[0]?.plain_text || '',
        date: props.date.date?.start || '',
        endDate: props.date.date?.end,
        location: props.location?.rich_text[0]?.plain_text,
        description: props.description?.rich_text[0]?.plain_text,
        status: (props.status.select?.name || 'planned') as 'confirmed' | 'planned' | 'cancelled',
        attendees: props.attendees.multi_select?.map((item) => item.name) || [],
        createdAt: (page as any).created_time,
        updatedAt: (page as any).last_edited_time,
      };
    } catch (error: any) {
      logger.error('Error creating event in Notion:', error);
      throw new Error(`Failed to create event: ${error.message}`);
    }
  },

  /**
   * Update an existing event in Notion
   */
  update: async (id: string, eventData: UpdateEventDto): Promise<Event> => {
    if (!notionClient) {
      throw new Error('Notion client is not initialized. Please set NOTION_TOKEN.');
    }

    try {
      const properties: any = {};

      if (eventData.name !== undefined) {
        properties.name = {
          title: [
            {
              text: {
                content: eventData.name,
              },
            },
          ],
        };
      }

      if (eventData.date !== undefined || eventData.endDate !== undefined) {
        const existingPage = await notionClient.pages.retrieve({ page_id: id });
        const existingProps = (existingPage as any).properties as NotionEventProperties;
        const existingStartDate = existingProps.date.date?.start || '';
        const existingEndDate = existingProps.date.date?.end;

        properties.date = {
          date: {
            start: eventData.date || existingStartDate,
            ...(eventData.endDate !== undefined
              ? eventData.endDate
                ? { end: eventData.endDate }
                : {}
              : existingEndDate
              ? { end: existingEndDate }
              : {}),
          },
        };
      }

      if (eventData.location !== undefined) {
        properties.location = eventData.location
          ? {
              rich_text: [
                {
                  text: {
                    content: eventData.location,
                  },
                },
              ],
            }
          : { rich_text: [] };
      }

      if (eventData.description !== undefined) {
        properties.description = eventData.description
          ? {
              rich_text: [
                {
                  text: {
                    content: eventData.description,
                  },
                },
              ],
            }
          : { rich_text: [] };
      }

      if (eventData.status !== undefined) {
        properties.status = {
          select: {
            name: eventData.status,
          },
        };
      }

      if (eventData.attendees !== undefined) {
        properties.attendees = {
          multi_select: eventData.attendees.map((attendee) => ({
            name: attendee,
          })),
        };
      }

      await notionClient.pages.update({
        page_id: id,
        properties,
      });

      // Fetch the updated page
      const updatedEvent = await eventRepository.getById(id);
      if (!updatedEvent) {
        throw new Error('Event not found after update');
      }
      return updatedEvent;
    } catch (error: any) {
      if (error.code === 'object_not_found') {
        throw new Error('Event not found');
      }
      logger.error('Error updating event in Notion:', error);
      throw new Error(`Failed to update event: ${error.message}`);
    }
  },

  /**
   * Delete an event from Notion
   */
  delete: async (id: string): Promise<void> => {
    if (!notionClient) {
      throw new Error('Notion client is not initialized. Please set NOTION_TOKEN.');
    }

    try {
      await notionClient.pages.update({
        page_id: id,
        archived: true,
      });
    } catch (error: any) {
      if (error.code === 'object_not_found') {
        throw new Error('Event not found');
      }
      logger.error('Error deleting event from Notion:', error);
      throw new Error(`Failed to delete event: ${error.message}`);
    }
  },
};

