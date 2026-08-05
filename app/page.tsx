import HomeHero from '@/app/components/home/Hero'
import FeaturedBooks from '@/app/components/home/FeaturedBooks'
import Categories from '@/app/components/home/Categories'
import Footer from '@/app/components/layout/Footer'

export default function Home() {
  return (
    <main>
      <HomeHero />
      <FeaturedBooks />
      <Categories/>
      <Footer />
    </main>
  )
}