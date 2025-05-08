"use client"

import { useState } from "react"
import { useArticles } from "@/hooks/use-api"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function ArticlesPage() {
  const { data: articles = [] } = useArticles()
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = [
    { id: "all", label: "All Articles" },
    { id: "success", label: "Success Stories" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "motivation", label: "Motivation" },
    { id: "business", label: "Business" },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream-50">
      <div className="relative pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-charcoal-600 hover:text-gold-600 hover:bg-gold-50/50 pl-2">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-charcoal-800">
              Articles & <span className="text-gold-600">Insights</span>
            </h1>
            <p className="text-lg text-charcoal-600 max-w-2xl">
              Dive into Soli's thoughts and experiences through these carefully crafted articles,
              offering wisdom and perspective from a journey of transformation.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-[-4rem]">
        <Tabs defaultValue="all" className="w-full">
          <div className="mb-8 sticky top-28 z-20 bg-cream-50/80 backdrop-blur-md py-3 rounded-lg shadow-sm">
            <div className="relative max-w-md mx-auto md:mx-0 mb-4 md:mb-0">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400" />
              <Input 
                type="search"
                placeholder="Search articles..." 
                className="pl-10 border-gold-200 focus-visible:ring-gold-400 rounded-full w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <TabsList className="bg-white border border-gold-100 h-auto p-1 overflow-x-auto max-w-full flex flex-nowrap justify-start mt-4 md:mt-0">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-gold-50 data-[state=active]:text-gold-600 whitespace-nowrap data-[state=active]:shadow-sm"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        
          {/* Articles grid content within Tabs */}
          <TabsContent value="all" className="mt-0">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gold-100 min-h-[200px] flex items-center justify-center">
                <p className="text-charcoal-600">No articles found matching your search.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={index}
                    className="group h-full"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-elegant border border-gold-100 transition-all duration-300 hover:shadow-gold hover:-translate-y-2">
                      <div className="px-6 pt-6 pb-3 border-b border-gold-100/30">
                        <div className="flex justify-between items-center">
                          <div className="text-charcoal-500 text-sm font-medium flex items-center gap-2">
                            <Calendar size={14} className="text-gold-500" />
                            {formatDate(article.date)}
                          </div>
                          <Badge variant="outline" className="border-gold-200 text-gold-600 py-0.5 px-2.5 rounded-full text-xs">
                            {article.category || "Article"} {/* Assuming article might have a category property */}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 p-6 flex flex-col">
                        <div className="relative mb-4">
                          <div className="w-10 h-0.5 bg-gold-400 absolute -top-2 left-0"></div>
                          <h3 className="text-xl font-serif font-bold text-charcoal-800 group-hover:text-gold-600 transition-colors">
                            {article.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 mb-4 text-xs text-charcoal-500">
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-gold-500" />
                            <span>{article.readTime || "5 min read"}</span> {/* Assuming article might have a readTime property */}
                          </div>
                        </div>
                        <p className="text-charcoal-600 mb-6 line-clamp-3 flex-1">
                          {article.description}
                        </p>
                        <div className="mt-auto pt-4">
                          <Link
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button 
                              variant="outline" 
                              className="w-full border-gold-200 text-gold-600 hover:text-gold-700 hover:bg-gold-50"
                            >
                              Read Article
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          {categories.slice(1).map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gold-100 min-h-[200px] flex items-center justify-center">
                <p className="text-charcoal-600">Coming soon: {category.label} articles.</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
} 