import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ListingForm } from '../_components/ListingForm'

export default function NewListingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FC' }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/admin/marketplace" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: '#334155' }}>
          <ArrowLeft size={14} /> Back to Listings
        </Link>
        <h1 className="font-heading font-bold text-2xl mb-8" style={{ color: '#12235A' }}>Add New Vehicle</h1>
        <ListingForm mode="create" />
      </div>
    </div>
  )
}
