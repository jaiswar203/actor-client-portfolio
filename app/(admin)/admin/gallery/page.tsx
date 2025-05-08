import { Metadata } from "next"
import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { GalleryManager } from "@/components/admin/gallery-manager"
import { requireAuth } from "@/lib/auth"
import { getGalleryImages } from "@/lib/db"

export const metadata: Metadata = {
  title: "Gallery Management",
  description: "Manage gallery images for Soli Merwan Cama Portfolio",
}

export default async function GalleryPage() {
  // Check authentication
  requireAuth()
  
  // Fetch gallery data
  const galleryImages = await getGalleryImages()
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Add, update, or remove images from your portfolio gallery
        </p>
      </div>
      
      <div className="mt-8">
        <GalleryManager initialImages={galleryImages} />
      </div>
    </DashboardLayout>
  )
} 