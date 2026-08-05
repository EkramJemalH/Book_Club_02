'use client'

import { Book } from '@/app/types'

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  genreFilter: string
  onGenreChange: (genre: string) => void
  sortFilter: string
  onSortChange: (sort: string) => void
  priceRange: string
  onPriceRangeChange: (range: string) => void
  books: Book[]
  categories: string[]
}

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  genreFilter,
  onGenreChange,
  sortFilter,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  books,
  categories
}: SearchFilterProps) {
  // Use categories from props, which are computed on the page.

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              id="searchInput"
              placeholder="Search for books by title, author, or genre..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search books"
              className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3A376] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row items-center">
          <select
            id="genreFilter"
            value={genreFilter}
            onChange={(e) => onGenreChange(e.target.value)}
            aria-label="Filter by genre"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3A376]"
          >
            <option value="all">All Genres</option>
            {categories.filter(c => c !== 'all').map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            id="priceRange"
            value={priceRange}
            onChange={(e) => onPriceRangeChange(e.target.value)}
            aria-label="Filter by price range"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3A376]"
          >
            <option value="all">All Prices</option>
            <option value="under10">Under $10</option>
            <option value="10to15">$10 - $15</option>
            <option value="over15">Over $15</option>
          </select>

          <select
            id="sortFilter"
            value={sortFilter}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort books"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3A376]"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="title">Title: A-Z</option>
            <option value="title-desc">Title: Z-A</option>
          </select>
        </div>
      </div>
    </div>
  )
}