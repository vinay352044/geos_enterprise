import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getListingById } from '@/lib/marketplaceDb'
import { ListingForm } from '../../_components/ListingForm'

interface Props { params: Promise<{ id: string }> }

export default async function EditListingPage({ params }: Props) {
  const { id } = await params
  const listing = getListingById(id)
  if (!listing) notFound()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FC' }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/admin/marketplace" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: '#334155' }}>
          <ArrowLeft size={14} /> Back to Listings
        </Link>
        <h1 className="font-heading font-bold text-2xl mb-8" style={{ color: '#12235A' }}>
          Edit: {listing.year} {listing.make} {listing.model}
        </h1>
        <ListingForm mode="edit" initial={listing} listingId={id} />
      </div>
    </div>
  )
}
