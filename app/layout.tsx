import type { Metadata } from "next"
import "./globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import ClientLayout from "./client-layout"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Soli Merwan Cama | Actor & Entrepreneur",
  description: "From struggle to success - the inspiring journey of Soli Merwan Cama",
  openGraph: {
    title: "Soli Merwan Cama | Actor & Entrepreneur",
    description: "From struggle to success - the inspiring journey of Soli Merwan Cama",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning={true}>
      <body className="bg-cream-50 text-charcoal-800 font-sans antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
