'use client'

import { Book } from '@/app/types'
import { useState } from 'react'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    setTimeout(() => {
      alert(`📚 Added "${book.title}" to cart!`)
      setIsAddingToCart(false)
    }, 500)
  }

  const imageUrl = imageError
    ? '/images/book-placeholder.jpg'
    : book.imageUrl || '/images/book-placeholder.jpg'

  return (
    <div className="book-card">
      <div className="book-image">
        <div className="book-placeholder">
          <img
            src={imageUrl}
            alt={book.title}
            onError={(e) => {
              // 🔍 DEBUG: log the real failing URL before falling back
              console.warn(`⚠️ Cover image failed for "${book.title}":`, e.currentTarget.src)
              setImageError(true)
            }}
            loading="lazy"
          />
        </div>
        {book.tag && (
          <span className="book-badge">{book.tag}</span>
        )}
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="author">{book.author || book.authors?.[0] || 'Unknown Author'}</p>
        <div className="book-rating flex items-center gap-2 mb-1">
          <span className="stars text-yellow-500">⭐</span>
          <span className="rating-number text-sm font-semibold text-book-dark">
            {(book.rating || 4.5).toFixed(1)}
          </span>
        </div>
        <p className="book-description">
          {book.description || `${book.title} is a captivating book.`}
        </p>
        <div className="book-footer">
          <span className="book-price">{book.price || '$14.99'}</span>
          <button
            className={`btn-add-to-cart ${isAddingToCart ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}