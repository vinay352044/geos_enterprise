'use client'

import { useState, useEffect } from 'react'
import { AppBar, Toolbar, IconButton, Box } from '@mui/material'
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
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname.startsWith('/admin')) return null

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 4 : 2}
      sx={{
        top: 0,
        backgroundColor: '#12235A',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Toolbar sx={{ maxWidth: '1400px', mx: 'auto', width: '100%', px: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', outline: 'none', display: 'inline-flex', alignItems: 'center' }}>
            <div className="relative h-12 w-12">
              <Image
                src="/images/geos-logo-new.jpg"
                alt="GEOS Enterprises"
                fill
                className="object-contain rounded"
                priority
              />
            </div>
          </Link>
        </Box>

        {/* Desktop Nav */}
        <Box
          component="nav"
          sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-heading font-semibold text-sm uppercase tracking-wide px-4 py-2 rounded transition-colors',
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-blue-100 hover:text-white hover:bg-white/10',
                )}
              >
                {link.label}
              </Link>
            )
          })}

          {/* Login */}
          <a
            href="https://portal.geosenterprises.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-semibold text-sm uppercase tracking-wide px-4 py-2 rounded transition-colors text-blue-100 hover:text-white hover:bg-white/10 border border-white/20"
          >
            Login
          </a>

          {/* Admin Login */}
          <Link
            href="/admin/login"
            className="font-heading font-semibold text-sm uppercase tracking-wide px-4 py-2 rounded transition-colors text-blue-100 hover:text-white hover:bg-white/10 border border-white/20"
          >
            Admin Login
          </Link>

          {/* Book Now CTA */}
          <Link
            href="/#call-basis-form"
            className="ml-2 font-heading font-bold text-sm uppercase tracking-wide bg-crimson text-white px-6 py-2.5 rounded hover:bg-crimson-dark transition-colors min-h-[44px] flex items-center"
          >
            Book Now
          </Link>
        </Box>

        {/* Mobile Hamburger */}
        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' }, color: '#ffffff' }}
          onClick={() => dispatch(setMobileMenuOpen(true))}
          aria-label="Open menu"
          aria-expanded="false"
        >
          <Menu size={24} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
