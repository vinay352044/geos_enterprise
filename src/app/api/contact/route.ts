import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validators'
import { sendContactEmail } from '@/lib/sendEmail'
import { checkRateLimit, getRateLimitKey } from '@/lib/rateLimiter'
import { RATE_LIMITS } from '@/lib/constants'
import { sanitizeText } from '@/lib/utils'

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown'

  const rateKey = getRateLimitKey(ip, 'contact')
  const limit = checkRateLimit(rateKey, {
    windowMs: RATE_LIMITS.WINDOW_MS,
    maxRequests: RATE_LIMITS.FORM_SUBMISSIONS,
  })

  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Try again later.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = contactFormSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message || "Validation error" },
      { status: 400 },
    )
  }

  const sanitized = {
    name: sanitizeText(parsed.data.name),
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: sanitizeText(parsed.data.subject),
    message: sanitizeText(parsed.data.message),
  }

  const result = await sendContactEmail(sanitized)
  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message. Please email us directly at geosenterprises@gmail.com',
      },
      { status: 500 },
    )
  }

  return NextResponse.json({
    success: true,
    data: { message: "Message sent! We'll get back to you within 24 hours." },
  })
}
