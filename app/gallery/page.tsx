"use client"

import { useState, useEffect } from "react"
import { useGalleryImages } from "@/hooks/use-api"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, X, Expand, Download } from "lucide-react"

export default function GalleryPage() {
  const { data: images = [] } = useGalleryImages()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Example categories for filtering (in a real app, these might come from the backend)
  const categories = [
    { id: "all", label: "All Photos" },
    { id: "events", label: "Events" },
    { id: "portraits", label: "Portraits" },
    { id: "travel", label: "Travel" },
    { id: "behind-scenes", label: "Behind the Scenes" },
  ]

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  // Preload images for smoother modal experience
  useEffect(() => {
    images.forEach(image => {
      const img = new window.Image();
      img.src = image.src;
    });
  }, [images]);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream-50">
      {/* Header with background decoration */}
      <div className="relative pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Back button */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-charcoal-600 hover:text-gold-600 hover:bg-gold-50/50 pl-2">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          {/* Page header */}
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-charcoal-800">
              Image <span className="text-gold-600">Gallery</span>
            </h1>
            <p className="text-lg text-charcoal-600 max-w-2xl">
              A visual journey through significant moments and memories that have shaped Soli's path and career.
            </p>
          </div>
        </div>
      </div>
      
      {/* Gallery grid */}
      <div className="container mx-auto px-4 mt-[-4rem]">
        
          
            <motion.div 
              layout 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
            >
              {images.map((image, index) => (
                <motion.div
                  layout
                  key={image.src + index} 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20}}
                  transition={{ duration: 0.35, delay: index * 0.05, ease: "easeInOut" }}
                  // Removed complex col-span/row-span classes for a normal grid
                  className="col-span-1 row-span-1" 
                >
                  <div 
                    className="relative group cursor-pointer overflow-hidden rounded-xl bg-white p-1.5 shadow-elegant border border-gold-100/70 h-full transition-all duration-300 hover:border-gold-300 hover:shadow-gold aspect-square"
                    onClick={() => handleImageClick(index)}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 20vw"
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        priority={index < 8} // Prioritize loading for first few images
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
                        <div className="self-end mb-auto opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <Button 
                            variant="ghost"
                            size="icon"
                            className="bg-white/25 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-8 h-8 md:w-9 md:h-9"
                            aria-label="View full image"
                          >
                            <Expand size={16} />
                          </Button>
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-xs md:text-sm leading-tight drop-shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">{image.alt}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          
      </div>
      
      {/* Dialog for Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-[75vw] p-0 border-gold-200 bg-charcoal-900/95 backdrop-blur-lg">
          <div className="relative h-[85vh] w-full">
            {/* Close button */}
            <div className="absolute top-4 right-4 z-50 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/10 hover:bg-white/20 text-white rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/10 hover:bg-white/20 text-white rounded-full"
                asChild
              >
                <a href={images[selectedImageIndex]?.src} download target="_blank" rel="noopener noreferrer">
                  <Download size={18} />
                </a>
              </Button>
            </div>
            
            {/* Carousel for modal */}
            <Carousel
              opts={{
                align: "center",
                loop: true,
                startIndex: selectedImageIndex,
              }}
              className="h-full"
            >
              <CarouselContent className="h-full">
                {images.map((image, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="flex items-center justify-center h-full p-8">
                      <div className="relative max-h-full w-auto max-w-full aspect-auto">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={1200}
                          height={800}
                          style={{ objectFit: "contain", height: "auto", maxHeight: "75vh" }}
                          className="rounded-md shadow-elegant"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <CarouselPrevious className="left-4 h-10 w-10 border-0 bg-white/10 hover:bg-white/20 text-white rounded-full" />
              <CarouselNext className="right-4 h-10 w-10 border-0 bg-white/10 hover:bg-white/20 text-white rounded-full" />
            </Carousel>
            
            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 text-white">
              <h3 className="text-xl font-medium">{images[selectedImageIndex]?.alt}</h3>
              <p className="text-white/70 text-sm mt-1">Captured: 2023</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 