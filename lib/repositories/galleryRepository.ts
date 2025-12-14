import type { GalleryItem } from "@/types/content";

/**
 * Gallery Repository
 * TODO: Implement Notion database queries for gallery items
 */

export async function getGalleryItems(): Promise<GalleryItem[]> {
  // TODO: Fetch gallery items from Notion
  return [];
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  // TODO: Fetch single gallery item from Notion
  return null;
}

