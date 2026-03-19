import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { updateListing, getListingById } from '@/lib/marketplaceDb'
import { isCloudinaryConfigured, uploadToCloudinary } from '@/lib/cloudinary'

interface Params { params: Promise<{ id: string }> }

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params

  const listing = getListingById(id)
  if (!listing) return NextResponse.json({ success: false, error: 'Listing not found' }, { status: 404 })

  const formData = await req.formData()
  const files = formData.getAll('images') as File[]

  if (!files.length) return NextResponse.json({ success: false, error: 'No files uploaded' }, { status: 400 })

  const urls: string[] = []

  if (isCloudinaryConfigured()) {
    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const publicId = `${id}-${Date.now()}-${Math.random().toString(36).slice(2)}`
      const url = await uploadToCloudinary(buffer, publicId)
      urls.push(url)
    }
  } else {
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'marketplace', 'uploads')
    await mkdir(uploadDir, { recursive: true })
    for (const file of files) {
      const ext = file.name.split('.').pop() || 'jpg'
      const filename = `${id}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const bytes = await file.arrayBuffer()
      await writeFile(path.join(uploadDir, filename), Buffer.from(bytes))
      urls.push(`/images/marketplace/uploads/${filename}`)
    }
  }

  const updated = updateListing(id, { images: [...(listing.images || []), ...urls] })
  return NextResponse.json({ success: true, data: { urls, listing: updated } })
}
