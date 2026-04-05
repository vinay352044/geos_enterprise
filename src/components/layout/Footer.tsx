'use client'

import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { companyInfo } from '@/data/companyInfo'
import { NAV_LINKS, VEHICLE_CATEGORIES } from '@/lib/constants'

export function Footer() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  if (pathname.startsWith('/admin')) return null

  return (
    <footer className="bg-[#0a0f1c]">
      {/* Main footer body */}
      <div className="container-wide pt-16 pb-12 md:pt-20 md:pb-14">
        {/* Top section — brand + CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 pb-10 border-b border-white/[0.06]">
          <div>
            <h3 className="font-heading font-bold text-white text-xl mb-2 tracking-tight">
              GEOS Enterprises
            </h3>
            <p className="font-body text-sm leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Specialized vehicle provisioning for Government &amp; Corporate sectors.
              100% Commercially Plated Fleet since 1988.
            </p>
          </div>
          <Link
            href="/#call-basis-form"
            className="inline-flex items-center gap-2 font-heading font-semibold text-[13px] text-[#0a0f1c] bg-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-[#f5f3f0] flex-shrink-0"
          >
            Book a Vehicle
            <ArrowUpRight size={14} strokeWidth={2} />
          </Link>
        </div>

        {/* Grid columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">

          {/* Contact */}
          <div>
            <h4 className="font-body font-medium text-white text-[13px] mb-5">Contact</h4>
            <div className="space-y-3.5">
              <a href={`tel:${companyInfo.phone.replace(/\D/g, '')}`} className="flex items-center gap-3 group">
                <Phone size={13} style={{ color: 'rgba(255,255,255,0.25)' }} strokeWidth={1.5} />
                <span className="font-body text-sm group-hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {companyInfo.phone}
                </span>
              </a>
              <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-3 group">
                <Mail size={13} style={{ color: 'rgba(255,255,255,0.25)' }} strokeWidth={1.5} />
                <span className="font-body text-sm group-hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {companyInfo.email}
                </span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={13} style={{ color: 'rgba(255,255,255,0.25)', marginTop: '3px' }} strokeWidth={1.5} />
                <span className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {companyInfo.address.full}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-medium text-white text-[13px] mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm hover:text-white transition-colors"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="font-body text-sm hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Fleet */}
          <div>
            <h4 className="font-body font-medium text-white text-[13px] mb-5">Fleet</h4>
            <ul className="space-y-2.5">
              {VEHICLE_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/fleet?category=${encodeURIComponent(cat)}`}
                    className="font-body text-sm hover:text-white transition-colors"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-body font-medium text-white text-[13px] mb-5">Legal</h4>
            <div className="space-y-3 text-sm font-body">
              {[
                { label: 'GST', value: companyInfo.gst },
                { label: 'CIN', value: companyInfo.cin },
                { label: 'Est.', value: companyInfo.establishedYear },
              ].map((item) => (
                <div key={item.label}>
                  <span className="font-body text-[11px] font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    {item.label}
                  </span>
                  <p style={{ color: 'rgba(255,255,255,0.45)' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — minimal */}
      <div className="border-t border-white/[0.04]">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            &copy; {currentYear} GEOS Enterprises. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['100% Taxi Plated', 'GST Registered', 'All India Permit'].map((badge) => (
              <span key={badge} className="font-body text-[10px] font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.15)' }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
