'use client'

import { useState, useEffect } from 'react'
import SearchFilter from './SearchFilter'
import { Book } from '@/app/types'
import { getAllBooks } from '@/app/services/bookApi'
import BookHero from '@/app/components/books/BookHero'
import Footer from '@/app/components/layout/Footer'

// Fallback data directly in the component
const FALLBACK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A story of the mysteriously wealthy Jay Gatsby and his obsessive love for Daisy Buchanan.',
    price: '$14.99',
    rating: 4.5,
    category: 'Fiction'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'The story of racial injustice and moral growth in the American South during the 1930s.',
    price: '$12.99',
    rating: 4.8,
    category: 'Fiction'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel set in a totalitarian society ruled by Big Brother.',
    price: '$11.99',
    rating: 4.7,
    category: 'Fiction'
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'The story of Elizabeth Bennet and Mr. Darcy navigating love and social expectations.',
    price: '$13.99',
    rating: 4.6,
    category: 'Romance'
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A fantasy adventure about Bilbo Baggins and his journey to reclaim the Lonely Mountain.',
    price: '$15.99',
    rating: 4.8,
    category: 'Fantasy'
  },
  {
    id: '6',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description: 'The story of Holden Caulfield in New York City exploring themes of alienation and identity.',
    price: '$10.99',
    rating: 4.3,
    category: 'Fiction'
  },
  {
    id: '7',
    title: 'Dune',
    author: 'Frank Herbert',
    description: 'A sci-fi epic about Paul Atreides on the desert planet Arrakis.',
    price: '$18.99',
    rating: 4.9,
    category: 'Science Fiction'
  },
  {
    id: '8',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'A philosophical story about a shepherd on his journey to find his personal legend.',
    price: '$14.99',
    rating: 4.4,
    category: 'Philosophy'
  },
  {
    id: '9',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    description: 'A mystery thriller about a symbologist investigating a murder in the Louvre.',
    price: '$12.99',
    rating: 4.2,
    category: 'Mystery'
  }
]

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

  // Get unique categories for the filter
  const categories = ['all', ...new Set(books.map(book => book.category || 'General'))]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] flex flex-col">
        {/* Loading Skeleton */}
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
      {/* Hero Section */}
      <BookHero />

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        {/* Search & Filter */}
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

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-[#2d2a24]">
                {filteredBooks.length} Book{filteredBooks.length > 1 ? 's' : ''} Found
              </h2>
              {filteredBooks.length < books.length && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setGenreFilter('all')
                    setPriceRange('all')
                    setSortFilter('default')
                  }}
                  className="text-sm text-[#D3A376] hover:text-[#b8895e] underline"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div 
                  key={book.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="h-48 bg-gradient-to-br from-[#f0ece6] to-[#e5ddd4] relative overflow-hidden">
                    <img
                      src={book.imageUrl || '/images/book-placeholder.jpg'}
                      alt={book.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/book-placeholder.jpg'
                      }}
                    />
                    {book.rating && (
                      <div className="absolute top-3 right-3 bg-[#2d2a24]/90 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <span>⭐</span>
                        {book.rating.toFixed(1)}
                      </div>
                    )}
                    {book.category && (
                      <div className="absolute bottom-3 left-3 bg-white/90 text-[#2d2a24] text-xs px-2 py-1 rounded-full">
                        {book.category}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#2d2a24] mb-1 line-clamp-2 group-hover:text-[#D3A376] transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      by {book.author || 'Unknown Author'}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {book.description}
                    </p>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                      <span className="text-lg font-bold text-[#D3A376]">
                        {book.price}
                      </span>
                      <button
                        className="px-4 py-1.5 bg-[#2d2a24] text-white text-sm rounded-full hover:bg-[#D3A376] transition-all duration-300 hover:scale-105 transform"
                        onClick={() => alert(`📚 Added "${book.title}" to cart!`)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center text-gray-600 mt-8">
              Showing <span className="font-semibold text-[#2d2a24]">{filteredBooks.length}</span> books
              {searchQuery && ` for "${searchQuery}"`}
              {genreFilter !== 'all' && ` in ${genreFilter}`}
              {priceRange !== 'all' && ` (${priceRange === 'under10' ? 'Under $10' : priceRange === '10to15' ? '$10-$15' : 'Over $15'})`}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-[#2d2a24] mb-2">No Books Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery || genreFilter !== 'all' || priceRange !== 'all'
                ? `No results found matching your criteria. Try adjusting your search or filters.`
                : 'No books available at the moment. Check back later!'}
            </p>
            {(searchQuery || genreFilter !== 'all' || priceRange !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setGenreFilter('all')
                  setPriceRange('all')
                  setSortFilter('default')
                }}
                className="mt-4 px-6 py-2 bg-[#D3A376] text-white rounded-full hover:bg-[#b8895e] transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}