'use client'

import Header from '@/app/components/layout/Header'

type BookHeroProps = {
  title?: string
  subtitle?: string
  description?: string
  backgroundImage?: string
}

export default function BookHero({
  title = "Our Book Collection",
  subtitle = "Explore Our Curated Selection of Books",
  description = "Discover a world of knowledge, adventure, and inspiration through our carefully curated collection of books. From timeless classics to contemporary bestsellers, our library offers something for every reader. Dive into the pages and embark on a literary journey that will captivate your imagination and enrich your mind.",
}: BookHeroProps) {
  const heroStyle = {
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#2d2a24",
  }

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>
      <section
        className="book-hero relative flex min-h-[420px] items-center justify-center overflow-hidden"
        style={heroStyle}
      >
        <div className="absolute inset-0 bg-book-dark/60" />
        <div className="relative z-10 px-8 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-book-gold">
            {subtitle}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            {description}
          </p>
        </div>
      </section>
    </>
  )
}