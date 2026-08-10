import ContactHero from '@/app/components/contact/ContactHero'
import ContactInfo from '@/app/components/contact/ContactInfo'
import ContactForm from '@/app/components/contact/ContactForm'
import Footer from '@/app/components/layout/Footer'

export default function ContactPage() {
  return (
    <main>
      <ContactHero
        title="CONTACT US"
        subtitle="We'd love to hear from you!"
        description="Have questions, feedback, or just want to say hello? Reach out to us and we'll get back to you as soon as possible. Your thoughts and inquiries are important to us."
        backgroundImage="/images/contact_background.jpg"
      />

      <section className="contact-section py-16 px-8 bg-book-cream">
        <div className="container max-w-[1200px] mx-auto">
          <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    
    </main>
  )
}