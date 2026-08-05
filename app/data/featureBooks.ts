import { FeaturedBook } from '@/app/types'

// Custom data for featured books with prices
export const CUSTOM_FEATURED_BOOKS: Omit<FeaturedBook, 'imageUrl' | 'description' | 'rating'>[] = [
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    tag: 'BESTSELLER',
    category: 'Self-Development',
    price: '$16.99',
    isbn: '9780735211292'
  },
  {
    id: 'the-alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    tag: 'POPULAR',
    category: 'Fiction / Inspirational',
    price: '$12.99',
    isbn: '9780062502174'
  },
  {
    id: 'ikigai',
    title: 'Ikigai',
    author: 'Héctor García & Francesc Miralles',
    tag: 'TRENDING',
    category: 'Self-Development',
    price: '$14.99',
    isbn: '9780143130727'
  },
  {
    id: 'psychology-of-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    tag: 'EDITORS PICK',
    category: 'Finance / Personal Development',
    price: '$18.99',
    isbn: '9780857197689'
  }
]

// Default fallback data with complete information
export const FALLBACK_FEATURED_BOOKS: FeaturedBook[] = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    tag: 'BESTSELLER',
    category: 'Self-Development',
    rating: 4.8,
    price: '$16.99',
    imageUrl: '/images/book-placeholder.jpg',
    description: 'A practical guide to building good habits and breaking bad ones.',
    isbn: '9780735211292'
  },
  {
    id: '2',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    tag: 'POPULAR',
    category: 'Fiction / Inspirational',
    rating: 4.7,
    price: '$12.99',
    imageUrl: '/images/book-placeholder.jpg',
    description: 'A philosophical story about following your dreams.',
    isbn: '9780062502174'
  },
  {
    id: '3',
    title: 'Ikigai',
    author: 'Héctor García & Francesc Miralles',
    tag: 'TRENDING',
    category: 'Self-Development',
    rating: 4.6,
    price: '$14.99',
    imageUrl: '/images/book-placeholder.jpg',
    description: 'Discover the Japanese secret to a long and happy life.',
    isbn: '9780143130727'
  },
  {
    id: '4',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    tag: 'EDITORS PICK',
    category: 'Finance / Personal Development',
    rating: 4.8,
    price: '$18.99',
    imageUrl: '/images/book-placeholder.jpg',
    description: 'Timeless lessons on wealth, greed, and happiness.',
    isbn: '9780857197689'
  }
]