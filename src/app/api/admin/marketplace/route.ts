import { NextRequest, NextResponse } from 'next/server'
import { getAllListings, createListing } from '@/lib/marketplaceDb'

export async function GET() {
  const listings = getAllListings()
  return NextResponse.json({ success: true, data: listings })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const listing = createListing(body)
    return NextResponse.json({ success: true, data: listing })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create listing' }, { status: 500 })
  }
}
