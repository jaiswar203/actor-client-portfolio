"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Trash2, Plus, Loader2, ExternalLink, Edit } from "lucide-react"
import { Article } from "@/lib/models"

interface ArticlesManagerProps {
  initialArticles: Article[]
}

export function ArticlesManager({ initialArticles }: ArticlesManagerProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add')
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState({
    source: "",
    title: "",
    description: "",
    link: "",
    date: ""
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const resetForm = () => {
    setFormData({
      source: "",
      title: "",
      description: "",
      link: "",
      date: ""
    })
    setFormMode('add')
    setCurrentArticle(null)
  }

  const handleOpenDialog = (mode: 'add' | 'edit', article?: Article) => {
    setFormMode(mode)
    
    if (mode === 'edit' && article) {
      setCurrentArticle(article)
      setFormData({
        source: article.source,
        title: article.title,
        description: article.description,
        link: article.link,
        date: article.date
      })
    } else {
      resetForm()
    }
    
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.source || !formData.title || !formData.description || !formData.link || !formData.date) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      })
      return
    }
    
    setIsLoading(true)
    
    try {
      if (formMode === 'add') {
        // Add new article
        const response = await fetch('/api/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        
        const data = await response.json()
        
        if (response.ok) {
          setArticles([data, ...articles])
          resetForm()
          setIsDialogOpen(false)
          toast({
            title: "Success",
            description: "Article added successfully",
          })
        } else {
          throw new Error(data.error || "Failed to add article")
        }
      } else if (formMode === 'edit' && currentArticle?._id) {
        // Update existing article
        const response = await fetch(`/api/articles/${currentArticle._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        
        if (response.ok) {
          // Update the article in the local state
          setArticles(articles.map(article => 
            article._id === currentArticle._id ? { ...article, ...formData } : article
          ))
          resetForm()
          setIsDialogOpen(false)
          toast({
            title: "Success",
            description: "Article updated successfully",
          })
        } else {
          const data = await response.json()
          throw new Error(data.error || "Failed to update article")
        }
      }
      
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleDeleteArticle = async (id: string) => {
    setIsDeleting(id)
    
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setArticles(articles.filter(article => article._id !== id))
        toast({
          title: "Success",
          description: "Article deleted successfully",
        })
        router.refresh()
      } else {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete article")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setIsDeleting(null)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Articles</h2>
        <Button onClick={() => handleOpenDialog('add')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Article
        </Button>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) resetForm()
      }}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{formMode === 'add' ? 'Add New Article' : 'Edit Article'}</DialogTitle>
            <DialogDescription>
              {formMode === 'add' ? 'Add a new article to your portfolio' : 'Edit the selected article'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="source">Source</Label>
                  <Input
                    id="source"
                    placeholder="e.g. Forbes India"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    placeholder="e.g. Apr 15, 2025"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Article title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the article"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="link">Link URL</Label>
                <Input
                  id="link"
                  placeholder="https://example.com/article"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {formMode === 'add' ? 'Adding...' : 'Updating...'}
                  </>
                ) : formMode === 'add' ? 'Add Article' : 'Update Article'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article._id}>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleOpenDialog('edit', article)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeleteArticle(article._id as string)}
                    disabled={isDeleting === article._id}
                  >
                    {isDeleting === article._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{article.description}</p>
            </CardContent>
            <CardFooter>
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm flex items-center text-blue-500 hover:text-blue-600"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View Article
              </a>
            </CardFooter>
          </Card>
        ))}
        
        {articles.length === 0 && (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No articles yet</p>
          </div>
        )}
      </div>
    </div>
  )
} 