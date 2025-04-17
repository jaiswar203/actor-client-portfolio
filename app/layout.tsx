import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Soli Merwan Cama | Actor & Entrepreneur",
  description: "From struggle to success - the inspiring journey of Soli Merwan Cama",
  openGraph: {
    title: "Soli Merwan Cama | Actor & Entrepreneur",
    description: "From struggle to success - the inspiring journey of Soli Merwan Cama",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico", // Updated path to the favicon in the /app folder
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Update the navigation to include the Articles section link */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gold/20">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="text-2xl font-serif text-gold">
                SMC
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="#home" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">
                  Home
                </Link>
                <Link href="#about" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">
                  About
                </Link>
                <Link href="#articles" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">
                  Articles
                </Link>
                <Link href="#company" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">
                  Company
                </Link>
                <Link href="#contact" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'