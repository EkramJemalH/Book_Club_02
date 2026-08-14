import Footer from '@/app/components/layout/Footer'
import ContactHero from '@/app/components/contact/ContactHero'
import ContactInfo from '@/app/components/contact/ContactInfo'
import ContactForm from '@/app/components/contact/ContactForm'
import Header from '@/app/components/layout/Header'
export default function ContactRoutePage() {
  return (
    <main>
      <ContactHero
        title="CONTACT US"
        subtitle="We'd love to hear from you!"
        description="Have questions, feedback, or just want to say hello? Reach out to us and we'll get back to you as soon as possible. Your thoughts and inquiries are important to us."
        backgroundImage="/images/contact_background.jpg"
      />
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
