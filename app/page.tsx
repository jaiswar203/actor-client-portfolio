"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Facebook, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/navigation' // Add navigation styles

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5 // Increased delay for hero content
    }
  }
}

const heroImageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.4 // Increased delay for hero image
    }
  }
}

// Gallery and articles animations
const galleryImageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 15px rgba(212,175,55,0.5)",
    borderColor: "rgba(212,175,55,0.7)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
}

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null)

  // Animation scroll references
  const { scrollYProgress } = useScroll()
  const navOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })

  const galleryImages = [
    { src: "/images/gallery1.png", alt: "Gallery Image 1" },
    { src: "/images/gallery2.png", alt: "Gallery Image 2" },
    { src: "/images/gallery3.jpeg", alt: "Gallery Image 3" },
    { src: "/images/gallery4.jpeg", alt: "Gallery Image 4" },
    { src: "/images/soli-portrait.png", alt: "Soli Merwan Cama Portrait" },
  ]

  const sectionIds = ["home", "about", "articles", "company", "contact"]

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when the section is in the middle 50% of the viewport
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
  }, []) // Empty dependency array means this effect runs once on mount

  const handleImageClick = (src: string) => {
    setSelectedImageSrc(src)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gold/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ opacity: navOpacity }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif text-gold">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Soli Merwan Cama
            </motion.div>
          </Link>
          <motion.div
            className="hidden md:flex items-center space-x-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {sectionIds.map((id, index) => (
              <motion.div key={id} variants={slideUp}>
                <Link
                  href={`#${id}`}
                  className={`text-sm uppercase tracking-widest transition-colors ${activeSection === id ? 'text-gold' : 'text-gray-300 hover:text-gold'}`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)} {/* Capitalize first letter */}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.nav>

      {/* Redesigned Hero Section with Portrait Image */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20" ref={heroRef}> {/* Added padding-top for nav */}
        <div className="absolute inset-0 z-0 bg-black">
          {/* Background pattern/texture */}
          <motion.div
            className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--gold)_0,_transparent_70%)]"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <motion.div
              className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-3xl"
              animate={{
                x: [0, 20, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            <motion.div
              className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gold/5 blur-3xl"
              animate={{
                x: [0, -20, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <motion.div
              className="relative order-2 lg:order-1 mx-auto lg:mx-0 max-w-md lg:max-w-full"
              variants={heroImageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative">
                {/* Gold frame effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-gold rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: 4, y: 4 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                ></motion.div>

                {/* Main image */}
                <motion.div
                  className="relative overflow-hidden rounded-lg border-2 border-gold/80 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src="/images/soli-portrait.png"
                    alt="Soli Merwan Cama"
                    width={600}
                    height={800}
                    priority
                    className="object-cover w-full"
                  />
                </motion.div>

                {/* Decorative corner accents */}
                <motion.div
                  className="absolute top-[-10px] left-[-10px] w-[30px] h-[30px] border-t-2 border-l-2 border-gold"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                ></motion.div>
                <motion.div
                  className="absolute top-[-10px] right-[-10px] w-[30px] h-[30px] border-t-2 border-r-2 border-gold"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                ></motion.div>
                <motion.div
                  className="absolute bottom-[-10px] left-[-10px] w-[30px] h-[30px] border-b-2 border-l-2 border-gold"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                ></motion.div>
                <motion.div
                  className="absolute bottom-[-10px] right-[-10px] w-[30px] h-[30px] border-b-2 border-r-2 border-gold"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 }}
                ></motion.div>
              </div>

              {/* Credentials badge */}
              <motion.div
                className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-sm border border-gold/50 rounded-lg px-4 py-3 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
              >
                <div className="text-xs uppercase tracking-widest text-gold/80">Music & Film</div>
                <div className="text-sm font-bold">Producer</div>
                <div className="text-xs mt-1 text-gold/80">Cannes-Featured</div>
              </motion.div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              className="order-1 lg:order-2 text-center lg:text-left"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="inline-block mb-4 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full"
                variants={fadeIn}
              >
                <span className="text-gold text-sm font-medium">Visionary</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-tight"
                variants={slideUp}
              >
                <span className="block">Soli Merwan Cama</span>
                <motion.span
                  className="text-gold text-2xl md:text-3xl lg:text-4xl block mt-4 font-light"
                  variants={slideUp}
                >
                  From Struggle to Success
                </motion.span>
              </motion.h1>

              <motion.p
                className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-300 mb-8"
                variants={slideUp}
              >
                A journey of transformation, resilience, and triumph against all odds. Discover the story of a visionary
                who turned adversity into extraordinary achievement.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                variants={slideUp}
              >
                <Button className="bg-gold hover:bg-gold/80 text-black">
                  Discover My Story
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Link href="#about" className="text-gold">
            <ChevronDown size={32} />
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-serif font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold">About</span> Soli Merwan Cama
          </motion.h2>

          <div className="prose prose-lg prose-invert max-w-none">
            <motion.h3
              className="text-2xl font-serif text-gold mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From Dark Days to a Millionaire Dream – A True Story of Struggle and Success
            </motion.h3>
            <motion.p
              className="mb-6 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              In a world where dreams often clash with reality, Soli Merwan Cama carved out a path that turned pain
              into purpose and struggle into strength. His journey from facing the worst days of his life to becoming
              a self-made millionaire is not just inspiring—it's transformational.
            </motion.p>

            <motion.h3
              className="text-xl font-serif text-gold mt-10 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Early Struggles: The Unseen Battles
            </motion.h3>
            <motion.p
              className="mb-6 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Born into modest surroundings, Soli's early life was far from easy. While others his age were chasing
              dreams, Soli was fighting to survive. He saw days filled with uncertainty, hunger, and hopelessness.
              With little support and even fewer opportunities, life tested him again and again.
            </motion.p>
            <motion.p
              className="mb-6 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              But even in the darkest of times, Soli held onto something most people lose too early—hope. He believed
              in his ability to rise above his circumstances, no matter how brutal they seemed.
            </motion.p>

            <motion.h3
              className="text-xl font-serif text-gold mt-10 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              A Relentless Spirit
            </motion.h3>
            <motion.p
              className="mb-6 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              What sets Soli apart is his relentless spirit. Every challenge he faced became a stepping stone. He
              never allowed failure to define him. Instead, he used it to sharpen his mindset and expand his skill
              set.
            </motion.p>
            <motion.p
              className="mb-6 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              He worked tirelessly—often taking up odd jobs to support himself while learning every day. From watching
              motivational videos to attending free workshops, he trained himself not just to survive, but to grow.
            </motion.p>

            <motion.h3
              className="text-xl font-serif text-gold mt-10 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              The Breakthrough
            </motion.h3>
            <motion.p
              className="mb-6 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              With a heart full of courage and a mind tuned to possibilities, Soli finally decided to build something
              of his own. His entrepreneurial instincts kicked in, and he launched his venture—starting from the
              ground up with very little capital.
            </motion.p>
            <motion.p
              className="mb-6 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              His journey was far from smooth. There were financial setbacks, sleepless nights, and emotional
              breakdowns. But every time he fell, he got back up stronger.
            </motion.p>

            <motion.h3
              className="text-xl font-serif text-gold mt-10 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              Rising to the Top
            </motion.h3>
            <motion.p
              className="mb-6 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              After years of persistence, discipline, and resilience, Soli finally tasted success. His business began
              to grow, clients started trusting his vision, and profits began to multiply. Today, Soli Merwan Cama is
              a proud self-made millionaire, but his true wealth lies in his journey—one that motivates countless
              others to never give up.
            </motion.p>

            <motion.h3
              className="text-xl font-serif text-gold mt-10 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Legacy of Inspiration
            </motion.h3>
            <motion.p
              className="mb-6 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              Soli now uses his platform to inspire the youth, share his learnings, and remind people that no
              situation is permanent. What matters is how you face it.
            </motion.p>
            <motion.p
              className="mb-6 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1.7 }}
            >
              His story isn't just about money—it's about turning adversity into achievement, and proving that even
              the toughest struggles can lead to the most beautiful success stories.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery Section Updated with Swiper Carousel and Dialog */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-serif font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold">Image</span> Gallery
          </motion.h2>
          <motion.p
            className="text-gray-300 text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore visual highlights from Soli's journey and career.
          </motion.p>

          {/* Swiper Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={1} // Default for mobile
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                // when window width is >= 768px
                768: {
                  slidesPerView: 3,
                },
              }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="mySwiper pb-12" // Added pb-12 for pagination spacing
              style={{
                // Ensure Swiper styles override any conflicting global styles
                // @ts-ignore Need to use CSS variables for Swiper pagination color
                '--swiper-pagination-color': '#D4AF37', // gold color
                '--swiper-pagination-bullet-inactive-color': '#999999',
                '--swiper-pagination-bullet-inactive-opacity': '1',
                '--swiper-pagination-bullet-size': '10px',
                '--swiper-pagination-bullet-horizontal-gap': '6px'
              }}
            >
              {galleryImages.map((image, index) => (
                <SwiperSlide key={index} className="group">
                  <motion.div
                    onClick={() => handleImageClick(image.src)}
                    className="relative aspect-square w-full overflow-hidden rounded-lg border border-gold/20 transition-all duration-300 cursor-pointer"
                    variants={galleryImageVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, 33vw"
                      className="object-cover"
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-serif font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold">Featured</span> Articles
          </motion.h2>
          <motion.p
            className="text-gray-300 text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover Soli Merwan Cama's inspiring journey through the lens of prestigious publications and media
            features.
          </motion.p>

          {/* Swiper Carousel for Articles */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                // when window width is >= 768px (tablet)
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                // when window width is >= 1024px (desktop)
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30
                }
              }}
              modules={[Pagination, Autoplay, Navigation]}
              className="mySwiper pb-12"
              style={{
                // Swiper custom styles
                '--swiper-pagination-color': '#D4AF37',
                '--swiper-pagination-bullet-inactive-color': '#999999',
                '--swiper-pagination-bullet-inactive-opacity': '1',
                '--swiper-pagination-bullet-size': '10px',
                '--swiper-pagination-bullet-horizontal-gap': '6px',
                '--swiper-navigation-color': '#D4AF37',
                '--swiper-navigation-size': '25px'
              } as React.CSSProperties}
            >
              {/* Article Card 1 */}
              <SwiperSlide>
                <motion.div
                  className="group h-full"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.div
                    className="relative overflow-hidden rounded-lg border border-gold/20 transition-all duration-300 group-hover:border-gold/50 h-full flex flex-col"
                    whileHover={{
                      boxShadow: "0px 0px 20px rgba(212,175,55,0.2)",
                      y: -5
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Forbes Article"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <motion.div
                        className="absolute top-4 left-4 bg-gold/90 text-black text-xs font-bold px-3 py-1 rounded"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        FORBES
                      </motion.div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-sm text-gold/80 mb-2">June 15, 2023</div>
                      <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-gold transition-colors">
                        From Rags to Riches: The Extraordinary Journey of Soli Merwan Cama
                      </h3>
                      <p className="text-gray-400 mb-6 flex-grow">
                        Forbes explores how Soli Merwan Cama transformed his life from humble beginnings to becoming one of
                        the most inspiring entrepreneurs of our time.
                      </p>
                      <motion.a
                        href="#"
                        className="inline-flex items-center text-gold border-b border-gold/0 group-hover:border-gold/100 transition-all pb-1 text-sm font-medium"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        Read Full Article
                        <svg
                          className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              </SwiperSlide>

              {/* Article Card 2 */}
              <SwiperSlide>
                <div className="group h-full">
                  <div className="relative overflow-hidden rounded-lg border border-gold/20 transition-all duration-300 group-hover:border-gold/50 h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Entrepreneur Magazine Article"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute top-4 left-4 bg-gold/90 text-black text-xs font-bold px-3 py-1 rounded">
                        ENTREPRENEUR
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-sm text-gold/80 mb-2">March 8, 2023</div>
                      <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-gold transition-colors">
                        The Mindset That Builds Empires: Lessons from Soli Merwan Cama
                      </h3>
                      <p className="text-gray-400 mb-6 flex-grow">
                        Entrepreneur Magazine delves into the psychological principles and mindset strategies that helped
                        Soli overcome adversity and build his business empire.
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center text-gold border-b border-gold/0 group-hover:border-gold/100 transition-all pb-1 text-sm font-medium"
                      >
                        Read Full Article
                        <svg
                          className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Article Card 3 */}
              <SwiperSlide>
                <div className="group h-full">
                  <div className="relative overflow-hidden rounded-lg border border-gold/20 transition-all duration-300 group-hover:border-gold/50 h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Success Magazine Article"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute top-4 left-4 bg-gold/90 text-black text-xs font-bold px-3 py-1 rounded">
                        SUCCESS
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-sm text-gold/80 mb-2">November 22, 2022</div>
                      <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-gold transition-colors">
                        Resilience Redefined: How Soli Merwan Cama Turned Setbacks into Comebacks
                      </h3>
                      <p className="text-gray-400 mb-6 flex-grow">
                        Success Magazine features an exclusive interview with Soli on how he developed extraordinary
                        resilience and his practical advice for overcoming life's greatest challenges.
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center text-gold border-b border-gold/0 group-hover:border-gold/100 transition-all pb-1 text-sm font-medium"
                      >
                        Read Full Article
                        <svg
                          className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Article Card 4 (Adding an extra one for the carousel) */}
              <SwiperSlide>
                <div className="group h-full">
                  <div className="relative overflow-hidden rounded-lg border border-gold/20 transition-all duration-300 group-hover:border-gold/50 h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Business Insider Article"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute top-4 left-4 bg-gold/90 text-black text-xs font-bold px-3 py-1 rounded">
                        BUSINESS INSIDER
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-sm text-gold/80 mb-2">July 30, 2023</div>
                      <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-gold transition-colors">
                        Leadership Lessons from Soli Merwan Cama's Transformative Journey
                      </h3>
                      <p className="text-gray-400 mb-6 flex-grow">
                        Business Insider analyzes the key leadership principles that guided Soli through his remarkable rise
                        and how these principles can be applied in any business context.
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center text-gold border-b border-gold/0 group-hover:border-gold/100 transition-all pb-1 text-sm font-medium"
                      >
                        Read Full Article
                        <svg
                          className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Company Section */}
      <section id="company" className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-serif font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold">Soli Merwan Cama</span> Company
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-[400px] rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              <Image src="/placeholder.svg?height=800&width=600" alt="Soli Merwan Cama Company" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="text-4xl font-serif font-bold text-gold">Soli Merwan Cama</div>
                <div className="text-sm uppercase tracking-widest">Established 2015</div>
              </motion.div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
            >
              <motion.h3
                className="text-2xl font-serif text-gold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Transforming Vision Into Reality
              </motion.h3>
              <motion.p
                className="text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Soli Merwan Cama company was founded on the principles of excellence, integrity, and innovation. What began as a small
                venture has now grown into a respected name in the industry, guided by Soli Merwan Cama's visionary
                leadership.
              </motion.p>
              <motion.p
                className="text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Our company specializes in transforming challenges into opportunities, just as our founder did
                throughout his life. We believe in creating value that extends beyond business metrics—value that
                positively impacts lives and communities.
              </motion.p>
              <motion.p
                className="text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                With a team of dedicated professionals and a commitment to the highest standards, Soli Merwan Cama company continues to push
                boundaries and redefine success in everything we do.
              </motion.p>

              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
              >
                <Button className="bg-gold hover:bg-gold/80 text-black">Learn More About Soli Merwan Cama Company</Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition-all"
              variants={slideUp}
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                borderColor: "rgba(212,175,55,0.5)"
              }}
            >
              <h3 className="text-xl font-serif text-gold mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To inspire and empower individuals to overcome obstacles and achieve their full potential through our
                services, products, and the powerful story of our founder.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900 p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition-all"
              variants={slideUp}
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                borderColor: "rgba(212,175,55,0.5)"
              }}
            >
              <h3 className="text-xl font-serif text-gold mb-4">Our Vision</h3>
              <p className="text-gray-300">
                To create a global community where perseverance is celebrated, resilience is nurtured, and success is
                accessible to all who dare to dream and work for it.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900 p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition-all"
              variants={slideUp}
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
                borderColor: "rgba(212,175,55,0.5)"
              }}
            >
              <h3 className="text-xl font-serif text-gold mb-4">Our Values</h3>
              <p className="text-gray-300">
                Integrity, resilience, innovation, and compassion form the foundation of everything we do at Soli Merwan Cama company,
                reflecting the personal journey and principles of Soli Merwan Cama.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Form Removed */}
      <section id="contact" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-serif font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold">Connect</span> With Soli
          </motion.h2>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <motion.h3
                className="text-2xl font-serif text-gold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Get In Touch
              </motion.h3>
              <motion.p
                className="text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Whether you're interested in booking Soli for an event, exploring collaboration opportunities with SMC,
                or simply want to share your own story of resilience, we'd love to hear from you through the channels below.
              </motion.p>

              <motion.div
                className="space-y-4 pt-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="flex items-center gap-4"
                  variants={slideUp}
                  whileHover={{ x: 5 }}
                >
                  <Mail className="text-gold" />
                  <a href="mailto:contact@solimerwan.com" className="hover:text-gold transition-colors">contact@solimerwan.com</a>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4"
                  variants={slideUp}
                  whileHover={{ x: 5 }}
                >
                  <Instagram className="text-gold" />
                  <a
                    href="https://www.instagram.com/solimerwancama24/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    @solimerwancama24
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4"
                  variants={slideUp}
                  whileHover={{ x: 5 }}
                >
                  <Facebook className="text-gold" />
                  <a
                    href="https://www.facebook.com/profile.php?id=61574973523333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    Soli Merwan Cama
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Form is removed, maybe add a relevant image or quote here? */}
            <motion.div
              className="bg-gray-900 p-8 rounded-lg border border-gold/20 flex items-center justify-center h-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.3 }}
              whileHover={{
                boxShadow: "0px 0px 25px rgba(212,175,55,0.2)",
                borderColor: "rgba(212,175,55,0.4)"
              }}
            >
              <motion.p
                className="text-center text-gold italic"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
              >
                "Turning adversity into achievement."
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Redesigned */}
      <motion.footer
        className="py-10 border-t border-gold/20 bg-gradient-to-t from-gray-900 to-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-block text-3xl font-serif text-gold mb-6 hover:opacity-80 transition-opacity">
              Soli Merwan Cama
            </Link>
          </motion.div>
          <motion.div
            className="flex justify-center gap-6 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Social Links - ensure consistent styling */}
            <motion.a
              href="https://www.facebook.com/profile.php?id=61574973523333"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold transition-colors transform hover:scale-110"
              aria-label="Facebook"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Facebook size={22} />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/solimerwancama24/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold transition-colors transform hover:scale-110"
              aria-label="Instagram"
              whileHover={{ scale: 1.2, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Instagram size={22} />
            </motion.a>
          </motion.div>
          <motion.div
            className="flex justify-center gap-6 mb-8 text-sm uppercase tracking-widest flex-wrap"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn}>
              <Link href="#home" className="text-gray-400 hover:text-gold transition-colors">Home</Link>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link href="#about" className="text-gray-400 hover:text-gold transition-colors">About</Link>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link href="#articles" className="text-gray-400 hover:text-gold transition-colors">Articles</Link>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link href="#company" className="text-gray-400 hover:text-gold transition-colors">Company</Link>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link href="#contact" className="text-gray-400 hover:text-gold transition-colors">Contact</Link>
            </motion.div>
          </motion.div>
          <motion.p
            className="text-gray-500 text-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            &copy; {new Date().getFullYear()} Soli Merwan Cama. All rights reserved. Website by <a href="https://jaiswar.vercel.app" className="underline" target="_blank">Nilesh Jaiswar</a>
          </motion.p>
        </div>
      </motion.footer>

      {/* Dialog for Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] bg-black border-gold/50 p-2">
              <DialogTitle></DialogTitle>
              {selectedImageSrc && (
                <motion.div
                  className="relative w-full aspect-[4/3]"
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Image
                    src={selectedImageSrc}
                    alt="Selected Gallery Image"
                    fill
                    className="object-contain rounded-md"
                  />
                </motion.div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
