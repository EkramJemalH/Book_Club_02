'use client'

import { Book } from '@/app/types'
import BookCard from './BookCard'

interface BooksGridProps {
  books: Book[]
}

export default function BooksGrid({ books }: BooksGridProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-md">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-[#2d2a24] mb-2">No Books Found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          No books available at the moment. Check back later!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id || book.title} book={book} />
      ))}
    </div>
  )
}