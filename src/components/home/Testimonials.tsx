'use client'

import { useRef, useEffect, useState } from 'react'
import { BadgeCheck } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote:
      'GEOS has been our fleet partner for over a decade. Their commitment to compliance and on-time deployment across our Gujarat operations has been exceptional. Every vehicle, every contract — audit-ready.',
    name: 'Procurement Lead',
    role: 'Major PSU · Oil & Gas',
    avatar: 'P',
    stat: { val: '12 yrs', label: 'of partnership' },
    dark: false,
  },
  {
    quote:
      'We needed a 40-vehicle fleet across three states within two weeks. GEOS delivered — taxi-plated, GPS-tracked, full documentation. Their dispatch team works 24×7. Genuine professionals.',
    name: 'Operations Director',
    role: 'Infrastructure Corporation',
    avatar: 'O',
    stat: { val: '40', label: 'vehicles in 2 weeks' },
    dark: true,
  },
  {
    quote:
      'Running emergency response operations means zero tolerance for downtime. GEOS maintains our support fleet with complete documentation and ensures vehicles are always audit-ready for government inspection.',
    name: 'Fleet Manager',
    role: 'Emergency Response Services',
    avatar: 'F',
    stat: { val: '24×7', label: 'operational uptime' },
    dark: false,
  },

]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), 0)
          io.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: '#fff', padding: 'clamp(72px, 8vw, 120px) 0' }}
    >
      <div className="container-wide">
        {/* Header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            marginBottom: '52px',
          }}
        >
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
            Testimonials
            <span
              style={{
                display: 'block',
                width: '28px',
                height: '1.5px',
                background: 'currentColor',
                opacity: 0.5,
                borderRadius: '1px',
              }}
            />
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(30px, 3.4vw, 48px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: '#0a0f1c',
              maxWidth: '720px',
              margin: 0,
            }}
          >
            Long-term partners,{' '}
            <span style={{ color: '#c8956c', fontWeight: 800 }}>on the record.</span>
          </h2>
        </div>

        {/* Cards grid — 2 columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <figure
              key={idx}
              style={{
                position: 'relative',
                background: t.dark
                  ? 'linear-gradient(160deg, #0a0f1c 0%, #1a2332 100%)'
                  : '#f5f3f0',
                borderRadius: '24px',
                padding: 'clamp(28px, 3vw, 40px)',
                border: t.dark ? 'none' : '1px solid #e5e2dd',
                display: 'flex',
                flexDirection: 'column',
                margin: 0,
                overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(24px)',
                transition: `opacity 0.7s ease ${idx * 0.1}s, transform 0.7s ease ${idx * 0.1}s`,
              }}
            >
              {/* Amber glow on dark cards */}
              {t.dark && (
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: '-80px',
                    right: '-80px',
                    width: '300px',
                    height: '300px',
                    background:
                      'radial-gradient(circle, rgba(200,149,108,0.22) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Top: quote mark + stat */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px',
                  marginBottom: '28px',
                }}
              >
                <svg
                  width="42"
                  height="34"
                  viewBox="0 0 38 30"
                  fill={t.dark ? 'rgba(200,149,108,0.9)' : '#c8956c'}
                  aria-hidden
                  style={{ flexShrink: 0 }}
                >
                  <path d="M0 30V19.2C0 13.9 1.1 9.7 3.4 6.5 5.7 3.2 9.2 1.1 13.9 0l2.3 4.6c-2.9 1-5 2.5-6.3 4.4-1.3 1.9-2 4-2.1 6.4H16V30H0zm22 0V19.2c0-5.3 1.1-9.5 3.4-12.7C27.7 3.2 31.2 1.1 35.9 0l2.1 4.6c-2.9 1-5 2.5-6.3 4.4-1.3 1.9-2 4-2.1 6.4H38V30H22z" />
                </svg>
                {t.stat && (
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: 'clamp(26px, 2.6vw, 34px)',
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        color: t.dark ? '#c8956c' : '#0a0f1c',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {t.stat.val}
                    </div>
                    <div
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 500,
                        color: t.dark ? 'rgba(255,255,255,0.5)' : '#9ca3af',
                        marginTop: '4px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {t.stat.label}
                    </div>
                  </div>
                )}
              </div>

              {/* Quote */}
              <blockquote
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(16px, 1.6vw, 20px)',
                  lineHeight: 1.6,
                  color: t.dark ? 'rgba(255,255,255,0.88)' : '#2d3036',
                  margin: '0 0 32px',
                  flex: 1,
                }}
              >
                {t.quote}
              </blockquote>

              {/* Author */}
              <figcaption
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  paddingTop: '22px',
                  borderTop: `1px solid ${t.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)'}`,
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #c8956c 0%, #dbb08a 100%)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '18px',
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '15px',
                      color: t.dark ? '#fff' : '#0a0f1c',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: '12.5px',
                      color: t.dark ? 'rgba(255,255,255,0.55)' : '#6b7280',
                      marginTop: '2px',
                    }}
                  >
                    {t.role}
                  </div>
                </div>
                <span
                  style={{
                    marginLeft: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: t.dark ? '#5fd391' : '#1a7a42',
                    background: t.dark
                      ? 'rgba(95,211,145,0.1)'
                      : 'rgba(26,122,66,0.08)',
                    padding: '5px 11px',
                    borderRadius: '999px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  <BadgeCheck size={12} />
                  Verified
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
