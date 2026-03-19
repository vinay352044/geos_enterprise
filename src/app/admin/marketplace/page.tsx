'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, LogOut, Home } from 'lucide-react'
import type { MarketplaceListing } from '@/types'

export default function AdminMarketplacePage() {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  const fetchListings = useCallback(async () => {
    const res = await fetch('/api/admin/marketplace')
    const data = await res.json()
    if (data.success) setListings(data.data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchListings() }, [fetchListings])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeleting(id)
    await fetch(`/api/admin/marketplace/${id}`, { method: 'DELETE' })
    await fetchListings()
    setDeleting(null)
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FC' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-10 shadow-sm" style={{ backgroundColor: '#12235A' }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image src="/images/geos-logo-new.jpg" alt="GEOS" fill className="object-contain rounded-md" />
            </div>
            <div>
              <span className="text-white font-heading font-bold text-sm">GEOS Enterprises</span>
              <span className="block text-blue-300 font-heading text-xs opacity-80">Marketplace Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1 text-blue-200 hover:text-white text-sm transition-colors">
              <Home size={14} /> View Site
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-1 text-blue-200 hover:text-white text-sm transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-2xl" style={{ color: '#12235A' }}>Marketplace Listings</h1>
            <p className="text-sm mt-1" style={{ color: '#334155' }}>{listings.length} vehicles listed</p>
          </div>
          <Link
            href="/admin/marketplace/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-heading font-semibold text-sm transition-colors"
            style={{ backgroundColor: '#8E1B2D' }}
          >
            <Plus size={16} /> Add Vehicle
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">No vehicles yet.</p>
            <Link href="/admin/marketplace/new" className="text-sm font-semibold" style={{ color: '#8E1B2D' }}>Add your first vehicle →</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {listings.map(listing => (
              <div key={listing.id} className="bg-white rounded-xl p-5 flex items-center gap-5" style={{ border: '1px solid #E8ECF4' }}>
                <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <Image
                    src={listing.images[0] || '/images/vehicle-placeholder.svg'}
                    alt={`${listing.make} ${listing.model}`}
                    fill className="object-cover"
                    unoptimized={listing.images[0]?.startsWith('http')}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold" style={{ color: '#12235A' }}>{listing.year} {listing.make} {listing.model}</p>
                  <p className="text-sm mt-0.5" style={{ color: '#334155' }}>
                    {listing.seatingCapacity} seats · {listing.condition} · {listing.callForPrice ? 'Call for Price' : `₹${listing.price?.toLocaleString('en-IN')}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/marketplace/${listing.id}/edit`}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    style={{ backgroundColor: '#EFF6FF', color: '#1E3A8A' }}
                  >
                    <Edit size={14} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(listing.id, `${listing.make} ${listing.model}`)}
                    disabled={deleting === listing.id}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    style={{ backgroundColor: '#FDECEA', color: '#8E1B2D' }}
                  >
                    <Trash2 size={14} /> {deleting === listing.id ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
