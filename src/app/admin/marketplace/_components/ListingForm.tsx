'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, X, ImageOff } from 'lucide-react'
import type { MarketplaceListing } from '@/types'

interface ListingFormProps {
  initial?: Partial<MarketplaceListing>
  listingId?: string
  mode: 'create' | 'edit'
}

function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false)
  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
        <ImageOff size={20} />
      </div>
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      unoptimized={src.startsWith('http')}
      onError={() => setError(true)}
    />
  )
}

export function ListingForm({ initial, listingId, mode }: ListingFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [images, setImages] = useState<string[]>(initial?.images || [])

  const [form, setForm] = useState({
    make: initial?.make || '',
    model: initial?.model || '',
    year: initial?.year || new Date().getFullYear(),
    kmDriven: initial?.kmDriven || 0,
    registrationType: initial?.registrationType || 'Commercial / Taxi Plate',
    insuranceValidity: initial?.insuranceValidity || '',
    engineCC: initial?.engineCC || 0,
    seatingCapacity: initial?.seatingCapacity || 5,
    condition: initial?.condition || 'Good',
    price: initial?.price || null as number | null,
    callForPrice: initial?.callForPrice ?? false,
    taxiPlated: initial?.taxiPlated ?? true,
    description: initial?.description || '',
    features: initial?.features?.join(', ') || '',
  })

  const set = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }))

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      for (const file of Array.from(files)) {
        formData.append('images', file)
      }

      // Use listing-specific endpoint in edit mode, general endpoint in create mode
      const endpoint = mode === 'edit' && listingId
        ? `/api/admin/marketplace/${listingId}/upload`
        : '/api/admin/upload'

      const res = await fetch(endpoint, { method: 'POST', body: formData })
      const data = await res.json()

      if (!data.success) throw new Error(data.error || 'Upload failed')

      const newUrls: string[] = mode === 'edit' && listingId
        ? data.data.listing.images
        : [...images, ...data.data.urls]

      setImages(newUrls)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = {
        ...form,
        year: Number(form.year),
        kmDriven: Number(form.kmDriven),
        engineCC: Number(form.engineCC),
        seatingCapacity: Number(form.seatingCapacity),
        price: form.callForPrice ? null : (form.price ? Number(form.price) : null),
        features: form.features.split(',').map(s => s.trim()).filter(Boolean),
        images,
        specifications: {
          Make: form.make,
          Model: form.model,
          Year: String(form.year),
          'KMs Driven': `${Number(form.kmDriven).toLocaleString('en-IN')} km`,
          Registration: form.registrationType,
          Insurance: form.insuranceValidity,
          Engine: `${form.engineCC}cc`,
          Seating: `${form.seatingCapacity} Passengers`,
          Condition: form.condition,
        },
      }

      if (mode === 'create') {
        const res = await fetch('/api/admin/marketplace', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.error)
      } else {
        const res = await fetch(`/api/admin/marketplace/${listingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.error)
      }

      router.push('/admin/marketplace')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-blue-200'
  const inputStyle = { borderColor: '#E8ECF4', backgroundColor: '#F5F7FC' }
  const labelClass = 'block text-sm font-semibold mb-1'
  const labelStyle = { color: '#12235A' }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Vehicle Details */}
      <section className="bg-white rounded-xl p-6" style={{ border: '1px solid #E8ECF4' }}>
        <h2 className="font-heading font-bold text-lg mb-6" style={{ color: '#12235A' }}>Vehicle Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} style={labelStyle}>Make *</label>
            <input className={inputClass} style={inputStyle} value={form.make} onChange={e => set('make', e.target.value)} required placeholder="Toyota, Force, Maruti..." />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Model *</label>
            <input className={inputClass} style={inputStyle} value={form.model} onChange={e => set('model', e.target.value)} required placeholder="Innova Crysta, Fortuner..." />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Year *</label>
            <input type="number" className={inputClass} style={inputStyle} value={form.year} onChange={e => set('year', e.target.value)} required min="2000" max="2030" />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>KMs Driven *</label>
            <input type="number" className={inputClass} style={inputStyle} value={form.kmDriven} onChange={e => set('kmDriven', e.target.value)} required min="0" />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Engine CC</label>
            <input type="number" className={inputClass} style={inputStyle} value={form.engineCC} onChange={e => set('engineCC', e.target.value)} min="0" />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Seating Capacity *</label>
            <input type="number" className={inputClass} style={inputStyle} value={form.seatingCapacity} onChange={e => set('seatingCapacity', e.target.value)} required min="1" max="60" />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Condition *</label>
            <select className={inputClass} style={inputStyle} value={form.condition} onChange={e => set('condition', e.target.value)}>
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Registration Type</label>
            <input className={inputClass} style={inputStyle} value={form.registrationType} onChange={e => set('registrationType', e.target.value)} />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Insurance Validity</label>
            <input className={inputClass} style={inputStyle} value={form.insuranceValidity} onChange={e => set('insuranceValidity', e.target.value)} placeholder="e.g. December 2025" />
          </div>
          <div className="flex items-center gap-6 pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.taxiPlated} onChange={e => set('taxiPlated', e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-sm font-semibold" style={{ color: '#12235A' }}>Taxi Plated</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.callForPrice} onChange={e => set('callForPrice', e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-sm font-semibold" style={{ color: '#12235A' }}>Call for Price</span>
            </label>
          </div>
          {!form.callForPrice && (
            <div>
              <label className={labelClass} style={labelStyle}>Price (₹)</label>
              <input type="number" className={inputClass} style={inputStyle} value={form.price || ''} onChange={e => set('price', e.target.value ? Number(e.target.value) : null)} placeholder="e.g. 1350000" min="0" />
            </div>
          )}
        </div>

        <div className="mt-5">
          <label className={labelClass} style={labelStyle}>Description *</label>
          <textarea className={inputClass} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={e => set('description', e.target.value)} rows={3} required />
        </div>
        <div className="mt-5">
          <label className={labelClass} style={labelStyle}>Features (comma separated)</label>
          <input className={inputClass} style={inputStyle} value={form.features} onChange={e => set('features', e.target.value)} placeholder="AC, GPS, Leather Seats, Sunroof..." />
        </div>
      </section>

      {/* Images */}
      <section className="bg-white rounded-xl p-6" style={{ border: '1px solid #E8ECF4' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-lg" style={{ color: '#12235A' }}>Vehicle Images</h2>
          <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ backgroundColor: '#EFF6FF', color: '#1E40AF' }}>
            Stored on Cloudinary
          </span>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          {images.map((img, i) => (
            <div key={i} className="relative w-32 h-24 rounded-lg overflow-hidden bg-gray-100 border" style={{ borderColor: '#E8ECF4' }}>
              <ImageWithFallback src={img} alt={`Image ${i + 1}`} />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white shadow"
                style={{ backgroundColor: '#8E1B2D' }}
              >
                <X size={10} />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-white text-xs px-1.5 py-0.5 rounded font-semibold" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                  Cover
                </span>
              )}
            </div>
          ))}

          <label
            className="w-32 h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-blue-50"
            style={{ borderColor: uploading ? '#94A3B8' : '#1E40AF' }}
          >
            {uploading ? (
              <div className="text-center">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-1" />
                <span className="text-xs" style={{ color: '#334155' }}>Uploading...</span>
              </div>
            ) : (
              <>
                <Upload size={20} className="mb-1" style={{ color: '#1E40AF' }} />
                <span className="text-xs font-semibold" style={{ color: '#1E40AF' }}>Add Images</span>
              </>
            )}
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
          </label>
        </div>

        <p className="text-xs" style={{ color: '#94A3B8' }}>
          Images are uploaded to Cloudinary CDN. First image is the cover photo. Accepts JPG, PNG, WebP.
        </p>
      </section>

      {error && (
        <div className="px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: '#FDECEA', color: '#8E1B2D' }}>{error}</div>
      )}

      <div className="flex gap-3 pb-8">
        <button
          type="submit"
          disabled={saving || uploading}
          className="px-8 py-3 rounded-lg font-heading font-bold text-white text-sm uppercase tracking-wide transition-colors"
          style={{ backgroundColor: saving || uploading ? '#aaa' : '#8E1B2D' }}
        >
          {saving ? 'Saving...' : mode === 'create' ? 'Create Listing' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/marketplace')}
          className="px-8 py-3 rounded-lg font-heading font-semibold text-sm"
          style={{ backgroundColor: '#F5F7FC', color: '#334155', border: '1px solid #E8ECF4' }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
