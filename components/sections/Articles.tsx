"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Article } from "@/lib/models"

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

type ArticlesProps = {
  articles: Article[]
}

export default function Articles({ articles }: ArticlesProps) {
  return (
    <section id="articles" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cream-50 to-transparent"></div>
      <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-gold-50 opacity-70 blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 rounded-full bg-gold-50 opacity-50 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block px-4 py-1.5 bg-gold-50 rounded-full border border-gold-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gold-600 text-sm font-medium">Latest Insights</span>
          </motion.div>
          
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Thought-Provoking <span className="text-gold-600">Articles</span>
          </motion.h2>
          
          <motion.p
            className="text-charcoal-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore Soli's perspectives, insights, and wisdom gained through his extraordinary journey.
          </motion.p>
        </div>

        {/* Featured article (first item only) */}
        {articles.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href={articles[0].link}
              target="_blank" 
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl shadow-elegant border border-gold-100 overflow-hidden p-8 md:p-10">
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-3">
                    <Badge variant="outline" className="mb-6 border-gold-200 text-gold-700 bg-gold-50/50 py-1.5 px-4 rounded-full">
                      Featured Article
                    </Badge>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-charcoal-800 mb-4 group-hover:text-gold-600 transition-colors duration-300">
                      {articles[0].title}
                    </h3>
                    <p className="text-charcoal-600 mb-6">
                      {articles[0].description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-charcoal-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gold-500" />
                        <span>{formatDate(articles[0].date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gold-500" />
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                      <ArrowRight size={24} className="text-gold-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article, index) => (
            <motion.div
              key={index}
              className="group h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-elegant border border-gold-100 transition-all duration-300 hover:shadow-gold hover:-translate-y-2">
                {/* Elegant header with date */}
                <div className="px-6 pt-6 pb-3 border-b border-gold-100/30">
                  <div className="flex justify-between items-center">
                    <div className="text-charcoal-500 text-sm font-medium flex items-center gap-2">
                      <Calendar size={14} className="text-gold-500" />
                      {formatDate(article.date)}
                    </div>
                    <Badge variant="outline" className="border-gold-200 text-gold-600 py-0.5 px-2.5 rounded-full text-xs">
                      Article
                    </Badge>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Title with decorative element */}
                  <div className="relative mb-4">
                    <div className="w-10 h-0.5 bg-gold-400 absolute -top-2 left-0"></div>
                    <h3 className="text-xl font-serif font-bold text-charcoal-800 group-hover:text-gold-600 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-charcoal-600 mb-6 line-clamp-3 flex-1">
                    {article.description}
                  </p>
                  
                  {/* Read more link */}
                  <div className="mt-auto pt-4 border-t border-gold-100/30">
                    <Link
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full text-gold-600 font-medium hover:text-gold-700 transition-colors"
                    >
                      <span>Read Article</span>
                      <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View all button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/articles">
            <Button variant="outline" className="border-gold-300 text-gold-600 hover:text-gold-700 hover:bg-gold-50 rounded-full px-8">
              <span>Browse All Articles</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 