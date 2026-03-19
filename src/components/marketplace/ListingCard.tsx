'use client'

import { useState } from 'react'
import { Card, CardContent, CardActions, Button, Chip } from '@mui/material'
import { Users, Gauge, Calendar, ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const PLACEHOLDER = '/images/vehicle-placeholder.svg'
import { ComplianceBadge } from '@/components/ui/ComplianceBadge'
import { formatCurrency, formatKm } from '@/lib/utils'
import { getWhatsAppInquiryUrl } from '@/lib/constants'
import type { MarketplaceListing } from '@/types'

interface ListingCardProps {
  listing: MarketplaceListing
}

const conditionColor = {
  Excellent: { bg: '#f0fdf4', text: '#166534' },
  Good: { bg: '#eff6ff', text: '#1E40AF' },
  Fair: { bg: '#fff7ed', text: '#92400E' },
}

export function ListingCard({ listing }: ListingCardProps) {
  const [imgError, setImgError] = useState(false)
  const whatsappUrl = getWhatsAppInquiryUrl(
    `${listing.make} ${listing.model} (${listing.year})`,
    listing.id,
  )

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.12)' },
      }}
    >
      {/* Image */}
      <div className="relative h-52 bg-gray-100 overflow-hidden rounded-t-xl">
        <Image
          src={imgError || !listing.images[0] ? PLACEHOLDER : listing.images[0]}
          alt={`${listing.year} ${listing.make} ${listing.model} — GEOS Enterprises fleet marketplace`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={listing.images[0]?.startsWith('http')}
          onError={() => setImgError(true)}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <ComplianceBadge label="Certified Taxi Plate" />
          <Chip
            label={listing.condition}
            size="small"
            sx={{
              backgroundColor: conditionColor[listing.condition].bg,
              color: conditionColor[listing.condition].text,
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 700,
              fontSize: '11px',
            }}
          />
        </div>
      </div>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <h3 className="font-heading font-semibold text-navy text-xl mb-1">
          {listing.make} {listing.model}
        </h3>

        {/* Key stats */}
        <div className="flex items-center gap-4 text-sm text-slate my-3">
          <span className="flex items-center gap-1">
            <Calendar size={14} className="text-accent" />
            {listing.year}
          </span>
          <span className="flex items-center gap-1">
            <Gauge size={14} className="text-accent" />
            {formatKm(listing.kmDriven)}
          </span>
          <span className="flex items-center gap-1">
            <Users size={14} className="text-accent" />
            {listing.seatingCapacity} seats
          </span>
        </div>

        <p className="font-body text-slate text-sm line-clamp-2 mb-3">{listing.description}</p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {listing.callForPrice || !listing.price ? (
              <span className="font-heading font-bold text-navy text-lg">Call for Price</span>
            ) : (
              <span className="font-heading font-bold text-navy text-xl">
                {formatCurrency(listing.price)}
              </span>
            )}
          </div>
          <span className="text-xs text-slate bg-gray-50 px-2 py-1 rounded">
            {listing.registrationType}
          </span>
        </div>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          href={whatsappUrl}
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<MessageCircle size={14} />}
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
            fontSize: '12px',
            textTransform: 'uppercase',
            backgroundColor: '#166534',
            flexGrow: 1,
            '&:hover': { backgroundColor: '#14532d' },
          }}
        >
          Inquire Price
        </Button>
        <Button
          variant="outlined"
          size="small"
          component={Link}
          href={`/marketplace/${listing.slug}`}
          endIcon={<ArrowRight size={12} />}
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
            fontSize: '12px',
            textTransform: 'uppercase',
            borderColor: '#0D2B5E',
            color: '#0D2B5E',
            minWidth: '80px',
          }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  )
}
