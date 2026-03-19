import { NextRequest, NextResponse } from 'next/server'
import { otpVerifySchema } from '@/lib/validators'
import { verifyOtp } from '@/lib/verifyOtp'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = otpVerifySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message || "Validation error" },
      { status: 400 },
    )
  }

  const { phone, otp } = parsed.data
  const result = verifyOtp(phone, otp)

  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error }, { status: 400 })
  }

  return NextResponse.json({ success: true, data: { sessionToken: result.sessionToken } })
}
