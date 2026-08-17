'use client'

import Link from 'next/link'
import { useCart } from '@/app/components/cart/context/CartContext'

function getBookId(item: { id?: string; key?: string; title: string }) {
  return item.id || item.key || item.title
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-[#2d2a24] mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added any books yet.</p>
        <Link
          href="/books"
          className="inline-block px-6 py-2 bg-[#2d2a24] text-white rounded-full hover:bg-[#D3A376] transition-colors"
        >
          Browse Books
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#2d2a24]">
          Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {items.map(item => {
          const id = getBookId(item)
          return (
            <div
              key={id}
              className="flex items-center gap-4 bg-white rounded-lg shadow-sm p-4"
            >
              <img
                src={item.imageUrl || '/images/book-placeholder.jpg'}
                alt={item.title}
                className="w-16 h-20 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.src = '/images/book-placeholder.jpg'
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#2d2a24] truncate">{item.title}</h3>
                <p className="text-sm text-gray-500">by {item.author || 'Unknown Author'}</p>
                <p className="text-sm font-medium text-[#D3A376] mt-1">{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(id, item.quantity - 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(id, item.quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(id)}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>

      <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
        <span className="text-lg font-semibold text-[#2d2a24]">Total</span>
        <span className="text-2xl font-bold text-[#D3A376]">${totalPrice.toFixed(2)}</span>
      </div>

      <button className="w-full mt-6 px-6 py-3 bg-[#2d2a24] text-white rounded-full hover:bg-[#D3A376] transition-colors">
        Checkout
      </button>
    </div>
  )
}