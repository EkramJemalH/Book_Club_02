'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-50">
      <div className="flex justify-between items-center px-4 sm:px-8 py-4 shadow-md flex-wrap bg-transparent">
        {/* Logo with Griffy Font */}
        <Link href="/" className="logo">
          <h1 className="font-griffy text-white text-2xl sm:text-3xl md:text-4xl font-normal m-0 hover:scale-105 transition-transform duration-300">
            BooKCluB
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:block">
          <ul className="flex list-none gap-6 lg:gap-8 m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`sm:hidden bg-black/90 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 py-4' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-4 m-0 p-0 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link text-white text-lg ${
                  pathname === link.href ? 'active' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}