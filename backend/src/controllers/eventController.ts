import { Request, Response, NextFunction } from 'express';
import { eventService } from '../services/eventService';
import { ok, serverError, created, noContent, notFound, badRequest } from '../utils/httpResponses';
import { CreateEventDto, UpdateEventDto } from '../types/content';

export const eventController = {
  /**
   * GET /api/events
   * Get all events
   */
  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const events = await eventService.getAllEvents();
      ok(res, events);
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/events/:id
   * Get a single event by ID
   */
  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const event = await eventService.getEventById(id);

      if (!event) {
        notFound(res, 'Event not found');
        return;
      }

      ok(res, event);
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/events
   * Create a new event
   */
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eventData: CreateEventDto = req.body;

      // Basic validation
      if (!eventData.name || !eventData.date) {
        badRequest(res, 'Name and date are required');
        return;
      }

      const event = await eventService.createEvent(eventData);
      created(res, event);
    } catch (error: any) {
      if (error.message.includes('required') || error.message.includes('Invalid')) {
        badRequest(res, error.message);
        return;
      }
      next(error);
    }
  },

  /**
   * PUT /api/events/:id
   * Update an existing event
   */
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const eventData: UpdateEventDto = req.body;

      const event = await eventService.updateEvent(id, eventData);
      ok(res, event);
    } catch (error: any) {
      if (error.message === 'Event not found') {
        notFound(res, error.message);
        return;
      }
      if (error.message.includes('Invalid') || error.message.includes('must be')) {
        badRequest(res, error.message);
        return;
      }
      next(error);
    }
  },

  /**
   * DELETE /api/events/:id
   * Delete an event
   */
  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await eventService.deleteEvent(id);
      noContent(res);
    } catch (error: any) {
      if (error.message === 'Event not found') {
        notFound(res, error.message);
        return;
      }
      next(error);
    }
  },
};

