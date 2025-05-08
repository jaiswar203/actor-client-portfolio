import { Metadata } from "next"
import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { requireAuth } from "@/lib/auth"
import { getGalleryImages, getArticles } from "@/lib/db"
import { Image, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard for Soli Merwan Cama Portfolio",
}

export default async function DashboardPage() {
  // Check authentication
  requireAuth()
  
  // Fetch counts from the database
  const gallery = await getGalleryImages()
  const articles = await getArticles()
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your portfolio content from here
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gallery Images
            </CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gallery.length}</div>
            <p className="text-xs text-muted-foreground">
              Images in your gallery
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Articles
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
            <p className="text-xs text-muted-foreground">
              Articles in your portfolio
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Tabs defaultValue="gallery">
          <TabsList>
            <TabsTrigger value="gallery">Recent Gallery Uploads</TabsTrigger>
            <TabsTrigger value="articles">Recent Articles</TabsTrigger>
          </TabsList>
          <TabsContent value="gallery" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {gallery.slice(0, 6).map((image) => (
                <Card key={image._id}>
                  <CardContent className="p-0 aspect-square relative">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="articles" className="space-y-4">
            <div className="grid gap-4 mt-4">
              {articles.slice(0, 5).map((article) => (
                <Card key={article._id}>
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>{article.source} - {article.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">{article.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
} 