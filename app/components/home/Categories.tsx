'use client'

import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Book02Icon,
  HeartIcon,
  SparklesIcon,
  BriefcaseIcon,
  ChipIcon,
  SearchIcon,
  UserIcon,
  GraduationCapIcon,
} from '@hugeicons/core-free-icons'

interface Category {
  name: string
  description: string
  icon: any
  href: string
  color?: string
}

const categories: Category[] = [
  {
    name: 'Fiction',
    description: 'Stories, novels, and imaginative worlds',
    icon: Book02Icon,
    href: '/books?genre=fiction',
    color: 'text-blue-500'
  },
  {
    name: 'Romance',
    description: 'Love stories and romantic fiction',
    icon: HeartIcon,
    href: '/books?genre=romance',
    color: 'text-red-500'
  },
  {
    name: 'Self-Development',
    description: 'Personal growth, habits, and motivation',
    icon: SparklesIcon,
    href: '/books?genre=self-dev',
    color: 'text-green-500'
  },
  {
    name: 'Business & Finance',
    description: 'Entrepreneurship, investing, and leadership',
    icon: BriefcaseIcon,
    href: '/books?genre=business',
    color: 'text-blue-600'
  },
  {
    name: 'Technology',
    description: 'Programming, AI, software, and tech',
    icon: ChipIcon,
    href: '/books?genre=technology',
    color: 'text-purple-500'
  },
  {
    name: 'Mystery & Thriller',
    description: 'Suspenseful stories, crime, and mysteries',
    icon: SearchIcon,
    href: '/books?genre=mystery',
    color: 'text-orange-500'
  },
  {
    name: 'Biography & Memoir',
    description: 'Real-life stories and inspiring journeys',
    icon: UserIcon,
    href: '/books?genre=biography',
    color: 'text-indigo-500'
  },
  {
    name: "Children's Books",
    description: 'Stories and learning for young readers',
    icon: GraduationCapIcon,
    href: '/books?genre=children',
    color: 'text-pink-500'
  }
]

export default function Categories() {
  return (
    <section id="categories" className="browse-categories py-16 px-8 bg-white">
      <div className="container max-w-[1100px] mx-auto">
        {/* Section Header */}
        <div className="section-header text-center mb-12">
          <h2 className="font-libertinus text-5xl text-book-dark mb-2">
            Browse Categories
          </h2>
          <p className="font-libertinus text-lg text-gray-500">
            Explore books by your favorite genres
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="category-card bg-book-cream rounded-xl p-6 text-center no-underline text-book-dark transition-all duration-300 border-2 border-transparent flex flex-col items-center gap-2 hover:-translate-y-1 hover:border-book-gold hover:shadow-lg hover:bg-white"
            >
              <div className={`category-icon w-12 h-12 mb-1 transition-all duration-300 ${category.color}`}>
                <HugeiconsIcon
                  icon={category.icon}
                  size={48}
                  strokeWidth={1.5}
                  className="w-full h-full"
                />
              </div>
              <h3 className="font-libertinus text-lg font-bold text-book-dark m-0">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 m-0 leading-relaxed">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}