'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, ChevronRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store'
import { setMobileMenuOpen } from '@/store/slices/uiSlice'
import { NAV_LINKS } from '@/lib/constants'
import { companyInfo } from '@/data/companyInfo'

export function MobileMenu() {
  const dispatch = useAppDispatch()
  const open = useAppSelector((s) => s.ui.mobileMenuOpen)
  const pathname = usePathname()

  const handleClose = () => dispatch(setMobileMenuOpen(false))

  // Close on route change
  useEffect(() => {
    handleClose()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (pathname.startsWith('/admin')) return null

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[320px] flex flex-col overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #0A1628 0%, #0D1B3E 100%)',
              borderLeft: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Subtle orb */}
            <div
              className="absolute top-0 right-0 pointer-events-none"
              style={{
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Header */}
            <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
              <Link href="/" onClick={handleClose} className="flex items-center gap-3 outline-none">
                <div className="relative h-8 w-8 rounded-lg overflow-hidden ring-1 ring-white/15">
                  <Image src="/images/geos-logo-new.jpg" alt="GEOS Enterprises" fill className="object-cover" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-heading font-bold text-white text-sm">GEOS</span>
                  <span className="font-body text-[10px] text-blue-200/50 tracking-widest uppercase">Enterprises</span>
                </div>
              </Link>
              <button
                onClick={handleClose}
                className="flex items-center justify-center w-9 h-9 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="relative flex-1 py-4 overflow-y-auto">
              <div className="px-3 space-y-0.5">
                {NAV_LINKS.map((link, idx) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 + 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={handleClose}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group"
                        style={{
                          backgroundColor: isActive ? 'rgba(37,99,235,0.12)' : 'transparent',
                          borderLeft: isActive ? '2px solid #2563EB' : '2px solid transparent',
                        }}
                      >
                        <span
                          className="font-heading font-semibold text-base"
                          style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)' }}
                        >
                          {link.label}
                        </span>
                        <ChevronRight
                          size={16}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                          style={{ color: isActive ? '#2563EB' : 'rgba(255,255,255,0.25)' }}
                        />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </nav>

            {/* Bottom CTAs */}
            <div className="relative px-5 pb-8 pt-4 space-y-3 border-t border-white/[0.07]">
              <Link
                href="/#call-basis-form"
                onClick={handleClose}
                className="flex items-center justify-center gap-2 w-full font-heading font-bold text-sm uppercase tracking-wider text-white py-3.5 px-6 rounded-xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #C21E35 0%, #7A1525 100%)',
                  boxShadow: '0 4px 20px rgba(142,27,45,0.4)',
                }}
              >
                Book a Vehicle
              </Link>

              <a
                href="https://portal.geosenterprises.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full font-heading font-semibold text-sm uppercase tracking-wider text-blue-200/70 py-3.5 px-6 rounded-xl hover:text-white hover:bg-white/[0.06] transition-all border border-white/10"
              >
                Login to Portal
                <ArrowUpRight size={14} />
              </a>

              {/* Phone */}
              <a
                href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 text-sm font-body text-blue-200/40 hover:text-blue-200/70 transition-colors pt-1"
              >
                <Phone size={14} />
                {companyInfo.phone}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
