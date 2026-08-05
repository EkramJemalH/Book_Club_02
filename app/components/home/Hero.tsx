'use client'

import { useState } from 'react'
import Header from '@/app/components/layout/Header'

export default function HomeHero() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      window.location.href = `/books?search=${encodeURIComponent(searchTerm.trim())}`
    }
  }

  return (
    <section
      className="min-h-screen flex flex-col overflow-hidden relative"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/background_01.jpg') center/cover no-repeat`,
      }}
    >
      {/* Blur overlay */}
      <div
        className="absolute inset-0 -top-2.5 -left-2.5 -right-2.5 -bottom-2.5 z-0"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/background_01.jpg') center/cover no-repeat`,
          filter: 'blur(2px)',
          WebkitFilter: 'blur(2px)',
        }}
      />

      {/* Header - Always on top */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-8 py-6 max-w-full mx-auto">
        <h1 className="font-libertinus font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 drop-shadow-lg">
          Welcome to Book Club
        </h1>

        <h3 className="font-libertinus font-normal text-white text-xl sm:text-2xl md:text-3xl mb-2 drop-shadow">
          What Book will you purchase today?
        </h3>

        <p className="font-libertinus font-normal text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow">
          Discover books that inspire, entertain, and stay with you long after the final page.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex justify-center items-center gap-4 mt-6 w-full max-w-md">
          <input
            type="text"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-book-gold focus:border-transparent shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-300"
          />

        </form>
      </div>
    </section>
  )
}