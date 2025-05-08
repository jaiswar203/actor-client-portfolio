"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Articles", href: "/articles" },
  { name: "Company", href: "/#company" },
  { name: "Contact", href: "/#contact" }
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll events for home page hash links
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state for navbar styling
      setScrolled(window.scrollY > 50)
      
      // Only track sections if we're on the home page
      if (pathname !== "/") return

      // Get current scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
      // Find the active section
      const sections = ["home", "about", "gallery", "articles", "company", "contact"]
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  // Determine if a nav item is active
  const isActive = (item) => {
    if (pathname === "/" && item.href.startsWith("/#")) {
      // On home page, check if hash section is active
      return activeSection === item.href.replace("/#", "")
    } else {
      // On other pages, simple path comparison
      return pathname === item.href
    }
  }

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled 
            ? "bg-white/95 backdrop-blur-lg shadow-md py-2" 
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.span 
                className={cn(
                  "font-serif text-2xl font-bold transition-all duration-300",
                  scrolled ? "text-gold-600" : "text-gold-500"
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Soli Merwan Cama
              </motion.span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:block">
              <motion.ul 
                className="flex items-center space-x-1" 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }}
              >
                {navItems.map((item) => (
                  <motion.li key={item.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-4 py-2 text-sm tracking-wide font-medium transition-all duration-300 rounded-full hover:bg-gold-50",
                        isActive(item)
                          ? "text-gold-600 font-semibold"
                          : scrolled ? "text-charcoal-700" : "text-charcoal-600"
                      )}
                    >
                      {item.name}
                      {isActive(item) && (
                        <motion.span
                          className="absolute bottom-0 left-0 right-0 mx-auto w-1.5 h-1.5 bg-gold-500 rounded-full"
                          layoutId="activeSection"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* Mobile Menu Toggle */}
            <motion.div 
              className="block md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={toggleMobileMenu}
                className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  scrolled 
                    ? "bg-gold-50 text-gold-600 hover:bg-gold-100" 
                    : "bg-white/10 backdrop-blur-sm text-gold-500 hover:bg-white/20"
                )}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/90 backdrop-blur-lg md:hidden pt-20"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container px-4 py-8">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={toggleMobileMenu}
                      className={cn(
                        "flex items-center justify-between py-3 px-4 rounded-lg border border-transparent",
                        isActive(item)
                          ? "text-gold-600 font-medium border-gold-200 bg-gold-50"
                          : "text-charcoal-700"
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronRight 
                        size={16} 
                        className={cn(
                          "transition-transform",
                          isActive(item) ? "text-gold-500" : "text-charcoal-400"
                        )}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 