import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BookClub - Stories Worth Reading',
  description: 'Discover your next favorite book. Explore our curated collection of books across all genres.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-libertinus antialiased">
        {children}
      </body>
    </html>
  )
}