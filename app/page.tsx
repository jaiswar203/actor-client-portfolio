"use client"

import { useState, useEffect } from "react"
import { useGalleryImages, useArticles } from "@/hooks/use-api"

// Import section components
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Gallery from "@/components/sections/Gallery"
import Articles from "@/components/sections/Articles"
import Company from "@/components/sections/Company"
import Contact from "@/components/sections/Contact"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  
  // Fetch data using React Query
  const { data: galleryImages = [] } = useGalleryImages()
  const { data: articles = [] } = useArticles()

  const sectionIds = ["home", "about", "articles", "company", "contact"]

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section) {
          observer.unobserve(section)
        }
      })
    }
  }, [])

  return (
    <div className="min-h-screen overflow-hidden bg-cream-50 text-charcoal-800">
      <Hero />
      <About />
      <Gallery images={galleryImages} />
      <Articles articles={articles} />
      <Company />
      <Contact />
    </div>
  )
}
