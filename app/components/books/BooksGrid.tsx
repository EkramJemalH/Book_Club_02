'use client'

import { Book } from '@/app/types'
import BookCard from './BookCard'

interface BooksGridProps {
  books: Book[]
  loading?: boolean
}

export default function BooksGrid({ books, loading = false }: BooksGridProps) {
  // Loading skeleton
  if (loading) {
    return (
      <div className="books-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="book-card animate-pulse">
            <div className="book-image bg-gray-200"></div>
            <div className="book-info">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // No books
  if (!books || books.length === 0) {
    return (
      <div className="no-results">
        <h3>No Books Found</h3>
        <p>Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <div className="books-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}