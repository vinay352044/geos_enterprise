'use client'

import Image from 'next/image'

const CLIENTS = [
  {
    name: 'ONGC',
    logo: '/images/clients/ongc.jpg',
    tag: 'PSU',
    tagline: 'Oil & Natural Gas',
    scope: 'Crew & field-site transport across Gujarat exploration assets, including offshore support rotations.',
    since: 2002,
    fleet: '60+ vehicles',
  },
  {
    name: 'BPCL',
    logo: '/images/clients/bpcl.jpg',
    tag: 'PSU',
    tagline: 'Bharat Petroleum',
    scope: 'Executive movement, depot operations and refinery staff transport across Gujarat distribution network.',
    since: 2008,
    fleet: '35+ vehicles',
  },
  {
    name: 'NHSRCL',
    logo: '/images/clients/nhsrcl.jpg',
    tag: 'PSU',
    tagline: 'High Speed Rail Corp.',
    scope: 'Project-site mobility on the Mumbai–Ahmedabad MAHSR corridor for engineers & senior officials.',
    since: 2019,
    fleet: '25+ vehicles',
  },
  {
    name: 'IFFCO',
    logo: '/images/clients/iffco.jpg',
    tag: 'PSU',
    tagline: 'Fertiliser Co-operative',
    scope: 'Plant operations & staff transport for the Kalol manufacturing unit, shift and executive movement.',
    since: 2005,
    fleet: '30+ vehicles',
  },
  {
    name: 'Adani Group',
    logo: '/images/clients/adani.jpg',
    tag: 'Private',
    tagline: 'Infrastructure & Energy',
    scope: 'Port logistics, project-site transport and executive fleet at Mundra SEZ and regional HQ.',
    since: 2012,
    fleet: '45+ vehicles',
  },
  {
    name: 'Vedanta',
    logo: '/images/clients/vedanta.jpg',
    tag: 'Private',
    tagline: 'Natural Resources',
    scope: 'Mining operations crew transport and management movement for Gujarat and Rajasthan sites.',
    since: 2014,
    fleet: '20+ vehicles',
  },
  {
    name: 'GVK EMRI',
    logo: '/images/clients/gvk-emri.jpg',
    tag: 'Govt',
    tagline: 'Emergency 112 Services',
    scope: 'Emergency response support fleet running 24×7 across Gujarat for the national 112 helpline.',
    since: 2010,
    fleet: '50+ vehicles',
  },
  {
    name: 'EIL',
    logo: '/images/clients/eil.jpg',
    tag: 'PSU',
    tagline: 'Engineers India Ltd.',
    scope: 'Engineering site-visit & survey mobility for project consultancy assignments across Western India.',
    since: 2011,
    fleet: '15+ vehicles',
  },
]

const TAG_COLOR: Record<string, { color: string; bg: string }> = {
  PSU: { color: '#1a7a42', bg: 'rgba(26,122,66,0.1)' },
  Govt: { color: '#c23a22', bg: 'rgba(194,58,34,0.08)' },
  Private: { color: '#a87650', bg: 'rgba(200,149,108,0.15)' },
}

function TrustChip({ c }: { c: typeof CLIENTS[0] }) {
  const tc = TAG_COLOR[c.tag] || TAG_COLOR.PSU
  return (
    <div
      className="trust-chip-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '380px',
        padding: '28px 28px 24px',
        background: '#fff',
        border: '1px solid #e5e2dd',
        borderRadius: '20px',
        flexShrink: 0,
        gap: '16px',
      }}
    >
      {/* Head: logo + identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Logo tile */}
        <div
          style={{
            width: '64px',
            height: '64px',
            flexShrink: 0,
            borderRadius: '14px',
            overflow: 'hidden',
            background: '#f5f3f0',
            border: '1px solid #e5e2dd',
            position: 'relative',
          }}
        >
          <Image
            src={c.logo}
            alt={c.name}
            fill
            sizes="64px"
            style={{ objectFit: 'contain', padding: '8px' }}
          />
        </div>

        {/* Name + tag + tagline */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '19px',
              color: '#0a0f1c',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '6px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {c.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
            <span
              style={{
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '5px',
                color: tc.color,
                background: tc.bg,
                flexShrink: 0,
              }}
            >
              {c.tag}
            </span>
            <span
              style={{
                fontSize: '12.5px',
                color: '#6b7280',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {c.tagline}
            </span>
          </div>
        </div>
      </div>

      {/* Scope description */}
      <p
        style={{
          fontSize: '13.5px',
          color: '#4b5563',
          lineHeight: 1.65,
          margin: 0,
          flex: 1,
        }}
      >
        {c.scope}
      </p>

      {/* Footer meta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px dashed #e5e2dd',
          fontSize: '12.5px',
          color: '#9ca3af',
        }}
      >
        <span>
          Partner since{' '}
          <strong style={{ color: '#0a0f1c', fontWeight: 700 }}>{c.since}</strong>
        </span>
        <span
          style={{
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: '#c8956c',
            flexShrink: 0,
          }}
        />
        <span>
          <strong style={{ color: '#0a0f1c', fontWeight: 700 }}>{c.fleet}</strong>{' '}
          deployed
        </span>
      </div>
    </div>
  )
}

export function ClientCarousel() {
  const loop = [...CLIENTS, ...CLIENTS]

  return (
    <section style={{ background: '#fafaf8', padding: 'clamp(72px, 8vw, 120px) 0' }}>
      <div className="container-wide">
        {/* Header */}
        <div style={{ maxWidth: '760px', marginBottom: '48px' }}>
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
            Certifications &amp; Tie-ups
            <span style={{ display: 'block', width: '28px', height: '1.5px', background: 'currentColor', opacity: 0.5, borderRadius: '1px' }} />
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(30px, 3.2vw, 46px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: '#0a0f1c',
              marginBottom: '14px',
            }}
          >
            Trusted by India&apos;s largest{' '}
            <span style={{ color: '#c8956c' }}>PSUs &amp; Government bodies.</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.7, margin: 0, maxWidth: '620px' }}>
            From state-owned oil giants to private conglomerates — every contract backed by
            audit-ready documentation and 35+ years of relationship-driven service.
          </p>
        </div>

        {/* Marquee — contained within container, overflow hidden */}
        <div
          style={{
            overflow: 'hidden',
            borderRadius: '16px',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
            maskImage: 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          }}
          onMouseEnter={e => {
            const t = e.currentTarget.querySelector('.marquee-track') as HTMLElement
            if (t) t.style.animationPlayState = 'paused'
          }}
          onMouseLeave={e => {
            const t = e.currentTarget.querySelector('.marquee-track') as HTMLElement
            if (t) t.style.animationPlayState = 'running'
          }}
        >
          <div
            className="marquee-track"
            style={{
              display: 'flex',
              gap: '20px',
              width: 'max-content',
              animation: 'marquee-scroll 80s linear infinite',
              willChange: 'transform',
              padding: '12px 0',
            }}
          >
            {loop.map((c, i) => (
              <TrustChip key={i} c={c} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .trust-chip-card {
          transition: border-color 0.3s, transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s;
          cursor: default;
        }
        .trust-chip-card:hover {
          border-color: #c8956c !important;
          transform: translateY(-4px);
          box-shadow: 0 16px 40px -14px rgba(200,149,108,0.35);
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
