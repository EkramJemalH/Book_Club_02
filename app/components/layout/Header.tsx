'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

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
          type="button"
          className="sm:hidden text-white focus:outline-none z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
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
        className={`sm:hidden absolute inset-x-0 top-full bg-black/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-[calc(100vh-72px)] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 40 }}
      >
        <ul className="flex flex-col items-center justify-center gap-8 m-0 p-0 list-none py-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link text-white text-2xl hover:text-book-gold transition-colors duration-300 ${
                  pathname === link.href ? 'active text-book-gold' : ''
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