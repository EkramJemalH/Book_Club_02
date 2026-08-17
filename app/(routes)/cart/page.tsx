// app/(routes)/cart/page.tsx
import CartPage from '@/app/components/cart/CartPage'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'

export default function Page() {
  return (
    <>
     <div className="bg-black/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <Header />
      </div>
      <CartPage />
      <Footer />
    </>
  )
}