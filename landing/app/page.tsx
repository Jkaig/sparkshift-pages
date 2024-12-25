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
          <Button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
              <Button className="bg-transparent text-white hover:bg-white hover:bg-opacity-10" onClick={() => scrollImages('left')}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
              <Button className="bg-transparent text-white hover:bg-white hover:bg-opacity-10" onClick={() => scrollImages('right')}>
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide space-x-4 px-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <Image src="/login_screen.png" alt="Login Screen" width={300} height={600} className="rounded-xl shadow-lg flex-shrink-0 scroll-snap-align-start" />
              <Image src="/apprentice_evaluation.png" alt="Apprentice Evaluation" width={300} height={600} className="rounded-xl shadow-lg flex-shrink-0 scroll-snap-align-start" />
              <Image src="/home_screen.png" alt="Home Screen" width={300} height={600} className="rounded-xl shadow-lg flex-shrink-0 scroll-snap-align-start" />
              <Image src="/journeyman_review.png" alt="Journeyman Review" width={300} height={600} className="rounded-xl shadow-lg flex-shrink-0 scroll-snap-align-start" />
            </div>
          </motion.div>
        </section>

        <section id="features" className="container mx-auto mt-32 px-6 text-center">
          <motion.h2 
            className="text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Easy Login", description: "Secure and quick access with multiple sign-in options" },
              { title: "Apprentice Evaluations", description: "Submit and track your progress with detailed evaluations" },
              { title: "Hour Logging", description: "Easily log and manage your working hours" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-lg hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="download" className="container mx-auto mt-32 px-6 text-center">
          <motion.h2 
            className="text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Download Spark Shift Today
          </motion.h2>
          <motion.div 
            className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button className="bg-white text-black hover:bg-gray-200 transition-colors w-full md:w-auto">
              <AppleIcon className="mr-2 h-5 w-5" /> Download for iOS
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200 transition-colors w-full md:w-auto">
              <PlayIcon className="mr-2 h-5 w-5" /> Download for Android
            </Button>
          </motion.div>
          <motion.ul 
            className="text-left max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              "Streamline your apprenticeship journey",
              "Stay organized with easy hour logging",
              "Get real-time feedback from journeymen",
              "Access your data anytime, anywhere"
            ].map((item, index) => (
              <li key={index} className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </section>
      </main>

      <footer className="container mx-auto mt-32 py-6 px-6 text-center relative z-10">
        <p>&copy; 2023 Spark Shift. All rights reserved.</p>
      </footer>
    </div>
  )
}

