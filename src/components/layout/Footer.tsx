'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { NAV_LINKS, VEHICLE_CATEGORIES } from '@/lib/constants'
import { companyInfo } from '@/data/companyInfo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contact"
      style={{
        background: '#0a0f1c',
        color: '#fff',
        paddingTop: '80px',
        paddingBottom: 0,
      }}
    >
      <div className="container-wide">
        {/* Top bar: brand + CTA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '20px',
            flexWrap: 'wrap',
            paddingBottom: '40px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            marginBottom: '48px',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                color: '#fff',
                fontSize: '22px',
                fontWeight: 800,
                marginBottom: '8px',
              }}
            >
              GEOS Enterprises
            </h3>
            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '14px',
                maxWidth: '380px',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Specialized vehicle provisioning for Government &amp; Corporate sectors. 100%
              Commercially Plated Fleet since 1988.
            </p>
          </div>
          <Link
            href="/#call-basis-form"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '13px',
              background: '#fff',
              color: '#0a0f1c',
              padding: '12px 22px',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'all 0.3s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f5f3f0' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
          >
            Book a Vehicle
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* 4-column grid */}
        <div className="footer-columns">
          {/* Contact */}
          <div>
            <h4
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '13.5px',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                <Phone size={13} style={{ flexShrink: 0, marginTop: '3px', opacity: 0.5 }} />
                {companyInfo.phone}
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '13.5px',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                <Mail size={13} style={{ flexShrink: 0, marginTop: '3px', opacity: 0.5 }} />
                {companyInfo.email}
              </a>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '13.5px',
                }}
              >
                <MapPin size={13} style={{ flexShrink: 0, marginTop: '3px', opacity: 0.5 }} />
                <span style={{ lineHeight: 1.6 }}>{companyInfo.address.full}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{
                      color: 'rgba(255,255,255,0.55)',
                      fontSize: '13.5px',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-policy"
                  style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Fleet */}
          <div>
            <h4
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              Fleet
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {VEHICLE_CATEGORIES.filter(c => c !== 'All').map((c) => (
                <li key={c}>
                  <Link
                    href={`/marketplace?category=${encodeURIComponent(c)}`}
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              Legal
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'GST', val: companyInfo.gst },
                { label: 'CIN', val: companyInfo.cin },
                { label: 'Est.', val: String(companyInfo.establishedYear) },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.25)',
                      marginBottom: '3px',
                    }}
                  >
                    {item.label}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', margin: 0, lineHeight: 1.6 }}>
                    {item.val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            padding: '22px 0',
            marginTop: '56px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 }}>
            &copy; {year} GEOS Enterprises. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap' }}>
            {['100% Taxi Plated', 'GST Registered', 'All India Permit'].map((b) => (
              <span key={b} style={{ color: 'rgba(255,255,255,0.25)', fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.06em' }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-columns {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }
        @media (min-width: 640px) {
          .footer-columns { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .footer-columns { grid-template-columns: 1.4fr 1fr 1fr 1fr; }
        }
      `}</style>
    </footer>
  )
}
