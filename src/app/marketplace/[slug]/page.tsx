import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableRow, Chip } from '@mui/material'
import { ArrowLeft, MessageCircle, Phone, BadgeCheck } from 'lucide-react'
import { getListingBySlug } from '@/lib/marketplaceDb'
import { formatCurrency, formatKm } from '@/lib/utils'
import { getWhatsAppInquiryUrl } from '@/lib/constants'
import { companyInfo } from '@/data/companyInfo'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = getListingBySlug(slug)
  if (!listing) return { title: 'Listing Not Found' }
  return {
    title: `${listing.year} ${listing.make} ${listing.model} — Fleet Marketplace`,
    description: `Buy certified ${listing.year} ${listing.make} ${listing.model}. 100% taxi plated, ${formatKm(listing.kmDriven)}, ${listing.condition} condition. GEOS Enterprises Fleet Marketplace.`,
  }
}

const PLACEHOLDER = '/images/vehicle-placeholder.svg'

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params
  const listing = getListingBySlug(slug)
  if (!listing) notFound()

  const whatsappUrl = getWhatsAppInquiryUrl(
    `${listing.make} ${listing.model} (${listing.year})`,
    listing.id,
  )

  const conditionColors: Record<string, { bg: string; text: string }> = {
    Excellent: { bg: '#f0fdf4', text: '#1a7a42' },
    Good: { bg: '#f0f5ff', text: '#3366ff' },
    Fair: { bg: '#fffbeb', text: '#b45309' },
  }
  const cond = conditionColors[listing.condition] || conditionColors.Good

  const mainImage = listing.images[0] || PLACEHOLDER

  return (
    <>
      {/* Top bar */}
      <div style={{ background: '#0a0f1c', paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: '24px' }}>
        <div className="container-wide">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 font-body text-sm font-medium transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)' }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to Marketplace
          </Link>
        </div>
      </div>

      <section className="section-py bg-[#fafaf8]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Images */}
            <div>
              <div className="relative h-80 bg-[#f5f3f0] rounded-xl overflow-hidden mb-3">
                <Image
                  src={mainImage}
                  alt={`${listing.year} ${listing.make} ${listing.model} — GEOS Enterprises Marketplace`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized={mainImage.startsWith('http')}
                />
              </div>
              {listing.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {listing.images.slice(1).map((img, i) => (
                    <div key={i} className="relative h-24 bg-[#f5f3f0] rounded-lg overflow-hidden">
                      <Image
                        src={img}
                        alt={`${listing.make} ${listing.model} view ${i + 2}`}
                        fill
                        className="object-cover"
                        sizes="200px"
                        unoptimized={img.startsWith('http')}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-body font-medium text-white bg-[#1a7a42]">
                  <BadgeCheck size={11} strokeWidth={1.5} />
                  Certified Taxi Plate
                </div>
                <Chip
                  label={listing.condition}
                  size="small"
                  sx={{ backgroundColor: cond.bg, color: cond.text, fontFamily: '"Inter", sans-serif', fontWeight: 500, fontSize: '12px', borderRadius: '8px' }}
                />
              </div>

              <h1 className="font-heading font-bold mb-1" style={{ color: '#0a0f1c', fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.02em' }}>
                {listing.make} {listing.model}
              </h1>
              <p className="font-body text-[15px] mb-3" style={{ color: '#6b7280' }}>
                {listing.year} &middot; {formatKm(listing.kmDriven)}
              </p>

              <div className="mb-6">
                {listing.callForPrice || !listing.price ? (
                  <span className="font-heading font-bold text-2xl" style={{ color: '#0a0f1c' }}>Call for Price</span>
                ) : (
                  <span className="font-heading font-extrabold text-2xl" style={{ color: '#0a0f1c', letterSpacing: '-0.02em' }}>
                    {formatCurrency(listing.price)}
                  </span>
                )}
              </div>

              <p className="font-body text-[15px] leading-relaxed mb-6" style={{ color: '#6b7280' }}>
                {listing.description}
              </p>

              <div className="border border-black/[0.04] rounded-xl overflow-hidden mb-6">
                <Table size="small">
                  <TableBody>
                    {Object.entries(listing.specifications).map(([key, value], idx) => (
                      <TableRow key={key} sx={{ backgroundColor: idx % 2 === 0 ? '#fafaf8' : '#ffffff' }}>
                        <TableCell sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 500, color: '#0a0f1c', width: '40%', py: 1.5, borderColor: 'rgba(0,0,0,0.04)', fontSize: '13px' }}>
                          {key}
                        </TableCell>
                        <TableCell sx={{ fontFamily: '"Inter", sans-serif', color: '#6b7280', py: 1.5, borderColor: 'rgba(0,0,0,0.04)', fontSize: '13px' }}>
                          {value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#1a7a42] text-white font-heading font-semibold text-[14px] px-6 py-3.5 rounded-lg hover:bg-[#15633a] transition-colors flex-1"
                >
                  <MessageCircle size={16} strokeWidth={1.5} />
                  Inquire on WhatsApp
                </a>
                <a
                  href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 border border-[#e5e2dd] text-[#0a0f1c] font-heading font-semibold text-[14px] px-6 py-3.5 rounded-lg hover:bg-[#f5f3f0] transition-colors"
                >
                  <Phone size={16} strokeWidth={1.5} />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
