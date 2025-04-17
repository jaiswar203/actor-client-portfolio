"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("home")

  const galleryImages = [
    { src: "/images/gallery1.png", alt: "Gallery Image 1" },
    { src: "/images/gallery2.png", alt: "Gallery Image 2" },
    { src: "/images/soli-portrait.png", alt: "Soli Merwan Cama Portrait" },
    { src: "/images/gallery1.png", alt: "Gallery Image 1 Repeat" },
    { src: "/images/gallery2.png", alt: "Gallery Image 2 Repeat" },
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gold/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif text-gold">
            Soli Merwan Cama
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {sectionIds.map((id) => (
              <Link
                key={id}
                href={`#${id}`}
                className={`text-sm uppercase tracking-widest transition-colors ${activeSection === id ? 'text-gold' : 'text-gray-300 hover:text-gold'}`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)} {/* Capitalize first letter */}
              </Link>
            ))}
          </div>
          
        </div>
      </nav>

      {/* Redesigned Hero Section with Portrait Image */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20"> {/* Added padding-top for nav */}
        <div className="absolute inset-0 z-0 bg-black">
          {/* Background pattern/texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--gold)_0,_transparent_70%)]"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-3xl"></div>
            <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gold/5 blur-3xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative order-2 lg:order-1 mx-auto lg:mx-0 max-w-md lg:max-w-full">
              <div className="relative">
                {/* Gold frame effect */}
                <div className="absolute inset-0 border-2 border-gold rounded-lg transform translate-x-4 translate-y-4"></div>

                {/* Main image */}
                <div className="relative overflow-hidden rounded-lg border-2 border-gold/80 shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                  <Image
                    src="/images/soli-portrait.png"
                    alt="Soli Merwan Cama"
                    width={600}
                    height={800}
                    priority
                    className="object-cover w-full"
                  />
                </div>

                {/* Decorative corner accents */}
                <div className="absolute top-[-10px] left-[-10px] w-[30px] h-[30px] border-t-2 border-l-2 border-gold"></div>
                <div className="absolute top-[-10px] right-[-10px] w-[30px] h-[30px] border-t-2 border-r-2 border-gold"></div>
                <div className="absolute bottom-[-10px] left-[-10px] w-[30px] h-[30px] border-b-2 border-l-2 border-gold"></div>
                <div className="absolute bottom-[-10px] right-[-10px] w-[30px] h-[30px] border-b-2 border-r-2 border-gold"></div>
              </div>

              {/* Credentials badge */}
              <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-sm border border-gold/50 rounded-lg px-4 py-3 shadow-lg">
                <div className="text-xs uppercase tracking-widest text-gold/80">Music & Film</div>
                <div className="text-sm font-bold">Producer</div>
                <div className="text-xs mt-1 text-gold/80">Cannes-Featured</div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-block mb-4 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full">
                <span className="text-gold text-sm font-medium">Visionary Storyteller</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-tight">
                <span className="block">Soli Merwan Cama</span>
                <span className="text-gold text-2xl md:text-3xl lg:text-4xl block mt-4 font-light">
                  From Struggle to Success
                </span>
              </h1>

              <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-300 mb-8">
                A journey of transformation, resilience, and triumph against all odds. Discover the story of a visionary
                who turned adversity into extraordinary achievement.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button className="bg-gold hover:bg-gold/80 text-black">Discover My Story</Button>
                
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link href="#about" className="text-gold">
            <ChevronDown size={32} />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-12 text-center">
              <span className="text-gold">About</span> Soli Merwan Cama
            </h2>

            <div className="prose prose-lg prose-invert max-w-none">
              <h3 className="text-2xl font-serif text-gold mb-4">
                From Dark Days to a Millionaire Dream – A True Story of Struggle and Success
              </h3>
              <p className="mb-6 text-gray-300">
                In a world where dreams often clash with reality, Soli Merwan Cama carved out a path that turned pain
                into purpose and struggle into strength. His journey from facing the worst days of his life to becoming
                a self-made millionaire is not just inspiring—it's transformational.
              </p>

              <h3 className="text-xl font-serif text-gold mt-10 mb-4">Early Struggles: The Unseen Battles</h3>
              <p className="mb-6 text-gray-300">
                Born into modest surroundings, Soli's early life was far from easy. While others his age were chasing
                dreams, Soli was fighting to survive. He saw days filled with uncertainty, hunger, and hopelessness.
                With little support and even fewer opportunities, life tested him again and again.
              </p>
              <p className="mb-6 text-gray-300">
                But even in the darkest of times, Soli held onto something most people lose too early—hope. He believed
                in his ability to rise above his circumstances, no matter how brutal they seemed.
              </p>

              <h3 className="text-xl font-serif text-gold mt-10 mb-4">A Relentless Spirit</h3>
              <p className="mb-6 text-gray-300">
                What sets Soli apart is his relentless spirit. Every challenge he faced became a stepping stone. He
                never allowed failure to define him. Instead, he used it to sharpen his mindset and expand his skill
                set.
              </p>
              <p className="mb-6 text-gray-300">
                He worked tirelessly—often taking up odd jobs to support himself while learning every day. From watching
                motivational videos to attending free workshops, he trained himself not just to survive, but to grow.
              </p>

              <h3 className="text-xl font-serif text-gold mt-10 mb-4">The Breakthrough</h3>
              <p className="mb-6 text-gray-300">
                With a heart full of courage and a mind tuned to possibilities, Soli finally decided to build something
                of his own. His entrepreneurial instincts kicked in, and he launched his venture—starting from the
                ground up with very little capital.
              </p>
              <p className="mb-6 text-gray-300">
                His journey was far from smooth. There were financial setbacks, sleepless nights, and emotional
                breakdowns. But every time he fell, he got back up stronger.
              </p>

              <h3 className="text-xl font-serif text-gold mt-10 mb-4">Rising to the Top</h3>
              <p className="mb-6 text-gray-300">
                After years of persistence, discipline, and resilience, Soli finally tasted success. His business began
                to grow, clients started trusting his vision, and profits began to multiply. Today, Soli Merwan Cama is
                a proud self-made millionaire, but his true wealth lies in his journey—one that motivates countless
                others to never give up.
              </p>

              <h3 className="text-xl font-serif text-gold mt-10 mb-4">Legacy of Inspiration</h3>
              <p className="mb-6 text-gray-300">
                Soli now uses his platform to inspire the youth, share his learnings, and remind people that no
                situation is permanent. What matters is how you face it.
              </p>
              <p className="mb-6 text-gray-300">
                His story isn't just about money—it's about turning adversity into achievement, and proving that even
                the toughest struggles can lead to the most beautiful success stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section Updated */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-center">
            <span className="text-gold">Image</span> Gallery
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-16">
            Explore visual highlights from Soli's journey and career. Click an image to view it larger.
          </p>

          {/* Gallery Grid - Updated */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {galleryImages.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div
                    className="group relative cursor-pointer overflow-hidden rounded-lg border border-gold/20 transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Optional: Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </DialogTrigger>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for displaying selected image */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-[80vw] max-h-[80vh] bg-black border-gold/50 p-2">
          <DialogTitle>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-center">
              <span className="text-gold">Image</span> Gallery
            </h2>
          </DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-[55vh]"> {/* Adjust height as needed */}
              <Image
                src={selectedImage}
                alt="Selected gallery image"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Articles Section */}
      <section id="articles" className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-center">
            <span className="text-gold">Featured</span> Articles
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-16">
            Discover Soli Merwan Cama's inspiring journey through the lens of prestigious publications and media
            features.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article Card 1 */}
            <div className="group">
              <div className="relative overflow-hidden rounded-lg border border-gold/20 transition-all duration-300 group-hover:border-gold/50 h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Forbes Article"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute top-4 left-4 bg-gold/90 text-black text-xs font-bold px-3 py-1 rounded">
                    FORBES
                  </div>
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

            {/* Article Card 2 */}
            <div className="group">
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

            {/* Article Card 3 */}
            <div className="group">
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
          </div>

          <div className="mt-16 text-center">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section id="company" className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-16 text-center">
            <span className="text-gold">Soli Merwan Cama</span> Company
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=800&width=600" alt="Soli Merwan Cama Company" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-4xl font-serif font-bold text-gold">Soli Merwan Cama</div>
                <div className="text-sm uppercase tracking-widest">Established 2015</div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-gold">Transforming Vision Into Reality</h3>
              <p className="text-gray-300">
                Soli Merwan Cama company was founded on the principles of excellence, integrity, and innovation. What began as a small
                venture has now grown into a respected name in the industry, guided by Soli Merwan Cama's visionary
                leadership.
              </p>
              <p className="text-gray-300">
                Our company specializes in transforming challenges into opportunities, just as our founder did
                throughout his life. We believe in creating value that extends beyond business metrics—value that
                positively impacts lives and communities.
              </p>
              <p className="text-gray-300">
                With a team of dedicated professionals and a commitment to the highest standards, Soli Merwan Cama company continues to push
                boundaries and redefine success in everything we do.
              </p>

              <div className="pt-6">
                <Button className="bg-gold hover:bg-gold/80 text-black">Learn More About Soli Merwan Cama Company</Button>
              </div>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition-all">
              <h3 className="text-xl font-serif text-gold mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To inspire and empower individuals to overcome obstacles and achieve their full potential through our
                services, products, and the powerful story of our founder.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition-all">
              <h3 className="text-xl font-serif text-gold mb-4">Our Vision</h3>
              <p className="text-gray-300">
                To create a global community where perseverance is celebrated, resilience is nurtured, and success is
                accessible to all who dare to dream and work for it.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition-all">
              <h3 className="text-xl font-serif text-gold mb-4">Our Values</h3>
              <p className="text-gray-300">
                Integrity, resilience, innovation, and compassion form the foundation of everything we do at Soli Merwan Cama company,
                reflecting the personal journey and principles of Soli Merwan Cama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Form Removed */}
      <section id="contact" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-16 text-center">
            <span className="text-gold">Connect</span> With Soli
          </h2>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-gold">Get In Touch</h3>
              <p className="text-gray-300">
                Whether you're interested in booking Soli for an event, exploring collaboration opportunities with SMC,
                or simply want to share your own story of resilience, we'd love to hear from you through the channels below.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-gold" />
                  <a href="mailto:contact@solimerwan.com" className="hover:text-gold transition-colors">contact@solimerwan.com</a>
                </div>
                <div className="flex items-center gap-4">
                  <Instagram className="text-gold" />
                  <a
                    href="https://www.instagram.com/solimerwancama24/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    @solimerwancama24
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Facebook className="text-gold" />
                  <a
                    href="https://www.facebook.com/profile.php?id=61574973523333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    Soli Merwan Cama
                  </a>
                </div>
              </div>
            </div>

            {/* Form is removed, maybe add a relevant image or quote here? */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gold/20 flex items-center justify-center h-full">
              <p className="text-center text-gold italic">"Turning adversity into achievement."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Redesigned */}
      <footer className="py-10 border-t border-gold/20 bg-gradient-to-t from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="inline-block text-3xl font-serif text-gold mb-6 hover:opacity-80 transition-opacity">
            Soli Merwan Cama
          </Link>
          <div className="flex justify-center gap-6 mb-8">
            {/* Social Links - ensure consistent styling */}
            <a
              href="https://www.facebook.com/profile.php?id=61574973523333"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold transition-colors transform hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://www.instagram.com/solimerwancama24/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold transition-colors transform hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
          </div>
          <div className="flex justify-center gap-6 mb-8 text-sm uppercase tracking-widest">
            <Link href="#home" className="text-gray-400 hover:text-gold transition-colors">Home</Link>
            <Link href="#about" className="text-gray-400 hover:text-gold transition-colors">About</Link>
            <Link href="#articles" className="text-gray-400 hover:text-gold transition-colors">Articles</Link>
            <Link href="#company" className="text-gray-400 hover:text-gold transition-colors">Company</Link>
            <Link href="#contact" className="text-gray-400 hover:text-gold transition-colors">Contact</Link>
          </div>
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Soli Merwan Cama. All rights reserved. Website by [Your Name/Company Optional]
          </p>
        </div>
      </footer>
    </div>
  )
}
