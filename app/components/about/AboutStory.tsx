'use client'

import Image from 'next/image'

export default function AboutStory() {
  return (
    <section className="our-story py-16 px-8 bg-book-cream">
      <div className="container max-w-[1200px] mx-auto">
        <div className="story-grid grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="story-image relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/book_shop.jpg"
              alt="Bookstore interior"
              width={600}
              height={400}
              className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
              <span className="text-5xl opacity-80">📚</span>
            </div>
          </div>

          {/* Content */}
          <div className="story-content">
            <h2 className="font-libertinus text-5xl font-black text-book-dark mb-4">
              Our Story
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              BookClub was created for readers who believe there's always another great story waiting to be discovered. We bring together a carefully selected collection of books, making it easy for you to explore, discover, and purchase books that inspire, entertain, and stay with you long after the last page.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              From timeless classics to modern bestsellers, every book in our collection is chosen with care. We're passionate about connecting readers with stories that matter.
            </p>
            <a
              href="/books"
              className="btn-story inline-block bg-book-gold text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#b8895e] hover:-translate-y-1 hover:shadow-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}