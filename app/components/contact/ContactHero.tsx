'use client'
import Header from '@/app/components/layout/Header'



type ContactHeroProps = {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string
}

export default function ContactHero({
  title,
  subtitle = "We'd love to hear from you!",
  description = "Have questions, feedback, or just want to say hello?",
  backgroundImage = "/images/contact_background.jpg",
}: ContactHeroProps) {
  const heroStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#2d2a24",
  }

  return (
    <section
      className="contact-hero relative flex min-h-[420px] items-center justify-center overflow-hidden"
      style={heroStyle}
    >
      <div className="absolute inset-x-0 top-0 z-20 bg-black/30 backdrop-blur-md">
      <Header/>
      </div>
      <div className="absolute inset-0 bg-book-dark/60" />
      <div className="relative z-10 px-8 py-20 pt-28 text-center">
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
  )
}
