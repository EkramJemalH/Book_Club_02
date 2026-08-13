import Link from 'next/link'

export default function BookNotFound() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-4xl font-bold text-[#2d2a24] mb-2 font-libertinus">
          Book Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the book you're looking for.
        </p>
        <Link 
          href="/books" 
          className="inline-block px-6 py-3 bg-[#D3A376] text-white rounded-lg hover:bg-[#b8895e] transition-colors"
        >
          Browse All Books
        </Link>
      </div>
    </div>
  )
}