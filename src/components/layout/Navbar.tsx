'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (pathname.startsWith('/admin')) return null

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          'bg-white/85 backdrop-blur-xl border-b',
          scrolled
            ? 'border-black/[0.06] shadow-[0_2px_10px_rgba(10,15,28,0.06)]'
            : 'border-black/[0.03] shadow-[0_1px_3px_rgba(10,15,28,0.03)]'
        )}
      >
        <div className="container-wide h-[76px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 outline-none group flex-shrink-0">
            <div className="relative h-12 w-12 rounded-xl overflow-hidden ring-1 ring-black/[0.06] shadow-[0_1px_3px_rgba(10,15,28,0.08)]">
              <Image
                src="/images/geos-logo-new.jpg"
                alt="GEOS Enterprises"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-[17px] tracking-tight text-[#0a0f1c]">
                GEOS
              </span>
              <span className="font-body text-[10.5px] font-medium tracking-[0.16em] uppercase text-[#6b7280] mt-1">
                Enterprises
              </span>
            </div>
          </Link>

          {/* Desktop Nav — centered */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-[13px] font-body font-medium rounded-lg transition-colors duration-200 outline-none',
                    isActive
                      ? 'text-[#0a0f1c]'
                      : 'text-[#6b7280] hover:text-[#0a0f1c]'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#0a0f1c]"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <a
              href="https://portal.geosenterprises.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-body font-medium text-[#6b7280] hover:text-[#0a0f1c] transition-colors duration-200"
            >
              Login
            </a>

            <Link
              href="/#call-basis-form"
              className="flex items-center gap-2 font-heading font-semibold text-[13px] px-5 py-2.5 rounded-lg bg-[#0a0f1c] text-white hover:bg-[#1a2332] transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#0a0f1c] hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-[70] shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-10">
                  <span className="font-heading font-bold text-[15px] text-[#0a0f1c]">Menu</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'px-4 py-3 text-[15px] font-body rounded-lg transition-colors',
                          isActive
                            ? 'text-[#0a0f1c] font-medium bg-[#f5f3f0]'
                            : 'text-[#6b7280] hover:text-[#0a0f1c] hover:bg-[#f5f3f0]'
                        )}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-8 pt-6 border-t border-[#e5e2dd]">
                  <Link
                    href="/#call-basis-form"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full font-heading font-semibold text-[14px] text-white bg-[#0a0f1c] px-6 py-3.5 rounded-lg hover:bg-[#1a2332] transition-colors"
                  >
                    Book a Vehicle
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
