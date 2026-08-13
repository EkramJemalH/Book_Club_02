'use client'

interface ResultsCountProps {
  count: number
  searchQuery?: string
  genreFilter?: string
  priceRange?: string
}

export default function ResultsCount({ 
  count, 
  searchQuery = '', 
  genreFilter = 'all',
  priceRange = 'all',
}: ResultsCountProps) {
  let message = `Showing ${count} books`
  
  if (searchQuery) {
    message += ` for "${searchQuery}"`
  }
  
  if (genreFilter !== 'all') {
    message += ` in ${genreFilter}`
  }

  if (priceRange !== 'all') {
    const label = priceRange === 'under10' ? 'under $10' : priceRange === '10to15' ? '$10–$15' : 'over $15'
    message += ` (${label})`
  }

  return (
    <div className="results-count" id="resultsCount">
      <span>{message}</span>
    </div>
  )
}