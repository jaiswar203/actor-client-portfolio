"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

// Animation variants
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

export default function Company() {
  return (
    <section id="company" className="py-24 bg-cream-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-50 via-transparent to-transparent opacity-60"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold-100 rounded-full blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.h2
          className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold-600">Soli Merwan Cama</span> Company
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Left side - Image with decorations */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="relative">
              {/* Decorative shapes */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold-100 rounded-lg rotate-12 opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-200 rounded-full opacity-30"></div>
              
              {/* Main image */}
              <div className="relative z-10 rounded-xl overflow-hidden shadow-elegant">
                <div className="relative aspect-[4/3]">
                  <Image 
                    src="/images/gallery3.jpeg" 
                    alt="Soli Merwan Cama Company" 
                    fill 
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Overlay with company name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent flex items-end p-8">
                    <div>
                      <div className="text-4xl font-serif font-bold text-gold-400">Soli Merwan Cama</div>
                      <div className="text-sm uppercase tracking-widest text-white">Established 2015</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Company description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
          >
            <motion.h3
              className="text-2xl font-serif text-gold-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Transforming Vision Into Reality
            </motion.h3>
            
            <motion.p
              className="text-charcoal-700 leading-relaxed"
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
              className="text-charcoal-700 leading-relaxed"
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
              className="text-charcoal-700 leading-relaxed"
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
              <Button className="bg-gold-500 hover:bg-gold-600 text-white rounded-full px-8 shadow-gold">
                Learn More About Us
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Company values cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {[
            {
              title: "Our Mission",
              description: "To inspire and empower individuals to overcome obstacles and achieve their full potential through our services, products, and the powerful story of our founder."
            },
            {
              title: "Our Vision",
              description: "To create a global community where perseverance is celebrated, resilience is nurtured, and success is accessible to all who dare to dream and work for it."
            },
            {
              title: "Our Values",
              description: "Integrity, resilience, innovation, and compassion form the foundation of everything we do at Soli Merwan Cama company, reflecting the personal journey and principles of Soli Merwan Cama."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-elegant border border-gold-100 hover:border-gold-300 transition-all duration-300"
              variants={slideUp}
              whileHover={{
                y: -8,
                boxShadow: "0px 15px 30px rgba(0,0,0,0.1), 0px 10px 10px rgba(0,0,0,0.04)",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center mb-6">
                {index === 0 && <Star className="text-gold-500" size={20} />}
                {index === 1 && <ExternalLink className="text-gold-500" size={20} />}
                {index === 2 && <Heart className="text-gold-500" size={20} />}
              </div>
              <h3 className="text-xl font-serif text-gold-600 mb-4">{item.title}</h3>
              <p className="text-charcoal-700 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 