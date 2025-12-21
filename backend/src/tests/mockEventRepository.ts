import * as fs from 'fs';
import * as path from 'path';
import { Event, CreateEventDto, UpdateEventDto } from '../types/content';

const DATA_FILE = path.join(__dirname, 'mockData', 'events.json');

// Helper to read events from JSON
const readEventsFromFile = (): Event[] => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading events file:', error);
    return [];
  }
};

// Helper to write events to JSON
const writeEventsToFile = (events: Event[]): void => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
};

// Generate a simple unique ID
const generateId = (): string => {
  return `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const mockEventRepository = {
  /**
   * Get all events from JSON file
   */
  getAll: async (): Promise<Event[]> => {
    const events = readEventsFromFile();
    // Sort by date ascending
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },

  /**
   * Get a single event by ID
   */
  getById: async (id: string): Promise<Event | null> => {
    const events = readEventsFromFile();
    return events.find((e) => e.id === id) || null;
  },

  /**
   * Create a new event
   */
  create: async (eventData: CreateEventDto): Promise<Event> => {
    const events = readEventsFromFile();
    const now = new Date().toISOString();

    const newEvent: Event = {
      id: generateId(),
      name: eventData.name,
      date: eventData.date,
      endDate: eventData.endDate,
      location: eventData.location,
      description: eventData.description,
      status: eventData.status || 'planned',
      attendees: eventData.attendees || [],
      createdAt: now,
      updatedAt: now,
    };

    events.push(newEvent);
    writeEventsToFile(events);

    return newEvent;
  },

  /**
   * Update an existing event
   */
  update: async (id: string, eventData: UpdateEventDto): Promise<Event> => {
    const events = readEventsFromFile();
    const index = events.findIndex((e) => e.id === id);

    if (index === -1) {
      throw new Error('Event not found');
    }

    const existingEvent = events[index];
    const updatedEvent: Event = {
      ...existingEvent,
      name: eventData.name !== undefined ? eventData.name : existingEvent.name,
      date: eventData.date !== undefined ? eventData.date : existingEvent.date,
      endDate: eventData.endDate !== undefined ? eventData.endDate : existingEvent.endDate,
      location: eventData.location !== undefined ? eventData.location : existingEvent.location,
      description: eventData.description !== undefined ? eventData.description : existingEvent.description,
      status: eventData.status !== undefined ? eventData.status : existingEvent.status,
      attendees: eventData.attendees !== undefined ? eventData.attendees : existingEvent.attendees,
      updatedAt: new Date().toISOString(),
    };

    events[index] = updatedEvent;
    writeEventsToFile(events);

    return updatedEvent;
  },

  /**
   * Delete an event
   */
  delete: async (id: string): Promise<void> => {
    const events = readEventsFromFile();
    const index = events.findIndex((e) => e.id === id);

    if (index === -1) {
      throw new Error('Event not found');
    }

    events.splice(index, 1);
    writeEventsToFile(events);
  },

  /**
   * Reset to original test data (for test cleanup)
   */
  resetTestData: (): void => {
    const originalData: Event[] = [
      {
        id: 'evt-001',
        name: 'AiT Welcome Week Kickoff',
        date: '2025-01-20',
        endDate: '2025-01-20',
        location: 'Student Union Building, Room 101',
        description: 'Join us for the Spring semester kickoff event! Meet fellow tech enthusiasts and learn about upcoming opportunities.',
        status: 'confirmed',
        attendees: ['John Doe', 'Jane Smith', 'Alex Johnson'],
        createdAt: '2025-01-01T10:00:00Z',
        updatedAt: '2025-01-10T15:30:00Z',
      },
      {
        id: 'evt-002',
        name: 'AI/ML Workshop Series - Part 1',
        date: '2025-02-05',
        endDate: '2025-02-05',
        location: 'Tech Lab 204',
        description: 'Introduction to Machine Learning concepts and hands-on Python exercises.',
        status: 'planned',
        attendees: ['Sarah Williams', 'Mike Chen'],
        createdAt: '2025-01-05T09:00:00Z',
        updatedAt: '2025-01-05T09:00:00Z',
      },
      {
        id: 'evt-003',
        name: 'Hackathon 2025',
        date: '2025-03-15',
        endDate: '2025-03-16',
        location: 'Innovation Center',
        description: '24-hour coding challenge with prizes and industry mentors.',
        status: 'planned',
        attendees: [],
        createdAt: '2025-01-08T14:00:00Z',
        updatedAt: '2025-01-08T14:00:00Z',
      },
      {
        id: 'evt-004',
        name: 'Career Fair Prep Session',
        date: '2025-02-20',
        location: 'Conference Room A',
        description: 'Resume reviews and mock interviews to prepare for the upcoming career fair.',
        status: 'confirmed',
        attendees: ['Emily Davis', 'Chris Brown', 'Taylor Martinez', 'Jordan Lee'],
        createdAt: '2025-01-10T11:00:00Z',
        updatedAt: '2025-01-12T16:45:00Z',
      },
      {
        id: 'evt-005',
        name: 'Cancelled: Outdoor Networking BBQ',
        date: '2025-01-25',
        location: 'Campus Quad',
        description: 'This event has been cancelled due to weather.',
        status: 'cancelled',
        attendees: [],
        createdAt: '2025-01-02T08:00:00Z',
        updatedAt: '2025-01-15T10:00:00Z',
      },
    ];
    writeEventsToFile(originalData);
  },
};
