'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAppDispatch } from '@/store'
import { setMobileMenuOpen } from '@/store/slices/uiSlice'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname.startsWith('/admin')) return null

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#07101F]/92 backdrop-blur-2xl border-b border-white/[0.07] shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      )}
    >
      {/* Main navbar */}
      <div className="container-wide h-16 md:h-[68px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 outline-none group flex-shrink-0"
        >
          <div className="relative h-9 w-9 rounded-xl overflow-hidden ring-1 ring-white/15 group-hover:ring-white/30 transition-all duration-300 shadow-lg">
            <Image
              src="/images/geos-logo-new.jpg"
              alt="GEOS Enterprises"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-heading font-bold text-white text-[15px] tracking-wide">
              GEOS
            </span>
            <span className="font-body text-[11px] text-blue-200/60 font-normal tracking-widest uppercase">
              Enterprises
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-4 py-2 text-[13px] font-heading font-semibold tracking-wide rounded-lg transition-colors duration-200 outline-none',
                  isActive
                    ? 'text-white'
                    : 'text-blue-100/60 hover:text-white hover:bg-white/[0.06]'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/[0.1]"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <a
            href="https://portal.geosenterprises.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-[13px] font-heading font-semibold text-blue-100/60 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.06]"
          >
            Login
          </a>

          <Link
            href="/#call-basis-form"
            className="flex items-center gap-2 text-white font-heading font-bold text-[13px] uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #C21E35 0%, #7A1525 100%)',
              boxShadow: '0 0 0 1px rgba(220,38,57,0.25), 0 4px 20px rgba(142,27,45,0.35)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.boxShadow = '0 0 0 1px rgba(220,38,57,0.4), 0 8px 30px rgba(142,27,45,0.55)'
              el.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.boxShadow = '0 0 0 1px rgba(220,38,57,0.25), 0 4px 20px rgba(142,27,45,0.35)'
              el.style.transform = 'translateY(0)'
            }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-white hover:bg-white/10 transition-colors"
          onClick={() => dispatch(setMobileMenuOpen(true))}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>
    </motion.header>
  )
}
