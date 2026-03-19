import { NextResponse } from 'next/server'
import { getAllListings } from '@/lib/marketplaceDb'

export async function GET() {
  const listings = getAllListings()
  return NextResponse.json({ success: true, data: listings })
}
