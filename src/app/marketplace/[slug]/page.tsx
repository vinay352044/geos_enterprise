import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableRow, Chip } from '@mui/material'
import { ArrowLeft, MessageCircle, Phone } from 'lucide-react'
import { ComplianceBadge } from '@/components/ui/ComplianceBadge'
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
    Excellent: { bg: '#f0fdf4', text: '#166534' },
    Good: { bg: '#eff6ff', text: '#1E40AF' },
    Fair: { bg: '#fff7ed', text: '#92400E' },
  }
  const cond = conditionColors[listing.condition] || conditionColors.Good

  const mainImage = listing.images[0] || PLACEHOLDER

  return (
    <>
      <div className="bg-navy py-6 pt-16 md:py-8 md:pt-20">
        <div className="container mx-auto px-4">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm font-heading font-semibold"
          >
            <ArrowLeft size={16} />
            Back to Marketplace
          </Link>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Images */}
            <div>
              <div className="relative h-80 bg-gray-100 rounded-xl overflow-hidden mb-4">
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
                <div className="grid grid-cols-3 gap-3">
                  {listing.images.slice(1).map((img, i) => (
                    <div key={i} className="relative h-24 bg-gray-100 rounded-lg overflow-hidden">
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
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <ComplianceBadge label="Certified Taxi Plate" size="medium" />
                <Chip
                  label={listing.condition}
                  size="small"
                  sx={{ backgroundColor: cond.bg, color: cond.text, fontFamily: '"Montserrat", sans-serif', fontWeight: 700 }}
                />
              </div>

              <h1 className="font-heading font-bold text-navy mb-1">
                {listing.make} {listing.model}
              </h1>
              <p className="font-body text-slate text-lg mb-2">{listing.year} · {formatKm(listing.kmDriven)}</p>

              <div className="mb-6">
                {listing.callForPrice || !listing.price ? (
                  <span className="font-heading font-bold text-navy text-3xl">Call for Price</span>
                ) : (
                  <span className="font-heading font-bold text-navy text-3xl">
                    {formatCurrency(listing.price)}
                  </span>
                )}
              </div>

              <p className="font-body text-slate leading-relaxed mb-6">{listing.description}</p>

              <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                <Table size="small">
                  <TableBody>
                    {Object.entries(listing.specifications).map(([key, value], idx) => (
                      <TableRow key={key} sx={{ backgroundColor: idx % 2 === 0 ? '#F8FAFC' : '#ffffff' }}>
                        <TableCell sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600, color: '#334155', width: '40%', py: 1.5, borderColor: '#e2e8f0' }}>
                          {key}
                        </TableCell>
                        <TableCell sx={{ color: '#334155', py: 1.5, borderColor: '#e2e8f0' }}>
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
                  className="inline-flex items-center justify-center gap-2 bg-[#166534] text-white font-heading font-bold text-[15px] uppercase tracking-wide px-8 py-3 rounded hover:bg-[#14532d] transition-colors min-h-[48px] flex-1"
                >
                  <MessageCircle size={18} />
                  Inquire on WhatsApp
                </a>
                <a
                  href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 border-2 border-navy text-navy font-heading font-bold text-[15px] uppercase tracking-wide px-8 py-3 rounded hover:bg-navy/5 transition-colors min-h-[48px]"
                >
                  <Phone size={18} />
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
