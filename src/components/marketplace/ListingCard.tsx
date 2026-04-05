'use client'

import { useState } from 'react'
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
  Excellent: { dot: '#22c55e' },
  Good: { dot: '#3366ff' },
  Fair: { dot: '#f59e0b' },
}

export function ListingCard({ listing }: ListingCardProps) {
  const [imgError, setImgError] = useState(false)
  const whatsappUrl = getWhatsAppInquiryUrl(
    `${listing.make} ${listing.model} (${listing.year})`,
    listing.id,
  )
  const cond = conditionConfig[listing.condition]

  return (
    <div
      className="bg-white rounded-xl overflow-hidden flex flex-col h-full group border border-black/[0.04] transition-all duration-400 hover:border-black/[0.08] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0 bg-[#f5f3f0]">
        {imgError || !listing.images[0] ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#f5f3f0]">
            <Car size={36} style={{ color: '#d4d0cb' }} strokeWidth={1} />
            <span className="text-[10px] font-body font-medium tracking-wide text-[#c4c0bb]">
              {listing.make} {listing.model}
            </span>
          </div>
        ) : (
          <>
            <Image
              src={listing.images[0]}
              alt={`${listing.year} ${listing.make} ${listing.model}`}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={listing.images[0]?.startsWith('http')}
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-body font-medium text-white"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          >
            <BadgeCheck size={10} strokeWidth={1.5} />
            Taxi Plated
          </div>
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-body font-medium text-white"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
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
          <h3 className="font-heading font-bold text-lg leading-tight" style={{ color: '#0a0f1c' }}>
            {listing.make} {listing.model}
          </h3>
          <span className="text-[10px] font-body font-medium px-2 py-0.5 rounded bg-[#f5f3f0] text-[#6b7280] flex-shrink-0 mt-0.5">
            {listing.registrationType}
          </span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-[12px] font-body py-2.5 mb-3 border-t border-b border-black/[0.04]" style={{ color: '#6b7280' }}>
          <span className="flex items-center gap-1.5">
            <Calendar size={11} strokeWidth={1.5} />
            {listing.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge size={11} strokeWidth={1.5} />
            {formatKm(listing.kmDriven)}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={11} strokeWidth={1.5} />
            {listing.seatingCapacity} seats
          </span>
        </div>

        {/* Description */}
        <p className="font-body text-[13px] leading-relaxed mb-4 line-clamp-2 text-[#9ca3af]">
          {listing.description}
        </p>

        {/* Price */}
        <div className="mt-auto mb-4">
          {listing.callForPrice || !listing.price ? (
            <span className="font-heading font-bold text-lg" style={{ color: '#0a0f1c' }}>
              Call for Price
            </span>
          ) : (
            <span className="font-heading font-extrabold text-xl" style={{ color: '#0a0f1c', letterSpacing: '-0.02em' }}>
              {formatCurrency(listing.price)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 font-heading font-semibold text-[12px] text-white py-2.5 rounded-lg bg-[#1a7a42] hover:bg-[#15633a] transition-colors"
          >
            <MessageCircle size={12} strokeWidth={1.5} />
            Inquire
          </a>
          <Link
            href={`/marketplace/${listing.slug}`}
            className="flex-1 flex items-center justify-center gap-1 font-heading font-semibold text-[12px] py-2.5 rounded-lg border border-[#e5e2dd] text-[#0a0f1c] hover:bg-[#f5f3f0] transition-colors"
          >
            Details
            <ArrowRight size={11} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  )
}
