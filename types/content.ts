/**
 * Content Types
 * Placeholder interfaces for Notion-sourced content
 */

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
}

export interface Officer {
  id: string;
  name: string;
  role: string;
  email: string;
  linkedin?: string;
  imageUrl?: string;
}

export interface Pillar {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  caption?: string;
  eventId?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  discordLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
}

