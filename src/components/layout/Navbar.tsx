'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(() => setMobileOpen(false))
    return () => cancelAnimationFrame(id)
  }, [pathname])

  if (pathname.startsWith('/admin')) return null

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
          boxShadow: scrolled ? '0 2px 12px rgba(10,15,28,0.06)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          className="container-wide"
          style={{
            height: '76px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 2px 8px -2px rgba(10,15,28,0.18)',
                border: '1px solid rgba(0,0,0,0.06)',
                position: 'relative',
              }}
            >
              <Image
                src="/images/geos-logo-new.jpg"
                alt="GEOS Enterprises"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '17px',
                  color: '#0a0f1c',
                  letterSpacing: '-0.02em',
                }}
              >
                GEOS
              </span>
              <span
                style={{
                  fontSize: '9.5px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#6b7280',
                  marginTop: '4px',
                }}
              >
                Enterprises
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav
            className="hidden-mobile"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            aria-label="Main"
          >
            {NAV_LINKS.map((l) => {
              const isActive = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: isActive ? '#0a0f1c' : '#6b7280',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: isActive ? '#f5f3f0' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#0a0f1c' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#6b7280' }}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search — hidden on mobile */}
            <div
              className="hidden-mobile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#f5f3f0',
                border: '1px solid transparent',
                borderRadius: '999px',
                padding: '8px 16px',
                fontSize: '12.5px',
                color: '#6b7280',
                minWidth: '170px',
                cursor: 'text',
              }}
            >
              <Search size={13} />
              <span style={{ fontFamily: 'var(--font-body)' }}>Search fleet…</span>
            </div>

            <a
              href="https://portal.geosenterprises.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden-mobile"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#6b7280',
                padding: '8px 14px',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0a0f1c')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
            >
              Login
            </a>

            <Link
              href="/#call-basis-form"
              className="hidden-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '12.5px',
                background: '#0a0f1c',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a2332'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0a0f1c'; e.currentTarget.style.transform = 'none' }}
            >
              Book Now
            </Link>

            {/* Mobile hamburger */}
            <button
              style={{
                display: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'none',
                border: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0a0f1c',
                cursor: 'pointer',
              }}
              className="show-mobile"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 60 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '300px',
                background: '#fff',
                zIndex: 70,
                boxShadow: '0 0 60px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '15px', color: '#0a0f1c' }}>Menu</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    aria-label="Close menu"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {NAV_LINKS.map((l) => {
                    const isActive = pathname === l.href
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          padding: '12px 16px',
                          fontSize: '15px',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? '#0a0f1c' : '#6b7280',
                          background: isActive ? '#f5f3f0' : 'transparent',
                          borderRadius: '10px',
                          textDecoration: 'none',
                        }}
                      >
                        {l.label}
                      </Link>
                    )
                  })}
                </nav>

                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e2dd' }}>
                  <Link
                    href="/#call-basis-form"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#fff',
                      background: '#0a0f1c',
                      padding: '14px 24px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                    }}
                  >
                    Book a Vehicle
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1024px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 1023px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
