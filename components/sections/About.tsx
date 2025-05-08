"use client"

import { motion } from "framer-motion"

// Timeline content data
const timelineItems = [
  {
    title: "Early Struggles: The Unseen Battles",
    content: [
      "Born into modest surroundings, Soli's early life was far from easy. While others his age were chasing dreams, Soli was fighting to survive. He saw days filled with uncertainty, hunger, and hopelessness.",
      "But even in the darkest of times, Soli held onto something most people lose too early—hope. He believed in his ability to rise above his circumstances, no matter how brutal they seemed."
    ]
  },
  {
    title: "A Relentless Spirit",
    content: [
      "What sets Soli apart is his relentless spirit. Every challenge he faced became a stepping stone. He never allowed failure to define him. Instead, he used it to sharpen his mindset and expand his skill set.",
      "He worked tirelessly—often taking up odd jobs to support himself while learning every day. From watching motivational videos to attending free workshops, he trained himself not just to survive, but to grow."
    ]
  },
  {
    title: "The Breakthrough",
    content: [
      "With a heart full of courage and a mind tuned to possibilities, Soli finally decided to build something of his own. His entrepreneurial instincts kicked in, and he launched his venture—starting from the ground up with very little capital.",
      "His journey was far from smooth. There were financial setbacks, sleepless nights, and emotional breakdowns. But every time he fell, he got back up stronger."
    ]
  },
  {
    title: "Rising to the Top",
    content: [
      "After years of persistence, discipline, and resilience, Soli finally tasted success. His business began to grow, clients started trusting his vision, and profits began to multiply.",
      "Today, Soli Merwan Cama is a proud self-made millionaire, but his true wealth lies in his journey—one that motivates countless others to never give up."
    ]
  },
  {
    title: "Legacy of Inspiration",
    content: [
      "Soli now uses his platform to inspire the youth, share his learnings, and remind people that no situation is permanent. What matters is how you face it.",
      "His story isn't just about money—it's about turning adversity into achievement, and proving that even the toughest struggles can lead to the most beautiful success stories."
    ]
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-cream-50 to-transparent"></div>
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-gold-50 opacity-70 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold-50 opacity-70 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading with decorative elements */}
        <div className="mb-16 text-center relative">
          <motion.div
            className="inline-block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 -top-4 w-24 h-1 bg-gold-300"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          ></motion.div>
          
          <motion.h2
            className="text-3xl md:text-5xl font-serif font-bold relative inline-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-gold-600">Soli Merwan Cama</span>
          </motion.h2>
          
          <motion.div
            className="inline-block absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 -bottom-4 w-12 h-1 bg-gold-300"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
        </div>

        {/* Story content with elegant layout */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-12 p-8 bg-gradient-to-br from-gold-50 to-white rounded-2xl shadow-elegant border border-gold-100 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Decorative quote mark */}
            <div className="absolute top-0 right-0 text-9xl font-serif text-gold-100 leading-none pointer-events-none">
              "
            </div>
            
            <motion.h3
              className="text-2xl font-serif text-gold-600 mb-4 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              From Dark Days to a Millionaire Dream – A True Story of Struggle and Success
            </motion.h3>
            
            <motion.p
              className="mb-0 text-charcoal-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              In a world where dreams often clash with reality, Soli Merwan Cama carved out a path that turned pain
              into purpose and struggle into strength. His journey from facing the worst days of his life to becoming
              a self-made millionaire is not just inspiring—it's transformational.
            </motion.p>
          </motion.div>

          {/* Timeline styled journey sections */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute top-0 bottom-0 left-0 md:left-1/2 w-px bg-gold-200 transform -translate-x-1/2"></div>
            
            {/* Timeline sections */}
            {timelineItems.map((item, index) => (
              <motion.div 
                key={index}
                className={`relative mb-16 md:mb-24 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute top-0 left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gold-500 border-4 border-white shadow-md z-10"></div>
                
                {/* Content */}
                <div className="ml-8 md:ml-0 md:w-1/2 md:px-8">
                  <div className={`p-6 bg-white rounded-xl shadow-elegant border border-gold-100 ${index % 2 === 0 ? 'md:mr-6' : 'md:ml-6'}`}>
                    <h3 className="text-xl font-serif text-gold-600 mb-4">{item.title}</h3>
                    {item.content.map((paragraph, i) => (
                      <p key={i} className="mb-3 last:mb-0 text-charcoal-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 