import { NextRequest, NextResponse } from 'next/server'
import { checkAdminCredentials, createSessionToken, COOKIE_NAME } from '@/lib/adminAuth'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (!checkAdminCredentials(username, password)) {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
  }
  const token = createSessionToken(username)
  const res = NextResponse.json({ success: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete(COOKIE_NAME)
  return res
}
