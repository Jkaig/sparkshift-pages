'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { AppleIcon, PlayIcon, CheckCircle, Menu, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import LightningBackground from '@/components/LightningBackground'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'download']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleShopClick = () => {
    window.open('https://spark-shift-merch.printify.me/products', '_blank')
  }

  const scrollImages = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const currentScroll = scrollContainerRef.current.scrollLeft
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#001f3f] to-[#001233] text-white overflow-x-hidden">
      <LightningBackground />
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#001f3f] bg-opacity-90 backdrop-blur-md">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/spark_shift_logo.png" alt="Spark Shift Logo" width={40} height={40} />
            <span className="text-2xl font-bold">Spark Shift</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#hero" className={`hover:text-[#3498DB] transition-colors ${activeSection === 'hero' ? 'text-[#3498DB]' : ''}`}>Home</a></li>
              <li><a href="#features" className={`hover:text-[#3498DB] transition-colors ${activeSection === 'features' ? 'text-[#3498DB]' : ''}`}>Features</a></li>
              <li><a href="#download" className={`hover:text-[#3498DB] transition-colors ${activeSection === 'download' ? 'text-[#3498DB]' : ''}`}>Download</a></li>
            </ul>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {isMenuOpen && (
          <motion.nav 
            className="md:hidden bg-[#001f3f] bg-opacity-90 backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ul className="py-4 px-6 space-y-4">
              <li><a href="#hero" className="block hover:text-[#3498DB] transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a></li>
              <li><a href="#features" className="block hover:text-[#3498DB] transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a></li>
              <li><a href="#download" className="block hover:text-[#3498DB] transition-colors" onClick={() => setIsMenuOpen(false)}>Download</a></li>
            </ul>
          </motion.nav>
        )}
      </header>

      <main className="relative z-10">
        <section id="hero" className="container mx-auto mt-32 px-6 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Connect. Organize. Electrify.
          </motion.h1>
          <motion.p 
            className="text-xl mb-12 text-[#3498DB]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The ultimate app for electrical apprentices and journeymen
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button className="bg-white text-black hover:bg-gray-200 transition-colors w-full md:w-auto">
              <AppleIcon className="mr-2 h-5 w-5" /> Download for iOS
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200 transition-colors w-full md:w-auto">
              <PlayIcon className="mr-2 h-5 w-5" /> Download for Android
            </Button>
            <Button 
              className="bg-[#3498DB] text-white hover:bg-[#2980B9] transition-colors w-full md:w-auto"
              onClick={handleShopClick}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Shop Merch Now
            </Button>
          </motion.div>

          <motion.div 
            className="relative mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <Button variant="ghost" size="icon" onClick={() => scrollImages('left')}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
              <Button variant="ghost" size="icon" onClick={() => scrollImages('right')}>
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide space-x-4 px-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {[
                { src: "/login_screen.png", alt: "Login Screen" },
                { src: "/apprentice_evaluation.png", alt: "Apprentice Evaluation" },
                { src: "/home_screen.png", alt: "Home Screen" },
                { src: "/journeyman_review.png", alt: "Journeyman Review" }
              ].map((img, index) => (
                <Image 
                  key={index}
                  src={img.src} 
                  alt={img.alt} 
                  width={300} 
                  height={600} 
                  className="rounded-xl shadow-lg flex-shrink-0 scroll-snap-align-start" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg?height=600&width=300";
                    target.alt = "Placeholder image";
                  }}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features and Download sections remain unchanged */}
        
      </main>

      <footer className="container mx-auto mt-32 py-6 px-6 text-center relative z-10">
        <p>&copy; 2023 Spark Shift. All rights reserved.</p>
      </footer>
    </div>
  )
}

