'use client'

import { useRef, useEffect, useState } from 'react'
import { ShieldCheck, Users, Zap, Globe, ArrowUpRight, CheckCircle } from 'lucide-react'

const PILLARS = [
  {
    num: '01',
    title: 'Full Compliance',
    desc: '100% commercially plated fleet. Every vehicle verified, insured, and compliant with all government regulations. GST registered with all-India permit.',
    Icon: ShieldCheck,
    bullets: ['100% Taxi Plated', 'GST Registered', 'All India Permit'],
  },
  {
    num: '02',
    title: 'Earned Trust',
    desc: 'Over 35 years of relationship-driven business. Our clients return because we treat every contract as a long-term commitment, not a transaction.',
    Icon: Users,
    bullets: ['25+ PSU Clients', 'Est. 1988', 'Repeat partnerships'],
  },
  {
    num: '03',
    title: 'Reliability',
    desc: 'On-time deployment, responsive 24×7 support, and zero-compromise on service quality — whether one vehicle or a fleet of a hundred.',
    Icon: Zap,
    bullets: ['2-hr response time', '24×7 dispatch ops', 'GPS tracked fleet'],
  },
  {
    num: '04',
    title: 'Pan-India Scale',
    desc: 'From executive sedans to heavy-duty fleet across India. One trusted partner for end-to-end vehicle provisioning, paperwork, and operational support.',
    Icon: Globe,
    bullets: ['500+ vehicles', 'All states covered', 'Single-point contact'],
  },
]

export function WhyChooseUs() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      style={{
        background: '#0a0f1c',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(72px, 8vw, 120px) 0',
      }}
    >
      {/* Decorative glows */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-180px',
          left: '-180px',
          width: '560px',
          height: '560px',
          background:
            'radial-gradient(circle, rgba(200,149,108,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-120px',
          right: '-120px',
          width: '400px',
          height: '400px',
          background:
            'radial-gradient(circle, rgba(51,102,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section header — 2 col layout */}
        <div className="why-head-grid" style={{ marginBottom: '64px' }}>
          <div>
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
              Why GEOS
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
                fontSize: 'clamp(32px, 3.8vw, 54px)',
                letterSpacing: '-0.035em',
                lineHeight: 1.03,
                color: '#fff',
                margin: 0,
              }}
            >
              Built on{' '}
              <span style={{ color: '#c8956c' }}>four</span>
              <br />
              principles.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '20px' }}>
            <p
              style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.75,
                margin: 0,
                maxWidth: '440px',
              }}
            >
              Every vehicle we deploy, every contract we sign — guided by the same
              principles our founder set in 1988. These aren&apos;t marketing words; they&apos;re
              the reason clients return year after year.
            </p>
            {/* Small trust bar */}
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {['500+ Vehicles', '35+ Years', '25+ PSU Clients'].map(item => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#c8956c',
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars grid */}
        <div ref={gridRef} className="pillars-grid">
          {PILLARS.map((p, i) => (
            <div
              key={p.num}
              className="pillar-card"
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '32px 28px 36px',
                display: 'flex',
                flexDirection: 'column',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(32px)',
                transition: `opacity 0.65s cubic-bezier(0.23,1,0.32,1) ${0.07 + i * 0.12}s, transform 0.65s cubic-bezier(0.23,1,0.32,1) ${0.07 + i * 0.12}s`,
              }}
            >
              {/* Top accent bar */}
              <div
                className="pillar-accent"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background:
                    'linear-gradient(90deg, #c8956c 0%, rgba(200,149,108,0) 100%)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
                  borderRadius: '3px 3px 0 0',
                }}
              />

              {/* Icon row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <div
                  className="pillar-icon-wrap"
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '15px',
                    background:
                      'linear-gradient(135deg, rgba(200,149,108,0.18) 0%, rgba(200,149,108,0.05) 100%)',
                    border: '1px solid rgba(200,149,108,0.28)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#c8956c',
                    transition: 'all 0.4s ease',
                  }}
                >
                  <p.Icon size={26} />
                </div>
                <span
                  className="pillar-num"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '42px',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: 'rgba(255,255,255,0.06)',
                    transition: 'color 0.4s ease',
                    userSelect: 'none',
                  }}
                >
                  {p.num}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '21px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '12px',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {p.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.48)',
                  lineHeight: 1.7,
                  margin: '0 0 24px',
                }}
              >
                {p.desc}
              </p>

              {/* Bullet list */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: 'auto',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {p.bullets.map(b => (
                  <div
                    key={b}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.55)',
                    }}
                  >
                    <CheckCircle
                      size={13}
                      style={{ color: '#c8956c', flexShrink: 0 }}
                    />
                    {b}
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <span
                className="pillar-arrow"
                style={{
                  position: 'absolute',
                  bottom: '28px',
                  right: '28px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'rgba(255,255,255,0.3)',
                  transition: 'all 0.35s ease',
                }}
              >
                <ArrowUpRight size={16} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-head-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: end;
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .pillar-card:hover {
          background: rgba(255,255,255,0.065) !important;
          border-color: rgba(200,149,108,0.3) !important;
          box-shadow: 0 24px 56px -24px rgba(0,0,0,0.7);
        }
        .pillar-card:hover .pillar-accent { transform: scaleX(1) !important; }
        .pillar-card:hover .pillar-icon-wrap {
          background: linear-gradient(135deg, #c8956c 0%, #a87650 100%) !important;
          border-color: transparent !important;
          color: #fff !important;
        }
        .pillar-card:hover .pillar-num { color: rgba(200,149,108,0.18) !important; }
        .pillar-card:hover .pillar-arrow {
          background: #c8956c !important;
          border-color: #c8956c !important;
          color: #fff !important;
          transform: translate(2px, -2px);
        }
        @media (min-width: 640px) {
          .pillars-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .pillars-grid { grid-template-columns: repeat(4, 1fr); }
          .why-head-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pillar-card {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
