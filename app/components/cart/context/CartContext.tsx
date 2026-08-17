'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Book, CartItem } from '@/app/types'

interface CartContextType {
  items: CartItem[]
  addToCart: (book: Book) => void
  removeFromCart: (bookId: string) => void
  updateQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'book-club-cart'

function getBookId(book: Book) {
  return book.id || book.key || book.title
}

// price may come in as "$12.99" or a number — normalize it
function parsePrice(price: Book['price']) {
  if (typeof price === 'number') return price
  if (typeof price === 'string') {
    const num = parseFloat(price.replace(/[^0-9.]/g, ''))
    return isNaN(num) ? 0 : num
  }
  return 0
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch (err) {
      console.error('Failed to load cart from storage', err)
    } finally {
      setHydrated(true)
    }
  }, [])

  // Persist on every change (skip the very first render before hydration)
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  function addToCart(book: Book) {
    const id = getBookId(book)
    setItems(prev => {
      const existing = prev.find(item => getBookId(item) === id)
      if (existing) {
        return prev.map(item =>
          getBookId(item) === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...book, quantity: 1 }]
    })
  }

  function removeFromCart(bookId: string) {
    setItems(prev => prev.filter(item => getBookId(item) !== bookId))
  }

  function updateQuantity(bookId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(bookId)
      return
    }
    setItems(prev =>
      prev.map(item => (getBookId(item) === bookId ? { ...item, quantity } : item))
    )
  }

  function clearCart() {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}