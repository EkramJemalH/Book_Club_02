'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  MapPinIcon,
  SmartPhone01Icon,
  Mail01Icon,
  Time02Icon,
} from '@hugeicons/core-free-icons'

const contactDetails = [
  {
    icon: MapPinIcon,
    title: 'Address',
    value: 'Bole Medhanealem, Addis Ababa, Ethiopia',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: SmartPhone01Icon,
    title: 'Phone',
    value: '+251 912 345 678',
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    icon: Mail01Icon,
    title: 'Email',
    value: 'info@bookclub.com',
    color: 'text-red-500',
    bgColor: 'bg-red-50'
  },
  {
    icon: Time02Icon,
    title: 'Working Hours',
    value: 'Mon - Sat: 9:00 AM - 6:00 PM',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  }
]

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <h2 className="font-libertinus text-5xl font-black text-book-dark mb-4">
        Get in Touch
      </h2>

      <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-lg">
        We'd love to hear from you! Whether you have a question about our books,
        need help with an order, or just want to share your reading experience,
        we're here for you.
      </p>

      <div className="contact-details flex flex-col gap-6">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon
          return (
            <div key={index} className="contact-item flex items-start gap-4">
              <div
                className={`contact-icon w-14 h-14 min-w-[56px] ${detail.bgColor} rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
              >
                <HugeiconsIcon icon={Icon} size={24} className={detail.color} />
              </div>
              <div>
                <h4 className="text-base font-semibold text-book-dark mb-0.5">
                  {detail.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {detail.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}