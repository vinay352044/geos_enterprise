'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Shield, CheckCircle, FileText, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { companyInfo } from '@/data/companyInfo'
import { NAV_LINKS, VEHICLE_CATEGORIES } from '@/lib/constants'

const complianceBadges = [
  { icon: CheckCircle, text: '100% Taxi Plated Fleet', color: '#4ADE80' },
  { icon: Shield, text: 'GST Registered', color: '#60A5FA' },
  { icon: FileText, text: 'All India Tourist Permit', color: '#FBBF24' },
  { icon: CheckCircle, text: 'Commercial Insurance', color: '#4ADE80' },
]

export function Footer() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  if (pathname.startsWith('/admin')) return null

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #06101E 0%, #040B16 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Compliance strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <div className="container-wide py-3">
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center items-center">
            {complianceBadges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-xs font-heading font-semibold tracking-wide"
                  style={{ color: badge.color }}
                >
                  <Icon size={13} />
                  <span>{badge.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="container-wide py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <h3 className="font-heading font-bold text-white text-lg mb-1">GEOS Enterprises</h3>
              <div className="h-0.5 w-8 rounded-full" style={{ backgroundColor: '#8E1B2D' }} />
            </div>
            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Specialized vehicle provisioning for Government &amp; Corporate sectors. 100% Commercially Plated Fleet serving India&apos;s critical infrastructure since 1988.
            </p>

            <div className="space-y-3">
              <a
                href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-3 group transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ backgroundColor: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)' }}>
                  <Phone size={13} style={{ color: '#60A5FA' }} />
                </div>
                <span className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <span className="group-hover:text-white transition-colors">{companyInfo.phone}</span>
                </span>
              </a>

              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-3 group transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)' }}>
                  <Mail size={13} style={{ color: '#60A5FA' }} />
                </div>
                <span className="font-body text-sm group-hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {companyInfo.email}
                </span>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)' }}>
                  <MapPin size={13} style={{ color: '#60A5FA' }} />
                </div>
                <span className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {companyInfo.address.full}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm font-body group transition-colors"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors flex-shrink-0" />
                    <span className="group-hover:text-white transition-colors">{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="flex items-center gap-1.5 text-sm font-body group transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  <span className="w-1 h-1 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors flex-shrink-0" />
                  <span className="group-hover:text-white transition-colors">Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Fleet Categories */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">
              Fleet Categories
            </h4>
            <ul className="space-y-3">
              {VEHICLE_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/fleet?category=${encodeURIComponent(cat)}`}
                    className="flex items-center gap-1.5 text-sm font-body group transition-colors"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-500/40 group-hover:bg-amber-400 transition-colors flex-shrink-0" />
                    <span className="group-hover:text-white transition-colors">{cat}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & CTA */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5">
              Legal &amp; Compliance
            </h4>
            <div className="space-y-3 text-sm font-body mb-8">
              {[
                { label: 'GST', value: companyInfo.gst },
                { label: 'CIN', value: companyInfo.cin },
                { label: 'Est.', value: companyInfo.establishedYear },
              ].map((item) => (
                <div key={item.label}>
                  <span className="font-heading font-semibold text-xs uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {item.label}
                  </span>
                  <p style={{ color: 'rgba(255,255,255,0.55)' }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Book CTA */}
            <Link
              href="/#call-basis-form"
              className="inline-flex items-center gap-2 font-heading font-bold text-xs uppercase tracking-wider text-white px-5 py-3 rounded-xl transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #C21E35 0%, #7A1525 100%)',
                boxShadow: '0 4px 16px rgba(142,27,45,0.35)',
              }}
            >
              Book a Vehicle
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © {currentYear} GEOS Enterprises. All rights reserved.
          </p>
          <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Corporate vehicle rental India · PSU fleet logistics
          </p>
        </div>
      </div>
    </footer>
  )
}
