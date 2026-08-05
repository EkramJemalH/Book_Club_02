import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import ContactInfo from '@/app/components/contact/ContactInfo'
import ContactForm from '@/app/components/contact/ContactForm'

export default function ContactRoutePage() {
  return (
    <main>
      <Header />
      <section className="py-16 px-8 bg-book-cream">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
