'use client'

import Link from 'next/link'
import { Book } from '@/app/types'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  // Get the book ID from the key or use a fallback
  const bookId = book.id || book.key || `book-${Math.random()}`
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <Link href={`/books/${bookId}`}>
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
          {book.pageCount && book.pageCount > 0 && (
            <div className="absolute bottom-3 right-3 bg-[#2d2a24]/80 text-white text-xs px-2 py-1 rounded-full">
              {book.pageCount} pages
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
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          className="w-full px-4 py-2 bg-[#2d2a24] text-white text-sm rounded-full hover:bg-[#D3A376] transition-all duration-300 hover:scale-[1.02] transform"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            alert(`📚 Added "${book.title}" to cart!`)
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}