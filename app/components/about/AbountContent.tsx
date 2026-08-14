import Footer from '@/app/components/layout/Footer'
import AboutHero from '@/app/components/about/AboutHero'
import AboutStory from '@/app/components/about/AboutStory'
import WhyShop from '@/app/components/about/WhyShop'
import CtaSection from '@/app/components/about/CtaSection'

export default function AboutPage() {
  return (
    <main>
      <AboutHero
        title="ABOUT BOOKCLUB"
        subtitle="Your Next Great Read Starts Here."
        description="At BookClub, we make it easy to discover and shop for books you'll love. From timeless classics to modern bestsellers, explore our collection and find the perfect book to add to your shelf."
        backgroundImage="/images/about_us_background.jpg"
      />

      
      <AboutStory />
      <WhyShop />
      <CtaSection/>
      <Footer />
    </main>
  )
}