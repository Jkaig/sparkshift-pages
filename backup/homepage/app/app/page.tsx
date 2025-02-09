'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const screenshots = [
  {
    src: '/login_screen.png',
    alt: 'Login Screen',
    title: 'Secure Login',
    description: 'Quick and secure access to your account'
  },
  {
    src: '/home_screen.png',
    alt: 'Home Screen',
    title: 'Dashboard Overview',
    description: 'Get a quick overview of your apprenticeship progress'
  },
  {
    src: '/apprentice_evaluation.png',
    alt: 'Apprentice Evaluation',
    title: 'Apprentice Evaluation',
    description: 'Track and manage your apprenticeship evaluations'
  },
  {
    src: '/journeyman_review.png',
    alt: 'Journeyman Review',
    title: 'Journeyman Review',
    description: 'Comprehensive review system for journeymen'
  }
];

export default function AppShowcase() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001f3f] to-[#003366] text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-[#001f3f]/95 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <Image src="/spark_shift_logo.png" alt="Spark Shift Logo" width={32} height={32} />
            <span className="text-xl font-bold">Spark Shift</span>
          </a>
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience Spark Shift</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Streamline your apprenticeship journey with our intuitive mobile app
            </p>
          </motion.div>

          {/* Screenshot Showcase */}
          <div className="relative max-w-md mx-auto">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="relative aspect-[9/16] bg-black/20 rounded-xl overflow-hidden"
            >
              <Image
                src={screenshots[currentImageIndex].src}
                alt={screenshots[currentImageIndex].alt}
                fill
                className="object-contain"
                quality={95}
              />
            </motion.div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/20 hover:bg-black/40 text-white rounded-full"
                onClick={previousImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/20 hover:bg-black/40 text-white rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Caption */}
            <motion.div
              key={`caption-${currentImageIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
              <h2 className="text-xl font-semibold mb-2">{screenshots[currentImageIndex].title}</h2>
              <p className="text-gray-300">{screenshots[currentImageIndex].description}</p>
            </motion.div>
          </div>

          {/* Download Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl font-bold mb-6">Download Now</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-black hover:bg-gray-200 transition-colors">
                Download for iOS
              </Button>
              <Button className="bg-white text-black hover:bg-gray-200 transition-colors">
                Download for Android
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
