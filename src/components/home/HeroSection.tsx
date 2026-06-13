'use client'

import { ArrowRight, Phone, Check, Shield } from 'lucide-react'
import Link from 'next/link'
import { companyInfo } from '@/data/companyInfo'

const HERO_STATS = [
  { val: '500+', label: 'Fleet Vehicles', detail: 'All categories' },
  { val: '35+', label: 'Years', detail: 'Est. 1988' },
  { val: '100%', label: 'Taxi Plated', detail: 'Zero exceptions' },
  { val: '25+', label: 'PSU Clients', detail: 'Govt + Enterprise' },
]

const TRUST_ITEMS = [
  'GST Registered',
  'All India Permit',
  '24×7 Ops Support',
  'GPS Tracked Fleet',
]

export function HeroSection() {
  return (
    <section
      id="home"
      style={{ position: 'relative', paddingTop: '76px', overflow: 'hidden' }}
    >
      {/* Full-bleed background with dark overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '76px 0 0 0',
          zIndex: 0,
          backgroundImage: `
            linear-gradient(105deg, rgba(10,15,28,0.92) 0%, rgba(10,15,28,0.78) 42%, rgba(10,15,28,0.30) 100%),
            url('https://images.unsplash.com/photo-1542362567-b07e54358753?w=1800&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}
      >
        {/* Grid overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 30% 50%, #000 40%, transparent 80%)',
          }}
        />
      </div>

      {/* Hero content */}
      <div
        className="container-wide"
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '720px',
          display: 'flex',
          alignItems: 'stretch',
          paddingTop: '56px',
          paddingBottom: '120px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '56px',
            width: '100%',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left: editorial content */}
          <div>
            {/* Eyebrow pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '7px 14px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '28px',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 12px #22c55e',
                  flexShrink: 0,
                }}
              />
              Est. 1988 · Trusted by Govt. of India
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(40px, 5.6vw, 76px)',
                lineHeight: 1.02,
                letterSpacing: '-0.035em',
                color: '#fff',
                marginBottom: '24px',
                maxWidth: '740px',
              }}
            >
              Commercial Fleet,
              <br />
              Driven by{' '}
              <span
                style={{
                  color: '#c8956c',
                  fontStyle: 'normal',
                  fontWeight: 800,
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                Compliance
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '-4px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #c8956c 0%, transparent 100%)',
                    borderRadius: '2px',
                    opacity: 0.6,
                    display: 'block',
                  }}
                />
              </span>
              .
            </h1>

            {/* Sub */}
            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.72)',
                maxWidth: '560px',
                marginBottom: '36px',
              }}
            >
              500+{' '}
              <strong style={{ color: '#fff', fontWeight: 600 }}>100% Taxi-Plated</strong>{' '}
              vehicles serving PSUs, government bodies, and India&apos;s largest corporations.
              Audit-ready paperwork. Zero exceptions.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '32px',
              }}
            >
              <Link
                href="/#call-basis-form"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  background: '#c8956c',
                  color: '#fff',
                  padding: '14px 26px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#a87650'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#c8956c'; e.currentTarget.style.transform = 'none' }}
              >
                Book Now
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  background: '#fff',
                  color: '#0a0f1c',
                  border: '1px solid #e5e2dd',
                  padding: '14px 26px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a0f1c' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e2dd' }}
              >
                Contact Us
              </Link>

              {/* Phone pill */}
              <a
                href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '4px 4px 4px 18px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '999px',
                  color: '#fff',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
              >
                <div>
                  <span style={{ display: 'block', fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', lineHeight: 1, marginBottom: '4px' }}>
                    24×7 dispatch
                  </span>
                  <span style={{ display: 'block', lineHeight: 1, letterSpacing: '-0.01em' }}>
                    {companyInfo.phone}
                  </span>
                </div>
                <span
                  style={{
                    width: '42px',
                    height: '42px',
                    display: 'grid',
                    placeItems: 'center',
                    background: '#c8956c',
                    borderRadius: '50%',
                  }}
                >
                  <Phone size={16} color="#fff" />
                </span>
              </a>
            </div>

            {/* Trust items */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '22px', alignItems: 'center' }}>
              {TRUST_ITEMS.map((t) => (
                <div
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12.5px',
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 500,
                  }}
                >
                  <Check size={13} color="#22c55e" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right: glass Quick Quote card */}
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(24px)',
              borderRadius: '24px',
              padding: '32px',
              color: '#fff',
              boxShadow: '0 32px 80px -20px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3
                  style={{
                    color: '#fff',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  Quick Quote
                </h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Response within 2 hours</p>
              </div>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#c8956c',
                  padding: '4px 9px',
                  borderRadius: '6px',
                  background: 'rgba(200,149,108,0.14)',
                  border: '1px solid rgba(200,149,108,0.3)',
                }}
              >
                On-Call
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Pickup', val: 'Ahmedabad' },
                { label: 'Drop', val: 'Anywhere · India' },
                { label: 'Vehicle', val: 'SUV / Tempo Traveller' },
                { label: 'Start Date', val: 'Pick a date' },
              ].map((f) => (
                <div
                  key={f.label}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px',
                    padding: '12px 14px',
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.5)',
                      marginBottom: '6px',
                    }}
                  >
                    {f.label}
                  </label>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{f.val}</div>
                </div>
              ))}
              <div
                style={{
                  gridColumn: '1/-1',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: '6px',
                  }}
                >
                  Contract Type
                </label>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Daily · Weekly · Monthly</div>
              </div>
            </div>

            <Link
              href="/#call-basis-form"
              style={{
                marginTop: '14px',
                width: '100%',
                background: '#c8956c',
                color: '#fff',
                padding: '13px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '0.02em',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#a87650')}
              onMouseLeave={e => (e.currentTarget.style.background = '#c8956c')}
            >
              Get a Tailored Quote
              <ArrowRight size={14} />
            </Link>

            <div
              style={{
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(200,149,108,0.16)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#c8956c',
                  flexShrink: 0,
                }}
              >
                <Shield size={15} />
              </div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                <strong style={{ color: '#fff', fontWeight: 600 }}>Trusted by ONGC, BPCL, Adani, Vedanta</strong>
                <br />
                &amp; 20+ corporates / PSUs across India.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating stats strip */}
      <div
        className="container-wide"
        style={{
          position: 'relative',
          zIndex: 3,
          marginTop: '-40px',
          marginBottom: '64px',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: 'clamp(20px, 3vw, 28px) clamp(24px, 4vw, 36px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '28px',
            boxShadow: '0 24px 60px -20px rgba(10,15,28,0.18)',
            border: '1px solid rgba(0,0,0,0.04)',
          }}
        >
          {HERO_STATS.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  color: '#0a0f1c',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {s.val}
              </div>
              <div style={{ fontSize: '12.5px', color: '#0a0f1c', fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: '11.5px', color: '#9ca3af', marginTop: '2px' }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.15fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
