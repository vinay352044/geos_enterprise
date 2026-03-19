import { NextRequest, NextResponse } from 'next/server'
import { otpRequestSchema } from '@/lib/validators'
import { generateOtp, storeOtp } from '@/lib/verifyOtp'
import { sendOtp } from '@/lib/sendOtp'
import { checkRateLimit, getRateLimitKey } from '@/lib/rateLimiter'
import { RATE_LIMITS } from '@/lib/constants'

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown'

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = otpRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message || "Validation error" },
      { status: 400 },
    )
  }

  const { phone } = parsed.data
  const rateKey = getRateLimitKey(ip, `otp:${phone}`)
  const limit = checkRateLimit(rateKey, {
    windowMs: RATE_LIMITS.WINDOW_MS,
    maxRequests: RATE_LIMITS.OTP_REQUESTS,
  })

  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many OTP requests. Please try again later.' },
      { status: 429 },
    )
  }

  const otp = generateOtp()
  storeOtp(phone, otp)
  const result = await sendOtp(phone, otp)

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP. Please try again.' },
      { status: 500 },
    )
  }

  return NextResponse.json({
    success: true,
    data: { message: `OTP sent to +91-${phone.slice(0, 5)}XXXXX` },
  })
}
