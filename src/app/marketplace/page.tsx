'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, PackageSearch, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FilterBar } from '@/components/marketplace/FilterBar'
import { ListingCard } from '@/components/marketplace/ListingCard'
import { useAppSelector } from '@/store'
import type { MarketplaceListing } from '@/types'

export default function MarketplacePage() {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [loading, setLoading] = useState(true)
  const filter = useAppSelector((s) => s.ui.activeMarketplaceFilter)

  useEffect(() => {
    fetch('/api/marketplace')
      .then(r => r.json())
      .then(d => { if (d.success) setListings(d.data) })
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const typeMatch = filter.vehicleType === 'All' || l.make.toLowerCase().includes(filter.vehicleType.toLowerCase())
      const yearMatch = l.year >= filter.minYear
      const seatsMatch = l.seatingCapacity >= filter.minSeats
      return typeMatch && yearMatch && seatsMatch
    })
  }, [filter, listings])

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(155deg, #040B18 0%, #0A1830 35%, #0D1F4A 60%, #060E1A 100%)',
          paddingTop: 'clamp(100px, 12vw, 160px)',
          paddingBottom: 'clamp(56px, 6vw, 88px)',
        }}
      >
        {/* Background orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '700px', height: '700px', top: '-200px', right: '-100px',
            background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 font-heading font-bold text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6"
              style={{
                backgroundColor: 'rgba(22,101,52,0.1)',
                color: '#4ADE80',
                border: '1px solid rgba(22,101,52,0.25)',
              }}
            >
              <BadgeCheck size={12} />
              CERTIFIED COMMERCIAL VEHICLES
            </div>

            <h1 className="font-heading font-extrabold text-white mb-5" style={{ letterSpacing: '-0.02em' }}>
              Fleet Marketplace
            </h1>
            <p className="font-body text-lg max-w-2xl leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Purchase certified pre-owned commercial fleet vehicles — all 100% taxi plated, with documented service history and valid insurance.
            </p>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-3">
              {['All vehicles 100% Taxi Plated', 'GST Invoice available', 'Valid Insurance & Permit'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-[11px] font-heading font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  <BadgeCheck size={11} style={{ color: '#4ADE80' }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Listings */}
      <section className="section-py" style={{ backgroundColor: '#F5F8FF', minHeight: '60vh' }}>
        <div className="container-wide">
          <FilterBar />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-5">
              <div className="w-10 h-10 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
              <p className="font-body text-sm" style={{ color: '#94A3B8' }}>Loading vehicles...</p>
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center py-32"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: '#F0F4FF', border: '1px solid #E2E8F0' }}
              >
                <PackageSearch size={28} style={{ color: '#94A3B8' }} strokeWidth={1.5} />
              </div>
              <h2 className="font-heading font-bold text-xl mb-3" style={{ color: '#0D1B3E' }}>
                No Vehicles Found
              </h2>
              <p className="font-body text-sm max-w-sm mb-8" style={{ color: '#64748B' }}>
                No vehicles currently match your filters. Try adjusting your criteria or check back soon.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-heading font-bold text-[13px] uppercase tracking-wider text-white px-6 py-3 rounded-xl transition-all"
                style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #1E3A8A 100%)' }}
              >
                Contact Us
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Results header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-heading font-bold text-2xl mb-1" style={{ color: '#0D1B3E' }}>
                    Available Vehicles
                  </h2>
                  <p className="font-body text-sm" style={{ color: '#64748B' }}>
                    {filtered.length} listing{filtered.length !== 1 ? 's' : ''} · All with certified taxi plate documentation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((listing, idx) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ListingCard listing={listing} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
