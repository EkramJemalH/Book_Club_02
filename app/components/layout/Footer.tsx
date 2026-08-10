'use client'

import Link from 'next/link'

// Social Media Icons
const SocialIcon = ({ children, href, label }: { children: React.ReactNode; href: string; label: string }) => (
  <a
    href={href}
    aria-label={label}
    className="footer-social-link flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white/60 transition-all duration-300 hover:bg-[#D3A376] hover:text-white hover:-translate-y-1"
  >
    {children}
  </a>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
    <path d="M15 8a4 4 0 0 0 4 4V7a3 3 0 0 1-3-3h-4v13"/>
  </svg>
)

// Footer Link Component
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li className="mb-3">
    <Link href={href} className="footer-link text-white/60 no-underline text-sm transition-colors hover:text-[#D3A376]">
      {children}
    </Link>
  </li>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1a1814] text-white/80 pt-16 pb-6 px-4 sm:px-8">
      <div className="container max-w-[1200px] mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-10 border-b border-white/10">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link href="/" className="block">
              <h2 className="font-griffy text-3xl text-white font-normal mb-3 hover:text-[#D3A376] transition-colors">
                BookClub
              </h2>
            </Link>
            <p className="text-sm leading-relaxed text-white/60 max-w-[300px] mb-4">
              Stories worth reading. Get your next favorite book from us.
            </p>
            <div className="footer-social flex gap-3">
              <SocialIcon href="https://instagram.com" label="Instagram">
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon href="https://facebook.com" label="Facebook">
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon href="https://tiktok.com" label="TikTok">
                <TikTokIcon />
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3 className="text-white text-lg font-semibold mb-4 font-libertinus">
              Quick Links
            </h3>
            <ul className="list-none p-0 m-0">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/books">Shop</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/#categories">Categories</FooterLink>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-links">
            <h3 className="text-white text-lg font-semibold mb-4 font-libertinus">
              Customer Care
            </h3>
            <ul className="list-none p-0 m-0">
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/faq">FAQs</FooterLink>
              <FooterLink href="/shipping">Shipping</FooterLink>
              <FooterLink href="/returns">Returns</FooterLink>
            </ul>
          </div>

          {/* Follow Us - Social Links */}
          <div className="footer-links">
            <h3 className="text-white text-lg font-semibold mb-4 font-libertinus">
              Follow Us
            </h3>
            <ul className="list-none p-0 m-0">
              <FooterLink href="https://instagram.com">Instagram</FooterLink>
              <FooterLink href="https://facebook.com">Facebook</FooterLink>
              <FooterLink href="https://tiktok.com">TikTok</FooterLink>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-white/40 gap-4 md:gap-0">
          <p>&copy; {currentYear} BookClub. All rights reserved.</p>
          <div className="footer-legal flex items-center gap-3">
            <Link 
              href="/privacy" 
              className="text-white/40 no-underline transition-colors hover:text-[#D3A376]"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link 
              href="/terms" 
              className="text-white/40 no-underline transition-colors hover:text-[#D3A376]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}