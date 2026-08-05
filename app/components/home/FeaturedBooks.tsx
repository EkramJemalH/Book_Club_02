'use client'

import { useState, useEffect } from 'react'
import { FeaturedBook } from '@/app/types'
import { fetchFeaturedBooks } from '@/app/services/bookApi'
import Image from 'next/image'

export default function FeaturedBooks() {
  const [books, setBooks] = useState<FeaturedBook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function loadFeaturedBooks() {
      try {
        setLoading(true)
        console.log('📚 Fetching featured books...')
        
        const data = await fetchFeaturedBooks()
        console.log('✅ Books fetched:', data)
        
        // Log image URLs for debugging
        data.forEach((book, index) => {
          console.log(`📖 Book ${index + 1}: "${book.title}" - Image: ${book.imageUrl}`)
        })
        
        setBooks(data)
        setError(null)
      } catch (err) {
        console.error('❌ Error loading books:', err)
        setError('Failed to load featured books')
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedBooks()
  }, [])

  const handleImageError = (bookId: string) => {
    setImageErrors(prev => ({ ...prev, [bookId]: true }))
    console.warn(`⚠️ Image failed to load for book ID: ${bookId}`)
  }

  // Loading skeleton
  if (loading) {
    return (
      <section className="featured-books py-16 px-8 bg-book-cream text-center">
        <div className="container max-w-[1200px] mx-auto">
          <h2 className="font-libertinus text-5xl text-book-dark mb-3">
            Featured Books
          </h2>
          <p className="font-libertinus text-lg text-gray-500 mb-8">
            Loading our featured collection...
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="book-card animate-pulse">
                <div className="book-image h-[280px] bg-book-beige rounded-t-xl"></div>
                <div className="book-info p-4">
                  <div className="h-6 bg-book-beige rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-book-beige rounded mb-2 w-1/2"></div>
                  <div className="h-4 bg-book-beige rounded mb-2 w-1/3"></div>
                  <div className="h-8 bg-book-beige rounded mt-2 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="featured-books py-16 px-8 bg-book-cream text-center">
        <div className="container max-w-[1200px] mx-auto">
          <h2 className="font-libertinus text-5xl text-book-dark mb-3">
            Featured Books
          </h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-book-gold text-white rounded-full hover:bg-[#b8895e] transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  // No books
  if (books.length === 0) {
    return (
      <section className="featured-books py-16 px-8 bg-book-cream text-center">
        <div className="container max-w-[1200px] mx-auto">
          <h2 className="font-libertinus text-5xl text-book-dark mb-3">
            Featured Books
          </h2>
          <p className="text-gray-500">No featured books available at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="featured-books py-16 px-8 bg-book-cream text-center">
      <div className="container max-w-[1200px] mx-auto">
        <h2 className="font-libertinus text-5xl text-book-dark mb-3">
          Featured Books
        </h2>
        <p className="font-libertinus text-lg text-gray-500 mb-8">
          Discover our most popular titles loved by readers worldwide
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book) => {
            const imageUrl = imageErrors[book.id] 
              ? '/images/book-placeholder.jpg' 
              : book.imageUrl

            return (
              <div key={book.id} className="book-card">
                <div className="book-image relative h-[280px] bg-book-beige overflow-hidden rounded-t-xl">
                  <img
                    src={imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    onError={() => handleImageError(book.id)}
                    loading="lazy"
                  />
                  <span className="book-badge absolute top-2 right-2 bg-book-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                    {book.tag}
                  </span>
                </div>
                <div className="book-info p-4 text-left">
                  <h3 className="font-libertinus text-lg font-bold text-book-dark mb-0.5 line-clamp-2 min-h-[3.5rem]">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                  <div className="book-rating flex items-center gap-2 mb-2">
                    <span className="stars text-yellow-500 text-sm">⭐</span>
                    <span className="rating-number text-sm font-semibold text-book-dark">
                      {book.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="book-genre inline-block bg-book-beige text-gray-600 px-3 py-0.5 rounded-full text-xs font-medium mb-3">
                    {book.category}
                  </span>
                  <p className="book-description text-sm text-gray-600 line-clamp-2 mb-3">
                    {book.description}
                  </p>
                  <div className="book-footer flex justify-between items-center border-t border-book-beige pt-3">
                    <span className="book-price font-libertinus text-xl font-bold text-book-gold">
                      {book.price}
                    </span>
                    <button
                      className="btn-add-to-cart bg-book-dark text-white border-none px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 hover:bg-book-gold hover:scale-105"
                      onClick={() => alert(`📚 Added "${book.title}" to cart!`)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}