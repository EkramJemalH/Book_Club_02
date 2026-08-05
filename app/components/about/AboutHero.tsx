'use client'

import Header from '@/app/components/layout/Header'

interface AboutHeroProps {
  title: string
  subtitle: string
  description: string
  backgroundImage: string
}

export default function AboutHero({
  title,
  subtitle,
  description,
  backgroundImage,
}: AboutHeroProps) {
  return (
    <section
      className="min-h-[400px] max-h-[400px] flex flex-col overflow-hidden relative"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage}) center/cover no-repeat`,
      }}
    >
      {/* Blur overlay */}
      <div
        className="absolute inset-0 -top-2.5 -left-2.5 -right-2.5 -bottom-2.5 z-0"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage}) center/cover no-repeat`,
          filter: 'blur(2px)',
          WebkitFilter: 'blur(2px)',
        }}
      />

      {/* Header */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Hero Content - Left Aligned */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 py-6 items-start text-left max-w-[60%] ml-0">
        <h1 className="font-libertinus font-black text-white text-left text-5xl sm:text-6xl lg:text-7xl mb-2 drop-shadow-lg">
          {title}
        </h1>

        <h3 className="font-libertinus font-normal text-white text-left text-xl sm:text-2xl lg:text-3xl mb-2 drop-shadow">
          {subtitle}
        </h3>

        <p className="font-libertinus font-normal text-white/90 text-left text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed ml-0 drop-shadow">
          {description}
        </p>
      </div>
    </section>
  )
}