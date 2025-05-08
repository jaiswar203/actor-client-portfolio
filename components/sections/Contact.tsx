"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Facebook, Instagram, Mail } from "lucide-react"

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

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-cream-50 to-transparent"></div>
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-gold-50 opacity-60 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.h2
          className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold-600">Connect</span> With Soli
        </motion.h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Contact information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <motion.h3
              className="text-2xl font-serif text-gold-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get In Touch
            </motion.h3>
            
            <motion.p
              className="text-charcoal-700 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Whether you're interested in booking Soli for an event, exploring collaboration opportunities with SMC,
              or simply want to share your own story of resilience, we'd love to hear from you through the channels below.
            </motion.p>

            <motion.div
              className="space-y-6 pt-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { 
                  icon: <Mail className="text-gold-500" size={20} />,
                  text: "contact@solimerwan.com",
                  link: "mailto:contact@solimerwan.com"
                },
                {
                  icon: <Instagram className="text-gold-500" size={20} />,
                  text: "@solimerwancama24",
                  link: "https://www.instagram.com/solimerwancama24/"
                },
                {
                  icon: <Facebook className="text-gold-500" size={20} />,
                  text: "Soli Merwan Cama",
                  link: "https://www.facebook.com/profile.php?id=61574973523333"
                }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-elegant border border-gold-100 hover:border-gold-300 transition-all duration-300 group"
                  variants={slideUp}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center mr-4 group-hover:bg-gold-100 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-charcoal-700 group-hover:text-gold-600 transition-colors">{item.text}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Decorative element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", delay: 0.3 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-100 rounded-lg rotate-12 opacity-70"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold-200 rounded-full opacity-30"></div>
              
              {/* Quote card */}
              <div className="relative z-10 p-10 bg-white rounded-xl shadow-elegant border border-gold-100">
                {/* Quote mark */}
                <div className="absolute top-4 right-4 text-8xl font-serif text-gold-100 leading-none pointer-events-none">
                  "
                </div>
                
                <motion.blockquote
                  className="relative text-xl text-charcoal-700 font-serif italic mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Turning adversity into achievement isn't just a motto—it's a way of life. True success comes from embracing our struggles and using them as stepping stones.
                </motion.blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src="/images/soli-portrait.png" 
                      alt="Soli Merwan Cama" 
                      width={48} 
                      height={48} 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gold-600">Soli Merwan Cama</div>
                    <div className="text-sm text-charcoal-500">Founder & Visionary</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 