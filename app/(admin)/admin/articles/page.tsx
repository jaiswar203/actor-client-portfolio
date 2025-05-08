import { Metadata } from "next"
import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { ArticlesManager } from "@/components/admin/articles-manager"
import { requireAuth } from "@/lib/auth"
import { getArticles } from "@/lib/db"

export const metadata: Metadata = {
  title: "Articles Management",
  description: "Manage articles for Soli Merwan Cama Portfolio",
}

export default async function ArticlesPage() {
  // Check authentication
  requireAuth()
  
  // Fetch articles data
  const articles = await getArticles()
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Articles Management</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Add, update, or remove articles from your portfolio
        </p>
      </div>
      
      <div className="mt-8">
        <ArticlesManager initialArticles={articles} />
      </div>
    </DashboardLayout>
  )
} 