'use client'

import { Box, Grid, Typography, Divider } from '@mui/material'
import { Phone, Mail, MapPin, Shield, CheckCircle, FileText } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { companyInfo } from '@/data/companyInfo'
import { NAV_LINKS, VEHICLE_CATEGORIES } from '@/lib/constants'

export function Footer() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  if (pathname.startsWith('/admin')) return null

  return (
    <Box component="footer" sx={{ backgroundColor: '#0D2B5E', color: '#ffffff' }}>
      {/* Compliance Banner */}
      <Box sx={{ backgroundColor: '#081A3E', py: 2, px: 4 }}>
        <Box
          sx={{
            maxWidth: '1400px',
            mx: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {[
            { icon: <CheckCircle size={16} />, text: '100% Taxi Plated Fleet' },
            { icon: <Shield size={16} />, text: 'GST Registered' },
            { icon: <FileText size={16} />, text: 'All India Tourist Permit' },
            { icon: <CheckCircle size={16} />, text: 'Commercial Insurance' },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-green-300 text-sm font-heading font-semibold">
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          ))}
        </Box>
      </Box>

      {/* Main Footer */}
      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 700, color: '#ffffff', mb: 2 }}
            >
              GEOS Enterprises
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#93C5FD', mb: 3, lineHeight: 1.7, maxWidth: '300px' }}
            >
              Specialized vehicle provisioning for Government &amp; Corporate sectors. 100% Commercially
              Plated Fleet serving India&apos;s critical infrastructure since 2009.
            </Typography>

            <div className="space-y-2">
              <a
                href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm"
              >
                <Phone size={16} className="flex-shrink-0" />
                <span>{companyInfo.phone}</span>
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm"
              >
                <Mail size={16} className="flex-shrink-0" />
                <span>{companyInfo.email}</span>
              </a>
              <div className="flex items-start gap-2 text-blue-200 text-sm">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>{companyInfo.address.full}</span>
              </div>
            </div>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 700, color: '#ffffff', mb: 2 }}
            >
              Quick Links
            </Typography>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy-policy" className="text-blue-200 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Fleet Categories */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 700, color: '#ffffff', mb: 2 }}
            >
              Fleet Categories
            </Typography>
            <ul className="space-y-2">
              {VEHICLE_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/fleet?category=${encodeURIComponent(cat)}`}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>

          {/* GST & Legal */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 700, color: '#ffffff', mb: 2 }}
            >
              Legal &amp; Compliance
            </Typography>
            <div className="space-y-2 text-sm text-blue-200">
              <p>
                <span className="text-white font-semibold">GST:</span> {companyInfo.gst}
              </p>
              <p>
                <span className="text-white font-semibold">CIN:</span> {companyInfo.cin}
              </p>
              <p>
                <span className="text-white font-semibold">Est.:</span>{' '}
                {companyInfo.establishedYear}
              </p>
            </div>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* Copyright */}
      <Box
        sx={{
          maxWidth: '1400px',
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: 3,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: '#93C5FD' }}>
          © {currentYear} GEOS Enterprises. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ color: '#93C5FD' }}>
          Corporate vehicle rental India | PSU fleet logistics
        </Typography>
      </Box>
    </Box>
  )
}
