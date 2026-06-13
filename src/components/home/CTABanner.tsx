'use client'

import Link from 'next/link'
import { ArrowUpRight, Phone } from 'lucide-react'
import { companyInfo } from '@/data/companyInfo'

export function CTABanner() {
  return (
    <section style={{ background: '#f5f3f0', padding: '80px 0' }}>
      <div className="container-wide">
        <div
          style={{
            background: 'linear-gradient(135deg, #0a0f1c 0%, #1a2332 100%)',
            borderRadius: '24px',
            padding: 'clamp(36px, 5vw, 56px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Amber glow */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(200,149,108,0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#c8956c',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '18px',
              }}
            >
              Let&apos;s talk
              <span style={{ display: 'block', width: '28px', height: '1.5px', background: 'currentColor', opacity: 0.5, borderRadius: '1px' }} />
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 3.2vw, 42px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#fff',
                marginBottom: '16px',
              }}
            >
              Need a fleet that&apos;s{' '}
              <span style={{ color: '#c8956c' }}>audit-ready</span> from day one?
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '15px',
                lineHeight: 1.7,
                maxWidth: '480px',
                margin: 0,
              }}
            >
              Whether you need one executive sedan for a week or 40 vehicles deployed across three
              states — our team responds within 2 hours. No bots, real fleet specialists.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Link
              href="/#call-basis-form"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '14px',
                background: '#c8956c',
                color: '#fff',
                padding: '16px 24px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#a87650')}
              onMouseLeave={e => (e.currentTarget.style.background = '#c8956c')}
            >
              Book Now
              <ArrowUpRight size={14} />
            </Link>
            <a
              href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '14px',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.18)',
                padding: '16px 24px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              <Phone size={14} />
              {companyInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
