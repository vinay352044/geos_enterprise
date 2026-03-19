'use client'

import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Box, IconButton } from '@mui/material'
import { X, Phone } from 'lucide-react'
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

  if (pathname.startsWith('/admin')) return null

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '320px',
          backgroundColor: '#12235A',
          color: '#ffffff',
        },
      }}
    >
      <Box className="flex flex-col h-full">
        {/* Header */}
        <Box className="flex justify-between items-center p-4 border-b border-white/10">
          <div className="relative h-10 w-10">
            <Image src="/images/geos-logo-new.jpg" alt="GEOS Enterprises" fill className="object-contain rounded" />
          </div>
          <IconButton
            onClick={handleClose}
            aria-label="Close menu"
            sx={{ color: '#ffffff' }}
          >
            <X size={24} />
          </IconButton>
        </Box>

        {/* Nav Links */}
        <List className="flex-1 py-4">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <ListItem key={link.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={handleClose}
                  sx={{
                    py: 1.5,
                    px: 3,
                    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                    borderLeft: isActive ? '3px solid #1E40AF' : '3px solid transparent',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: isActive ? 700 : 400,
                      fontSize: '16px',
                      color: '#ffffff',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* CTAs */}
        <Box className="p-4 space-y-3">
          <Link
            href="/#call-basis-form"
            onClick={handleClose}
            className="block w-full text-center bg-accent text-white font-heading font-bold text-base uppercase tracking-wide py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book a Vehicle
          </Link>
          <a
            href="https://portal.geosenterprises.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center border border-white/30 text-white font-heading font-semibold text-base uppercase tracking-wide py-3 px-6 rounded-md hover:bg-white/10 transition-colors"
          >
            Login to Portal
          </a>
          <Link
            href="/admin/login"
            onClick={handleClose}
            className="block w-full text-center border border-white/30 text-white font-heading font-semibold text-base uppercase tracking-wide py-3 px-6 rounded-md hover:bg-white/10 transition-colors"
          >
            Admin Login
          </Link>
        </Box>

        {/* Phone */}
        <Box className="px-4 pb-6">
          <a
            href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm"
          >
            <Phone size={16} />
            <span>{companyInfo.phone}</span>
          </a>
        </Box>
      </Box>
    </Drawer>
  )
}
