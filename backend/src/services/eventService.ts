import { eventRepository } from '../repositories/eventRepository';
import { Event, CreateEventDto, UpdateEventDto } from '../types/content';

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

  /**
   * Create a new event
   */
  createEvent: async (eventData: CreateEventDto): Promise<Event> => {
    // Validate required fields
    if (!eventData.name || !eventData.name.trim()) {
      throw new Error('Event name is required');
    }

    if (!eventData.date) {
      throw new Error('Event date is required');
    }

    // Validate date format (basic validation)
    const startDate = new Date(eventData.date);
    if (isNaN(startDate.getTime())) {
      throw new Error('Invalid date format');
    }

    if (eventData.endDate) {
      const endDate = new Date(eventData.endDate);
      if (isNaN(endDate.getTime())) {
        throw new Error('Invalid end date format');
      }
      if (endDate < startDate) {
        throw new Error('End date must be after start date');
      }
    }

    // Validate status if provided
    if (eventData.status && !['confirmed', 'planned', 'cancelled'].includes(eventData.status)) {
      throw new Error('Status must be one of: confirmed, planned, cancelled');
    }

    // Validate attendees is an array if provided
    if (eventData.attendees !== undefined && !Array.isArray(eventData.attendees)) {
      throw new Error('Attendees must be an array');
    }

    return await eventRepository.create(eventData);
  },

  /**
   * Update an existing event
   */
  updateEvent: async (id: string, eventData: UpdateEventDto): Promise<Event> => {
    // Check if event exists
    const existingEvent = await eventRepository.getById(id);
    if (!existingEvent) {
      throw new Error('Event not found');
    }

    // Validate dates if provided
    if (eventData.date) {
      const startDate = new Date(eventData.date);
      if (isNaN(startDate.getTime())) {
        throw new Error('Invalid date format');
      }
    }

    if (eventData.endDate) {
      const endDate = new Date(eventData.endDate);
      if (isNaN(endDate.getTime())) {
        throw new Error('Invalid end date format');
      }

      const startDate = eventData.date
        ? new Date(eventData.date)
        : new Date(existingEvent.date);
      if (endDate < startDate) {
        throw new Error('End date must be after start date');
      }
    }

    // Validate status if provided
    if (eventData.status && !['confirmed', 'planned', 'cancelled'].includes(eventData.status)) {
      throw new Error('Status must be one of: confirmed, planned, cancelled');
    }

    // Validate attendees is an array if provided
    if (eventData.attendees !== undefined && !Array.isArray(eventData.attendees)) {
      throw new Error('Attendees must be an array');
    }

    return await eventRepository.update(id, eventData);
  },

  /**
   * Delete an event
   */
  deleteEvent: async (id: string): Promise<void> => {
    // Check if event exists
    const existingEvent = await eventRepository.getById(id);
    if (!existingEvent) {
      throw new Error('Event not found');
    }

    await eventRepository.delete(id);
  },
};

