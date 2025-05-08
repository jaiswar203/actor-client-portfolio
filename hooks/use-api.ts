"use client"

import { useQuery } from "@tanstack/react-query"
import { GalleryImage, Article } from "@/lib/models"

// Fetch gallery images
export function useGalleryImages() {
  return useQuery<GalleryImage[]>({
    queryKey: ["galleryImages"],
    queryFn: async () => {
      const response = await fetch("/api/gallery")
      if (!response.ok) {
        throw new Error("Failed to fetch gallery images")
      }
      return response.json()
    },
  })
}

// Fetch articles
export function useArticles() {
  return useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await fetch("/api/articles")
      if (!response.ok) {
        throw new Error("Failed to fetch articles")
      }
      return response.json()
    },
  })
} 