'use client'

interface ResultsCountProps {
  count: number
  searchQuery?: string
  genreFilter?: string
}

export default function ResultsCount({ 
  count, 
  searchQuery = '', 
  genreFilter = 'all' 
}: ResultsCountProps) {
  let message = `Showing ${count} books`
  
  if (searchQuery) {
    message += ` for "${searchQuery}"`
  }
  
  if (genreFilter !== 'all') {
    message += ` in ${genreFilter}`
  }

  return (
    <div className="results-count" id="resultsCount">
      <span>{message}</span>
    </div>
  )
}