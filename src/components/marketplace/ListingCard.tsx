'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Gauge, Calendar, ArrowRight, MessageCircle, Car, BadgeCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { formatCurrency, formatKm } from '@/lib/utils'
import { getWhatsAppInquiryUrl } from '@/lib/constants'
import type { MarketplaceListing } from '@/types'

interface ListingCardProps {
  listing: MarketplaceListing
}

const conditionConfig = {
  Excellent: { bg: 'rgba(22,101,52,0.1)', text: '#166534', border: 'rgba(22,101,52,0.25)', dot: '#22C55E' },
  Good: { bg: 'rgba(37,99,235,0.1)', text: '#1E40AF', border: 'rgba(37,99,235,0.25)', dot: '#3B82F6' },
  Fair: { bg: 'rgba(146,64,14,0.1)', text: '#92400E', border: 'rgba(146,64,14,0.25)', dot: '#F59E0B' },
}

export function ListingCard({ listing }: ListingCardProps) {
  const [imgError, setImgError] = useState(false)
  const whatsappUrl = getWhatsAppInquiryUrl(
    `${listing.make} ${listing.model} (${listing.year})`,
    listing.id,
  )
  const cond = conditionConfig[listing.condition]

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-white rounded-2xl overflow-hidden flex flex-col h-full group"
      style={{
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(13,27,62,0.07)',
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(13,27,62,0.14)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(13,27,62,0.07)'
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0" style={{ backgroundColor: '#0D1B3E' }}>
        {imgError || !listing.images[0] ? (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #1E3A8A 100%)' }}
          >
            <Car size={48} style={{ color: 'rgba(255,255,255,0.15)' }} strokeWidth={1} />
            <span className="text-[11px] font-heading font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.22)' }}>
              {listing.make} {listing.model}
            </span>
          </div>
        ) : (
          <>
            <Image
              src={listing.images[0]}
              alt={`${listing.year} ${listing.make} ${listing.model}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={listing.images[0]?.startsWith('http')}
              onError={() => setImgError(true)}
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </>
        )}

        {/* Badges on image */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {/* Taxi Plated badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-bold"
            style={{
              backgroundColor: 'rgba(22,101,52,0.9)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              border: '1px solid rgba(74,222,128,0.3)',
            }}
          >
            <BadgeCheck size={11} />
            Taxi Plated
          </div>

          {/* Condition badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-heading font-bold"
            style={{
              backgroundColor: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cond.dot }} />
            {listing.condition}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-heading font-bold text-xl leading-tight" style={{ color: '#0D1B3E' }}>
            {listing.make} {listing.model}
          </h3>
          <span
            className="text-[11px] font-heading font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 mt-0.5"
            style={{ backgroundColor: '#F0F4FF', color: '#1E3A8A' }}
          >
            {listing.registrationType}
          </span>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center gap-4 text-[12px] font-body py-3 mb-3 border-y"
          style={{ color: '#475569', borderColor: '#F1F5F9' }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar size={12} style={{ color: '#2563EB' }} />
            {listing.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge size={12} style={{ color: '#2563EB' }} />
            {formatKm(listing.kmDriven)}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={12} style={{ color: '#2563EB' }} />
            {listing.seatingCapacity} seats
          </span>
        </div>

        {/* Description */}
        <p className="font-body text-[13px] leading-relaxed mb-4 line-clamp-2" style={{ color: '#64748B' }}>
          {listing.description}
        </p>

        {/* Price */}
        <div className="mt-auto mb-5">
          {listing.callForPrice || !listing.price ? (
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xl" style={{ color: '#0D1B3E' }}>
                Call for Price
              </span>
            </div>
          ) : (
            <div>
              <span className="font-heading font-extrabold text-2xl" style={{ color: '#0D1B3E', letterSpacing: '-0.01em' }}>
                {formatCurrency(listing.price)}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 font-heading font-bold text-[12px] uppercase tracking-wider text-white py-2.5 rounded-xl transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #15803D 0%, #14532D 100%)',
              boxShadow: '0 2px 12px rgba(22,101,52,0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(22,101,52,0.5)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(22,101,52,0.3)'
            }}
          >
            <MessageCircle size={13} />
            Inquire
          </a>
          <Link
            href={`/marketplace/${listing.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 font-heading font-bold text-[12px] uppercase tracking-wider py-2.5 rounded-xl border-2 transition-all duration-200"
            style={{
              borderColor: '#E2E8F0',
              color: '#0D1B3E',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#0D1B3E'
              ;(e.currentTarget as HTMLElement).style.backgroundColor = '#F5F8FF'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0'
              ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
            }}
          >
            Details
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
