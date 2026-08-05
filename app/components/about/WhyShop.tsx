'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  BookOpen01Icon,
  Search01Icon,
  ShoppingBag01Icon,
  HeartIcon,
} from '@hugeicons/core-free-icons'

const features = [
  {
    icon: BookOpen01Icon,
    title: 'Curated Collection',
    description: 'Discover a selection of books across different genres and interests.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Search01Icon,
    title: 'Easy to Discover',
    description: 'Find your next favorite book with simple browsing and categories.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  },
  {
    icon: ShoppingBag01Icon,
    title: 'Simple Shopping',
    description: 'Explore our collection and shop for your favorite books with ease.',
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    icon: HeartIcon,
    title: 'For Every Reader',
    description: "Whether you're looking for a bestseller or a hidden gem, there's something for you.",
    color: 'text-red-500',
    bgColor: 'bg-red-50'
  }
]

export default function WhyShop() {
  return (
    <section className="why-shop py-16 px-8 bg-white">
      <div className="container max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="section-header text-center mb-12">
          <h2 className="font-libertinus text-5xl text-book-dark mb-2">
            Why Shop With BookClub?
          </h2>
          <p className="font-libertinus text-lg text-gray-500">
            We make discovering your next favorite book simple and enjoyable
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="feature-card bg-book-cream p-8 rounded-2xl text-center transition-all duration-300 border-2 border-transparent hover:-translate-y-2 hover:border-book-gold hover:shadow-lg hover:bg-white"
              >
                <div className={`feature-icon w-16 h-16 mx-auto mb-4 rounded-full ${feature.bgColor} flex items-center justify-center transition-all duration-300`}>
                  <HugeiconsIcon icon={Icon} size={24} className={feature.color} />
                </div>
                <h3 className="font-libertinus text-xl font-bold text-book-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}