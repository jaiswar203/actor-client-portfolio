"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand, X, Maximize } from "lucide-react"
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import SwiperCore from 'swiper';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'
import Link from "next/link"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay';

// Install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);

// Types
import type { GalleryImage } from '@/lib/models'

type GalleryProps = {
  images: GalleryImage[]
}

const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
      <Button 
        onClick={() => swiper.slidePrev()} 
        variant="outline"
        size="icon"
        className="bg-white/80 backdrop-blur-sm hover:bg-gold-50 border-gold-200 text-gold-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
      >
        <ChevronLeft size={20} />
      </Button>
      <Button 
        onClick={() => swiper.slideNext()} 
        variant="outline"
        size="icon"
        className="bg-white/80 backdrop-blur-sm hover:bg-gold-50 border-gold-200 text-gold-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
};

export default function Gallery({ images }: GalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null) // For modal

  const handleImageClickInSwiper = (src: string) => {
    setSelectedImageSrc(src);
    setIsModalOpen(true);
  }

  return (
    <section id="gallery" className="py-24 bg-cream-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-gold-100 to-gold-50 rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-gold-100 to-gold-50 rounded-full opacity-20 blur-3xl animate-pulse-slow animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span
            className="block mb-3 text-gold-600 font-medium"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            Visual Journey
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold mb-6 text-charcoal-800"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            Image <span className="text-gold-600">Gallery</span> Showcase
          </motion.h2>
          <motion.p
            className="text-charcoal-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore visual highlights from Soli's journey and career through this curated collection of moments.
          </motion.p>
        </div>

        {/* Unique Swiper Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
          className="relative group"
        >
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 50,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + ' bg-gold-400 w-3 h-3 rounded-full mx-1 opacity-50 hover:opacity-100 transition-opacity duration-300"></span>';
              }
            }}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="pb-20 pt-8"
            breakpoints={{
              320: {
                slidesPerView: 1.2,
              },
              640: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 2.8,
              },
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="!w-[calc(80%-10px)] sm:!w-[calc(60%-20px)] md:!w-[calc(45%-30px)] lg:!w-[calc(35%-40px)] group/slide">
                <motion.div
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-500 ease-out transform hover:scale-105 active:scale-95 bg-white border-2 border-gold-100/50"
                  whileHover={{ boxShadow: "0px 15px 30px rgba(212,175,55,0.2)" }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover/slide:scale-110"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-transparent opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5"
                    onClick={() => handleImageClickInSwiper(image.src)}
                  >
                    <h3 className="text-white font-semibold text-lg leading-tight mb-1 drop-shadow-md">{image.alt}</h3>
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-8 h-8 p-0 min-w-0"
                      aria-label="View image in modal"
                    >
                      <Maximize size={14} />
                    </Button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
            <SwiperNavButtons />
          </Swiper>
        </motion.div>

        {/* View all button */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/gallery">
            <Button 
              variant="outline" 
              className="border-gold-300 text-gold-600 hover:text-gold-700 hover:bg-gold-50 rounded-full px-8 py-3 text-base group shadow-sm hover:shadow-md transition-all duration-300"
            >
              Explore Full Gallery
              <ChevronRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Dialog for Image Modal (using ShadCN Dialog) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] p-0 border-gold-200 bg-charcoal-900/95 backdrop-blur-lg shadow-2xl rounded-xl">
          <div className="relative h-[80vh] w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10"
              onClick={() => setIsModalOpen(false)} aria-label="Close modal"
            >
              <X size={20} />
            </Button>
            {selectedImageSrc && (
              <motion.div
                className="flex items-center justify-center h-full p-4 md:p-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 }}}
                exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 }}}
              >
                <Image
                  src={selectedImageSrc}
                  alt="Gallery Image Preview"
                  width={1200}
                  height={800}
                  style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
                  className="rounded-lg shadow-elegant"
                />
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
} 