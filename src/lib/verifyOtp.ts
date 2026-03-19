interface OtpRecord {
  otp: string
  phone: string
  expiresAt: number
  attempts: number
  verified: boolean
}

const otpStore = new Map<string, OtpRecord>()

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function storeOtp(phone: string, otp: string): void {
  otpStore.set(phone, {
    otp,
    phone,
    expiresAt: Date.now() + 5 * 60 * 1000,
    attempts: 0,
    verified: false,
  })
}

export function verifyOtp(
  phone: string,
  otp: string,
): { success: boolean; error?: string; sessionToken?: string } {
  const record = otpStore.get(phone)

  if (!record) {
    return { success: false, error: 'OTP not found. Please request a new OTP.' }
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(phone)
    return { success: false, error: 'OTP has expired. Please request a new OTP.' }
  }

  if (record.attempts >= 3) {
    otpStore.delete(phone)
    return { success: false, error: 'Too many failed attempts. Please request a new OTP.' }
  }

  if (record.verified) {
    return { success: false, error: 'OTP already used.' }
  }

  record.attempts += 1

  if (record.otp !== otp) {
    return {
      success: false,
      error: `Incorrect OTP. ${3 - record.attempts} attempt${3 - record.attempts === 1 ? '' : 's'} remaining.`,
    }
  }

  record.verified = true
  const sessionToken = `${phone}_${Date.now()}_${Math.random().toString(36).slice(2)}`
  otpStore.set(phone, record)

  return { success: true, sessionToken }
}

export function validateSessionToken(phone: string, token: string): boolean {
  const record = otpStore.get(phone)
  if (!record?.verified) return false
  return token.startsWith(`${phone}_`)
}
