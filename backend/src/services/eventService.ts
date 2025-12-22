import { eventRepository } from '../repositories/eventRepository';
import { Event } from '../types/content';

export const eventService = {
  /**
   * Get all events
   */
  getAllEvents: async (): Promise<Event[]> => {
    return await eventRepository.getAll();
  },

  /**
   * Get a single event by ID
   */
  getEventById: async (id: string): Promise<Event | null> => {
    return await eventRepository.getById(id);
  },
};

