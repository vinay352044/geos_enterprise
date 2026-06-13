'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { ListingCard } from '@/components/marketplace/ListingCard'
import type { MarketplaceListing } from '@/types'

export function MarketplacePreview() {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/marketplace')
      .then(r => r.json())
      .then(d => { if (d.success) setListings(d.data.slice(0, 3)) })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section style={{ background: '#fafaf8', padding: 'clamp(72px, 8vw, 120px) 0' }}>
      <div className="container-wide">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
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
              Marketplace
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
                marginBottom: '12px',
              }}
            >
              Vehicles for sale.
            </h2>
            <p style={{ fontSize: '15px', color: '#6b7280', maxWidth: '440px', lineHeight: 1.65, margin: 0 }}>
              Pre-owned commercial fleet vehicles, all with certified taxi plate documentation
              and verified service records.
            </p>
          </div>

          <Link
            href="/marketplace"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '13px',
              color: '#0a0f1c',
              padding: '12px 22px',
              border: '1px solid #e5e2dd',
              borderRadius: '999px',
              textDecoration: 'none',
              transition: 'all 0.3s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#0a0f1c'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.borderColor = '#0a0f1c'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#0a0f1c'
              e.currentTarget.style.borderColor = '#e5e2dd'
            }}
          >
            View All
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Count bar */}
        {!loading && listings.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, color: '#0a0f1c' }}>
                Available Vehicles
              </span>
              <span style={{ fontSize: '13px', color: '#9ca3af', marginLeft: '10px' }}>
                {listings.length} listings · All with certified taxi plate documentation
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280' }}>
              <BadgeCheck size={13} style={{ color: '#1a7a42' }} />
              Every listing is commercially registered
            </div>
          </div>
        )}

        {/* Cards */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '64px 0' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid rgba(10,15,28,0.1)', borderTopColor: '#0a0f1c', animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((listing, idx) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.25, 1, 0.5, 1] }}
              >
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: '40px',
            padding: '28px 32px',
            background: '#fff',
            border: '1px solid #e5e2dd',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: '#0a0f1c', marginBottom: '4px' }}>
              Looking for something specific?
            </div>
            <p style={{ fontSize: '13.5px', color: '#6b7280', margin: 0 }}>
              Browse our full inventory or contact us — we list new vehicles every week.
            </p>
          </div>
          <Link
            href="/marketplace"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '13px',
              background: '#0a0f1c',
              color: '#fff',
              padding: '12px 22px',
              borderRadius: '10px',
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'background 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1a2332')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0a0f1c')}
          >
            See Full Marketplace
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  )
}
