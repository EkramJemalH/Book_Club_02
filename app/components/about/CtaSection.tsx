'use client'

import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="cta-section py-16 px-8 bg-book-dark text-center">
      <div className="container max-w-[800px] mx-auto">
        <div className="cta-content">
          <h2 className="font-libertinus text-5xl font-black text-white mb-3">
            Ready to Find Your Next Book?
          </h2>
          <p className="font-libertinus text-xl text-white/70 mb-8">
            Explore our collection and discover a story waiting for you.
          </p>
          <Link
            href="/books"
            className="btn-cta inline-block bg-book-gold text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-[#b8895e] hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
          >
            Shop Books
          </Link>
        </div>
      </div>
    </section>
  )
}