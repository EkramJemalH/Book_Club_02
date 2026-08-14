'use client'

import emailjs from "@emailjs/browser"
import {useRef} from "react"

import { useState, FormEvent } from 'react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const formRef=useRef<HTMLFormElement>(null)
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setIsSubmitting(true)
  setSubmitStatus({ type: null, message: '' })

  try {
    if (!formRef.current) return

    console.log(
  "EmailJS public key exists:",
  !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
)

console.log(
  "EmailJS service exists:",
  !!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
)

console.log(
  "EmailJS template exists:",
  !!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
)

    // Send the contact message to you
    await emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      formRef.current,
      {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      }
    )

    // Send auto-reply to the visitor
    await emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      'template_iszr8k9',
      formRef.current,
      {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      }
    )

    setSubmitStatus({
      type: 'success',
      message:
        "Your message has been sent successfully! We'll get back to you soon.",
    })

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  } catch (error) {
    console.error('EmailJS Error:', error)

    setSubmitStatus({
      type: 'error',
      message: 'Something went wrong. Please try again later.',
    })
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <div className="contact-form-wrapper bg-white p-8 rounded-2xl shadow-md">
      <h2 className="font-libertinus text-3xl font-black text-book-dark mb-6">
        Send Us a Message
      </h2>

        <form
          ref={formRef}
          className="contact-form flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
        <div className="form-group flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-book-dark">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#e8e4df] rounded-xl text-sm font-inherit transition-all duration-300 bg-[#faf8f6] text-book-dark focus:outline-none focus:border-book-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(211,163,118,0.1)]"
          />
        </div>

        <div className="form-group flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-book-dark">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#e8e4df] rounded-xl text-sm font-inherit transition-all duration-300 bg-[#faf8f6] text-book-dark focus:outline-none focus:border-book-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(211,163,118,0.1)]"
          />
        </div>

        <div className="form-group flex flex-col gap-1.5">
          <label htmlFor="subject" className="text-sm font-semibold text-book-dark">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Book Inquiry"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#e8e4df] rounded-xl text-sm font-inherit transition-all duration-300 bg-[#faf8f6] text-book-dark focus:outline-none focus:border-book-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(211,163,118,0.1)]"
          />
        </div>

        <div className="form-group flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-book-dark">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Write your message here..."
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#e8e4df] rounded-xl text-sm font-inherit transition-all duration-300 bg-[#faf8f6] text-book-dark resize-y min-h-[120px] focus:outline-none focus:border-book-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(211,163,118,0.1)]"
          />
        </div>

        {/* Status Message */}
        {submitStatus.message && (
          <div
            className={`p-3 rounded-xl text-sm ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-submit bg-book-gold text-white border-none px-10 py-3.5 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 mt-2 ${
            isSubmitting
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-[#b8895e] hover:-translate-y-1 hover:shadow-lg hover:shadow-book-gold/30'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}