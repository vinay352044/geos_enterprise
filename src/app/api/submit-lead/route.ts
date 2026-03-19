import { NextRequest, NextResponse } from 'next/server'
import { leadFormSchema } from '@/lib/validators'
import { sendLeadEmail } from '@/lib/sendEmail'
import { appendLeadToSheet } from '@/lib/googleSheets'
import { generateLeadId, sanitizeText } from '@/lib/utils'
import { checkRateLimit, getRateLimitKey } from '@/lib/rateLimiter'
import { RATE_LIMITS } from '@/lib/constants'

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown'

  const rateKey = getRateLimitKey(ip, 'submit-lead')
  const limit = checkRateLimit(rateKey, {
    windowMs: RATE_LIMITS.WINDOW_MS,
    maxRequests: RATE_LIMITS.FORM_SUBMISSIONS,
  })

  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many submissions. Please try again later.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = leadFormSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message || "Validation error" },
      { status: 400 },
    )
  }

  const { contactNumber, additionalNotes, ...rest } = parsed.data

  const leadId = generateLeadId()
  const lead = {
    leadId,
    contactNumber,
    additionalNotes: additionalNotes ? sanitizeText(additionalNotes) : undefined,
    customerName: sanitizeText(rest.customerName),
    pickupLocation: sanitizeText(rest.pickupLocation),
    dropLocation: sanitizeText(rest.dropLocation),
    tripStartDate: rest.tripStartDate,
    tripEndDate: rest.tripEndDate,
    tripStartTime: rest.tripStartTime,
    tripEndTime: rest.tripEndTime,
    vehicleType: rest.vehicleType,
  }

  const [emailResult, sheetsResult] = await Promise.allSettled([
    sendLeadEmail(lead),
    appendLeadToSheet(lead),
  ])

  const emailSuccess = emailResult.status === 'fulfilled' && emailResult.value.success
  const sheetsSuccess = sheetsResult.status === 'fulfilled' && sheetsResult.value.success

  if (!emailSuccess && !sheetsSuccess) {
    return NextResponse.json(
      {
        success: false,
        error: `Something went wrong. Please call us at +91-92274-76900 or try again.`,
      },
      { status: 500 },
    )
  }

  return NextResponse.json({
    success: true,
    data: { leadId, message: 'Thank you! Our team will contact you within 2 hours.' },
  })
}
