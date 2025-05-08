"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      delayChildren: 0.3
    }
  }
}

const heroImageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.2
    }
  }
}

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Subtle light pattern background */}
        <div className="absolute inset-0 bg-cream-100 opacity-50"></div>
        
        {/* Gold accent elements */}
        <motion.div
          className="absolute top-20 -left-24 w-64 h-64 rounded-full bg-gold-100 blur-3xl opacity-40"
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
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gold-100 blur-3xl opacity-40"
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

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-block mb-6 px-4 py-1.5 bg-gold-50 border border-gold-300 rounded-full"
              variants={fadeIn}
            >
              <span className="text-gold-600 text-sm font-medium">Actor & Entrepreneur</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 tracking-tight"
              variants={slideUp}
            >
              <span className="block text-charcoal-800">Soli Merwan Cama</span>
              <motion.span
                className="text-gold-600 text-2xl md:text-3xl lg:text-3xl block mt-4 font-medium"
                variants={slideUp}
              >
                From Struggle to Success
              </motion.span>
            </motion.h1>

            <motion.p
              className="max-w-2xl mx-auto lg:mx-0 text-lg text-charcoal-600 mb-8 leading-relaxed"
              variants={slideUp}
            >
              A journey of transformation, resilience, and triumph against all odds. 
              Discover the story of a visionary who turned adversity into extraordinary achievement.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              variants={slideUp}
            >
              <Button className="bg-gold-500 hover:bg-gold-600 transition-all text-white rounded-full px-8 py-6 shadow-gold">
                <span>Discover My Story</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            className="relative order-1 lg:order-2 mx-auto lg:mx-0"
            variants={heroImageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative max-w-md">
              {/* Background decoration */}
              <div className="absolute -top-6 -right-6 w-full h-full bg-gold-100 rounded-3xl rotate-3"></div>
              
              {/* Main image */}
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-elegant border border-gold-200 bg-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/images/soli-portrait.png"
                  alt="Soli Merwan Cama"
                  width={500}
                  height={700}
                  priority
                  className="object-cover w-full"
                />
              </motion.div>

              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-8 -left-8 p-4 pl-6 pr-8 bg-white rounded-xl shadow-card flex items-center space-x-3"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex space-x-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={14} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <span className="text-sm font-medium">Cannes-Featured</span>
              </motion.div>
              
              <motion.div 
                className="absolute top-10 -right-8 p-3 px-5 bg-white rounded-lg shadow-card"
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <span className="text-sm font-medium text-gold-600">Music & Film Producer</span>
              </motion.div>
            </div>
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
        <Link href="#about" className="flex flex-col items-center text-gold-600 hover:text-gold-700 transition-colors">
          <span className="text-sm font-medium mb-2">Scroll Down</span>
          <ChevronDown size={24} />
        </Link>
      </motion.div>
    </section>
  )
} 