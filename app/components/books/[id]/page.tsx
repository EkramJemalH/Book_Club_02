import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllBooks, getBookById } from '@/app/services/bookApi'
import Footer from '@/app/components/layout/Footer'
import Header from '@/app/components/layout/Header'

// Generate static paths for all books
export async function generateStaticParams() {
  const books = await getAllBooks()
  return books.map((book) => ({
    id: book.id,
  }))
}

// Generate metadata for each book
export async function generateMetadata({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id)
  
  if (!book) {
    return {
      title: 'Book Not Found',
    }
  }

  return {
    title: `${book.title} | BookClub`,
    description: book.description || `Read ${book.title} by ${book.author}`,
  }
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  // Get buy link from ISBN if available
  const buyLink = book.isbn 
    ? `https://openlibrary.org/isbn/${book.isbn}`
    : 'https://openlibrary.org'

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex flex-col">
      <Header />

      {/* Back Button */}
      <div className="max-w-6xl mx-auto w-full px-4 py-6">
        <Link 
          href="/books" 
          className="inline-flex items-center text-[#D3A376] hover:text-[#b8895e] transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Books
        </Link>
      </div>

      {/* Book Detail */}
      <div className="flex-1 max-w-6xl mx-auto px-4 pb-12 w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Book Image */}
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-[#f0ece6] to-[#e5ddd4] rounded-lg overflow-hidden">
                <img
                  src={book.imageUrl || '/images/book-placeholder.jpg'}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/book-placeholder.jpg'
                  }}
                />
              </div>
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {book.category && (
                  <span className="bg-[#D3A376] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {book.category}
                  </span>
                )}
                {book.rating && (
                  <span className="bg-[#2d2a24] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    ⭐ {book.rating.toFixed(1)}
                  </span>
                )}
                {book.pageCount && book.pageCount > 0 && (
                  <span className="bg-[#2d2a24]/80 text-white px-3 py-1 rounded-full text-sm">
                    {book.pageCount} pages
                  </span>
                )}
              </div>
            </div>

            {/* Book Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-[#2d2a24] mb-2 font-libertinus">
                {book.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-4">
                by <span className="font-semibold">{book.author || 'Unknown Author'}</span>
              </p>

              <div className="text-3xl font-bold text-[#D3A376] mb-4">
                {book.price || 'Price not available'}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#2d2a24] mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {book.description || 'No description available for this book.'}
                </p>
              </div>

              {/* Additional Details */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  {book.category && (
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium text-[#2d2a24]">{book.category}</p>
                    </div>
                  )}
                  {book.rating && (
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="font-medium text-[#2d2a24]">⭐ {book.rating.toFixed(1)} / 5.0</p>
                    </div>
                  )}
                  {book.isbn && (
                    <div>
                      <p className="text-sm text-gray-500">ISBN</p>
                      <p className="font-medium text-[#2d2a24]">{book.isbn}</p>
                    </div>
                  )}
                  {book.publishedDate && (
                    <div>
                      <p className="text-sm text-gray-500">Published</p>
                      <p className="font-medium text-[#2d2a24]">{book.publishedDate}</p>
                    </div>
                  )}
                  {book.publisher && (
                    <div>
                      <p className="text-sm text-gray-500">Publisher</p>
                      <p className="font-medium text-[#2d2a24]">{book.publisher}</p>
                    </div>
                  )}
                  {book.pageCount && book.pageCount > 0 && (
                    <div>
                      <p className="text-sm text-gray-500">Pages</p>
                      <p className="font-medium text-[#2d2a24]">{book.pageCount}</p>
                    </div>
                  )}
                  {book.authors && book.authors.length > 1 && (
                    <div>
                      <p className="text-sm text-gray-500">Authors</p>
                      <p className="font-medium text-[#2d2a24]">{book.authors.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  className="w-full py-3 bg-[#D3A376] text-white rounded-lg font-semibold hover:bg-[#b8895e] transition-all duration-300 hover:scale-[1.02] transform"
                  onClick={() => alert(`📚 Added "${book.title}" to cart!`)}
                >
                  Add to Cart - {book.price || 'Price not available'}
                </button>
                
                {book.isbn && (
                  <a
                    href={buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#2d2a24] text-white rounded-lg font-semibold hover:bg-[#1a1814] transition-all duration-300 hover:scale-[1.02] transform text-center"
                  >
                    View on Open Library
                  </a>
                )}
              </div>

              {/* Share Section */}
              <div className="mt-4 flex items-center gap-4">
                <span className="text-sm text-gray-500">Share:</span>
                <button 
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    const url = window.location.href
                    const text = `Check out "${book.title}" by ${book.author}`
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button 
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    const url = window.location.href
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}