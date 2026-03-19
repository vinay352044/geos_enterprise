'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { FilterBar } from '@/components/marketplace/FilterBar'
import { ListingCard } from '@/components/marketplace/ListingCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ComplianceBadge } from '@/components/ui/ComplianceBadge'
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
      <section className="bg-navy py-12 pt-16 md:py-16 md:pt-20">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="flex justify-center mb-4">
            <ComplianceBadge label="Certified Commercial Vehicles" size="medium" />
          </div>
          <h1 className="font-heading font-bold text-white mb-4">Fleet Marketplace</h1>
          <p className="font-body text-blue-100 text-lg max-w-2xl mx-auto">
            Purchase certified pre-owned commercial fleet vehicles — all 100% taxi plated, with documented service history and valid insurance.
          </p>
        </div>
      </section>

      <section className="py-12 bg-bg-light min-h-screen">
        <div className="container mx-auto px-4">
          <FilterBar />
          {loading ? (
            <div className="text-center py-24 text-gray-400">Loading vehicles...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingBag size={64} className="text-gray-300 mx-auto mb-6" />
              <h2 className="font-heading font-semibold text-navy mb-3">No Vehicles Found</h2>
              <p className="font-body text-slate">No vehicles currently match your filters. Check back soon or <a href="/contact" className="text-accent hover:underline font-semibold">contact us</a>.</p>
            </div>
          ) : (
            <>
              <SectionHeading
                label={`${filtered.length} listing${filtered.length !== 1 ? 's' : ''} available`}
                title="Available Vehicles"
                subtitle="All listings include certified taxi plate documentation, service history, and valid insurance."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((listing, idx) => (
                  <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.08 }}>
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
