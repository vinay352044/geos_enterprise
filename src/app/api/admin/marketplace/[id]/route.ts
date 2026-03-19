import { NextRequest, NextResponse } from 'next/server'
import { getListingById, updateListing, deleteListing } from '@/lib/marketplaceDb'

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const listing = getListingById(id)
  if (!listing) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true, data: listing })
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params
  const body = await req.json()
  const listing = updateListing(id, body)
  if (!listing) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true, data: listing })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const ok = deleteListing(id)
  if (!ok) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
