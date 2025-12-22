// TODO: Expand this with specific interfaces for Events, Officers, Pillars, etc.
export interface BaseEntity {
  id: string;
}

export interface Officer extends BaseEntity {
  name: string;
  position: string;
  status?: string;
  studentId?: number;
  imageUrl?: string;
  major?: string;
  linkedinUrl?: string;
}

export type EventStatus = 'confirmed' | 'planned' | 'cancelled';

export interface Event extends BaseEntity {
  name: string;
  date: string; // startDate
  endDate?: string;
  location?: string;
  description?: string;
  status: EventStatus;
  published: boolean;
  rsvpLink?: string;
  createdAt?: string;
  updatedAt?: string;
}
