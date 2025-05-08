"use client"

import React from "react"
import Link from "next/link"
import { Facebook, Instagram, Mail } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import QueryProvider from "@/components/providers/query-provider"
import Navbar from "@/components/Navbar"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <QueryProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <main className="pt-20">{children}</main>

          <footer className="bg-cream-100 border-t border-gold-100/50 pt-16 pb-12 mt-24 text-charcoal-700">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
                <div className="md:col-span-4">
                  <Link href="/" className="inline-block mb-5">
                    <span className="font-serif text-3xl font-bold text-gold-600 hover:text-gold-700 transition-colors">
                      Soli Merwan Cama
                    </span>
                  </Link>
                  <p className="text-charcoal-600 text-sm max-w-md leading-relaxed">
                    Inspiring journeys from struggle to success. Discover the story of a visionary who turned adversity into extraordinary achievement.
                  </p>
                </div>

                <div className="md:col-span-2 md:col-start-6">
                  <h3 className="font-serif text-lg font-semibold mb-5 text-gold-700">Explore</h3>
                  <ul className="space-y-3">
                    {["Home", "About", "Articles", "Company", "Contact"].map((item) => (
                      <li key={item}>
                        <Link
                          href={`#${item.toLowerCase()}`}
                          className="text-sm text-charcoal-600 hover:text-gold-600 hover:underline underline-offset-4 transition-all duration-300"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-serif text-lg font-semibold mb-5 text-gold-700">Connect</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="mailto:contact@solimerwan.com" className="text-sm text-charcoal-600 hover:text-gold-600 hover:underline underline-offset-4 transition-colors">
                        Email Us
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/solimerwancama24/" target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-600 hover:text-gold-600 hover:underline underline-offset-4 transition-colors">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/profile.php?id=61574973523333" target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-600 hover:text-gold-600 hover:underline underline-offset-4 transition-colors">
                        Facebook
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="md:col-span-2 flex md:flex-col md:items-end space-x-4 md:space-x-0 md:space-y-4 mt-6 md:mt-0">
                  <a href="https://www.facebook.com/profile.php?id=61574973523333" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-gold-600 transition-colors" aria-label="Facebook">
                    <Facebook size={28} />
                  </a>
                  <a href="https://www.instagram.com/solimerwancama24/" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:text-gold-600 transition-colors" aria-label="Instagram">
                    <Instagram size={28} />
                  </a>
                  <a href="mailto:contact@solimerwan.com" className="text-gold-500 hover:text-gold-600 transition-colors" aria-label="Email">
                    <Mail size={28} />
                  </a>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gold-100/30 text-center">
                <p className="text-xs text-charcoal-500">
                  &copy; {new Date().getFullYear()} Soli Merwan Cama. All rights reserved. Website crafted with passion.
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </QueryProvider>
    </>
  )
}
