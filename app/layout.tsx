import type { Metadata } from 'next'
import './globals.css'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import { CartProvider } from '@/app/components/cart/context/CartContext'


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
        <CartProvider>
        {children}
        </CartProvider>
      </body>
    </html>
  )
}