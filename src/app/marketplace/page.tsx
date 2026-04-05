'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, PackageSearch, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FilterBar } from '@/components/marketplace/FilterBar'
import { ListingCard } from '@/components/marketplace/ListingCard'
import { useAppSelector } from '@/store'
import type { MarketplaceListing } from '@/types'

const ease = [0.25, 1, 0.5, 1] as const

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
          background: '#0a0f1c',
          paddingTop: 'clamp(120px, 14vw, 180px)',
          paddingBottom: 'clamp(56px, 6vw, 88px)',
        }}
      >
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#1a7a42]" />
              <span className="font-body text-[12px] font-medium tracking-[0.15em] uppercase text-[#4ade80]">
                Certified Commercial Vehicles
              </span>
            </div>

            <h1
              className="font-heading font-extrabold text-white mb-4"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1.08 }}
            >
              Fleet Marketplace
            </h1>
            <p className="font-body text-base max-w-2xl leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Purchase certified pre-owned commercial fleet vehicles — all 100% taxi plated, with documented service history and valid insurance.
            </p>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2.5">
              {['100% Taxi Plated', 'GST Invoice', 'Valid Insurance'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-[11px] font-body font-medium px-3 py-1.5 rounded-lg"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  <BadgeCheck size={11} style={{ color: '#4ade80' }} strokeWidth={1.5} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Listings */}
      <section className="section-py bg-[#fafaf8]" style={{ minHeight: '60vh' }}>
        <div className="container-wide">
          <FilterBar />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-[#0a0f1c]/10 border-t-[#0a0f1c] animate-spin" />
              <p className="font-body text-sm text-[#9ca3af]">Loading vehicles...</p>
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center py-32"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-[#f5f3f0]">
                <PackageSearch size={24} style={{ color: '#9ca3af' }} strokeWidth={1.5} />
              </div>
              <h2 className="font-heading font-bold text-xl mb-2" style={{ color: '#0a0f1c' }}>
                No Vehicles Found
              </h2>
              <p className="font-body text-sm max-w-sm mb-6" style={{ color: '#6b7280' }}>
                No vehicles currently match your filters. Try adjusting your criteria or check back soon.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-heading font-semibold text-[13px] text-white bg-[#0a0f1c] px-6 py-3 rounded-lg hover:bg-[#1a2332] transition-colors"
              >
                Contact Us
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Results header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-heading font-bold text-xl mb-1" style={{ color: '#0a0f1c' }}>
                    Available Vehicles
                  </h2>
                  <p className="font-body text-sm" style={{ color: '#9ca3af' }}>
                    {filtered.length} listing{filtered.length !== 1 ? 's' : ''} &middot; All with certified taxi plate documentation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((listing, idx) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease }}
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
