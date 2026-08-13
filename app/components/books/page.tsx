'use client'

import { useState, useEffect } from 'react'
import SearchFilter from '@/app/components/books/SearchFilter'
import BooksGrid from '@/app/components/books/BooksGrid'
import ResultsCount from '@/app/components/books/ResultsCount'
import BookHero from '@/app/components/books/BookHero'
import Footer from '@/app/components/layout/Footer'
import { Book } from '@/app/types'
import { getAllBooks } from '@/app/services/bookApi'

// ... rest of your code ...

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [genreFilter, setGenreFilter] = useState('all')
  const [sortFilter, setSortFilter] = useState('default')
  const [priceRange, setPriceRange] = useState('all')

  useEffect(() => {
    async function loadBooks() {
      setLoading(true)
      const results = await getAllBooks()
      setBooks(results)
      setFilteredBooks(results)
      setLoading(false)
    }
    loadBooks()
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...books]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author?.toLowerCase().includes(query) ||
        book.category?.toLowerCase().includes(query)
      )
    }

    // Apply genre filter
    if (genreFilter !== 'all') {
      result = result.filter(book =>
        book.category?.toLowerCase() === genreFilter.toLowerCase()
      )
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      result = result.filter(book => {
        if (!book.price) return false
        const price = parseFloat(book.price.replace('$', ''))
        switch(priceRange) {
          case 'under10': return price < 10
          case '10to15': return price >= 10 && price <= 15
          case 'over15': return price > 15
          default: return true
        }
      })
    }

    // Apply sorting
    switch(sortFilter) {
      case 'price-low':
        result.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace('$', '') || '0')
          const priceB = parseFloat(b.price?.replace('$', '') || '0')
          return priceA - priceB
        })
        break
      case 'price-high':
        result.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace('$', '') || '0')
          const priceB = parseFloat(b.price?.replace('$', '') || '0')
          return priceB - priceA
        })
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    setFilteredBooks(result)
  }, [books, searchQuery, genreFilter, priceRange, sortFilter])

  const categories = ['all', ...new Set(books.map(book => book.category || 'General'))]

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] flex flex-col">
        <div className="bg-white shadow-sm py-4 animate-pulse">
          <div className="max-w-6xl mx-auto px-4">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
          <div className="text-center mb-12">
            <div className="h-12 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-gray-200 rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex flex-col">
      <BookHero />

      <div className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="mb-8">
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            genreFilter={genreFilter}
            onGenreChange={setGenreFilter}
            sortFilter={sortFilter}
            onSortChange={setSortFilter}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            books={books}
            categories={categories}
          />
        </div>

        <BooksGrid books={filteredBooks} />
        
        {filteredBooks.length > 0 && (
          <ResultsCount 
            count={filteredBooks.length} 
            searchQuery={searchQuery}
            genreFilter={genreFilter}
            priceRange={priceRange}
          />
        )}
      </div>

      <Footer />
    </div>
  )
}